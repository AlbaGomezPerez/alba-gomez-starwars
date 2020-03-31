import { Component, OnInit } from '@angular/core';
import {JsonService} from './json.service';


/**
 * Get data to the API
 * Show the list with the starships with their values and their progress
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
  error = false;

  ngOnInit() {
    this.requestStarships('hyperdriveRating_DESC');
  }

  /**
   * Get data to the API
   * Check the array contains data
   * Show the list with attributes selected by the button
   * @param orderCriteria : attribute to order
   */
  requestStarships(orderCriteria) {
    this.json.getJson('https://swapi.graph.cool/', orderCriteria).subscribe({
      next: starships => {
        if (this.ships === []) {
          this.error = true;
        } else {
          const shipsInfo = starships["data"].allStarships;

          this.setShipAttribute(orderCriteria);

          const maxValue = this.maxAttributeValueByShipAttribute(this.shipAttribute, shipsInfo);
          this.ships = shipsInfo.map(ship => {
            const attribute = this.getAttributeValue(ship);
            return {
              name: ship.name,
              percentage: this.getPercentageProgressValue(maxValue, attribute),
              attributeValue: attribute
            };
          });
        }
      },
      error: error => {
        console.error('There was an error!', error);
        this.error = true;
      }
    });
  }

  /**
   * Set ship attribute based on the given order criteria at the button checked
   * @param orderCriteria : attribute to order
   */
  setShipAttribute(orderCriteria) {
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
   * @param shipAttribute : value attribute
   * @param ships : data array
   */
  maxAttributeValueByShipAttribute(shipAttribute: string, ships) {
    return Math.max.apply(Math, ships.map( ship => {
      return ship[shipAttribute];
    }));
  }

  /**
   * Get attribute value and assign 0 to default and null attributes
   * @param ship the entitiy
   */
  private getAttributeValue(ship) {
    if (ship[this.shipAttribute] === null || ship[this.shipAttribute] === undefined) {
      return 0;
    } else {
      return ship[this.shipAttribute];
    }
  }

  /**
   * Get percentage value attribute to progress
   * @param maxValue : max value into array
   * @param attributeValue : number of each attribute
   */
  getPercentageProgressValue(maxValue, attributeValue) {
    if (attributeValue === 0 || maxValue === null || maxValue === undefined || maxValue === 0) {
      return 0;
    }
    return (Math.log10(attributeValue) / Math.log10(maxValue)) * 100;
  }
}



