import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import {HttpClientModule} from "@angular/common/http";
import {FormsModule} from "@angular/forms";
import { AccueilComponent } from './accueil/accueil.component';
import { RegisterComponent } from './register/register.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { SendcodeComponent } from './sendcode/sendcode.component';
import { AdddemandecongesComponent } from './adddemandeconges/adddemandeconges.component';
import {FullCalendarModule} from "@fullcalendar/angular";
import { CalendarComponent } from './calendar/calendar.component';
import { TypemotifComponent } from './typemotif/typemotif.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from "@angular/material/dialog";
import { ConfirmerComponent } from './confirmer/confirmer.component';
import { DemandestotalComponent } from './demandestotal/demandestotal.component';
import { ValidpremComponent } from './validprem/validprem.component';
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import { ChatcompoenentComponent } from './chatcompoenent/chatcompoenent.component';


@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    AccueilComponent,
    RegisterComponent,
    ResetpasswordComponent,
    SendcodeComponent,
    AdddemandecongesComponent,
    CalendarComponent,
    TypemotifComponent,
    ConfirmerComponent,
    ConfirmerComponent,
    DemandestotalComponent,
    ValidpremComponent,
    ChatcompoenentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    FullCalendarModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatSidenavModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  providers: [ChatcompoenentComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
