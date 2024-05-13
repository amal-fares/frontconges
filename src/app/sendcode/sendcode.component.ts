import {Component, OnInit} from '@angular/core';
import {Personnel} from "../Models/Personnel";
import {UserserviceService} from "../userservice/userservice.service";

@Component({
  selector: 'app-sendcode',
  templateUrl: './sendcode.component.html',
  styleUrls: ['./sendcode.component.css']
})
export class SendcodeComponent implements OnInit{
user!:Personnel;
email!:string;
username!: string | null;
constructor(private userservice:UserserviceService) {
}
ngOnInit(): void {
}
sendcode(){
  this.userservice.sendcode(this.email).subscribe(
    (response) => {
      console.log('Code envoyé avec succès à ', this.user.email);

    },
    (error) => {
      console.error('Erreur lors de l\'envoi du code :', error);
    }
  );
}
}
