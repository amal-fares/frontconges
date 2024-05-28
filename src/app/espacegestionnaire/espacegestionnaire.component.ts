import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Type_Conge} from "../Models/Type_Conge";
import {Demande_conge} from "../Models/Demande_conge";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {Observable} from "rxjs";

import {CalendarComponent} from "../calendar/calendar.component";
import {TimingalertComponent} from "../timingalert/timingalert.component";
import {ChatserviceService} from "../chatservice.service";
import {Personnel} from "../Models/Personnel";

@Component({
  selector: 'app-espacegestionnaire',
  templateUrl: './espacegestionnaire.component.html',
  styleUrls: ['./espacegestionnaire.component.css']
})
export class EspacegestionnaireComponent implements AfterViewInit {


  listdemandconges!:Demande_conge[];

  deadlines: { [key: number]: Date } = {};
  p: number = 1;
  visible: boolean = false;
  Demande_conge!:Demande_conge;
  Demande!:Demande_conge;
  listnombrejours!:number[];
  verificationResults: { [key: number]: string } = {};
  currentuser!:Personnel;
  detailsWindowVisible: boolean[] = [];
  infosConges: { iduser: number, nombreJours: number[] }[] = [];
  isTableVisible1: boolean = false;
  idpersonnel!:number;
  constructor(private Userservice:UserserviceService,public sharedservice:SharedserviceService,public Chatservice:ChatserviceService){

  }
  ngAfterViewInit(): void {
    const username = localStorage.getItem("currentUser");

    if (username) {
      this.Userservice.getUserUsername(username).subscribe(data => {
        this.currentuser = data;
        console.log(data);

        localStorage.setItem('gestionnaireidd', this.currentuser.cin.toString());

      });

      this.Userservice.gettypecongesexep(Type_Conge.exceptionnel).subscribe({
        next: (data: any) => {
          this.listdemandconges = data;
          console.log(this.listdemandconges);
          this.detailsWindowVisible = new Array(this.listdemandconges.length).fill(false);

          this.listdemandconges.forEach(demande => {
            this.Userservice.verifierpresencejustif(demande.id_demandeconge).subscribe(data => {
              this.verificationResults[demande.id_demandeconge] = data;
            });

            this.Userservice.getdeadline(demande.id_demandeconge).subscribe(deadline => {
              this.deadlines[demande.id_demandeconge] = deadline;
            });
          });
        }
      });
    }
  }
  openCalendarDialog() {
    // Ouvrir la boîte de dialogue dans le composant enfant

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
  public validatedecision(){
    this.Userservice.validatedecision().subscribe(data=>{
      this.Demande_conge=data;
    })
  }
  public refuserdemande(){
    this.Userservice.refuserdemande().subscribe(data=>{
      this.Demande=data;
      this.sendnotif("Votre demande de conge exceptionnel  est refusée .Veuillez soit joindre un justificatif soit modifier le justificatif que vous avez fourni ")
    })
  }
  detailsByDemand: { [key: number]: any[] } = {};
public nbrfoisexcepp(iduser:number,index:number ){
    return this.Userservice.nombredefoisexc(iduser).subscribe((jours: any[])=>{
      this.detailsByDemand[index] = jours
console.log(this.detailsByDemand[index]);
    });
}
  sendnotif(message:string) {
    const iduser2 = localStorage.getItem('iduser');
    if(iduser2){
      this.idpersonnel = parseInt(iduser2);


      this.Chatservice.notifierrefus(message,iduser2);
      console.log(this.Chatservice.notifrefus);
    }}
  toggleDetails(iduser:number,index:number): void {
console.log(this.isTableVisible1);
    this.nbrfoisexcepp(iduser,index);
    this.detailsWindowVisible = this.detailsWindowVisible.map((_, i) => i === index ? !this.detailsWindowVisible[i] : false);
}}
