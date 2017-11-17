import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {HttpModule, Http} from "@angular/http";
import { RouterModule, Routes } from '@angular/router';
import {InlineEditorModule} from 'ng2-inline-editor';
/*import { FileUploadModule, FileDropDirective } from 'ng2-file-upload';*/
import {TranslateModule, TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from "@ngx-translate/http-loader";
/*import { ChartsModule } from 'ng2-charts';*/
import { ChartsModule } from 'ng2-charts/ng2-charts';
import { DragDropDirectiveModule } from "angular4-drag-drop";
import { FileUploadModule , FileDropDirective } from 'ng2-file-upload';

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
import { RestaurantOwnerPickupComponent, RestaurantOwnerOrderForLaterComponent, RestaurantOwnerTaxationComponent, RestaurantOwnerPaymentOptionComponent, RestaurantOwnerOpeningHoursComponent, RestaurantOwnerDeliveryZoneComponent, KitchenMenuListComponent,LegacyComponent,LegacycodeComponent, NotificationComponent, SupportedLanguagesComponent, DeliveryOutsideComponent, OnlinePaymentComponent, CustomMessageComponent} from './serviceandopening/index';
import { OwnerDriversComponent, DriverOrdersComponent, OwnerDriversupdateComponent,OwnerDriversaddComponent} from './ownerdrivers/index';
import { DriversComponent,DriveraddComponent, DriverupdateComponent} from './drivers/index';
import { PromotionsComponent, PromotionaddComponent, PromotionupdateComponent } from './promotions/promotions.component';
import { ForgetComponent,ResetPasswordAdminComponent } from './login/forgetPassword.component';
import { OwnerComponent,OwnerloginComponent,OwnerAutologinComponent,OwnerregisterComponent,OwnerprofileComponent,OwnerchangepasswordComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent } from './owner/owner.component';
import { LanguageComponent,LanguagelistComponent, LanguageaddComponent, LanguageupdateComponent } from './language/language.component';
import { FrontendHeaderComponent, FrontendComponent, FrontendDetailComponent, FrontendCartComponent, FrontendPromoDetailComponent, FrontendLoginComponent,FrontendForgetPasswordComponent,FrontendResetPasswordComponent,FrontendUserProfileComponent,FrontendChangePasswordComponent, FrontendThankuPageComponent } from './frontend/frontend.component';
import { MarketingComponent,MarketingNavComponent,MarketingOverviewComponent,MarketingPromotionsComponent, MarketingEditPromotionComponent, MarketingPromotionsListComponent, MarketingPromotionsTemplateComponent, MarketingPromotionsSubscriptionComponent, MarketingStatsComponent } from './marketing/marketing.component';
import { ReportingComponent,ReportingnavComponent,ReportingoverviewComponent,ReportingMethodComponent,ReportingResultComponent,ReportingTypeComponent,ReportingPaymentMethodComponent,ReportingItemsComponent,ReportingItemCategoriesComponent,ReportingClientComponent,ReportingOrderComponent,ReportingDetailComponent,ReportingSaleDetailComponent} from './reporting/reporting.component';

export function HttpLoaderFactory(http: Http) {
    return new TranslateHttpLoader(http);
}
@NgModule({
  declarations: [
    AppComponent,
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
    RestaurantOwnerOrderForLaterComponent,RestaurantOwnerPaymentOptionComponent,RestaurantOwnerDeliveryZoneComponent, KitchenMenuListComponent,LegacyComponent,LegacycodeComponent, NotificationComponent, SupportedLanguagesComponent, DeliveryOutsideComponent, OnlinePaymentComponent,CustomMessageComponent,
    DriveraddComponent,
    DriverupdateComponent,
    OwnerDriversComponent, DriverOrdersComponent, OwnerDriversupdateComponent,OwnerDriversaddComponent,
    RestaurantsComponent,RestaurantaddComponent,RestaurantupdateComponent,RestaurantupdateownerComponent,RestaurantlocationComponent,RestaurantconfirmationComponent,
    RestaurantOwnerPickupComponent, RestaurantOwnerTaxationComponent, RestaurantOwnerOpeningHoursComponent,
    PromotionsComponent,
    PromotionaddComponent,
    PromotionupdateComponent,
    ForgetComponent,ResetPasswordAdminComponent,
    OwnerComponent,OwnerloginComponent,OwnerprofileComponent,OwnerregisterComponent,OwnerchangepasswordComponent,OwnermailactivateComponent,ForgetOwnerComponent,ResetPasswordOwnerComponent,
    LanguageComponent,LanguagelistComponent, LanguageaddComponent, LanguageupdateComponent, 
    FrontendHeaderComponent, FrontendComponent, FrontendDetailComponent, FrontendCartComponent,FrontendPromoDetailComponent, FrontendLoginComponent, FrontendForgetPasswordComponent, FrontendResetPasswordComponent,FrontendUserProfileComponent, FrontendChangePasswordComponent,FrontendThankuPageComponent,
    MarketingComponent, MarketingNavComponent, MarketingOverviewComponent, MarketingPromotionsComponent, MarketingEditPromotionComponent, MarketingPromotionsListComponent, MarketingPromotionsTemplateComponent,MarketingPromotionsSubscriptionComponent, MarketingStatsComponent,
    ReportingComponent,ReportingnavComponent,ReportingoverviewComponent,ReportingMethodComponent,ReportingResultComponent,ReportingTypeComponent,ReportingPaymentMethodComponent,ReportingItemsComponent,ReportingItemCategoriesComponent,ReportingClientComponent,ReportingOrderComponent,ReportingDetailComponent,ReportingSaleDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing,
    ReactiveFormsModule,
    DragDropDirectiveModule,
    InlineEditorModule,
    //FlashMessagesModule,
    ChartsModule,
    FileUploadModule,
    //TranslateModule.forRoot(),
    TranslateModule.forRoot({
          loader: {
            provide: TranslateLoader,
            useFactory: HttpLoaderFactory,
            deps: [Http]
          }
        })
  ],
  exports: [FileUploadModule],
  providers: [AuthGuard,OwnerAuthGuard,AlertService,UsersService,AuthService,DriversService,RestaurantsService,PromotionsService, KitchenMenuService,KitchenItemService,MasterService, CustomersService, OrderService],
  bootstrap: [AppComponent]
})

export class AppModule { }
