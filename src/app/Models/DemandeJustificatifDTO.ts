import {Type_conge} from "./Type_conge";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";

export class DemandeJustificatifDTO {
  demandeId: number;
  imageurl: string[];
  ids: number[];
  publicids: string[];
  typeconge!: Type_conge ;
  typecongeexceptionnel!:Type_conge_exceptionnel;
  constructor(demandeId: number, justificatif: string[], idjustifs: number[], publicidsjustif: string[]) {
    this.demandeId = demandeId;
    this.imageurl = justificatif;
    this.ids = idjustifs;
    this.publicids = publicidsjustif;
  }
}
