import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {CalendarOptions, DatesSetArg, EventClickArg, EventContentArg, EventInput} from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {UserserviceService} from "../userservice/userservice.service";
import {Demandcongerequest} from "../Models/Demandcongerequest";
import {Personnel} from "../Models/Personnel";
import {Demande_conges} from "../Models/Demande_conges";
import {TypemotifComponent} from "../typemotif/typemotif.component";
import {Type_conge_exceptionnel} from "../Models/Type_conge_exceptionnel";
import {TypeConge} from "../Models/TypeConge";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {Subscription} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {ChatcompoenentComponent} from "../chatcompoenent/chatcompoenent.component";
import {ERole} from "../Models/ERole";
import {Chatroom} from "../Models/Chatroom";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent implements  AfterViewInit{
  @ViewChild('calendar', { static: true }) calendarComponent!: FullCalendarComponent;
  user!:Personnel; // Définissez le type de l'utilisateur en fonction de vos besoins
  token!: string | null;
  demandec!:any;
  private routeSub!: Subscription;
  isSidebarOpen: boolean = false;
  ch:Chatroom = new Chatroom();
  subscription!: Subscription;
  storedEvents: any[] = [];
  demandecongebyuser:Demande_conges[] = [];
  idpersonel!:number;
username!:string;
currentuser:Personnel=new Personnel();
  constructor(public  chtacompoenet:ChatcompoenentComponent,private userservice:UserserviceService, private sharedService: SharedserviceService,private typemotif:TypemotifComponent,private dialog: MatDialog) {
    this.subscription = this.sharedService.isSidebarOpen$.subscribe(isOpen => {
      this.isSidebarOpen = isOpen;
    });
  }
  ngAfterViewInit(): void {

    const storedEventsString = localStorage.getItem('storedEvents');
    if (storedEventsString) {
      this.storedEvents = JSON.parse(storedEventsString);
      console.log(this.storedEvents);
    }
    this.token = localStorage.getItem("iduser");
    if (this.token !== null) {
      const idNumber: number = parseInt(this.token, 10);
      console.log(this.token);
      this.userservice.getdemandecongesbyuser(idNumber).subscribe(
        reponse => {
          this.demandecongebyuser = reponse;

          this.demandecongebyuser.forEach(demande => {
            console.log(demande.date_debut);
            console.log(demande.date_fin);
            const event = {
title:"congé",
              start: demande.date_debut,
              end: demande.date_fin,

              extendedProps: {
                iddemande: demande.id_demandeconge
              }
            };

            this.storedEvents.push(event);
            console.log("iddemand",event.extendedProps.iddemande);
            console.log(this.storedEvents);
          });
          // Supprimer les événements existants du calendrier
          if (this.calendarComponent.getApi()) {
            console.log(this.storedEvents);
            // Si oui, ajoutez l'événement statique au calendrier
            this.storedEvents.forEach(event => {
              this.calendarComponent.getApi().addEvent(event);
            });

          } else {
            // Si le composant n'est pas encore initialisé, attendez un court instant et réessayez
            console.log("addeventnull");
          }
        }
      );
    }
  }
  customizeEventContent = (args: EventContentArg) => {
    const { timeText, event } = args;
    const element = document.createElement('table');
    element.innerHTML = timeText;


    element.style.color = 'red';
    if (event.start) {
      element.style.fontWeight = 'bold';
    }

    return { domNodes: [element] };
  };
  customizeTitle = (info: DatesSetArg) => {
    const titleEl = document.querySelector('.fc-toolbar-title') as HTMLElement;
    if (titleEl) {
      titleEl.style.fontFamily = 'Algerian'; // Changer la police du titre du calendrier
      // Autres styles CSS que vous souhaitez appliquer au titre du calendrier
      titleEl.innerHTML = info.view.title;
      titleEl.style.textAlign = 'center';
      eventContent: this.customizeEventContent;
    }

  };


  selectedStartDate: Date | null = null;
  selectedendDate: Date | null = null;



  handleDateSelect(arg: any) {

    if (!this.selectedStartDate) {
      // Si la date de début n'a pas encore été sélectionnée, sauvegardez-la
      this.selectedStartDate = arg.start;
    } else {
      // Si la date de début a déjà été sélectionnée, utilisez-la pour créer l'événement
      const startDate = this.selectedStartDate;
      const endDate = new Date(arg.end); // Convertir en objet Date
      endDate.setDate(endDate.getDate() - 1);
      console.log(startDate);
      console.log(endDate);


      // Créez un tableau pour stocker les dates entre la date de début et la date de fin
      const datesInRange: Date[] = [];
      const currentDate = new Date(startDate);
      while (currentDate <= endDate) {
        datesInRange.push(new Date(currentDate));

        currentDate.setDate(currentDate.getDate() + 1);
      }


      const confirmation = prompt("Vous confirmez les dates de  votre demande  ");

      if (confirmation&& confirmation.toLowerCase() === 'oui') {

        const title = prompt("sepcifier le type de conge ");



        // Ajoutez l'événement avec la plage de dates sélectionnée
        datesInRange.forEach(date => {
          this.calendarComponent.getApi().addEvent({

            start: date,

            allDay: true ,
            classNames: ['selected-date']
          });
        });

        endDate.setDate(endDate.getDate() +1);

if ( this.sharedService.selectedtypengreg!=null) {
  const demande: Demandcongerequest = {
    date_fin: endDate,
    date_debut: startDate,
    typeconge: this.sharedService.selectedtypengreg,

  };
  if (this.sharedService.selectedtypengreg === 'exceptionnel' && this.sharedService.selectedTypeConge != null) {
    demande.type_conge_exceptionnel = this.sharedService.selectedTypeConge;
  }


  console.log(demande);
  if (this.token !== null) {
    console.log("iduserrempli",this.token);
    const idNumber: number = parseInt(this.token, 10)
    this.userservice.remplirformulaireactivit(demande,idNumber).subscribe(response => {
      console.log('Réponse du backend : ', response);
      this.demandec = response;
      console.log(this.demandec);
      if (this.demandec.justificatifs_requis) {
        prompt('justifiatof requis');
      }
    });

  }


      }else{
        console.log("pas d ajout");
      }



      // Réinitialisez la sélection de la date de début pour permettre une nouvelle sélection
      this.selectedStartDate = null;
    }
  }


}
  handleCalendarEventClick(eventClickArg: EventClickArg) {
this.onEventClick(eventClickArg);
    const dialogRef = this.dialog.open(ChatcompoenentComponent, {
      width: '700px',
      height:'700px'// Définissez la largeur souhaitée du MatDialog
      // Autres configurations du MatDialog
    });
  }
  onEventClick(eventClickArg: EventClickArg) {
    // Vérifiez si un événement est cliqué
    if (eventClickArg.event) {
      // Obtenez l'identifiant de la demande à partir de l'événement cliqué
      const idDemande = eventClickArg.event.extendedProps['iddemande'];
      const token = localStorage.getItem('currentUser');
      const iduser2 = localStorage.getItem('iduser');

      if (token && iduser2) {
        this.idpersonel = parseInt(iduser2, 10);
        this.username = token;
        console.log(this.username);
      }

      this.userservice.getUserUsername(this.username).subscribe(data => {
        this.currentuser = data;
        console.log(data);
        console.log(this.currentuser.cin);
        console.log("cingest", this.currentuser.gestionnaire.cin);

        const role = this.currentuser.roles.find(r => r.name === ERole.Collaborateur);
        if (role) {
          if (role.name === ERole.Collaborateur) {
            // Utilisez cet identifiant de demande comme vous le souhaitez
            console.log("Identifiant de la demande de congé sélectionné:", idDemande);
            this.chtacompoenet.ref(this.currentuser.cin, this.currentuser.gestionnaire.cin, data.username, 'null', idDemande);
            console.log("here");
            console.log(this.currentuser);
            console.log(typeof this.idpersonel);

            this.routeSub = this.userservice.getchatroomm(this.idpersonel, this.currentuser.gestionnaire.cin, idDemande).subscribe((res: any) => {
              console.log("hh:", res);
              this.ch = res;
              console.log(this.ch.chatroomId);
              localStorage.setItem('chatroomId', this.ch.chatroomId.toString());
              this.userservice.getmessagebuchatroom(this.ch.chatroomId).subscribe((tt:any)=>{
                this.userservice.chatmessagelist=tt;
              })
              this.username = this.currentuser.username;
              console.log(this.ch);
              this.ch.color = '#EC407A';
              this.userservice.map.set(this.idpersonel, this.ch);
              this.userservice.map2.set(this.idpersonel, 'Start Chat');
              this.userservice.map3.set(this.idpersonel, 'profile_user.jpg');
              const token1 = localStorage.getItem('token');
              console.log("map2",this.userservice.map.get(this.idpersonel));
            });
            console.log(this.currentuser);
            console.log("map",this.userservice.map.get(this.idpersonel));
          }
        }
      });
    }
  }


  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins:[dayGridPlugin, interactionPlugin],
    datesSet: this.customizeTitle,
    editable: true,
    selectable: true,
    eventClick: this.handleCalendarEventClick.bind(this),
    select: (arg: any) => this.handleDateSelect(arg)

  };
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
