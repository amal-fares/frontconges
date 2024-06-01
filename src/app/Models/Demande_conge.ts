import {Type_conge} from "./Type_conge";

import {Messags} from "./Messags";
import {Image_justificatif} from "./Image_justificatif";
import {Personnel} from "./Personnel";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";
import {Chatroom} from "./Chatroom";
import {Statut_conge} from "./Statut_conge";

export class Demande_conge {

  id_demandeconge!: number;
  date_debut!: Date;
  date_fin!: Date;
  duree!: number;
deadline!:Date;
  dateDemandeConges!: Date;
  statutconge!: Statut_conge;
  typeconge!: Type_conge;
  imagesJustif!: Image_justificatif[];
  collaborateur!: Personnel;
  messDemList!: Messags[];
   justificatifs_requis!:boolean;
  chatroom!: Chatroom;
   typecongeexceptionnel!:Type_conge_exceptionnel;
  justificatifPresent!:boolean;
}
