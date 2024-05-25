import {Component, OnInit} from '@angular/core';
import {ChatMessage} from "../Models/ChatMessage";
import {UserserviceService} from "../userservice/userservice.service";
import {ChatserviceService} from "../chatservice.service";

@Component({
  selector: 'app-notif',
  templateUrl: './notif.component.html',
  styleUrls: ['./notif.component.css']
})
export class NotifComponent  implements OnInit{
  idpersonnel:number|undefined;
  constructor( public userservice : UserserviceService,public Chatservice:ChatserviceService) {
  }
  ngOnInit(): void {
  }
 }
