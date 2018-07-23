import { Injectable } from '@angular/core';
import { URL_SERVICIOS } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo( archivo: File, tipo: string, id: string ) {

    return new Promise( (resolve, reject) => {

      const formData = new FormData(); // es el payload que quiero subir
      const xhr = new XMLHttpRequest(); // inicializamos la petición AJAX

      formData.append( 'imagen', archivo, archivo.name ); // configuramos el formData

      xhr.onreadystatechange = function() { // la peticion AJAX me avisa de los cambios

        if ( xhr.readyState === 4 ) { // solo me interesa cuando termina el proceso
          if ( xhr.status === 200 ) { // si el status es 200 estoy seguro que la imagen se subió
            resolve( JSON.parse( xhr.response ) );
          } else {
            console.log('Falló la subida');
            reject( xhr.response );
          }
        }

      };

      const url = URL_SERVICIOS + '/upload/' + tipo + '/' + id ; // url al que le hago la peticion en el backend

      xhr.open( 'PUT', url, true ); // hago la peticion PUT
      xhr.send( formData ); // mando el archivo

    } );


  }

}
