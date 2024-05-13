import { Injectable } from '@angular/core';
import {UserserviceService} from "./userservice/userservice.service";
import {HttpClient} from "@angular/common/http";
import {ChatMessage} from "./Models/ChatMessage";
import * as SockJS from "sockjs-client";
import { Stomp } from '@stomp/stompjs';
import {Chatroom} from "./Models/Chatroom";
@Injectable({
  providedIn: 'root'
})

export class ForumserviceService {

  public messages : any[] = [];

  public stompClient : any;

  constructor(authenticationService: UserserviceService, http: HttpClient ) {

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

  // Send a chat message using stomp client
  sendMessage(msg: ChatMessage) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
    console.log ("hhhh");
  }
  sendMessagep(msg: ChatMessage) {
    this.stompClient.send('/app/sendmsg', {}, JSON.stringify(msg));
  }

}
