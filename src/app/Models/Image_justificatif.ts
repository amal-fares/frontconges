import {Demande_conge} from "./Demande_conge";
import {Chatroom} from "./Chatroom";

export class Image_justificatif {
  id!: number;
  name!: string;
  imagenUrl!: string;
  imagenId!: string;
  dateEnvoi!: Date;
  natureFichier!: Blob;
  demandeConge!: Demande_conge;
  chatroom!: Chatroom;
}
