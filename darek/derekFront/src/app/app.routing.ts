﻿import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent,DashboardprofileComponent } from './dashboard/dashboard.component';

import { UsersComponent, UsersupdateComponent, UsersaddComponent, AdminComponent, AdminaddComponent, AdminupdateComponent} from './users/index';

import { RestaurantsComponent, RestaurantaddComponent, RestaurantupdateComponent,  RestaurantupdateownerComponent, RestaurantlocationComponent, RestaurantconfirmationComponent,OwnermailactivateComponent, CuisinesComponent, RestaurantCuisinesComponent} from './restaurants/index';

import {RestaurantOwnerPickupComponent, RestaurantOwnerOrderForLaterComponent, RestaurantOwnerTaxationComponent, RestaurantOwnerPaymentOptionComponent, RestaurantOwnerOpeningHoursComponent, RestaurantOwnerDeliveryZoneComponent, KitchenMenuListComponent,LegacyComponent,LegacycodeComponent, NotificationComponent, SupportedLanguagesComponent,DeliveryOutsideComponent,OnlinePaymentComponent, CustomMessageComponent} from './serviceandopening/index';

import { OwnerDriversComponent, DriverOrdersComponent, OwnerDriversupdateComponent,OwnerDriversaddComponent} from './ownerdrivers/index';

import { DriversComponent, DriveraddComponent,DriverupdateComponent} from './drivers/index';

import { PromotionsComponent, PromotionupdateComponent,PromotionaddComponent } from './promotions/promotions.component';

import { HomeComponent } from './home/home.component';

import { LoginComponent } from './login/login.component';

import { ForgetComponent,ResetPasswordAdminComponent } from './login/forgetPassword.component';

import { OwnerComponent, OwnerloginComponent, OwnerAutologinComponent, OwnerprofileComponent, OwnerregisterComponent,OwnerchangepasswordComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent } from './owner/owner.component';

import { LanguageComponent,LanguagelistComponent, LanguageaddComponent, LanguageupdateComponent } from './language/language.component';

import { AuthGuard,OwnerAuthGuard} from './guards/index';

import { FrontendHeaderComponent, FrontendComponent, FrontendDetailComponent, FrontendCartComponent, FrontendPromoDetailComponent, FrontendLoginComponent, FrontendForgetPasswordComponent,FrontendResetPasswordComponent,FrontendUserProfileComponent,FrontendChangePasswordComponent,FrontendThankuPageComponent} from './frontend/frontend.component';

import { ReportingComponent,ReportingnavComponent,ReportingoverviewComponent,ReportingMethodComponent,ReportingResultComponent,ReportingTypeComponent,ReportingPaymentMethodComponent,ReportingItemsComponent,ReportingItemCategoriesComponent,ReportingClientComponent,ReportingOrderComponent,ReportingDetailComponent,ReportingSaleDetailComponent} from './reporting/reporting.component';

