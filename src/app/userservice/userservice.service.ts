import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {Personnel} from "../Models/Personnel";
import {Demandcongerequest} from "../Models/Demandcongerequest";
import {Demande_conge} from "../Models/Demande_conge";
import {ERole} from "../Models/ERole";
import {Chatroom} from "../Models/Chatroom";
import {ChatMessage} from "../Models/ChatMessage";
import {Image_justificatif} from "../Models/Image_justificatif";
import {Type_Conge} from "../Models/Type_Conge";
import {Type_conge_exceptionnel} from "../Models/Type_conge_exceptionnel";

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
 public remplirformulaireactivit(request:Demandcongerequest,iduserconnete:number ):Observable<Demande_conge>{
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
  public getalldem():Observable<Demande_conge[]>{

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
  public getchtaroombyid(chatroomid:number):Observable<any >{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get(`http://localhost:9088/cng/demandeconge/getchtaroombyidch/${chatroomid}`,httpOptions)
  }
  public putetatdemande(iddemande:number):Observable<any  >{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put(`http://localhost:9088/cng/demandeconge/putsetatdemande/${iddemande}`,httpOptions)
  }
  loadJsonData(): Observable<any> {
    return this.http.get<any>('../../../assets/frcalendrier.json')}

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
  addImagedem(iddemand: number, image: File,idchatroom: number): Observable<Image_justificatif> {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const formData = new FormData();
    formData.append('image', image);
    let url = `http://localhost:9088/cng/demandeconge/addandassignimage/${iddemand}/${idchatroom}`;

    return this.http.post<any>(url,formData,httpOptions);
  }
  addImagedemwithoutcatroom(iddemand: number, image: File): Observable<Image_justificatif> {
    const httpOptions = {
      headers: new HttpHeaders({

        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    const formData = new FormData();
    formData.append('image', image);
    let url = `http://localhost:9088/cng/demandeconge/addandassignwithoutchatroom/${iddemand}`;

    return this.http.post<any>(url,formData,httpOptions);
  }
  public getdeadline(iddemande:number):Observable<Date> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<Date>(`http://localhost:9088/cng/demandeconge/deadlinedemande/${iddemande}`, httpOptions);
  }
  public getdeandecongeenretard():Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(`http://localhost:9088/cng/demandeconge/enretard`, httpOptions);
  }
  public getnombretroisprohains():Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(`http://localhost:9088/cng/demandeconge/troisprochainsjours`, httpOptions);
  }
public getbytypecconge(Typeconge:Type_Conge):Observable<any>{
  const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    })
  };
  return this.http.get<any>(`http://localhost:9088/cng/demandeconge/typedemandeconge/${Typeconge}`, httpOptions);
}
  public gettypecongeexcep(Typecongeexc:Type_conge_exceptionnel):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(`ttp://localhost:9088/cng/demandeconge/typecongexcep/${Typecongeexc}`, httpOptions);
  }
  public getmap():Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(` http://localhost:9088/cng/demandeconge/gettypecongexeppresent`, httpOptions);
  }
  public gettypecongesexep(typeconge :Type_Conge):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(` http://localhost:9088/cng/demandeconge/listdemexep/${typeconge}`, httpOptions);
  }
  public miseajoursoldeconge(iduser:number ):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.get<any>(`http://localhost:9088/cng/demandeconge/soldeconges/${iduser}`, httpOptions);
  }
  public modifieretatdemande(iddemande:number):Observable<any>{
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      })
    };
    return this.http.put<any>(`http://localhost:9088/cng/demandeconge/modifierjustifetat/${iddemande}`, httpOptions);
  }
 public detailsdemandesantierieures(iduser:number ):Observable<any>{
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     })
   };
   return this.http.get<any>(`http://localhost:9088/cng/demandeconge/verfificationdechevauchement/${iduser}`, httpOptions);
 }
 public validatedecision(): Observable<any>{
   const httpOptions = {
     headers: new HttpHeaders({
       'Content-Type': 'application/json',
       'Authorization': `Bearer ${localStorage.getItem('token')}`
     })
   };
   return this.http.post<any>(`http://localhost:9088/cng/demandeconge/validatedecison`, httpOptions);

 }
}


