import { Component, OnInit } from '@angular/core';
import { Medico } from '../../models/medico.model';
import { MedicoService } from '../../services/service.index';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: []
})
export class MedicosComponent implements OnInit {

  cargando: boolean = true;
  totalRegistros: number = 0; // para la paginacion
  desde: number = 0; // para la paginacion
  medicos: Medico[] = [];

  constructor( public _medicoService: MedicoService ) { }

  ngOnInit() {

    this.cargarMedicos();

  }

  crearMedico() {

  }

  cargarMedicos() {

    this.cargando = true;

    this._medicoService.cargarMedicos( this.desde )
          .subscribe(  (medicos: any) => {

            this.medicos = medicos.medicos ;
            this.totalRegistros = medicos.total;
            this.cargando = false;

          });

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
    this.cargarMedicos();
  }

  buscarMedico( termino: string ) {

    if ( termino.length <= 0 ) {
      this.cargarMedicos();
      return;
    }

    this._medicoService.buscarMedico( termino )
          .subscribe( medicos => this.medicos = medicos );

  }

  borrarMedico( medico: Medico ){

    this._medicoService.borrarMedico( medico._id )
          .subscribe( () => this.cargarMedicos() );
  }

}
