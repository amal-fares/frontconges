import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {
newpassword!:string;
code!:string;
 constructor(private userservie:UserserviceService){}
  ngOnInit(): void {
  }
 resetpassword(){
     this.userservie.resetpassword(this.code,this.newpassword).subscribe(
       (response) => {
         console.log('sucess ',);

       },
       (error) => {
         console.error('Erreur lors de l\'envoi du code :', error);
       }
     );
 }
}
