import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonService {
  constructor(private http: HttpClient) { }

  getJson(url: string, orderCriteria: string) {
    const orderParam = orderCriteria;

    return this.http.post(url, '{ "query": "query { allStarships(orderBy: ' + orderParam + ' ){ cargoCapacity costInCredits id name crew hyperdriveRating length maxAtmospheringSpeed passengers} } " }', {
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}







