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
import { ReferenceComponent } from './reference/reference.component';

import { SettingHeaderComponent } from './setting-header/setting-header.component';
import { PeriodConfigComponent } from './period-config/period-config.component';
import { TransactionConfigComponent } from './transaction-config/transaction-config.component';
import { TerritoryConfigComponent } from './territory-config/territory-config.component';
import { MainTrans1Component } from './main-trans1/main-trans1.component';
import { MainTrans2Component } from './main-trans2/main-trans2.component'

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AgentComponent,
    PayeehirarchyComponent,
    Transaction1Component,
    Transaction2Component,
    Transaction3Component,
    ReferenceComponent,
    SettingHeaderComponent,
    PeriodConfigComponent,
    TransactionConfigComponent,
    TerritoryConfigComponent,
    MainTrans1Component,
    MainTrans2Component
  ],
  entryComponents: [
    AgentComponent,
    PayeehirarchyComponent,
    MainTrans1Component,
    MainTrans2Component,
    Transaction1Component,
    Transaction2Component,
    Transaction3Component,
    ReferenceComponent,
    PeriodConfigComponent,
    TransactionConfigComponent,
    TerritoryConfigComponent
  ],
  imports: [
    BrowserModule,
    routing
  ],
  providers: [Service],
  bootstrap: [AppComponent]
})
export class AppModule { }
