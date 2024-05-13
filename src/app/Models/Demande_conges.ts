import {TypeConge} from "./TypeConge";
import {StatutConges} from "./StatutConge";
import {Messags} from "./Messags";
import {Image_justificatifs} from "./Image_justificatifs";
import {Personnel} from "./Personnel";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";
import {Chatroom} from "./Chatroom";

export class Demande_conges{

  id_demandeconge!: number;
  date_debut!: Date;
  date_fin!: Date;
  duree!: number;

  dateDemandeConges!: Date;
  statutConge!: StatutConges;
  typeConge!: TypeConge;
  imagesJustif!: Image_justificatifs[];
  collaborateur!: Personnel;
  messDemList!: Messags[];
   justificatifs_requis!:boolean;
  chatroom!: Chatroom;
   type_conge_exceptionnel!:Type_conge_exceptionnel;
}
