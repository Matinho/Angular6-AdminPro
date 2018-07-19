import { Injectable } from '@angular/core';
import { Hospital } from '../../models/hospital.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map } from 'rxjs/operators';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class HospitalService {

  totalHospitales: number = 0;

  constructor(
    public http: HttpClient,
    public _usuarioService: UsuarioService
  ) { }

  cargarHospitales( desde: number = 0 ) {

    const url = URL_SERVICIOS + '/hospital?desde=' + desde ;
    return this.http.get( url )
              .pipe( map( (resp: any) => {
                this.totalHospitales = resp.total;
                return resp;
              }) );

  }

  obtenerHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id ;
    return this.http.get( url )
              .pipe( map( (resp: any) => resp.hospital ));

  }

  borrarHospital( id: string ) {

    const url = URL_SERVICIOS + '/hospital/' + id + '?token=' + this._usuarioService.token ;
    return this.http.delete( url )
              .pipe( map( resp => swal( 'Hospital Borrado', 'Se ha borrado correctamente el hospital', 'success' ) ));

  }

  crearHospital( nombre: string ) {

    const url = URL_SERVICIOS + '/hospital/?token=' + this._usuarioService.token ;
    return this.http.post( url, { nombre } )
              .pipe( map( (resp: any) => resp.hospital ));

  }

  buscarHospital( termino: string ) {

    const url = URL_SERVICIOS + '/busqueda/coleccion/hospitales/' + termino ;
    return this.http.get( url )
              .pipe( map( (resp: any) => resp.hospitales ) );

  }

  actualizarHospital( hospital: Hospital ) {

    const url = URL_SERVICIOS + '/hospital/' + hospital._id + '?token=' + this._usuarioService.token ;
    return this.http.put( url, hospital )
              .pipe( map( (resp: any) => {
                swal('Hospital actualizado', 'Se actualizó correctamente el hospital ' + hospital.nombre , 'success');
                return resp.hospital;
              } ) );

  }

}
