import {Type_conge} from "./Type_conge";
import {Type_conge_exceptionnel} from "./Type_conge_exceptionnel";
import {DayOfWeek} from "./DayOfWeek";

export class DataValidation {

  day: DayOfWeek;
  validations: number;

  constructor(day: DayOfWeek, validations: number) {
    this.day = day;
    this.validations = validations;

}}
