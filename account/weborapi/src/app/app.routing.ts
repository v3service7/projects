import { Routes, RouterModule } from '@angular/router';

import { CustomerLoginComponent } from './customer/login/customerlogin.component';

const appRoutes: Routes = [
  
  { path: '', component: CustomerLoginComponent },
  { path: 'customer', component: CustomerLoginComponent },
  { path: 'customer/login', component: CustomerLoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
