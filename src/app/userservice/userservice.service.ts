import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personnel} from "../Models/Personnel";
import {Demandcongerequest} from "../Models/Demandcongerequest";
import {Demande_conges} from "../Models/Demande_conges";
import {ERole} from "../Models/ERole";
import {Chatroom} from "../Models/Chatroom";
import {ChatMessage} from "../Models/ChatMessage";

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  token!: string | null;
  map: Map<number, Chatroom> = new Map();
  map2: Map<number, string> = new Map();
  map3: Map<number, string> = new Map();
  chatmessagelist!:ChatMessage[];
  constructor(private http: HttpClient) {     this.token = localStorage.getItem('token');}
  public authenticateUser(request:any)
  {return this.http.post<any>(`http://localhost:9088/cng/auth/signin`, request, {  responseType: 'text' as 'json' })
  }
  getUserUsername(user:string) {
    return this.http.get<any>(`http://localhost:9088/cng/auth/username/${user}`,{responseType:'json'});

  }
  public register (request:any)   :Observable<any>{

      return this.http.post<any>(`http://localhost:9088/cng/auth/register`, request, {responseType: 'text' as 'json'})
    }
 public sendcode(email:any) :Observable<any>{
   return this.http.post<any>(`http://localhost:9088/cng/auth/sendcode/${email}`,{responseType: 'text' as 'json'})
 }
 public resetpassword(code:any,newpassword:any):Observable<any>{
   return this.http.post<any>(`http://localhost:9088/cng/auth/resetpassword/${code}/${newpassword}`,{responseType: 'text' as 'json'})

 }

public getdemandecongesbyuser(iduser:number):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}` // Ajouter le token ici
    })
  };
    return this.http.get<any>(`http://localhost:9088/cng/demandeconge/getdemandescongesuser/${iduser}`,httpOptions)
}
 public remplirformulaireactivit(request:Demandcongerequest,iduserconnete:number ):Observable<Demande_conges>{
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     })
   };
    return this.http.post<any>(`http://localhost:9088/cng/demandeconge/remplirchamp/${iduserconnete}`,request,httpOptions)
 }
  public getmessagebuchatroom(idchatroom:number ):Observable<ChatMessage>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(`http://localhost:9088/cng/demandeconge/getmessagebyhatroom/${idchatroom}`,httpOptions)
  }
  public getalldem():Observable<Demande_conges[]>{

    return this.http.get<any>(`http://localhost:9088/cng/demandeconge/getalldem`)
  }
  public taskcompletion (): Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`http://localhost:9088/cng/demandeconge/gettaskcompletion`,httpOptions)
  }
  public managedecision(commentaire:string,decision:boolean,iddemand:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(`http://localhost:9088/cng/demandeconge/remplirchampvalidator/${commentaire}/${decision}/${iddemand}`,httpOptions)
  }
  public managedecision2(commentaire2:string,decision2:boolean,iddemand2:any):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post(`http://localhost:9088/cng/demandeconge/remplirchampvalidator2/${commentaire2}/${decision2}/${iddemand2}`,httpOptions)
  }
  public getgest(erole:ERole){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(` http://localhost:9088/cng/demandeconge/getgestionnaire/${erole}`,httpOptions)
  }
  public getcollab(erolecollab:ERole){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(` http://localhost:9088/cng/demandeconge/getemployes/${erolecollab}`,httpOptions)
  }
public getchatroomm(idsender:number,idreceiver:number,iddemande:number){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
  return this.http.get(`http://localhost:9088/cng/demandeconge/getemployes/${idsender}/${idreceiver}/${iddemande}`,httpOptions)
}
  public getgst(username:string){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`http://localhost:9088/cng/demandeconge/getgestionnaireuser/${username}`,httpOptions)
  }
public getvalideprem(){
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };
  return this.http.get(`http://localhost:9088/cng/demandeconge/getdemandevalidesprem`,httpOptions)
}
  public getchtaroombyid(chatroomid:number){
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`http://localhost:9088/cng/demandeconge/getchtaroombyidch/${chatroomid}`,httpOptions)
  }
  public getdemabyid(iddem:number)  :Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`http://localhost:9088/cng/demandeconge/getdembyid/${iddem}`,httpOptions)
  }
  addAndAssignImage(image: File, iddemande: number,idchatroom:number) {
    const formData = new FormData();
    formData.append('image', image);

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.post<any>(` http://localhost:9088/cng/demandeconge/addandassignimage/${iddemande}/${idchatroom}`, formData, httpOptions);
  }
}
