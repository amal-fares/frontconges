import {Type_Conge} from "./Type_Conge";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";

export interface Demandcongerequest{
  date_debut: Date;
  date_fin: Date;
   typeconge: Type_Conge;
   type_conge_exceptionnel?:Type_conge_exceptionnel;
}
