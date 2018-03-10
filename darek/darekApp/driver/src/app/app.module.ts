import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
/*import { Network } from '@ionic-native/network';*/
import { HttpModule } from '@angular/http';
import { MyApp } from './app.component';
import { ListPage } from '../pages/list/list';
import { LoginPage } from '../pages/login/login';
import { OrderPage } from '../pages/order/order';
import { OrderDetailPage } from '../pages/order/order';
import { FilterPage } from '../pages/filter/filter';
import { ProfilePage, ChangePasswordPage, ProfileEditPage } from '../pages/profile/profile';
import { SignupPage } from '../pages/signup/signup';
import { RestaurantsPage } from '../pages/restaurants/restaurants';
import { ForgetPasswordPage } from '../pages/forget-password/forget-password';
import { OneService } from '../services/one.service';
import { TwoService } from '../services/two.service';
import { ThreeService } from '../services/three.service';
import { FourService } from '../services/four.service';
import { LocationService } from '../services/location.service';
import { Geolocation } from '@ionic-native/geolocation';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { FileUploadModule, FileSelectDirective  } from 'ng2-file-upload';
import { File } from "@ionic-native/file";
import { Transfer } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
@NgModule({
  declarations: [
    MyApp,
    ListPage,
    LoginPage,
    ForgetPasswordPage,
    OrderPage,
    FilterPage,
    ProfilePage,
    OrderDetailPage,
    SignupPage,
    ProfileEditPage,
    ChangePasswordPage,
    RestaurantsPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FileUploadModule,
    IonicModule.forRoot(MyApp)
  ],
  exports: [FileUploadModule],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ListPage,
    LoginPage,
    ForgetPasswordPage,
    OrderPage,
    FilterPage,
    ProfilePage,
    OrderDetailPage,
    SignupPage,
    ProfileEditPage,

    ChangePasswordPage,
    RestaurantsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    /*Network,*/
    OneService,
    TwoService,
    ThreeService,
    FourService,
    LocationService,
    Geolocation,
    BackgroundGeolocation,
    File,
    Transfer,
    Camera,
    FilePath,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
