import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Chatroom} from "../Models/Chatroom";
import {Image_justificatif} from "../Models/Image_justificatif";
import {Demande_conge} from "../Models/Demande_conge";
import {MatDialogRef} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-joindrejustif',
  templateUrl: './joindrejustif.component.html',
  styleUrls: ['./joindrejustif.component.css']
})
export class JoindrejustifComponent  implements OnInit{
  fileToUpload!: File ;
  imagenMin!: File;
  idcchatroom!:number;
  Chatroom!:Chatroom;
  Image!:Image_justificatif;
  iddemand!:number;
  demande!:Demande_conge;
  Demandeconge!:Demande_conge;
  constructor (public UserService:UserserviceService,public  dialogRef: MatDialogRef<JoindrejustifComponent>,
               public  router: Router){

  }

  ngOnInit(): void {
  }
  onFileSelcted(event: any){
    this.fileToUpload = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin= evento.target.result;
    };
  }
  addImage() {

    const iddemand = localStorage.getItem('demandeid');
    if (iddemand) {

      this.iddemand = parseInt(iddemand, 10);


console.log("ppommji");
        this.UserService.addImagedemwithoutcatroom(this.iddemand, this.fileToUpload).subscribe(data => {
         this.Image=data;
         console.log(this.fileToUpload);
         console.log(this.Image);

        });
      this.UserService.putetatdemande(this.iddemand).subscribe((data:any)=>{
        this.Demandeconge=data;
        this.UserService.modifieretatdemande(this.iddemand).subscribe((dataa:any)=>{
          this.Demandeconge=dataa;
        })
      });

    }
  }
  joindreJustificatifUlterieurement() {
    // Fermer le dialogue
    this.dialogRef.close();

    // Naviguer vers la page précédente
    this.router.navigate(['/home/typemotif/calendar']);
  }


}
