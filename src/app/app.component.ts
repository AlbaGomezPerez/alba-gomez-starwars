import { Component } from '@angular/core';
import {JsonService} from './json.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alba-gomez-starwars';
  shipAtributte = '¿qué atributo soy?';
  harry = [];

  constructor(public json: JsonService) {
    this.requestStarships('credits');
  }


  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        console.log(starships);
        console.log(starships["data"]);
        //TODO comprobar si starships["data"] tiene datos y eliminar consoles
        this.harry = starships["data"].allStarships;
      },
      error: error => console.error('There was an error!', error) //TODO mostrar mensaje de error en la vista
    });
  }

  showAttribute() {
    this.shipAtributte = 'soy otro';
  }

  showAttributeConsole() {
    console.log('hola');
  }

}
