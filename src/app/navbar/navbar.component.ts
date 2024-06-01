import {Component, OnInit} from '@angular/core';
import {ChatserviceService} from "../chatservice.service";
import {UserserviceService} from "../userservice/userservice.service";
import {Personnel} from "../Models/Personnel";
import {SharedserviceService} from "../sharedservie/sharedservice.service";



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent  implements OnInit{
  isTableVisible: boolean = false;
  isTableVisible1: boolean = false;
  currentuser!:number ;
  gestionnaireid!:number;
  nom!:string|undefined;
  user!:Personnel;
  constructor(public ChatService :ChatserviceService,public Userservice:UserserviceService,public sharedservice:SharedserviceService){}




  ngOnInit(): void {
    const currentuser1 = localStorage.getItem('iduser');
    const nomutilisateur = localStorage.getItem('currentUser');
    const gestionnaire = localStorage.getItem('gestionnaireidd');

    if (currentuser1 && gestionnaire && nomutilisateur) {
      this.currentuser = parseInt(currentuser1);
      this.gestionnaireid = parseInt(gestionnaire);
      this.nom = nomutilisateur;
      this.Userservice.getUserUsername(this.nom).subscribe(data => {
        this.user = data;
        console.log(data);
      });
      console.log(this.gestionnaireid);
    }
  }
  toggleTable1() {
    this.isTableVisible = !this.isTableVisible;
  }
  toggleTable2() {
    this.isTableVisible1 = !this.isTableVisible1;
    this.ChatService.hasNewNotification = false;
  }


}
