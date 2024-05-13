import {Component, OnInit} from '@angular/core';
import {Personnel} from "../Models/Personnel";
import {UserserviceService} from "../userservice/userservice.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent  implements OnInit{
  authRequest:any={
    "nom":'',
    "prenom":'',
   "adresse":'',
    "email":'',
    "username":'',
    "password":'',
    "role":[]

  };
  constructor (private userservice:UserserviceService, private router:Router) { }

  ngOnInit(): void {
  }
register () {
  this.userservice.register(this.authRequest)
    .subscribe(
      (data) => {
        console.log("Enregistrement réussi :", data);
        this.router.navigateByUrl(`/home/chat`).then(() => {
          window.location.reload();
        }); // Fermeture de la fonction fléchée pour then()
      }, // Fermeture de la fonction fléchée pour le succès
      (error) => {
        console.error("Erreur lors de l'enregistrement :", error);
      } // Fermeture de la fonction fléchée pour l'erreur
    ); // Fermeture de la méthode subscribe()
}
}
