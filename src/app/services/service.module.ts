import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // esto tiene el ngIf, ngFor, etc
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {
          LoginGuardGuard,
          AdminGuard,
          SettingsService,
          SidebarService,
          SharedService,
          UsuarioService,
          SubirArchivoService,
          HospitalService,
          MedicoService } from './service.index';


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
    ModalUploadService,
    HospitalService,
    MedicoService,
    LoginGuardGuard,
    AdminGuard,
  ],
  declarations: []
})
export class ServiceModule { }
