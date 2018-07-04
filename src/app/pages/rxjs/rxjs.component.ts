import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {

  subscripcion: Subscription;

  constructor() {

   this.subscripcion = this.regresaObservable()
  /*  .pipe( // Me permite definir varios operadores (los observables tienen este operador)
      retry( 2 ) // si existe un error reinicia el observable, el 1er argumento es la cantidad de intentos
    )*/ // como nunca limpio el contador, salto el error con el operador retry()
    .subscribe(
      numero => console.log('Subs ', numero), // 1er parametro se llama en cada Next()
      error => console.error('Error en el Obs', error), // 2do parametro indica si hay error
      () => console.log('El observador terminó') // indica cuando terminó el observador
    );

  }

  ngOnInit() {
  }

  ngOnDestroy() {
    console.log('La página se va a cerrar');
    this.subscripcion.unsubscribe();
  }

  regresaObservable(): Observable<any> {

    return new Observable( (observer: Subscriber<any>) => {

      let contador = 0;
      const intervalo = setInterval( () => {

        contador += 1;

        const salida = {
          valor: contador
        };

        observer.next( salida );

        /*
        if ( contador === 3 ) {
          clearInterval( intervalo );
          observer.complete();
        }
        */

        /*
        if ( contador === 2 ) {
          // clearInterval( intervalo );
          observer.error('Auxilio');
        }
        */

      }, 1000);
    }).pipe(
      // map() recibe una respuesta
      map( resp => resp.valor),
      filter( ( valor, index ) => {

        if ( (valor % 2) === 1 ) {
          // impar
          return true;
        } else {
          // par
          return false;
        }

      })
    );

  }

}
