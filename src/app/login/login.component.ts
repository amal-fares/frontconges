import { Component } from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Router} from "@angular/router";
import {jwtDecode} from "jwt-decode";
import {ERole} from "../Models/ERole";
import {compareSegments} from "@angular/compiler-cli/src/ngtsc/sourcemaps/src/segment_marker";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error:string = "";
  errorforget:string = "";
  fogotRequest : any={
    "email":''
  }
  authRequest:any={
    "username":'',
    "password":''
  };

  constructor(private _service:UserserviceService, private router:Router ) { }

  ngOnInit(): void {
    localStorage.clear();
  }
  login() {
    return this._service.authenticateUser(this.authRequest).subscribe(
      (data ) => {
        console.log(data);
        const token2 = data.jwt;
        // Store the token in local storage
        localStorage.setItem('token', data);
        console.log(data);

        if (data ) {
          const token = localStorage.getItem('token');
console.log(data);
          if (token) {
            // Decode the token
            const decodedToken: any= jwtDecode(token);
            localStorage.setItem('currentUser',decodedToken.sub);
            const currentuser = localStorage.getItem('currentUser');
            console.log(decodedToken);
            if(currentuser) {
            this._service.getUserUsername(currentuser).subscribe(userdata => {
              console.log(userdata);
              const   idpersonnel = userdata.cin;
              localStorage.setItem('iduser',idpersonnel.toString());

              console.log(idpersonnel);
              switch (userdata.roles[0].name) {

                case ERole.Collaborateur: {

                  this.router.navigateByUrl(`/home/typemotif/calendar`).then(() => {
                    window.location.reload();
                  });
                  break;
                }
                case ERole.Manager: {
                  this.router.navigateByUrl("/home").then(() => {
                    window.location.reload();
                  });
                  break;
                }
                case ERole.Manager2: {
                  this.router.navigateByUrl("/home").then(() => {
                    window.location.reload();
                  });
                  break;
                }case ERole.Gestionnaire: {
                  this.router.navigateByUrl("/home/espacegestionnaire").then(() => {
                    window.location.reload();
                  });
                  break;
                }
              }
            });
          }
        }
      }},
      err => {
        if (err?.status === 401) {
          this.error = 'Nom d utilisateur ou mot de passe incorrect !';
        } else {
          console.error(err); // Afficher l'erreur dans la console pour le débogage
          this.error = 'Une erreur sest produite lors de la tentative de connexion.';
        }
      }
    );
  }
}
