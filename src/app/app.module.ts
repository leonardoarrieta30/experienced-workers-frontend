import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HttpClientModule} from "@angular/common/http";
import {WorkersService} from "./recognition/services/workers.service";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WorkersComponent } from './recognition/pages/workers/workers.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatListModule} from "@angular/material/list";
import { NavbarComponent } from './recognition/pages/navbar/navbar.component';
import { DialogContentExampleDialogComponent } from './recognition/components/dialog-content-example-dialog/dialog-content-example-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {MatCheckboxModule} from "@angular/material/checkbox";
import { MatsidenavComponent } from './recognition/components/matsidenav/matsidenav.component';
import { WorkersByGenderComponent } from './recognition/components/workers-by-gender/workers-by-gender.component';
import { WinnerComponent } from './recognition/pages/winner/winner.component';
import {RegisterUserComponent} from "./recognition/public/security/register-user/register-user.component";




@NgModule({
  declarations: [
    AppComponent,
    WorkersComponent,
    NavbarComponent,
    DialogContentExampleDialogComponent,
    MatsidenavComponent,
    WorkersByGenderComponent,
    WinnerComponent,
    RegisterUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MatInputModule,
    FormsModule,
    MatSidenavModule,
    MatListModule,
    MatDialogModule,
    MatCheckboxModule,
    ReactiveFormsModule
  ],
  providers: [WorkersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
