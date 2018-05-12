import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { routing }        from './app.routing';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { Service } from './service/service';
import { AgentComponent } from './agent/agent.component';
import { PayeehirarchyComponent } from './payeehirarchy/payeehirarchy.component';
import { Transaction1Component } from './transaction1/transaction1.component';
import { Transaction2Component } from './transaction2/transaction2.component';
import { Transaction3Component } from './transaction3/transaction3.component';
import { ReferenceComponent } from './reference/reference.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AgentComponent,
    PayeehirarchyComponent,
    Transaction1Component,
    Transaction2Component,
    Transaction3Component,
    ReferenceComponent
  ],
  entryComponents: [
    AgentComponent,
    PayeehirarchyComponent,
    Transaction1Component,
    Transaction2Component,
    Transaction3Component,
    ReferenceComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
