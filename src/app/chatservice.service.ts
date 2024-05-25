import { Injectable } from '@angular/core';
import {UserserviceService} from "./userservice/userservice.service";
import {HttpClient} from "@angular/common/http";
import {Stomp} from "@stomp/stompjs";
import {ChatMessage} from "./Models/ChatMessage";
import {Personnel} from "./Models/Personnel";

@Injectable({
  providedIn: 'root'
})
export class ChatserviceService {


  public messages : any[] = [];
  notifs: { text: string }[] = [];
currentuser: Personnel = new Personnel();
  public stompClient : any;
  public hasNewNotification: boolean = false;
  idchat!:number
  constructor( public userservice: UserserviceService, http: HttpClient ) {
    this.initializeWebSocketConnection();
  }
  initializeWebSocketConnection() {
    /**
     * Create a SockJS server with created back-end endpoint called /chat-websocket and added it over Stomp.
     */

    const ws = new WebSocket('ws://localhost:9088/cng/websocket');
    this.stompClient = Stomp.over(ws);
    const that = this;
    /**
     * Connect stomp client and subscribe asynchronously to the chat message-handling Controller endpoint and push any message body into the messages array
     */
    this.stompClient.connect({}, (frame:any) => {

      if (frame) {
        console.log('qmal: ', frame);
      } else {
        console.log('Connection frame is undefined.');
      }
      const token = localStorage.getItem('currentUser');
      const iduser2 = localStorage.getItem('iduser');

      const chatroomid = localStorage.getItem('chatroomId');

      that.stompClient.subscribe("/topic/messages", (message: { body: string; }) => {
        if (message.body) {
          let obj = JSON.parse(message.body);
          that.addMessage(obj.text, obj.username, obj.avatar , obj.chatid, obj.sender );
        }
      });

      that.stompClient.subscribe("/topic/notification", (message:any) => {
        if (message.body) {

          that.addnotif( );
        }
      });


    }, (error: any) => {
      // Handle connection errors here
      console.log('Error during STOMP connection:', error);
    });
  }

  // Prepare and push the chat messages into the messages array
  addMessage(message: any, username: string, avatar: string , chatid: string , sender: string) {
    this.messages.push({
      text: message,
      date: new Date(),
      Personnel : {
        username: username
      },
      chatid: chatid,
      sender: sender


    });
  }
  addnotif() {
    const username = localStorage.getItem("currentUser");
    if (username) {
      this.userservice.getUserUsername(username).subscribe(data => {
        this.currentuser = data;
        this.notifs.push({
          text: `une Demande a été soumise par ${this.currentuser.username}`,
        });
        this.hasNewNotification = true;
      });
    }
  }

  // Send a chat message using stomp client
  sendMessage(msg: ChatMessage) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
    console.log ("hhhh");
  }
  sendMessagep(msg: ChatMessage) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }
  notifier (message:string,iduser:string ){
    const payload = {
      message: message,
      iduser: iduser
    };
    this.stompClient.send('/app/notification', {}, JSON.stringify((payload) ));
    console.log ("notif");
  }
}
