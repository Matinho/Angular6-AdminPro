import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styles: []
})
export class ProgressComponent implements OnInit {

  progresoAzul: number = 30;
  progresoVerde: number = 10;

  constructor() { }

  ngOnInit() {
  }

}
