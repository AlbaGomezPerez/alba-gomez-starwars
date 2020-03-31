import { Component, OnInit } from '@angular/core';
import {JsonService} from './json.service';


//TODO Describir que hace el componente

/**
 *
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  constructor(public json: JsonService) { }
  ships = [];
  shipAttribute = '';

  ngOnInit() {
    this.requestStarships('hyperdriveRating_DESC');
  }

  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        //comprobar si starships tiene algo dentor para que no de un error
        const shipsInfo = starships["data"].allStarships;

        this.attributeChecked(orderCriteria);

        const maxValue = this.maxAttributeValueByShipAttribute(this.shipAttribute, shipsInfo);
        let attribute = 0;
        this.ships = shipsInfo.map(ship => {

          //Refactorizar un método
          if (ship[this.shipAttribute] === null || ship[this.shipAttribute] === undefined) {
            attribute = 0;
          } else {
            attribute = ship[this.shipAttribute];
          }
          return {
            name: ship.name,
            percentage: this.createProgressValue(maxValue, attribute),
            attributeValue: attribute
          };
        });
      },
      error: error => {
        console.error('There was an error!', error);
        this.shipAttribute = 'There was an error!';
      }
    });
  }

  /**
   * Change orderCriteria by button checked
   */
/*  attributeChecked2(orderCriteria) {
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
  }*/

  attributeChecked(orderCriteria) {
    switch (orderCriteria) {
      case 'cargoCapacity_DESC':
        this.shipAttribute = 'cargoCapacity';
        break;
      case 'costInCredits_DESC':
        this.shipAttribute = 'costInCredits';
        break;
      case 'crew_DESC':
        this.shipAttribute = 'crew';
        break;
      case 'hyperdriveRating_DESC':
        this.shipAttribute = 'hyperdriveRating';
        break;
      case 'length_DESC':
        this.shipAttribute = 'length';
        break;
      case 'maxAtmospheringSpeed_DESC':
        this.shipAttribute = 'maxAtmospheringSpeed';
        break;
        default:
        this.shipAttribute = 'passengers';
    }
  }


  /**
   * Get max value number into array
   */
  maxAttributeValueByShipAttribute(shipAttribute: string, ships) {
      return Math.max.apply(Math, ships.map( ship => {
        return ship[shipAttribute];
      }));
  }

  /**
   * Generate value attribute to progress
   */
  createProgressValue(maxValue, attributeValue) {
    if (attributeValue === 0 || maxValue === null || maxValue === undefined || maxValue === 0) {
      return 0;
    }
    return (Math.log10(attributeValue) / Math.log10(maxValue)) * 100;
  }
}



