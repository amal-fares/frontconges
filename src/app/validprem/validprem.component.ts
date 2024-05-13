import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Demande_conges} from "../Models/Demande_conges";

@Component({
  selector: 'app-validprem',
  templateUrl: './validprem.component.html',
  styleUrls: ['./validprem.component.css']
})
export class ValidpremComponent implements OnInit{
  listdemandconges!:Demande_conges[];
  constructor(public userservice:UserserviceService){}

  ngOnInit(): void {
    this.userservice.getvalideprem().subscribe({
      next: (data:any) => {
        this.listdemandconges = data;
        console.log(this.listdemandconges); // Déplacer ici
      }
    });
  }
  managedecisionn(comment2:string,decision2:boolean,iddemand2:number) {
    console.log(iddemand2, typeof iddemand2);
    this.userservice.managedecision2(comment2, decision2, iddemand2)
      .subscribe(
        (response) => {
          // Traiter la réponse ici si nécessaire
          console.log('Réponse de la requête :', response);
        },
        (error) => {
          // Traiter les erreurs ici si nécessaire
          console.error('Erreur lors de la requête :', error);
        }
      );

  }}
