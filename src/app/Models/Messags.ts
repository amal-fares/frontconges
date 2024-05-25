import {Demande_conge} from "./Demande_conge";
import {Personnel} from "./Personnel";

export class Messags {
  id!: number;
  dateEnvoiMessage!: Date;
  contenu!: string;
  receiver!: Personnel;
  sender!: Personnel;
  demandeCongemes!: Demande_conge;

}

