import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Type_conge_exceptionnel} from "../Models/Type_conge_exceptionnel";
import {TypeConge} from "../Models/TypeConge";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {Personnel} from "../Models/Personnel";
import {UserserviceService} from "../userservice/userservice.service";



@Component({
  selector: 'app-typemotif',
  templateUrl: './typemotif.component.html',
  styleUrls: ['./typemotif.component.css']
})
export class TypemotifComponent  implements OnInit{
  type_conge_exceptionnel!:Type_conge_exceptionnel;
  type_conge!:TypeConge;
  isDropdownOpen: boolean = false;
  isSubDropdownOpen: boolean = false;
  isdown: boolean = false;
  ismenu: boolean = false;

  user!:Personnel; // Définissez le type de l'utilisateur en fonction de vos besoins
  username!: string | null;
  constructor(private sharedService: SharedserviceService, private  userservie:UserserviceService) { }

  ngOnInit(): void {
    this.username = localStorage.getItem("currentUser");
    if (this.username) {
      this.userservie.getUserUsername(this.username).subscribe(
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
  sauvegarderTypeConge(typeConge1: TypeConge): TypeConge {

    console.log('Type de congé sélectionné :', typeConge1);
    return this.sharedService.selectedtypengreg = typeConge1;

  }

  protected readonly Type_conge_exceptionnel = Type_conge_exceptionnel;
  protected readonly TypeConge = TypeConge;






}
