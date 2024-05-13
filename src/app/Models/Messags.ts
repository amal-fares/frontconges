import {Demande_conges} from "./Demande_conges";
import {Personnel} from "./Personnel";

export class Messags {
  id!: number;
  dateEnvoiMessage!: Date;
  contenu!: string;
  receiver!: Personnel;
  sender!: Personnel;
  demandeCongemes!: Demande_conges;

}

