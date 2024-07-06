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
import { HttpClientModule } from '@angular/common/http';

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
    
  ],
  template: `
    <h1>Gestión de Basureros</h1>
    <img src='https://img.freepik.com/vector-gratis/ilustracion-icono-cubo-basura_53876-5598.jpg?w=826&t=st=1720246432~exp=1720247032~hmac=4ff747077824debf50608436ab48f8bd28de514ddfd2f6c10e54f68259181bf6'[width]="100" height="100">
    
    @if (messageService.message()) {
      <div [ngClass]="{
        'message': true,
        'success': messageService.message()?.type === 'success',
        'error': messageService.message()?.type === 'error',
        'info': messageService.message()?.type === 'info'
      }">
        {{ messageService.message()?.content }}
      </div>
    }

    <button nz-button nzType="primary" (click)="showModal()">Agregar Basurero</button>

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

    <nz-modal [(nzVisible)]="isVisible" [nzTitle]="modalTitle" (nzOnCancel)="handleCancel()" (nzOnOk)="handleOk()">
      <ng-container *nzModalContent>
        <form nz-form>
          <nz-form-item>
            <nz-form-label>Nombre</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="currentBasurero.name" name="name" required>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>Ubicación</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="currentBasurero.location" name="location" required>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>Encargado</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="currentBasurero.incharge" name="incharge" required>
            </nz-form-control>
          </nz-form-item>
          <nz-form-item>
            <nz-form-label>Capacidad</nz-form-label>
            <nz-form-control>
              <input nz-input [(ngModel)]="currentBasurero.capacity" name="capacity" required>
            </nz-form-control>
          </nz-form-item>
        </form>
      </ng-container>
    </nz-modal>
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
  currentBasurero: Basurero = {
    name: '',
    location: '',
    incharge: '',
    capacity: ''
  };
  isVisible = false;
  modalTitle = '';
  isEditing = false;

  constructor(
    private basurerosService: BasurerosService,
    public messageService: MessageService,
  ) {}

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

  showModal(): void {
    this.isVisible = true;
    this.modalTitle = 'Agregar Basurero';
    this.isEditing = false;
    this.currentBasurero = {
      name: '',
      location: '',
      incharge: '',
      capacity: ''
    };
  }

  handleOk(): void {
    if (this.isEditing) {
      this.updateBasurero();
    } else {
      this.addBasurero();
    }
  }

  handleCancel(): void {
    this.isVisible = false;
  }

  addBasurero(): void {
    this.basurerosService.addBasurero(this.currentBasurero).subscribe({
      next: (data) => {
        this.basureros.push(data);
        this.isVisible = false;
        this.messageService.success('Basurero agregado exitosamente');
      },
      error: (error) => {
        this.messageService.error('Error al agregar basurero');
        console.error('Error adding basurero:', error);
      }
    });
  }

  editBasurero(basurero: Basurero): void {
    this.currentBasurero = { ...basurero };
    this.isVisible = true;
    this.modalTitle = 'Editar Basurero';
    this.isEditing = true;
  }

  updateBasurero(): void {
    this.basurerosService.updateBasurero(this.currentBasurero).subscribe({
      next: (data) => {
        const index = this.basureros.findIndex(b => b.id === data.id);
        this.basureros[index] = data;
        this.isVisible = false;
        this.messageService.success('Basurero actualizado exitosamente');
      },
      error: (error) => {
        this.messageService.error('Error al actualizar basurero');
        console.error('Error updating basurero:', error);
      }
    });
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