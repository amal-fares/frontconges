import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Personnel} from "../Models/Personnel";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSidenavModule} from '@angular/material/sidenav';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})
export class HomepageComponent implements OnInit {
  isdown: boolean = false;

  constructor( public  sidebarService: SharedserviceService) {

  }
  ngOnInit(): void {
  }
  toggleSidebar(): void {
    this.sidebarService.toggleSidebar(true);
  }


  protected readonly SharedserviceService = SharedserviceService;
}
