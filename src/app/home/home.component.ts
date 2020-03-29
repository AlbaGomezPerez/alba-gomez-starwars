import { Component } from '@angular/core';
import {JsonService} from './json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})

export class HomeComponent {
  ships = [];
  constructor(public json: JsonService) {
    this.requestStarships('cargoCapacity_DESC');
  }

  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        //TODO comprobar si starships["data"] tiene datos y eliminar consoles
        this.ships = starships["data"].allStarships;

        let shipAttribute = '';
        if (orderCriteria === 'cargoCapacity_DESC') {
          shipAttribute = 'cargoCapacity';
        } else if (orderCriteria === 'costInCredits_DESC') {
          shipAttribute = 'costInCredits';
        } else if (orderCriteria === 'crew_DESC') {
          shipAttribute = 'crew';
        } else if (orderCriteria === 'hyperdriveRating_DESC') {
          shipAttribute = 'hyperdriveRating';
        } else if (orderCriteria === 'length_DESC') {
          shipAttribute = 'length';
        } else if (orderCriteria === 'maxAtmospheringSpeed_DESC') {
          shipAttribute = 'maxAtmospheringSpeed';
        } else {
          shipAttribute = 'passengers';
        }
        this.maxAttributeValueByShipAttribute(shipAttribute);

        //TODO recorrer los datos y coger la variable apropiada en base al orderCriteria
        //CALCULAR el porcentaje: sacar el valor máximo de la variable √ y luego hacer la regla de 3 (crear una funcion)
        // rellenar una variable que contenga el valor del porcentaje
        // usar esta nueva variable en la vista
      },
      error: error => console.error('There was an error!', error) //TODO mostrar mensaje de error en la vista
    });
  }


  maxAttributeValueByShipAttribute(shipAttribute: string) {
    console.log(shipAttribute);
    Math.max.apply(Math, this.ships.map( ship => {
      console.log(ship[shipAttribute]);
      return ship[shipAttribute];
    }));
  }

  percentageCredits() {

  }

}



