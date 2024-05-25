import {Component, Input, OnInit} from '@angular/core';

import {UserserviceService} from "../userservice/userservice.service";
import {jwtDecode} from "jwt-decode";
import {ChatMessage} from "../Models/ChatMessage";
import {Personnel} from "../Models/Personnel";
import {Chatroom} from "../Models/Chatroom";
import {Subscription} from "rxjs";
import {Demande_conge} from "../Models/Demande_conge";
import {ERole} from "../Models/ERole";
import {Image_justificatif} from "../Models/Image_justificatif";
import {Role} from "../Models/Role";
import {DomSanitizer} from "@angular/platform-browser";
import {ChatserviceService} from "../chatservice.service";

@Component({
  selector: 'app-chatcompoenent',
  templateUrl: './chatcompoenent.component.html',
  styleUrls: ['./chatcompoenent.component.css']
})
export class ChatcompoenentComponent  implements OnInit {
  private routeSub!: Subscription;
  //mess: Message = new Message();
  chhh!: Chatroom[];
  ch: Chatroom = new Chatroom();
  chatLists!: Chatroom[];
  messages!:  string  ;
  username: string = '';
  theme: string = '';
  gestioaniredt!:any;
  avatar: string = '';
  currentuser: Personnel = new Personnel();
  idpersonnel!:number;
  users!: Personnel[];
  Image!:String;
chtroomid!:number;
list!:Demande_conge[];
  selectedDemandeId!:number;
selectedFile!:any ;
hattrrom!:Chatroom;
demande!:Demande_conge;
  fileToUpload!: File | undefined;
  iddemand!:number;
  constructor(public sanitizer: DomSanitizer, public userservice:UserserviceService, public Chatservice:ChatserviceService) {


 }

  ngOnInit(): void {
    const token = localStorage.getItem('currentUser');


    if (token ) {

      this.username = token;
      console.log(this.username);
    }
    this.userservice.getUserUsername(this.username).subscribe(data => {
      this.currentuser = data;
      console.log(data);
      console.log(this.currentuser.cin);

    });
    console.log(this.currentuser);
    const chatroomIdF = localStorage.getItem('chatroomId');
    if(chatroomIdF) {
      this.chtroomid = parseInt(chatroomIdF, 10);
      this.userservice.chatmessagelist;

    }
  }


  sendMessage(event: any, avatar: string ) {
    if(this.fileToUpload != undefined)
    {
      this.addImage();
      this.fileToUpload = undefined ;
      return;
    }
    const token = localStorage.getItem('currentUser');
    const iduser2 = localStorage.getItem('iduser');
    if (token && iduser2) {
      this.idpersonnel = parseInt(iduser2, 10);
      this.username = token;
    }

    const x = this.userservice.map.get(this.idpersonnel);
    console.log("x",x);
    let chatroomId: string;

    if (x && x.chatroomId !== undefined) {
      chatroomId = x.chatroomId.toString();
    } else {
      const chatroomIdFromStorage = localStorage.getItem('chatroomId');
      chatroomId = chatroomIdFromStorage ? chatroomIdFromStorage : '';
    }

    let obj: ChatMessage = {
      text: this.messages,
      avatar: avatar,
      username: this.username,
      idchat: chatroomId,
      sender: this.idpersonnel,
    };

    // Si l'utilisateur envoie une image

    // Si l'utilisateur envoie un message texte, envoyer simplement le message au service de chat
    this.Chatservice.sendMessage(obj);

  }


  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Stockez le fichier sélectionné pour l'envoyer avec le message
  }
  ref(id1: number, id2: number, xx: string,yy : string,iddemande:number) {
    this.routeSub = this.userservice.getchatroomm(id1, id2,iddemande).subscribe((res:any) => {
      console.log(res);
      this.ch = res;
      this.userservice.map.set(this.idpersonnel,res);
      this.userservice.map2.set(this.idpersonnel, xx);
      this.userservice.map3.set(this.idpersonnel, yy);


    });
  }
  hasRole(roleName: ERole): boolean {

    return this.currentuser && this.currentuser.roles && this.currentuser.roles.some(role => role.name === roleName);
  }
  protected ERole = ERole;
  protected readonly Role = Role;

  onFileSelcted(event: any){
    this.fileToUpload = event.target.files[0];
  }
  addImage() {

    const iddemand = localStorage.getItem('demandeid');
    const chatroomIdF = localStorage.getItem('chatroomId');

    if (iddemand&&chatroomIdF) {

      this.iddemand = parseInt(iddemand, 10);
      this.chtroomid = parseInt(chatroomIdF, 10);
console.log(this.chtroomid);
console.log(this.iddemand);
      console.log("ppommji");
      this.userservice.addImagedem(this.iddemand, <File>this.fileToUpload, this.chtroomid).subscribe(data => {
        console.log(data);
        this.sendMsg(data.imagenUrl);
        console.log(this.fileToUpload);
        console.log(this.Image);
        this.userservice.putetatdemande(this.iddemand);
      });

    }
  }

  sendMsg(img: String) {
    const iduser2 = localStorage.getItem('iduser');
    if(iduser2){
      this.idpersonnel = parseInt(iduser2);
    }
    const x = this.userservice.map.get(this.idpersonnel);
    console.log("x", x);
    let chatroomId: string;


    if (x && x.chatroomId !== undefined) {
      chatroomId = x.chatroomId.toString();
    } else {
      const chatroomIdFromStorage = localStorage.getItem('chatroomId');
      chatroomId = chatroomIdFromStorage ? chatroomIdFromStorage : '';
    }

      let objj: ChatMessage = {
        text: '$IMG$' + img,
        avatar: '',
        username: this.username,
        idchat: chatroomId,
        sender: this.idpersonnel,
      };

      // Si l'utilisateur envoie une image

      // Si l'utilisateur envoie un message texte, envoyer simplement le message au service de chat
      this.Chatservice.sendMessage(objj);
    }

}





