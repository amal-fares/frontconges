import {TypeConge} from "./TypeConge";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";

export interface Demandcongerequest{
  date_debut: Date;
  date_fin: Date;
   typeconge: TypeConge;
   type_conge_exceptionnel?:Type_conge_exceptionnel;
}
