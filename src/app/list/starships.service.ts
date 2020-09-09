import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

/**
 * Service to get data from the API
 */
export class StarshipsService {
  constructor(private http: HttpClient) {}

  /**
   * Search starships making a Post to the API
   */
  getJson(url: string, orderCriteria: string) {
    return this.http.post<SearchResponse>(url, '{ "query": "query { allStarships {(orderBy: ' + orderCriteria + ' ){ cargoCapacity costInCredits id name crew hyperdriveRating length maxAtmospheringSpeed passengers} } " }', {
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}

/**
 * Define data types to Starship object
 */
export interface Starship {
  id: string;
  name: string;
  crew: number;
  cargoCapacity: number;
  costInCredits: number;
  hyperdriveRating: number;
  length: number;
  maxAtmospheringSpeed: number;
  passengers: number;
}

/**
 *  Define array type to allStarships
 */
export interface StarshipsList {
  allStarships: Array<Starship>;
}

/**
 * Assign starshipsList to data
 */
export interface SearchResponse {
  data: StarshipsList;
}







