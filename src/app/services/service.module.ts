import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // esto tiene el ngIf, ngFor, etc
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

import {  SettingsService,
          SidebarService,
          SharedService,
          UsuarioService,
          LoginGuardGuard,
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
    LoginGuardGuard,
    ModalUploadService,
    HospitalService,
    MedicoService,
  ],
  declarations: []
})
export class ServiceModule { }
