import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideNzI18n, en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { ApplicationConfig } from '@angular/core';
import { importProvidersFrom } from '@angular/core';
import { NzMessageModule } from 'ng-zorro-antd/message';

registerLocaleData(en);

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withFetch()), // This is where you configure HttpClient to use fetch
    provideNzI18n(en_US),
    importProvidersFrom(NzMessageModule)
  ]
};

bootstrapApplication(AppComponent, appConfig)
  .catch(err => console.error(err));
