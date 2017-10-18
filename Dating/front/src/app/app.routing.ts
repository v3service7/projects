import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { UsersComponent, UsersupdateComponent, UsersaddComponent} from './users/index';
import { PageComponent,PagelistComponent,PageaddComponent,PageupdateComponent } from './page/page.component';
import { CountryComponent,CountrylistComponent,CountryaddComponent,CountryupdateComponent } from './country/country.component';
import { PromotionComponent,PromotionlistComponent,PromotionaddComponent,PromotionupdateComponent } from './promotion/promotion.component';
import { BannerComponent,BannerlistComponent,BanneraddComponent,BannerupdateComponent} from './banner/banner.component'
import { BannerTimeComponent,BannerlistTimeComponent,BanneraddTimeComponent,BannerupdateTimeComponent, BanneraddTimeImageComponent} from './bannersetting/banner.component'
import { PackageComponent,PackagelistComponent,PackageaddComponent,PackageupdateComponent } from './package/package.component'
import { HomeComponent } from './home/home.component';
import { ProfileComponent,AdminChangePasswordComponent } from './profile/profile.component';
import { LoginComponent,UserRegistrationComponent } from './login/login.component';
import { AdminLoginComponent,AdminRegistrationComponent, AdminResetPasswordComponent} from './admin-login/admin-login.component';
import { CustomerComponent,CustomerlistComponent,CustomeraddComponent,CustomerupdateComponent, AdminShowBlockedUserComponent,AdminViewAbuseReportComponent } from './customer/customer.component';
import { AuthGuard,CustomerAuthGuard } from './guards/index';
import { FrontendComponent,FrontenddashboardComponent,FrontendProfileComponent, FrontendPageComponent,FrontendCustomerAccountComponent,FrontendCustomerViewsComponent, FrontendPublicProfileComponent, FrontendAllProfileComponent,FrontendFriendComponent, FrontendCustomerMessageComponent, FrontendVideoCallComponent, FrontendLiveNowComponent, FrontendLiveNowListComponent , CustomermailactivateComponent, CustomerResetPasswordComponent, FrontendContactUsComponent, FrontendReportComponent, FrontendSpeedDatingComponent, FrontenNotificationsComponent} from './frontend/frontend.component';


