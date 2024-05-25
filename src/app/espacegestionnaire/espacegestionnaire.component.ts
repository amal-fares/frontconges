import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Type_Conge} from "../Models/Type_Conge";
import {Demande_conge} from "../Models/Demande_conge";
import {SharedserviceService} from "../sharedservie/sharedservice.service";

@Component({
  selector: 'app-espacegestionnaire',
  templateUrl: './espacegestionnaire.component.html',
  styleUrls: ['./espacegestionnaire.component.css']
})
export class EspacegestionnaireComponent implements OnInit {
  listdemandconges!:Demande_conge[];
  detailsWindowVisible: boolean[] = [];
  deadlines: { [key: number]: Date } = {};
  p: number = 1;
  Demande_conge!:Demande_conge;
  constructor(private Userservice:UserserviceService,public sharedservice:SharedserviceService){

  }
  ngOnInit(): void {
    this.Userservice.gettypecongesexep(Type_Conge.exceptionnel).subscribe({
      next: (data: any) => {
        this.listdemandconges = data;
        console.log(this.listdemandconges); // Déplacer ici
        this.detailsWindowVisible = new Array(this.listdemandconges.length).fill(false);

        this.listdemandconges.forEach(demande => {
          this.Userservice.getdeadline(demande.id_demandeconge).subscribe(deadline => {
            this.deadlines[demande.id_demandeconge] = deadline;
          });
        });
      }
    });
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
}
