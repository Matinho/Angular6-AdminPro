import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // esto tiene el ngIf, ngFor, etc
import { HttpClientModule } from '@angular/common/http';

import {  SettingsService,
          SidebarService,
          SharedService,
          UsuarioService,
          LoginGuardGuard,
          SubirArchivoService } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
    SubirArchivoService,
    LoginGuardGuard
  ],
  declarations: []
})
export class ServiceModule { }
