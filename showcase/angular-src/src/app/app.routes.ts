import { Routes, RouterModule } from '@angular/router';

// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent, AdminResetPasswordComponent } from './admin/forgot-password/forgot-password.component';
import { AdminCustomerComponent,CustomerListComponent,CustomerAddComponent,CustomerEditComponent } from './admin/customer/customer.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent } from './admin/pages/pages.component';

// Frontend Component
import { FrontendComponent } from './frontend/frontend.component';
import { FrontendHomeComponent,ResetComponent, AccountActiveComponent  } from './frontend/home/frontendhome.component';
// tslint:disable-next-line:max-line-length
import { FrontendDashboardComponent, MyProfileComponent, SettingComponent } from './frontend/dashboard/frontenddashboard.component';

/*Auth Gaurds*/
import {AuthGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';


const appRoutes: Routes =  [
    {
    path:'admin', component: AdminComponent, children :[ 
        { path: '', component: LoginComponent },     
        { path: 'login', component: LoginComponent },
        { path: 'forgotpassword', component: ForgotPasswordComponent },
        { path: 'resetpassword/:id', component: AdminResetPasswordComponent },
        { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
        { path: 'profile', component: ProfileComponent, canActivate: [AuthGuard] },
        { path: 'pages', component: AdminPagesComponent, canActivate: [AuthGuard], children :[
            { path: '', component: PagesListComponent, },
            { path: 'add', component: PagesAddComponent, },
            { path: ':id', component: PagesEditComponent, },
        ]},
        { path: 'user', component: AdminCustomerComponent, canActivate: [AuthGuard], children :[
            { path: '', component: CustomerListComponent, },
            { path: 'add', component: CustomerAddComponent, },
            { path: ':id', component: CustomerEditComponent, },
        ]},
        { path: 'plan', component: AdminPlanComponent, canActivate: [AuthGuard], children :[
            { path: '', component: PlanListComponent, },
            { path: 'add', component: PlanAddComponent, },
            { path: ':id', component: PlanEditComponent, },
        ]},
    ]},
    {
    path: '', component: FrontendComponent, children :[ 
        { path: 'resetpassword/:id', component: ResetComponent },
        { path: 'account-active/:token', component: AccountActiveComponent },
        { path: '', component: FrontendHomeComponent },
        { path: 'dashboard', component: FrontendDashboardComponent, canActivate: [UserGuard]  },
        { path: 'profile', component: MyProfileComponent, canActivate: [UserGuard]  },
        { path: 'setting/:id', component: SettingComponent, canActivate: [UserGuard]  }
    ]}
];

export const routing = RouterModule.forRoot(appRoutes);