import {Role} from "./Role";
import {StatausEmploi} from "./StatausEmploi";
import {Messags} from "./Messags";
import {Demande_conge} from "./Demande_conge";

export class Personnel  {

  cin!: number;
  nom!: string;
  prenom!: string;
  username!: string;
  date_naissance!: Date;
  adresse!: string;
  password!: string;
  email!: string;
  tel!: string;
  date_entree!: Date;
  status!: StatausEmploi;
  solde_conges!: number;
  joursRestants!: number;
  code!: string;
  statusatifounon!: boolean;
  jwt!: string;

  roles!: Role[];
  manager!: Personnel;
  managerdeuxiemeniveau!: Personnel;
  gestionnaire!: Personnel;
  demande_congeList !: Demande_conge[];
  listmes!: Messags[];
  listemessagesender!: Messags[];
}


