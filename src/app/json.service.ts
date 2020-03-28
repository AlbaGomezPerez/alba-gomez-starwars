import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class JsonService {
  constructor(private http: HttpClient) { }


  getJson(url: string, orderCriteria: string) {
    return this.http.post(url, '{ "query": "query { allStarships(orderBy: name_DESC){ id name crew} } " }', {
      headers: {
        'Content-Type' : 'application/json',
        'Access-Control-Allow-Origin': '*',
      }
    });
  }
}
