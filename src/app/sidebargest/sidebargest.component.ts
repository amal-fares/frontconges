import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Personnel} from "../Models/Personnel";

@Component({
  selector: 'app-sidebargest',
  templateUrl: './sidebargest.component.html',
  styleUrls: ['./sidebargest.component.css']
})
export class SidebargestComponent implements OnInit {
  currentUser!:Personnel;

  constructor(private userservice:UserserviceService) {
  }

  ngOnInit(): void {
    const username = localStorage.getItem("currentUser");
    if (username) {
      this.userservice.getUserUsername(username).subscribe(data => {
        this.currentUser = data;
        console.log(data);

      });}

}}
