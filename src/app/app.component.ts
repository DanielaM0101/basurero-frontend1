import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { BasurerosService, Basurero } from './basureros.service';
import { MessageService } from '../message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FormsModule,
    NzTableModule,
    NzFormModule,
    NzInputModule,
    NzButtonModule,
    NzModalModule,
    HttpClientModule,
    ReactiveFormsModule,


  ],
  template: `
    <h1>Gestión de Basureros</h1>
    <img src='https://img.freepik.com/vector-gratis/ilustracion-icono-cubo-basura_53876-5598.jpg?w=826&t=st=1720246432~exp=1720247032~hmac=4ff747077824debf50608436ab48f8bd28de514ddfd2f6c10e54f68259181bf6' width="100" height="100">

    <div *ngIf="messageService.message()">
      <div [ngClass]="{
        'message': true,
        'success': messageService.message()?.type === 'success',
        'error': messageService.message()?.type === 'error',
        'info': messageService.message()?.type === 'info'
      }">
        {{ messageService.message()?.content }}
      </div>
    </div>

    <nz-table #basicTable [nzData]="basureros">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Ubicación</th>
          <th>Encargado</th>
          <th>Capacidad</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr *ngFor="let data of basicTable.data">
          <td>{{ data.name }}</td>
          <td>{{ data.location }}</td>
          <td>{{ data.incharge }}</td>
          <td>{{ data.capacity }}</td>
          <td>
            <button nz-button (click)="editBasurero(data)">Editar</button>
            <button nz-button nzDanger (click)="deleteBasurero(data)">Eliminar</button>
          </td>
        </tr>
      </tbody>
    </nz-table>

    <h2>{{ editMode ? 'Editar Basurero' : 'Agregar Basurero' }}</h2>
    <form [formGroup]="basureroForm" (ngSubmit)="onSubmit()">
      <div nz-form-item>
        <div nz-form-label>
          <label for="name">Nombre</label>
        </div>
        <div nz-form-control>
          <input nz-input id="name" formControlName="name" required>
        </div>
      </div>

      <div nz-form-item>
        <div nz-form-label>
          <label for="location">Ubicación</label>
        </div>
        <div nz-form-control>
          <input nz-input id="location" formControlName="location" required>
        </div>
      </div>

      <div nz-form-item>
        <div nz-form-label>
          <label for="incharge">Encargado</label>
        </div>
        <div nz-form-control>
          <input nz-input id="incharge" formControlName="incharge" required>
        </div>
      </div>

      <div nz-form-item>
        <div nz-form-label>
          <label for="capacity">Capacidad</label>
        </div>
        <div nz-form-control>
          <input nz-input id="capacity" formControlName="capacity" required>
        </div>
      </div>

      <div nz-form-item>
        <div nz-form-control>
          <button nz-button nzType="primary" type="submit" [disabled]="basureroForm.invalid">
            {{ editMode ? 'Actualizar' : 'Agregar' }}
          </button>
        </div>
      </div>
    </form>
  `,
  styles: [`
    .message {
      padding: 10px;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .success {
      background-color: #d4edda;
      color: #155724;
    }
    .error {
      background-color: #f8d7da;
      color: #721c24;
    }
    .info {
      background-color: #d1ecf1;
      color: #0c5460;
    }
  `]
})
export class AppComponent implements OnInit {
  basureros: Basurero[] = [];
  basureroForm: FormGroup;
  editMode = false;
  currentBasureroId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private basurerosService: BasurerosService,
    public messageService: MessageService
  ) {
    this.basureroForm = this.fb.group({
      name: ['', Validators.required],
      location: ['', Validators.required],
      incharge: ['', Validators.required],
      capacity: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.getBasureros();
  }

  getBasureros() {
    this.basurerosService.getBasureros().subscribe({
      next: (data) => {
        this.basureros = data;
      },
      error: (error) => {
        this.messageService.error('Error al obtener basureros');
        console.error('Error fetching basureros:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.basureroForm.valid) {
      if (this.editMode) {
        this.updateBasurero();
      } else {
        this.addBasurero();
      }
    }
  }

  addBasurero(): void {
    const newBasurero: Basurero = this.basureroForm.value;
    newBasurero.id = null;

    this.basurerosService.addBasurero(newBasurero).subscribe({
      next: (data) => {
        this.basureros.push(data);
        this.basureroForm.reset();
        this.messageService.success('Basurero agregado exitosamente');
        this.getBasureros(); // Refresh the list
      },
      error: (error) => {
        this.messageService.error('Error al agregar basurero');
        console.error('Error adding basurero:', error);
      }
    });
  }

  editBasurero(basurero: Basurero): void {
    this.editMode = true;
    this.currentBasureroId = basurero.id;
    this.basureroForm.patchValue({
      name: basurero.name,
      location: basurero.location,
      incharge: basurero.incharge,
      capacity: basurero.capacity
    });
  }

  updateBasurero(): void {
    if (this.currentBasureroId !== null) {
      const updatedBasurero: Basurero = {
        ...this.basureroForm.value,
        id: this.currentBasureroId
      };

      this.basurerosService.updateBasurero(updatedBasurero).subscribe({
        next: (data) => {
          const index = this.basureros.findIndex(b => b.id === data.id);
          if (index !== -1) {
            this.basureros[index] = data;
          }
          this.basureroForm.reset();
          this.editMode = false;
          this.currentBasureroId = null;
          this.messageService.success('Basurero actualizado exitosamente');
          this.getBasureros(); 
        },
        error: (error) => {
          this.messageService.error('Error al actualizar basurero');
          console.error('Error updating basurero:', error);
        }
      });
    }
  }

  deleteBasurero(basurero: Basurero): void {
    if (basurero.id) {
      this.basurerosService.deleteBasurero(basurero.id).subscribe({
        next: () => {
          this.basureros = this.basureros.filter(b => b.id !== basurero.id);
          this.messageService.success('Basurero eliminado exitosamente');
        },
        error: (error) => {
          this.messageService.error('Error al eliminar basurero');
          console.error('Error deleting basurero:', error);
        }
      });
    } else {
      this.messageService.error('No se puede eliminar un basurero sin ID');
    }
  }
}