import { Component } from '@angular/core';
import {JsonService} from './list/json.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Starships';
  constructor() { }
}
