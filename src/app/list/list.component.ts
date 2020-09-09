import { Component, OnInit } from '@angular/core';
import {StarshipsService, SearchResponse, Starship} from './starships.service';


/**
 * Show the list with the starships with their values and percentage in a barchart
 */
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit{
  constructor(public json: StarshipsService) { }
  ships: Array<StarshipData> = [];
  shipAttribute = '';
  error = false;

  /**
   * Launch default search
   */
  ngOnInit() {
    this.requestStarships('hyperdriveRating_DESC');
  }

  /**
   * Get data from the API
   * Check the array contains data, if it doesn't, show an error message
   * Fill stars-hips list with attributes selected by the button
   * @param orderCriteria : attribute to order
   */
  requestStarships(orderCriteria: string) {

    this.json.getJson('https://swapi-graphql.netlify.app/.netlify/functions/index', orderCriteria).subscribe({
      next: (starships: SearchResponse ) => {
        if (starships === undefined || starships === null || starships.data === undefined ||
                   starships.data === null || starships.data.allStarships.starships.length === 0)  {
          this.error = true;
        } else {
          const allStarships: Array<Starship> = starships.data.allStarships.starships;
          this.setShipAttribute(orderCriteria);

          const maxValue = this.maxAttributeValueByShipAttribute(this.shipAttribute, allStarships);
          this.ships = allStarships.map((ship: Starship) => {
            const attribute = this.getAttributeValue(ship);
            return {
              name: ship.name,
              percentage: this.getPercentageProgressValue(maxValue, attribute),
              attributeValue: attribute
            } as StarshipData;
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
  setShipAttribute(orderCriteria: string) {
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
   * Get max value number from the array
   * @param shipAttribute : attribute name
   * @param ships : starships array
   * @return get the max attribute value
   */
  maxAttributeValueByShipAttribute(shipAttribute: string, ships: Array<Starship>): number {
    return Math.max.apply(Math, ships.map( (ship: Starship) => {
      return ship[shipAttribute];
    }));
  }

  /**
   * Get attribute value or return 0 in case of attributes with default or null value
   * @param ship : starship data
   * @return the value of the property in the given ship
   */
  private getAttributeValue(ship: Starship): number {
    if (ship[this.shipAttribute] === null || ship[this.shipAttribute] === undefined) {
      return 0;
    } else {
      return ship[this.shipAttribute];
    }
  }

  /**
   * Get percentage value from the attribute to show in the progress barchart
   * @param maxValue : max value from the array
   * @param attributeValue : number of the attribute value
   * @return the percentage calculated
   */
  getPercentageProgressValue(maxValue: number, attributeValue: number): number {
    if (attributeValue === 0 || maxValue === null || maxValue === undefined || maxValue === 0) {
      return 0;
    }
    return (Math.log10(attributeValue) / Math.log10(maxValue)) * 100;
  }
}

/**
 * Assign data type of typescript to object values
 */
export interface StarshipData {
  name: string;
  percentage: number;
  attributeValue: number;
}


