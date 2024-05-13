import {Messags} from "./Messags";
import {ChatMessage} from "./ChatMessage";
import {Demande_conges} from "./Demande_conges";

export class Chatroom {

 public  chatroomId!: number;
  public messages!: ChatMessage[];
 public  color: string = "bleu";
  demandeConge!: Demande_conges;
}
