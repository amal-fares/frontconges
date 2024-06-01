import {Component, OnInit, ViewChild} from '@angular/core';
import {FullCalendarComponent} from "@fullcalendar/angular";
import {CalendarOptions, DatesSetArg} from "@fullcalendar/core";
import timeGridPlugin from '@fullcalendar/timegrid';
import {UserserviceService} from "../userservice/userservice.service";
import {Personnel} from "../Models/Personnel";
import {Demande_conge} from "../Models/Demande_conge";

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html',
  styleUrls: ['./planning.component.css']
})
export class PlanningComponent  implements  OnInit{
  @ViewChild('calendarr', {static: true}) timegridcompoenent!: FullCalendarComponent;
  users!:Personnel[];
constructor(public userservice:UserserviceService) {
}
  ngOnInit(): void {
    this.userservice.getaalpersonnel().subscribe(users => {
      this.users = users;
      this.loadLeaveRequests();
      this.initializeCalendar();
    });
  }
  loadLeaveRequests() {
    this.userservice.getalldem().subscribe(
      (leaveRequests: Demande_conge[]) => {
        this.updateCalendarEvents(leaveRequests);
      },
      error => {
        console.error('Failed to load leave requests', error);
      }
    );
  }
  updateCalendarEvents(leaveRequests: Demande_conge[]) {
    const events: any[] = [];

    this.users.forEach(user => {
      const userLeaveRequests = leaveRequests.filter(req => req.collaborateur.cin === user.cin);
      userLeaveRequests.forEach(request => {
        events.push({
          title: `Congé soumis par  ${user.prenom}`,
          start: request.date_debut,
          end: request.date_fin,
          color: '#333',
          extendedProps: {
            userId: user.cin,
            userName: user.prenom
          }
        });
      });
    });

    this.calendarOptions = {
      ...this.calendarOptions,
      events: events
    };
  }





  customizeDayHeaders = (info: DatesSetArg) => {
    const dayHeaderEls = document.querySelectorAll('.fc-col-header-cell .fc-scrollgrid-sync-inner .fc-col-header-cell-cushion');
    dayHeaderEls.forEach((el) => {
      const htmlEl = el as HTMLElement;
      htmlEl.style.fontFamily = 'Apple Chancery'; // Change la police des jours de la semaine
      htmlEl.style.color = 'black';   // Change la couleur du texte des jours de la semaine
    });
  }
    userIndex = 0;

  calendarOptions: CalendarOptions = {
    plugins: [ timeGridPlugin ],
    datesSet: this.customizeDayHeaders,
    allDayText: 'Congés',
    initialView: 'timeGridWeek',  height: 'auto' ,
    contentHeight: 'auto',
    // Vous pouvez également utiliser 'timeGridDay' ou 'timeGridFourDay' selon vos besoins
    events: [],

  }
  header = {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay',
    columnHeaderText: {
      allDay: 'Tous les événements' // Customize the all-day column header
    }
  };
  initializeCalendar() {
    this.calendarOptions = {
      initialView: 'timeGridWeek',
      plugins: [ timeGridPlugin ],
      height: 'auto',
      contentHeight: 'auto',
      events: [],
      slotMinTime: '00:00:00',
      slotMaxTime: '00:00:00',
      slotMinWidth: 500, // Définissez la largeur minimale des colonnes en pixels

      eventContent: (arg) => {
        const event = arg.event;

        return {
          html: `
            <div class="event-content">

              <p class="event-title">${event.title}</p>
            </div>
          `
        };
      },
      eventClick: (info) => {
        // Handle event click for details or actions (optional)
        //...
      },

    };

  }

}
