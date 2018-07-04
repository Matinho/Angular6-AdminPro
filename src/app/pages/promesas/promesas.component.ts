import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    this.contarTres().then(
      mensaje => console.log('Terminó', mensaje),
    ).catch(
      error => console.error('Error en la promesa', error)
    );

   }

  ngOnInit() {
  }

  contarTres(): Promise<boolean> {
    return new Promise( (resolve, reject) => {

      let contador = 0;

      // es una fc de js que cada cierto intervalo ejecuta algo
      const intervalo = setInterval( () => {

        contador += 1;
        console.log(contador);

        if ( contador === 3 ) {
          resolve( true );
          // reject('Error porque si');
          clearInterval(intervalo);
        }
      }, 1000 ); // indico que se dispare cada 1 segundo
    });
  }

}
