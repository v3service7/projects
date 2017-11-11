import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { Routing } from './app.routing';

import { OwnerComponent } from './owner/owner.component';

@NgModule({
  declarations: [
    AppComponent,
    OwnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Routing,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
