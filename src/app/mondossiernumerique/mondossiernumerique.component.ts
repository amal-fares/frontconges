import {Component, OnInit} from '@angular/core';
import {DemandeJustificatifDTO} from "../Models/DemandeJustificatifDTO";
import {UserserviceService} from "../userservice/userservice.service";

@Component({
  selector: 'app-mondossiernumerique',
  templateUrl: './mondossiernumerique.component.html',
  styleUrls: ['./mondossiernumerique.component.css']
})
export class MondossiernumeriqueComponent implements OnInit{

demandecongedto!:any[];
idpersonnel!:number;
constructor(public userservie:UserserviceService) {
}
  ngOnInit(): void {
    const iduser = localStorage.getItem("iduser");
    if(iduser) {
      this.idpersonnel=parseInt(iduser)
      this.userservie.mondossiernum(this.idpersonnel).subscribe(dto=> {
        this.demandecongedto = dto;
        console.log(this.demandecongedto);
      })
    }
  }

}
