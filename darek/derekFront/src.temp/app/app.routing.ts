import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent,DashboardprofileComponent } from './dashboard/dashboard.component';

import { UsersComponent, UsersupdateComponent, UsersaddComponent, AdminComponent, AdminaddComponent, AdminupdateComponent} from './users/index';

import { RestaurantsComponent, RestaurantaddComponent, RestaurantupdateComponent,RestaurantupdateownerComponent,RestaurantlocationComponent,RestaurantconfirmationComponent,OwnermailactivateComponent} from './restaurants/index';

import { DriversComponent, DriveraddComponent,DriverupdateComponent} from './drivers/index';

import { PromotionsComponent, PromotionupdateComponent,PromotionaddComponent } from './promotions/promotions.component';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';

import { ForgetComponent,ResetPasswordAdminComponent } from './login/forgetPassword.component';

import { OwnerComponent, OwnerloginComponent, OwnerprofileComponent,OwnerregisterComponent,OwnerchangepasswordComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent } from './owner/owner.component';


import { AuthGuard,OwnerAuthGuard } from './guards/index';

const appRoutes: Routes = [
  { path: 'admin/login', component: LoginComponent },
	{ path: 'admin/', component: LoginComponent },

  { path: 'admin/forget-password', component: ForgetComponent },
  { path: 'admin/resetpassword/:id', component: ResetPasswordAdminComponent },

  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },
	{ path: 'admin/profile', component: DashboardprofileComponent, canActivate: [AuthGuard]  },

  { path: 'admin/add', component: AdminaddComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/show/:id', component: AdminupdateComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/list', component: AdminComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/users/:id', component: UsersupdateComponent, canActivate: [AuthGuard]  },
  { path: 'admin/user/add', component: UsersaddComponent, canActivate: [AuthGuard]  },

	{ path: 'admin/drivers', component: DriversComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/drivers/:id', component: DriverupdateComponent, canActivate: [AuthGuard]  },
  { path: 'admin/driver/add', component: DriveraddComponent, canActivate: [AuthGuard]  },

  { path: 'admin/restaurants', component: RestaurantsComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/restaurants/:id', component: RestaurantupdateComponent, canActivate: [AuthGuard]  },
  { path: 'admin/restaurant/add', component: RestaurantaddComponent, canActivate: [AuthGuard]  },

  { path: 'admin/promotions', component: PromotionsComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/promotions/:id', component: PromotionupdateComponent, canActivate: [AuthGuard]  },
  { path: 'admin/promotion/add', component: PromotionaddComponent, canActivate: [AuthGuard]  },

  { path: 'owner', component: OwnerComponent,children :[
        { path: '', component: OwnerloginComponent },
        { path: 'login', component: OwnerloginComponent },
        { path: 'register', component: OwnerregisterComponent },
        { path: 'forget-password', component: ForgetOwnerComponent },
        { path: 'resetpassword/:id', component: ResetPasswordOwnerComponent },
        { path: 'change-password', component: OwnerchangepasswordComponent, canActivate: [OwnerAuthGuard]  },
        { path: 'mailactivate/:id', component: OwnermailactivateComponent, canActivate: [OwnerAuthGuard]  },
        { path: 'profile', component: OwnerprofileComponent, canActivate: [OwnerAuthGuard]  },
        { path: 'basic-detail', component: RestaurantupdateownerComponent, canActivate: [OwnerAuthGuard]  },
        { path: 'restaurant-location', component: RestaurantlocationComponent, canActivate: [OwnerAuthGuard]  },
        { path: 'restaurant-confirm', component: RestaurantconfirmationComponent, canActivate: [OwnerAuthGuard]  },
    ]},
  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
