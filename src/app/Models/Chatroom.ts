import {Messags} from "./Messags";
import {ChatMessage} from "./ChatMessage";
import {Demande_conge} from "./Demande_conge";
import {Image_justificatif} from "./Image_justificatif";

export class Chatroom {

 public  chatroomId!: number;
  public messages!: ChatMessage[];
 public  color: string = "bleu";
  demandeConge!: Demande_conge;
  imagelist!: Image_justificatif[];
}
