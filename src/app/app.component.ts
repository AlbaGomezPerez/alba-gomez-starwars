import { Component } from '@angular/core';
import {JsonService} from './json.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'alba-gomez-starwars';
  ships = [];

  constructor(public json: JsonService) {
    this.requestStarships('cargoCapacity_DESC');
  }


  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        //TODO comprobar si starships["data"] tiene datos y eliminar consoles
        this.ships = starships["data"].allStarships;
      },
      error: error => console.error('There was an error!', error) //TODO mostrar mensaje de error en la vista
    });
  }


}
