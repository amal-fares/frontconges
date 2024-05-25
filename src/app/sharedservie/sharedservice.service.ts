import { Injectable } from '@angular/core';
import {Type_conge_exceptionnel} from "../Models/Type_conge_exceptionnel";
import {Type_Conge} from "../Models/Type_Conge";
import {BehaviorSubject, Observable} from "rxjs";
import {Demandcongerequest} from "../Models/Demandcongerequest";

@Injectable({
  providedIn: 'root'
})
export class SharedserviceService {
  selectedTypeConge: Type_conge_exceptionnel | undefined  ;
  selectedtypengreg: Type_Conge | undefined;
  private demandCongeSource = new BehaviorSubject<Demandcongerequest | null>(null);
  currentDemandConge = this.demandCongeSource.asObservable();
  nombreDemandesTroisProchainsJours: number = 0;
  private _isSidebarOpen = new BehaviorSubject<boolean>(false);
  isSidebarOpen$ = this._isSidebarOpen.asObservable();
  constructor() { }
  changeDemandConge(demandConge: Demandcongerequest) {
    this.demandCongeSource.next(demandConge);
  }
  toggleSidebar(isOpen: boolean): void {
    this._isSidebarOpen.next(isOpen);
  }
}
