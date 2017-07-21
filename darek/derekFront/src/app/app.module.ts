import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FileSelectDirective, FileDropDirective } from 'ng2-file-upload';
import {TranslateModule} from 'ng2-translate';
import { ChartsModule } from 'ng2-charts';
// import {ToastModule} from 'ng2-toastr/ng2-toastr';

import { AppComponent } from './app.component';
import { routing } from './app.routing';
import { HeaderComponent,HeaderownerComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AlertComponent } from './directives/index';

import { AlertService, AuthService, UsersService,DriversService,RestaurantsService, PromotionsService, KitchenMenuService,KitchenItemService,MasterService,CustomersService, OrderService} from './service/index';
import { AuthGuard , OwnerAuthGuard} from './guards/index';
import { DashboardComponent,DashboardprofileComponent } from './dashboard/dashboard.component';
import { UsersComponent, UsersupdateComponent, UsersaddComponent, AdminComponent, AdminaddComponent, AdminupdateComponent} from './users/index';

import {OrderPipe} from "./order.pipe"
import {FilterPipe} from "./filter.pipe";

import { RestaurantsComponent , RestaurantaddComponent , RestaurantupdateComponent,RestaurantupdateownerComponent,RestaurantlocationComponent, RestaurantconfirmationComponent,OwnermailactivateComponent} from './restaurants/index';
import { RestaurantOwnerPickupComponent, RestaurantOwnerOrderForLaterComponent, RestaurantOwnerTaxationComponent, RestaurantOwnerPaymentOptionComponent, RestaurantOwnerOpeningHoursComponent, RestaurantOwnerDeliveryZoneComponent, KitchenMenuListComponent, KitchenMenuAddComponent, KitchenMenuUpdateComponent,KitchenitemComponent,KitchenMenuItemUpdateComponent,LegacyComponent,LegacycodeComponent, NotificationComponent, SupportedLanguagesComponent,OnlinePaymentComponent} from './serviceandopening/index';
import { OwnerDriversComponent, OwnerDriversupdateComponent,OwnerDriversaddComponent} from './ownerdrivers/index';
import { DriversComponent,DriveraddComponent, DriverupdateComponent} from './drivers/index';
import { PromotionsComponent, PromotionaddComponent, PromotionupdateComponent } from './promotions/promotions.component';
import { ForgetComponent,ResetPasswordAdminComponent } from './login/forgetPassword.component';
import { OwnerComponent,OwnerloginComponent,OwnerAutologinComponent,OwnerregisterComponent,OwnerprofileComponent,OwnerchangepasswordComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent } from './owner/owner.component';
import { LanguageComponent,LanguagelistComponent, LanguageaddComponent, LanguageupdateComponent } from './language/language.component';
import { FrontendHeaderComponent, FrontendComponent, FrontendDetailComponent, FrontendCartComponent, FrontendLoginComponent,FrontendForgetPasswordComponent,FrontendResetPasswordComponent,FrontendUserProfileComponent,FrontendChangePasswordComponent } from './frontend/frontend.component';
import { MarketingComponent,MarketingNavComponent } from './marketing/marketing.component';
import { ReportingComponent,ReportingnavComponent,ReportingoverviewComponent,ReportingMethodComponent,ReportingResultComponent,ReportingTypeComponent,ReportingPaymentMethodComponent,ReportingItemsComponent,ReportingItemCategoriesComponent,ReportingClientComponent,ReportingOrderComponent,ReportingDetailComponent,ReportingSaleDetailComponent} from './reporting/reporting.component';

@NgModule({
  declarations: [
    AppComponent,FileSelectDirective,
    HeaderComponent,
    HomeComponent,
    HeaderownerComponent,
    LoginComponent,
    AlertComponent,
    DashboardComponent,DashboardprofileComponent,
    UsersComponent,UsersupdateComponent,UsersaddComponent,AdminComponent,AdminaddComponent,AdminupdateComponent,
    OrderPipe,
    OwnerAutologinComponent,
    FilterPipe,
    DriversComponent,
    RestaurantOwnerOrderForLaterComponent,RestaurantOwnerPaymentOptionComponent,RestaurantOwnerDeliveryZoneComponent, KitchenMenuListComponent, KitchenMenuAddComponent, KitchenMenuUpdateComponent,KitchenitemComponent,KitchenMenuItemUpdateComponent,LegacyComponent,LegacycodeComponent, NotificationComponent, SupportedLanguagesComponent,OnlinePaymentComponent,
    DriveraddComponent,
    DriverupdateComponent,
    OwnerDriversComponent, OwnerDriversupdateComponent,OwnerDriversaddComponent,
    RestaurantsComponent,RestaurantaddComponent,RestaurantupdateComponent,RestaurantupdateownerComponent,RestaurantlocationComponent,RestaurantconfirmationComponent,
    RestaurantOwnerPickupComponent, RestaurantOwnerTaxationComponent, RestaurantOwnerOpeningHoursComponent,
    PromotionsComponent,
    PromotionaddComponent,
    PromotionupdateComponent,
    ForgetComponent,ResetPasswordAdminComponent,
    OwnerComponent,OwnerloginComponent,OwnerprofileComponent,OwnerregisterComponent,OwnerchangepasswordComponent,OwnermailactivateComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent,
    LanguageComponent,LanguagelistComponent, LanguageaddComponent, LanguageupdateComponent, 
    FrontendHeaderComponent, FrontendComponent, FrontendDetailComponent, FrontendCartComponent, FrontendLoginComponent, FrontendForgetPasswordComponent, FrontendResetPasswordComponent,FrontendUserProfileComponent, FrontendChangePasswordComponent,
    MarketingComponent, MarketingNavComponent, ReportingComponent,ReportingnavComponent,ReportingoverviewComponent,ReportingMethodComponent,ReportingResultComponent,ReportingTypeComponent,ReportingPaymentMethodComponent,ReportingItemsComponent,ReportingItemCategoriesComponent,ReportingClientComponent,ReportingOrderComponent,ReportingDetailComponent,ReportingSaleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    FlashMessagesModule,
    ChartsModule,
    TranslateModule.forRoot(),
  ],
  providers: [AuthGuard,OwnerAuthGuard,AlertService,UsersService,AuthService,DriversService,RestaurantsService,PromotionsService, KitchenMenuService,KitchenItemService,MasterService, CustomersService, OrderService],
  bootstrap: [AppComponent]
})

export class AppModule { }
