import { ComponentFactoryResolver,Injectable, Inject, ReflectiveInjector } from '@angular/core';

/*import { AgentComponent } from './dynamic.component';*/

import { AgentComponent } from '../agent/agent.component';

import { PayeehirarchyComponent } from '../payeehirarchy/payeehirarchy.component';
import { Transaction1Component } from '../transaction1/transaction1.component';
import { Transaction2Component } from '../transaction2/transaction2.component';
import { Transaction3Component } from '../transaction3/transaction3.component';
import { ReferenceComponent } from '../reference/reference.component'



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

    console.log("this.rootViewContainer");
    console.log(this.rootViewContainer);
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
    }else{
      factory = this.factoryResolver.resolveComponentFactory(ReferenceComponent)
    }
    const component = factory.create(this.rootViewContainer.parentInjector)
    return(component.hostView.rootNodes[0]);
  }

}