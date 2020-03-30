import { Component } from '@angular/core';
import {JsonService} from './json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent {
  constructor(public json: JsonService) {
    this.requestStarships('cargoCapacity_DESC');
  }
  ships = [];
  shipAttribute = '';

  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        //TODO comprobar si starships["data"] tiene datos
        const shipsInfo = starships["data"].allStarships;

        if (orderCriteria === 'cargoCapacity_DESC') {
          this.shipAttribute = 'cargoCapacity';
        } else if (orderCriteria === 'costInCredits_DESC') {
          this.shipAttribute = 'costInCredits';
        } else if (orderCriteria === 'crew_DESC') {
          this.shipAttribute = 'crew';
        } else if (orderCriteria === 'hyperdriveRating_DESC') {
          this.shipAttribute = 'hyperdriveRating';
        } else if (orderCriteria === 'length_DESC') {
          this.shipAttribute = 'length';
        } else if (orderCriteria === 'maxAtmospheringSpeed_DESC') {
          this.shipAttribute = 'maxAtmospheringSpeed';
        } else {
          this.shipAttribute = 'passengers';
        }

        const maxValue = this.maxAttributeValueByShipAttribute(this.shipAttribute, shipsInfo);
        this.ships = shipsInfo.map(ship => {
          return {
            name: ship.name,
            percentage: this.percentageValue(maxValue, ship[this.shipAttribute]),
            attributeValue: ship[this.shipAttribute]
          };
        });


        // usar esta nueva variable en la vista
      },
      error: error => console.error('There was an error!', error) //TODO mostrar mensaje de error en la vista
    });
  }
  maxAttributeValueByShipAttribute(shipAttribute: string, ships) {
      return Math.max.apply(Math, ships.map( ship => {
      return ship[shipAttribute];
    }));
  }



  percentageValue(maxValue, attributeValue) {
    const percentage2 = (attributeValue / maxValue) * 100;
    console.log('valor atributo: ' + attributeValue);
    console.log('valor máximo: ' + maxValue);
    console.log('porcentaje: ' + percentage2);
    return (attributeValue / maxValue) * 100;
  }
}



