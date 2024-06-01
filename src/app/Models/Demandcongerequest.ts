import {Type_conge} from "./Type_conge";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";

export interface Demandcongerequest{
  date_debut: Date;
  date_fin: Date;
   typeconge: Type_conge;
   type_conge_exceptionnel?:Type_conge_exceptionnel;
}
