import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Type_conge_exceptionnel} from "../Models/Type_conge_exceptionnel";
import {Type_conge} from "../Models/Type_conge";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {Personnel} from "../Models/Personnel";
import {UserserviceService} from "../userservice/userservice.service";
import {MatDialog} from "@angular/material/dialog";
import {JoindrejustifComponent} from "../joindrejustif/joindrejustif.component";
import {MondossiernumeriqueComponent} from "../mondossiernumerique/mondossiernumerique.component";



@Component({
  selector: 'app-typemotif',
  templateUrl: './typemotif.component.html',
  styleUrls: ['./typemotif.component.css']
})
export class TypemotifComponent  implements OnInit{
  type_conge_exceptionnel!:Type_conge_exceptionnel;
  type_conge!:Type_conge;
  isDropdownOpen: boolean = false;
  isSubDropdownOpen: boolean = false;
  isdown: boolean = false;
  ismenu: boolean = false;
nombredejours!:number;
  user!:Personnel; // Définissez le type de l'utilisateur en fonction de vos besoins
  username!: string | null;
  constructor(public  sharedService: SharedserviceService, private  userservie:UserserviceService,private dialog: MatDialog ) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
    if (this.username) {
      this.userservie.getUserUsername(this.username).subscribe(
        (userdata: any) => {
          console.log(userdata);
          this.user = userdata; // Affectez les données de l'utilisateur à votre variable d'utilisateur
          const idpersonnel = userdata.cin;
          console.log(idpersonnel);
          this.userservie.miseajoursoldeconge(this.user.cin).subscribe(solde=>{
            this.nombredejours=solde;
          })
        },
        (error: any) => {
          console.error("Une erreur s'est produite :", error);
        }
      );
    } else {
      console.error("Nom d'utilisateur non trouvé dans le localStorage.");
    }

  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }
  toggleDrpdown() {
    this.ismenu = !this.ismenu;
  }
  toggledown() {
    this.isdown = !this.isdown;
  }
  toggleDropdown1() {
    this.isSubDropdownOpen = !this.isSubDropdownOpen;
  }
  sauvegarderTypeCongeexc(typeCongeex: Type_conge_exceptionnel): Type_conge_exceptionnel {

    console.log('Type de congé sélectionné :', typeCongeex);
   return this.sharedService.selectedTypeConge = typeCongeex;

  }
  sauvegarderTypeConge(typeConge1: Type_conge): Type_conge {

    console.log('Type de congé sélectionné :', typeConge1);
    return this.sharedService.selectedtypengreg = typeConge1;

  }

  protected readonly Type_conge_exceptionnel = Type_conge_exceptionnel;
  protected readonly TypeConge = Type_conge;



  openmatdialog(){
  const dialogRef = this.dialog.open(MondossiernumeriqueComponent, {
    width: '650px',
    height: '600px'

  });
}


}
