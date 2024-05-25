import {Component, OnInit} from '@angular/core';
import {Personnel} from "../Models/Personnel";
import {UserserviceService} from "../userservice/userservice.service";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent implements OnInit {
  user!: Personnel; // Définissez le type de l'utilisateur en fonction de vos besoins
  username!: string | null;
  soldedecconge!: number;
  iduser!: string | null;

  constructor(private userService: UserserviceService) {}

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
    this.iduser = localStorage.getItem("iduser");

    if (this.username) {
      this.userService.getUserUsername(this.username).subscribe(
        (userdata: any) => {
          console.log(userdata);
          this.user = userdata; // Affectez les données de l'utilisateur à votre variable d'utilisateur
          const idpersonnel = userdata.cin;
          console.log(idpersonnel);
        },
        (error: any) => {
          console.error("Une erreur s'est produite :", error);
        }
      );
    } else {
      console.error("Nom d'utilisateur non trouvé dans le localStorage.");
    }

    if (this.iduser !== null) {
      const idNumber: number = parseInt(this.iduser, 10);
      this.userService.miseajoursoldeconge(idNumber).subscribe((data: any) => {
        this.soldedecconge = data;
      });
    }
  }
}
