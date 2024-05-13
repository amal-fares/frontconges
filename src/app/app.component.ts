import { Component } from '@angular/core';
import {Personnel} from "./Models/Personnel";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'congesfrt';
  currentUser!:Personnel;
}
