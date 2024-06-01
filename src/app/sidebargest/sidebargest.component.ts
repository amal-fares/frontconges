import {Component, OnInit} from '@angular/core';
import {UserserviceService} from "../userservice/userservice.service";
import {Personnel} from "../Models/Personnel";
import {CalendarComponent} from "../calendar/calendar.component";
import {SharedserviceService} from "../sharedservie/sharedservice.service";
import {MondossiernumeriqueComponent} from "../mondossiernumerique/mondossiernumerique.component";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sidebargest',
  templateUrl: './sidebargest.component.html',
  styleUrls: ['./sidebargest.component.css']
})
export class SidebargestComponent implements OnInit {
  currentUser!:Personnel;

  constructor(private userservice:UserserviceService,public calendarcomponent:CalendarComponent,public sharedservice:SharedserviceService,public Dialog:MatDialog,private router:Router) {
  }

  ngOnInit(): void {
    console.log("de sidebar",this.sharedservice.ismanagerdeux);
    const username = localStorage.getItem("currentUser");
    if (username) {
      this.userservice.getUserUsername(username).subscribe(data => {
        this.currentUser = data;
        console.log(data);

      });}

}

  openmatdialog(){
    const dialogRef = this.Dialog.open(MondossiernumeriqueComponent, {
      width: '650px',
      height: '600px'

    })}

  public decider() {
    if (this.sharedservice.isGestionnaire) {
      this.router.navigate(['/home/espacegestionnaire']);
    }
    if (this.sharedservice.ismanagerprem) {
      this.router.navigate(['/home/totaldem']);
    } else if (this.sharedservice.ismanagerdeux) {
      this.router.navigate(['/home/demanmanager']);
    }}
public goto(){
  this.router.navigate(['/home/detailsuser']);
}
public gosoumettre()
{
  this.router.navigate(['/home/typemotif/calendar']);
}
  public goplanning()
  {
    this.router.navigate(['/home/planning']);
  }
  public gochart()
  {
    this.router.navigate(['/home/chart']);
  }
}


