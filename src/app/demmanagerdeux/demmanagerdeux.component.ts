import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Type_conge} from "../Models/Type_conge";
import {Demande_conge} from "../Models/Demande_conge";
import {Chatroom} from "../Models/Chatroom";
import {Personnel} from "../Models/Personnel";
import {SharedserviceService} from "../sharedservie/sharedservice.service";

@Component({
  selector: 'app-demmanagerdeux',
  templateUrl: './demmanagerdeux.component.html',
  styleUrls: ['./demmanagerdeux.component.css']
})
export class DemmanagerdeuxComponent  implements  OnInit{
  listdemandconges!:Demande_conge[];
  taskResult!: Date ;
  decision!:boolean;
  idpersonnel!:number;
  map: Map<number, Chatroom> = new Map();
  map2: Map<number, string> = new Map();
  map3: Map<number, string> = new Map();
  ch: Chatroom = new Chatroom();
  isTableVisible1: boolean = false;
  username!:string;
  currentuser:Personnel = new Personnel();
  deadline!:Date;
  deadlines: { [key: number]: Date } = {};
  Demande_conge_en_retard!:Demande_conge[];
  p: number = 1;
  listdemandesanterieres!:String[];
  detailsWindowVisible: boolean[] = [];

 constructor(private userservice:UserserviceService,public sharedservice:SharedserviceService) {
 }

  ngOnInit(): void {
    const username = localStorage.getItem("currentUser");
    if (username) {
      this.userservice.getUserUsername(username).subscribe(data => {
        this.currentuser = data;
        console.log(data);
      });

      this.userservice.getdemvalideetmandeux(Type_conge.regulier).subscribe({
        next: (data: any) => {
          this.listdemandconges = data;
          console.log(this.listdemandconges);
          this.detailsWindowVisible = new Array(this.listdemandconges.length).fill(false);

          this.listdemandconges.forEach(demande => {
            this.userservice.getdeadline(demande.id_demandeconge).subscribe(deadline => {
              this.deadlines[demande.id_demandeconge] = deadline;
            });
          });
        }
      });
    }
  }

  isDeadlineProche(dateLimite: Date): boolean {
    const AUJOURDHUI = new Date();
    const limite = new Date(dateLimite);
    const troisJoursPlusTard = new Date(AUJOURDHUI.getTime() + (3 * 24 * 60 * 60 * 1000)); // Calcul de la date dans 3 jours

    // Vérifier si la date de la deadline est dans les 3 jours à venir
    if( limite.getTime() <= troisJoursPlusTard.getTime()&& limite.getTime() >= AUJOURDHUI.getTime()){
      return true ;
      this.sharedservice.nombreDemandesTroisProchainsJours++;

    }
    return false ;
  }

////mdeciderbymanagerdeux
  managedecisiondeux(comment:string,decision:boolean,iddemand:number){
    console.log(iddemand,typeof iddemand);
    this.userservice.deciderbymaaner( comment,decision, iddemand)
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

  }



  detailsdemandes(iduser:any){
    this.userservice.detailsdemandesantierieures(iduser).subscribe((data:any)=>{
      this.listdemandesanterieres=data;
      console.log("demandes anterieures",this.listdemandesanterieres);
    })

  }
  toggleDetails(iduser: any, index: number): void {
    this.detailsdemandes(iduser);
    this.detailsWindowVisible = this.detailsWindowVisible.map((_, i) => i === index ? !this.detailsWindowVisible[i] : false);
  }





}

