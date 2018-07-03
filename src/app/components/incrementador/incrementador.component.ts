import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';


@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styles: []
})
export class IncrementadorComponent implements OnInit {

  // tengo que decirle que elemento HTML tengo que referenciar, lo hago con # en el html
  // especifico que es un elemento del tipo ElementRef
  @ViewChild('txtProgress') txtProgress: ElementRef;

  @Input() leyenda: string = 'Leyenda';
  @Input() progreso: number = 50;

  @Output() cambioValor: EventEmitter<number> = new EventEmitter(); // emito al padre un numero como un evento

  constructor() {
  }

  ngOnInit() {
  }

  onChanges( valor: number ) {

    // getElementsByName devuelve un arreglo con todas las coincidencias
    // const elemHTML: any = document.getElementsByName('progreso')[0];

    if ( valor >= 100 ) {
      this.progreso = 100;
    } else if ( valor <= 0 || valor === null) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    // elemHTML.value = this.progreso;

    this.txtProgress.nativeElement.value = this.progreso;

    this.cambioValor.emit( this.progreso );

    this.txtProgress.nativeElement.focus();

  }

  cambiarValor( valor: number ) {
    if ( this.progreso >= 100 && valor > 0 ) {
      this.progreso = 100;
      return ;
    }

    if ( this.progreso <= 0 && valor < 0 ) {
      this.progreso = 0;
      return;
    }

    this.progreso += valor;
    this.cambioValor.emit( this.progreso );

  }

}
