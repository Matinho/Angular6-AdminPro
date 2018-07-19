import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from '../../../../node_modules/rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';
import { Medico } from '../../models/medico.model';

@Injectable({
  providedIn: 'root'
})
export class MedicoService {

  totalMedicos: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarMedicos( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/medico?desde=' + desde;
    return this.http.get( url )
              .pipe( map( (resp: any) => {

                this.totalMedicos = resp.total;
                return resp;

              }) );

  }

  buscarMedico( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/medicos/' + termino;
    return this.http.get( url )
            .pipe( map( (resp: any) => resp.medicos ) );

  }

  borrarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id + '?token=' + this._usuarioService.token;
    return this.http.delete( url )
              .pipe( map( resp => {
                swal('Medico Borrado', 'El Medico ha sido eliminado correctamente', 'success');
                return true;
              } ));

  }

  guardarMedico( medico: Medico ) {

    let url = URL_SERVICIOS + '/medico';

    if ( medico._id ) {
      // Actualizando
      url += '/' + medico._id + '?token=' + this._usuarioService.token;

      return this.http.put( url, medico )
                .pipe( map( (resp: any) => {
                  swal('Medico Actualizado', 'El Médico ' + resp.medico.nombre + ' se actualizó con exito', 'success');
                  return resp.medico;
                }) );

    } else {
      // Creando
      url += '?token=' + this._usuarioService.token;

      return this.http.post( url, medico )
                .pipe( map( (resp: any) => {
                  swal('Medico Creado', 'El Médico ' + resp.medico.nombre + ' se creó con exito', 'success');
                  return resp.medico;
                }) );
    }


  }

  cargarMedico( id: string ) {

    const url = URL_SERVICIOS + '/medico/' + id ;

    return this.http.get( url )
              .pipe( map( (resp: any) => resp.medico ) );

  }

}
