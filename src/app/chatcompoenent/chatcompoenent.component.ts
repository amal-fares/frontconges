import {Component, Input, OnInit} from '@angular/core';
import {ForumserviceService} from "../forumservice.service";
import {UserserviceService} from "../userservice/userservice.service";
import {jwtDecode} from "jwt-decode";
import {ChatMessage} from "../Models/ChatMessage";
import {Personnel} from "../Models/Personnel";
import {Chatroom} from "../Models/Chatroom";
import {Subscription} from "rxjs";
import {Demande_conges} from "../Models/Demande_conges";
import {ERole} from "../Models/ERole";
import {Image_justificatifs} from "../Models/Image_justificatifs";
import {Role} from "../Models/Role";

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
  messages!: string;
  username: string = '';
  theme: string = '';
  gestioaniredt!:any;
  avatar: string = '';
  currentuser: Personnel = new Personnel();
  idpersonnel!:number;
  users!: Personnel[];

list!:Demande_conges[];
  selectedDemandeId!:number;

  constructor(public userservice:UserserviceService, public Chatservice:ForumserviceService) {


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
    console.log( 'currentuser' ,this.currentuser);


this.userservice.chatmessagelist;

      this.Chatservice.initializeWebSocketConnection();

  }


  sendMessage(event: any, avatar: string ) {
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
      sender: this.idpersonnel
    };

    // Si l'utilisateur envoie une image

      // Si l'utilisateur envoie un message texte, envoyer simplement le message au service de chat
      this.Chatservice.sendMessage(obj);

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
}