import { MarketingComponent,MarketingNavComponent,MarketingOverviewComponent,MarketingPromotionsComponent,MarketingEditPromotionComponent,MarketingPromotionsListComponent,MarketingPromotionsTemplateComponent, MarketingPromotionsSubscriptionComponent, MarketingStatsComponent } from './marketing/marketing.component';

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
  { path: 'admin/restaurant', component: RestaurantsComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/cuisine', component: CuisinesComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/restaurants/:id', component: RestaurantupdateComponent, canActivate: [AuthGuard]  },

  { path: 'admin/owner-auto-login/:id', component: OwnerAutologinComponent},

  { path: 'admin/restaurant/add', component: RestaurantaddComponent, canActivate: [AuthGuard]  },
  { path: 'admin/promotions', component: PromotionsComponent, canActivate: [AuthGuard],children :[]  },
  { path: 'admin/promotions/:id', component: PromotionupdateComponent, canActivate: [AuthGuard]  },
  { path: 'admin/promotion/add', component: PromotionaddComponent, canActivate: [AuthGuard]  },
    { path: 'admin/language', component: LanguageComponent, canActivate: [AuthGuard],children :[
      { path: '', component: LanguagelistComponent, canActivate: [AuthGuard]  },
      { path: 'add', component: LanguageaddComponent, canActivate: [AuthGuard]  },
      { path: 'edit/:id', component: LanguageupdateComponent, canActivate: [AuthGuard]  },
  ]},
  
  { path: 'owner', component: OwnerComponent, children :[
    { path: '', component: OwnerloginComponent },
    { path: 'login', component: OwnerloginComponent },
    { path: 'register', component: OwnerregisterComponent },
    { path: 'forget-password', component: ForgetOwnerComponent },
    { path: 'resetpassword/:id', component: ResetPasswordOwnerComponent },
    { path: 'change-password', component: OwnerchangepasswordComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'mailactivate/:id', component: OwnermailactivateComponent},
    { path: 'profile', component: OwnerprofileComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'basic-detail', component: RestaurantupdateownerComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'restaurant-location', component: RestaurantlocationComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'restaurant-cuisine', component: RestaurantCuisinesComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'restaurant-confirm', component: RestaurantconfirmationComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'restaurant-pickup', component: RestaurantOwnerPickupComponent, canActivate: [OwnerAuthGuard]},
    { path: 'restaurant-orderforlater', component: RestaurantOwnerOrderForLaterComponent, canActivate: [OwnerAuthGuard]},
    { path: 'restaurant-taxation', component: RestaurantOwnerTaxationComponent, canActivate: [OwnerAuthGuard]},
    { path: 'restaurant-paymentoption', component: RestaurantOwnerPaymentOptionComponent, canActivate: [OwnerAuthGuard]},
    { path: 'restaurant-openinghours', component: RestaurantOwnerOpeningHoursComponent, canActivate: [OwnerAuthGuard]},
    { path: 'restaurant-deliveryzone', component: RestaurantOwnerDeliveryZoneComponent, canActivate: [OwnerAuthGuard]},
    { path: 'menu-list', component: KitchenMenuListComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'drivers', component: OwnerDriversComponent, canActivate: [OwnerAuthGuard] },
    { path: 'driver-orders/:id', component: DriverOrdersComponent, canActivate: [OwnerAuthGuard] },
    { path: 'drivers/:id', component: OwnerDriversupdateComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'driver-add', component: OwnerDriversaddComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'legacy', component: LegacyComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'online-payment', component: OnlinePaymentComponent, canActivate: [OwnerAuthGuard]},
    { path: 'legacy-code/:id', component: LegacycodeComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'notification', component: NotificationComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'supported-languages', component: SupportedLanguagesComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'delivery-outside', component: DeliveryOutsideComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'custom-message', component: CustomMessageComponent, canActivate: [OwnerAuthGuard]  },
    { path: 'reports', component: ReportingComponent, canActivate: [OwnerAuthGuard],children:[
      { path: 'overview', component: ReportingoverviewComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'method', component: ReportingMethodComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'result', component: ReportingResultComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'sales-detail', component: ReportingSaleDetailComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'type', component: ReportingTypeComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'payment-method', component: ReportingPaymentMethodComponent, canActivate: [OwnerAuthGuard]},
      { path: 'items', component: ReportingItemsComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'item-categories', component: ReportingItemCategoriesComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'clients', component: ReportingClientComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'orders', component: ReportingOrderComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'detail/:id', component: ReportingDetailComponent, canActivate: [OwnerAuthGuard]  },
    ]},
    { path: 'marketing', component: MarketingComponent, canActivate: [OwnerAuthGuard],children:[
      { path: 'overview', component: MarketingOverviewComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'promotions', component: MarketingPromotionsComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'promotions/select-template', component: MarketingPromotionsListComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'promotions/edit-promotion/:id', component: MarketingEditPromotionComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'promotions/edit-template/:id', component: MarketingPromotionsTemplateComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'promotions/subscription/:id', component: MarketingPromotionsSubscriptionComponent, canActivate: [OwnerAuthGuard]  },
      { path: 'stats', component: MarketingStatsComponent, canActivate: [OwnerAuthGuard]  },
    ]}
  ]},

  { path: 'frontend/:id', component: FrontendComponent },
  { path: 'frontend-detail/:id', component: FrontendDetailComponent },
  { path: 'frontend-cart/:id', component: FrontendCartComponent },
  { path: 'frontend-promotion/:id/:promotionId', component: FrontendPromoDetailComponent },
  { path: 'login/:id', component: FrontendLoginComponent },
  { path: 'forget-pass/:id', component: FrontendForgetPasswordComponent },
  { path: 'resetpassword/:id', component: FrontendResetPasswordComponent },
  { path: 'profile/:id', component: FrontendUserProfileComponent },
  { path: 'change-password/:id', component: FrontendChangePasswordComponent },
  { path: 'thanku/:id', component: FrontendThankuPageComponent },

  { path: '', component: LoginComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
