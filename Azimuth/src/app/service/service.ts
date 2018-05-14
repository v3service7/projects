import { ComponentFactoryResolver,Injectable, Inject, ReflectiveInjector } from '@angular/core';

/*import { AgentComponent } from './dynamic.component';*/

import { AgentComponent } from '../agent/agent.component';

import { PayeehirarchyComponent } from '../payeehirarchy/payeehirarchy.component';
import { Transaction1Component } from '../transaction1/transaction1.component';
import { Transaction2Component } from '../transaction2/transaction2.component';
import { Transaction3Component } from '../transaction3/transaction3.component';
import { ReferenceComponent } from '../reference/reference.component'



import { PeriodConfigComponent } from '../period-config/period-config.component';
import { TransactionConfigComponent } from '../transaction-config/transaction-config.component';
import { TerritoryConfigComponent } from '../territory-config/territory-config.component'


@Injectable()
export class Service {

  factoryResolver : any;
  rootViewContainer : any;

  constructor(
    @Inject(ComponentFactoryResolver) factoryResolver) {
    this.factoryResolver = factoryResolver
  }

  setRootViewContainerRef(viewContainerRef) {
    this.rootViewContainer = viewContainerRef
  }

  addDynamicComponent(type) {
    let factory : any;
    if (type == 'Agent') {
      factory = this.factoryResolver.resolveComponentFactory(AgentComponent)
    }else if(type == 'Payee_Hirarchy'){
      factory = this.factoryResolver.resolveComponentFactory(PayeehirarchyComponent)
    }else if(type == 'Sub_Trans_1'){
      factory = this.factoryResolver.resolveComponentFactory(Transaction1Component)
    }else if(type == 'Sub_Trans_2'){
      factory = this.factoryResolver.resolveComponentFactory(Transaction2Component)
    }else if(type == 'Sub_Trans_3'){
      factory = this.factoryResolver.resolveComponentFactory(Transaction3Component)
    }else if(type == 'Period_Config'){
      factory = this.factoryResolver.resolveComponentFactory(PeriodConfigComponent)
    }else if(type == 'Transaction_Config'){
      factory = this.factoryResolver.resolveComponentFactory(TransactionConfigComponent)
    }else if(type == 'Territory_Config'){
      factory = this.factoryResolver.resolveComponentFactory(TerritoryConfigComponent)
    }else{
      factory = this.factoryResolver.resolveComponentFactory(ReferenceComponent)
    }
    const component = factory.create(this.rootViewContainer.parentInjector)
    return(component.hostView.rootNodes[0]);
  }

}