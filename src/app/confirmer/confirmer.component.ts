import {Component, Inject, OnInit} from '@angular/core';
import {Demandcongerequest} from "../Models/Demandcongerequest";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {UserserviceService} from "../userservice/userservice.service";

@Component({
  selector: 'app-confirmer',
  templateUrl: './confirmer.component.html',
  styleUrls: ['./confirmer.component.css']
})
export class ConfirmerComponent  implements OnInit{

  request!: Demandcongerequest ;

  token!: string | null;
  constructor(@Inject(MAT_DIALOG_DATA) public data:Demandcongerequest , private userservice:UserserviceService){

  }
  ngOnInit(): void {

    this.request = this.data;  }
  confirmer() {
    this.token = localStorage.getItem("iduser");
    if (this.token !== null) {
      const idNumber: number = parseInt(this.token, 10);
      this.userservice.remplirformulaireactivit(this.request,idNumber).subscribe({
        next: (response) => {
          console.log('Demande de congé soumise avec succès', response);

        },
        error: (err) => {
          console.error('Erreur lors de la soumission du formulaire :', err);
          // Vous pouvez ajouter ici des actions de gestion d'erreurs si nécessaire
        }
      });
    } else {
      console.error('Aucun token trouvé, l’utilisateur doit se reconnecter.');
      // Gérer le cas où aucun token n'est trouvé (ex : redirection vers la page de connexion)
    }
  }




}
