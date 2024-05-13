import {Demande_conges} from "./Demande_conges";

export class Image_justificatifs{
  id!: number;
  name!: string;
  imageUrl!: string;
  imagenId!: string;
  dateEnvoi!: Date;
  natureFichier!: Blob;
  demandeConge!: Demande_conges;
}
