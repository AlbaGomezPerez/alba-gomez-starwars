import { Component } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alba-gomez-starwars';
  shipAtributte = '¿qué atributo soy?';
  harry = [];

  showAttribute() {
    this.shipAtributte = 'soy otro';
  }

  showAttributeConsole() {
    console.log('hola');
  }

}
