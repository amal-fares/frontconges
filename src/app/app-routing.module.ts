import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {AppComponent} from "./app.component";
import {LoginComponent} from "./login/login.component";
import {AccueilComponent} from "./accueil/accueil.component";
import {RegisterComponent} from "./register/register.component";
import {SendcodeComponent} from "./sendcode/sendcode.component";
import {ResetpasswordComponent} from "./resetpassword/resetpassword.component";
import {AdddemandecongesComponent} from "./adddemandeconges/adddemandeconges.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {TypemotifComponent} from "./typemotif/typemotif.component";
import {DemandestotalComponent} from "./demandestotal/demandestotal.component";
import {ValidpremComponent} from "./validprem/validprem.component";
import {ChatcompoenentComponent} from "./chatcompoenent/chatcompoenent.component";
import {NavbarComponent} from "./navbar/navbar.component";
import {NotifComponent} from "./notif/notif.component";
import {SidebargestComponent} from "./sidebargest/sidebargest.component";
import {EspacegestionnaireComponent} from "./espacegestionnaire/espacegestionnaire.component";
import {MondossiernumeriqueComponent} from "./mondossiernumerique/mondossiernumerique.component";
import {DemmanagerdeuxComponent} from "./demmanagerdeux/demmanagerdeux.component";
import {DetailsuserComponent} from "./detailsuser/detailsuser.component";
import {PlanningComponent} from "./planning/planning.component";
import {CharttopvalidationComponent} from "./charttopvalidation/charttopvalidation.component";
import {PiechartComponent} from "./piechart/piechart.component";
import {SognutchartComponent} from "./sognutchart/sognutchart.component";
import {PolarareaComponent} from "./polararea/polararea.component";




const routes: Routes = [
  {path:'home',component:HomepageComponent,
    children: [
      {path:'accueil',component:AccueilComponent},
      {path:'adddemand',component:AdddemandecongesComponent},
      {path:'totaldem',component:DemandestotalComponent},
      {path:'validprem',component:ValidpremComponent},
      {path:'chat',component:ChatcompoenentComponent},
      {path:'notif',component:NotifComponent},
      {path:'sidebar',component:SidebargestComponent},
      {path:'dossier',component:MondossiernumeriqueComponent},
      {path:'demanmanager',component:DemmanagerdeuxComponent},
      {path:'detailsuser',component:DetailsuserComponent},
      {path:'planning',component:PlanningComponent},
      {path:'chart',component:CharttopvalidationComponent},
      {path:'piechart',component:PiechartComponent},
      {path:'polararea',component:PolarareaComponent},



      {path:'espacegestionnaire',component:EspacegestionnaireComponent},
      {path:'navbar',component:NavbarComponent},
      {path:'typemotif',component:TypemotifComponent,
       children:[{path:'calendar',component:CalendarComponent},
         {path:'navbar',component:NavbarComponent}
       ]
      },


    ]},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'sendcode',component:SendcodeComponent},
  {path:'resetpassword',component:ResetpasswordComponent},





];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