const appRoutes: Routes = [
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard]  },
    { path: '', component: LoginComponent },    
    { path: 'login', component: LoginComponent },
    { path: 'admin', component: AdminLoginComponent },
    { path: 'admin/login', component: AdminLoginComponent },
    { path: 'admin/profile', component: ProfileComponent, canActivate: [AuthGuard]  },
  	{ path: 'userRegistration', component: UserRegistrationComponent, canActivate: [] },
    { path: 'admin/signup', component: AdminRegistrationComponent, canActivate: [] },
    { path: 'admin/changepassword/:id', component: AdminChangePasswordComponent, canActivate: [] },
    { path: 'admin/blockeduser/:id', component: AdminShowBlockedUserComponent, canActivate: [] },
    { path: 'admin/viewabusereport/:id', component: AdminViewAbuseReportComponent, canActivate: [] },

    { path: 'admin/reset-password/:id', component: AdminResetPasswordComponent},
    { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard]  },  	
    { path: 'admin/users', component: UsersComponent, canActivate: [AuthGuard] },
  	{ path: 'admin/users/:id', component: UsersupdateComponent, canActivate: [AuthGuard]  },
  	{ path: 'admin/user/add', component: UsersaddComponent, canActivate: [AuthGuard]  },  
    	
    { path: 'admin/promotion', component: PromotionComponent, canActivate: [AuthGuard],children :[
        { path: 'list', component: PromotionlistComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: PromotionaddComponent, canActivate: [AuthGuard]  },
        { path: 'edit/:id', component: PromotionupdateComponent, canActivate: [AuthGuard]  },
    ]},
    { path: 'admin/page', component: PageComponent, canActivate: [AuthGuard],children :[
      { path: 'list', component: PagelistComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: PageaddComponent, canActivate: [AuthGuard]  },
        { path: 'edit/:id', component: PageupdateComponent, canActivate: [AuthGuard]  },
    ]},
    { path: 'admin/country', component: CountryComponent, canActivate: [AuthGuard],children :[
      { path: 'list', component: CountrylistComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: CountryaddComponent, canActivate: [AuthGuard]  },
        { path: 'edit/:id', component: CountryupdateComponent, canActivate: [AuthGuard]  },
    ]},
    { path: 'admin/customer', component: CustomerComponent, canActivate: [AuthGuard],children :[
      { path: 'list', component: CustomerlistComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: CustomeraddComponent, canActivate: [AuthGuard]  },
        { path: 'edit/:id', component: CustomerupdateComponent, canActivate: [AuthGuard]  },
    ]},
    { path: 'admin/banner', component: BannerComponent, canActivate: [AuthGuard],children :[
      { path: 'list', component: BannerlistComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: BanneraddComponent, canActivate: [AuthGuard]  },        
        { path: 'edit/:id', component: BannerupdateComponent, canActivate: [AuthGuard]  },
    ]},
    { path: 'admin/bannersetting', component: BannerTimeComponent, canActivate: [AuthGuard],children :[
      { path: 'list', component: BannerlistTimeComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: BanneraddTimeComponent, canActivate: [AuthGuard]  },        
        { path: 'addimage', component: BanneraddTimeImageComponent, canActivate: [AuthGuard]  },        
        { path: 'edit/:id', component: BannerupdateTimeComponent, canActivate: [AuthGuard]  },
    ]},

    { path: 'admin/package', component: PackageComponent, canActivate: [AuthGuard],children :[
      { path: 'list', component: PackagelistComponent, canActivate: [AuthGuard]  },
        { path: 'add', component: PackageaddComponent, canActivate: [AuthGuard]  },
        { path: 'edit/:id', component: PackageupdateComponent, canActivate: [AuthGuard]  },
    ]},
    
    
    { path: 'customer', component: FrontendComponent,children :[
        { path: 'dashboard', component: FrontenddashboardComponent,canActivate: [CustomerAuthGuard] },
        { path: 'profile', component: FrontendProfileComponent,canActivate: [CustomerAuthGuard] },
        { path: 'my-account', component: FrontendCustomerAccountComponent,canActivate: [CustomerAuthGuard] },
        { path: 'my-views', component: FrontendCustomerViewsComponent,canActivate: [CustomerAuthGuard] },
        { path: 'message', component: FrontendCustomerMessageComponent,canActivate: [CustomerAuthGuard] },   
        { path: 'friend', component: FrontendFriendComponent,canActivate: [CustomerAuthGuard] },     
        { path: 'allprofile', component: FrontendAllProfileComponent,canActivate: [CustomerAuthGuard] },
        { path: 'notifications', component: FrontenNotificationsComponent,canActivate: [CustomerAuthGuard] },
        { path: 'publicprofile/:vid', component: FrontendPublicProfileComponent, canActivate: [CustomerAuthGuard] },
        { path: 'page/:page', component: FrontendPageComponent },
        { path: 'speeddating', component: FrontendSpeedDatingComponent },
        { path: 'video-call/:sessionid/:tokenid/:connectedTo', component: FrontendVideoCallComponent, canActivate: [CustomerAuthGuard] },
        { path: 'live-now/:sessionid/:tokenid', component: FrontendLiveNowComponent, canActivate: [CustomerAuthGuard] },
        { path: 'live-now-list', component: FrontendLiveNowListComponent, canActivate: [CustomerAuthGuard] },
        { path: 'mailactivate/:activationid', component: CustomermailactivateComponent},
        { path: 'reset-password/:id', component: CustomerResetPasswordComponent},
        { path: 'contactus', component: FrontendContactUsComponent},
        { path: 'report', component: FrontendReportComponent, canActivate: [CustomerAuthGuard] },

        
    ]},
  	
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);