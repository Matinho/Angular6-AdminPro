import { Component, OnInit } from '@angular/core';
import { HospitalService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
import { Hospital } from '../../models/hospital.model';

declare var swal: any;

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: []
})
export class HospitalesComponent implements OnInit {

  hospitales: Hospital[] = [] ;
  desde: number = 0; // para la paginacion
  totalRegistros: number = 0; // para la paginacion
  cargando: boolean = true;

  constructor(
    public _hospitalService: HospitalService,
    public _modalUploadService: ModalUploadService ) { }

  ngOnInit() {
    this.cargarHospitales();

    this._modalUploadService.notificacion
      .subscribe( () => this.cargarHospitales() );
  }

  cargarHospitales() {

    this.cargando = true;

    this._hospitalService.cargarHospitales( this.desde )
          .subscribe( (hospitales: any) => {

            this.hospitales = hospitales.hospitales ;
            this.totalRegistros = hospitales.total;
            this.cargando = false;

          });

  }

  buscarHospital( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarHospitales();
      return;
    }

    this.cargando = true;

    this._hospitalService.buscarHospital( termino )
          .subscribe( (hospitales: Hospital[]) => {
            this.hospitales = hospitales;
            this.cargando = false;
          } );

  }

  guardarHospital( hospital: Hospital ) {
    this._hospitalService.actualizarHospital( hospital )
          .subscribe();
  }

  borrarHospital( hospital: Hospital ) {
    this._hospitalService.borrarHospital( hospital._id )
          .subscribe( () => this.cargarHospitales() );
  }

  crearHospital() {

    swal({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del Hospital',
      content: 'input',
      icon: 'info',
      buttons: true,
      dangerMode: true
    }) // recibo una promesa con el valor ingresado
    .then( (valor: string) => {

      if (!valor || valor.length === 0 ) {
        return;
      }

      this._hospitalService.crearHospital( valor )
            .subscribe( () => this.cargarHospitales() );

    });

  }

  actualizarImagen( hospital: Hospital ) {

    this._modalUploadService.mostrarModal( 'hospitales', hospital._id );

  }

  cambiarDesde( valor: number ) {

    const desde = this.desde + valor;

    if ( desde >= this.totalRegistros ) {
      return;
    }

    if ( desde < 0 ) {
      return;
    }

    this.desde += valor;
    this.cargarHospitales();

  }

}
