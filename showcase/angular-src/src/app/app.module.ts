import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { TinymceModule } from 'angular2-tinymce';
import { SelectModule } from 'angular2-select';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { FileUploadModule , FileDropDirective } from 'ng2-file-upload';
import { Angular2SocialLoginModule, AuthService } from 'angular2-social-login';
import { ImageCropperModule } from 'ngx-image-cropper';
//import { MasonryModule } from 'angular2-masonry';
import { MdCardModule } from '@angular2-material/card';


// Admin Component
import { AdminComponent } from './admin/admin.component';
import { HeaderComponent } from './admin/header/header.component';
import { SidebarComponent } from './admin/sidebar/sidebar.component';
import { LoginComponent } from './admin/login/login.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ProfileComponent } from './admin/profile/profile.component';
import { ForgotPasswordComponent, AdminResetPasswordComponent } from './admin/forgot-password/forgot-password.component';
// tslint:disable-next-line:max-line-length
import { AdminCustomerComponent, CustomerListComponent, CustomerAddComponent, CustomerEditComponent, AdminUserBoardsComponent, AdminUserBoardsBookmarkComponent } from './admin/customer/customer.component';
import { AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent } from './admin/plan/plan.component';
import { AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent } from './admin/pages/pages.component';

// Frontend Component
import { FrontendComponent } from './frontend/frontend.component';
import { FrontendHeaderComponent } from './frontend/header/frontendheader.component';
import { FrontendHomeComponent, ResetComponent, AccountActiveComponent } from './frontend/home/frontendhome.component';
// tslint:disable-next-line:max-line-length
import { FrontendDashboardComponent, ViewPublicComponent, MyProfileComponent, SettingComponent, ProfileHeaderComponent, ViewComponent } from './frontend/dashboard/frontenddashboard.component'

import {ValidateService} from './services/validate.service';
import {AdminService} from './services/admin.service';
import {UserService} from './services/user.service';
import {PlanService} from './services/plan.service';
import {CategoryService} from './services/category.service';
import {BookmarkService} from './services/bookmark.service';
import { PagesService} from './services/pages.service';
import { PurchaseplanService } from './services/purchaseplan.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FlashMessagesModule} from 'angular2-flash-messages';
import {AuthGuard} from './guards/admin.guard';
import {UserGuard} from './guards/user.guard';
import { Ng2OrderModule } from 'ng2-order-pipe';
import * as globalVariable from './global';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { routing } from './app.routes';
import { SafePipe } from './safe.pipe';
import { ShareButtonsModule } from 'ng2-sharebuttons';
import { PublicComponent } from './public/public.component';
import { ClipboardModule } from 'ngx-clipboard';
import { UiSwitchModule } from 'ngx-ui-switch';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SafeHtmlPipe } from './safe-html.pipe';
import { LoadingModule, ANIMATION_TYPES  } from 'ngx-loading';
let providers = {
    'google': {
      'clientId': globalVariable.GoogleClientId
    }
};

@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    LoginComponent,
    HeaderComponent,
    DashboardComponent,
    ProfileComponent,
    AdminCustomerComponent, CustomerListComponent, CustomerAddComponent, CustomerEditComponent,
    ForgotPasswordComponent, AdminResetPasswordComponent,
    SidebarComponent,
    AdminPlanComponent, PlanListComponent, PlanAddComponent, PlanEditComponent,
    AdminPagesComponent, PagesListComponent , PagesAddComponent, PagesEditComponent,
    FrontendComponent,
    FrontendHeaderComponent,
    FrontendHomeComponent, ResetComponent,
    AccountActiveComponent,
    FrontendDashboardComponent, MyProfileComponent, ViewPublicComponent,
    SettingComponent,
    ProfileHeaderComponent,
    AdminUserBoardsComponent,
    AdminUserBoardsBookmarkComponent,
    ViewComponent,
    SafePipe,
    PublicComponent,
    SafeHtmlPipe
  ],
  imports: [
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.rectangleBounce,
      backdropBackgroundColour: '#fff',
      backdropBorderRadius: '4px',
      primaryColour: '#142954',
      secondaryColour: '#142954',
      tertiaryColour: '#142954'
    }),
    InfiniteScrollModule,
    UiSwitchModule,
    ClipboardModule,
    ImageCropperModule,
    /*MasonryModule,*/
    MdCardModule,
    BrowserModule,
    FormsModule,
    TinymceModule.withConfig({}),
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    routing,
    FlashMessagesModule,
    FileUploadModule,
    SelectModule,
    Ng2OrderModule,
    Ng2SearchPipeModule,
    BrowserAnimationsModule,
    ToastModule.forRoot(),
    HttpClientModule,      // (Required) for share counts
    HttpClientJsonpModule, // (Optional) For linkedIn & Tumblr counts
    ShareButtonsModule.forRoot()
  ],
  // tslint:disable-next-line:max-line-length
  providers: [AuthService, ValidateService, CategoryService, BookmarkService, AdminService, AuthGuard, UserGuard, UserService, PlanService, PagesService, PurchaseplanService],
  bootstrap: [AppComponent]
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(providers);