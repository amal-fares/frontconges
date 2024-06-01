import {Component, OnInit} from '@angular/core';
import {DemandeJustificatifDTO} from "../Models/DemandeJustificatifDTO";
import {UserserviceService} from "../userservice/userservice.service";
import {Type_conge} from "../Models/Type_conge";
import {Image_justificatif} from "../Models/Image_justificatif";
import {ERole} from "../Models/ERole";
import {SharedserviceService} from "../sharedservie/sharedservice.service";

@Component({
  selector: 'app-mondossiernumerique',
  templateUrl: './mondossiernumerique.component.html',
  styleUrls: ['./mondossiernumerique.component.css']
})
export class MondossiernumeriqueComponent implements OnInit{

demandecongedto!:DemandeJustificatifDTO[];
idpersonnel!:number;
  fileToUpload!: File | undefined;
  imageju!:Image_justificatif;
constructor(public userservie:UserserviceService ,public sharedervice:SharedserviceService) {
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
  onFileSelcted(event: any){
    this.fileToUpload = event.target.files[0];
  }
   public modifeirimage(idjustif:number) {
     if (this.fileToUpload) {
    this.userservie.updateattachement(idjustif, this.fileToUpload).subscribe(imagejus=> {
      this.imageju = imagejus;
    } )
  }
}

  protected readonly Type_conge = Type_conge;
}
