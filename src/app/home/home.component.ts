import { Component } from '@angular/core';
import {JsonService} from './json.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

//TODO Describir que hace el componente
export class HomeComponent {
  constructor(public json: JsonService) {
    this.requestStarships('hyperdriveRating_DESC'); //quitar del constructor y meter en ngOnInit
  }
  ships = [];
  shipAttribute = '';

  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        //comprobar si starships tiene algo dentor para que no de un error
        const shipsInfo = starships["data"].allStarships;

        //meter en un switch
        this.attributeChecked(orderCriteria);

        const maxValue = this.maxAttributeValueByShipAttribute(this.shipAttribute, shipsInfo);
        let attribute = 0;
        this.ships = shipsInfo.map(ship => {

          //Refactorizar un método y meter undefined
          if (ship[this.shipAttribute] === null || ship[this.shipAttribute] === undefined) {
            attribute = 0;
          } else {
            attribute = ship[this.shipAttribute];
          }
          return {
            name: ship.name,
            percentage: this.percentageValue(maxValue, attribute),
            attributeValue: attribute
          };
        });
      },
      error: error => {
        console.error('There was an error!', error);
        //cambiar variable del estado indicando que hay error
      } //TODO mostrar mensaje de error
    });
  }


  attributeChecked(orderCriteria) {
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
  }


  //TODO documentar
  /**
   *
   * @param shipAttribute
   * @param ships
   */
  maxAttributeValueByShipAttribute(shipAttribute: string, ships) {
      return Math.max.apply(Math, ships.map( ship => {
        return ship[shipAttribute];
      }));
  }

  //TODO DOCUMENTAR
  /**
   *
   * @param maxValue
   * @param attributeValue
   */
  percentageValue(maxValue, attributeValue) {
    if(attributeValue === 0 || maxValue === null || maxValue === undefined || maxValue === 0) {
      return 0;
    }
    return (Math.log10(attributeValue) / Math.log10(maxValue)) * 100;
  }
}



