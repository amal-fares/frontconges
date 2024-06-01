import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Personnel} from "../Models/Personnel";
import {SharedserviceService} from "../sharedservie/sharedservice.service";

@Component({
  selector: 'app-detailsuser',
  templateUrl: './detailsuser.component.html',
  styleUrls: ['./detailsuser.component.css']
})
export class DetailsuserComponent implements OnInit {
  currentuser!:Personnel;
  constructor(public userservice:UserserviceService ,public sharedservice:SharedserviceService) {
  }

  ngOnInit(): void {
    const username = localStorage.getItem("currentUser");
    if (username) {
      this.userservice.getUserUsername(username).subscribe(data => {
        this.currentuser = data;
        console.log(data);
      });
    }

  }}
