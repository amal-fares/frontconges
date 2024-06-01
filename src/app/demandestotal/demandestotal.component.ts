import {Component, OnInit} from '@angular/core';
import {Demande_conge} from "../Models/Demande_conge";
import {UserserviceService} from "../userservice/userservice.service";
import {Router} from "@angular/router";
import {Chatroom} from "../Models/Chatroom";
import {ChatcompoenentComponent} from "../chatcompoenent/chatcompoenent.component";
import {MatDialog} from "@angular/material/dialog";
import {Personnel} from "../Models/Personnel";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {Type_conge} from "../Models/Type_conge";

@Component({
  selector: 'app-demandestotal',
  templateUrl: './demandestotal.component.html',
  styleUrls: ['./demandestotal.component.css']
})
export class DemandestotalComponent  implements OnInit {
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
  constructor(private Userservice:UserserviceService, private chatcompoenent : ChatcompoenentComponent,private router:Router,private dialog:MatDialog,public sharedservice:SharedserviceService ) {
  }
  ngOnInit(): void {
    const username = localStorage.getItem("currentUser");
    if (username) {
      this.Userservice.getUserUsername(username).subscribe(data => {
        this.currentuser = data;
        console.log(data);

        localStorage.setItem('gestionnaireidd', this.currentuser.cin.toString());
    console.log("gestionnaire", this.currentuser.gestionnaire.cin);
      });

      this.Userservice.listedemprem(Type_conge.regulier).subscribe({
      next: (data: any) => {
        this.listdemandconges = data;
        console.log(this.listdemandconges);
        this.detailsWindowVisible = new Array(this.listdemandconges.length).fill(false);

        this.listdemandconges.forEach(demande => {
          this.Userservice.getdeadline(demande.id_demandeconge).subscribe(deadline => {
            this.deadlines[demande.id_demandeconge] = deadline;
          });
        });
      }
    });

  }}
  taskcompletion(){
    this.Userservice.taskcompletion().subscribe(
      result => {
        this.taskResult = result;
      },
      error => {
        console.error('Erreur lors de la récupération du résultat de la tâche', error);

      }
    );
  }

  onDemandeClick(demandecollid: number, iddemande: number) {
    const idUser = localStorage.getItem('iduser');
    const token = localStorage.getItem('currentUser');
    if (token && idUser) {
      this.idpersonnel = parseInt(idUser, 10);
      console.log(demandecollid);
      console.log(typeof demandecollid);
      this.username = token;
      this.Userservice.getUserUsername(this.username).subscribe(data => {
        this.currentuser = data;
        console.log(data);
        console.log(this.currentuser.cin);


        this.chatcompoenent.ref(this.currentuser.cin, demandecollid, data.username, 'null', iddemande);
        console.log("here");
        console.log(this.currentuser);
        console.log(typeof this.idpersonnel);

        // Créer un nouveau chatroom avec le current user comme sender et le collaborateur comme receiver
        this.Userservice.getchatroomm(this.idpersonnel, demandecollid, iddemande).subscribe((chatroom: any) => {
          this.ch = chatroom;

          console.log("Chatroom ID:", this.ch.chatroomId);

          // Enregistrer l'ID du chatroom dans le stockage local
          localStorage.setItem('chatroomId', this.ch.chatroomId.toString());

          // Récupérer les messages du chatroom
          this.Userservice.getmessagebuchatroom(this.ch.chatroomId).subscribe((tt: any) => {
            this.Userservice.chatmessagelist = tt;
            console.log("Messages:", tt); // Vérifiez si les messages sont récupérés avec succès
          });

          // Ajouter le chatroom à la carte des utilisateurs
          this.Userservice.map.set(this.idpersonnel, this.ch);
          console.log("gestionnaire", this.Userservice.map.get(this.idpersonnel)?.messages);

          // Mettre à jour les autres propriétés du chatroom
          this.Userservice.map2.set(this.idpersonnel, 'Start Chat');
          this.Userservice.map3.set(this.idpersonnel, 'profile_user.jpg');

          // Rediriger vers le composant chat avec l'ID du nouveau chatroom en tant que paramètre d'URL
          const dialogRef = this.dialog.open(ChatcompoenentComponent, {
            width: '500px',
            height: '500px' // Définissez la largeur souhaitée du MatDialog
            // Autres configurations du MatDialog
          });
        });
      });
    }
  }


  managedecisionn(comment:string,decision:boolean,iddemand:number){
    console.log(iddemand,typeof iddemand);
    this.Userservice.managedecision( comment,decision, iddemand)
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
detailsdemandes(iduser:any){
    this.Userservice.detailsdemandesantierieures(iduser).subscribe((data:any)=>{
      this.listdemandesanterieres=data;
      console.log("demandes anterieures",this.listdemandesanterieres);
  })

}
  toggleDetails(iduser: any, index: number): void {
    this.detailsdemandes(iduser);
    this.detailsWindowVisible = this.detailsWindowVisible.map((_, i) => i === index ? !this.detailsWindowVisible[i] : false);
  }
  protected readonly Type_Conge = Type_conge;
}

