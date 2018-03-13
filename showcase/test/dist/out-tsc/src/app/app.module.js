"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var app_component_1 = require("./app.component");
var angular2_tinymce_1 = require("angular2-tinymce");
var angular2_select_1 = require("angular2-select");
var ng2_search_filter_1 = require("ng2-search-filter");
// Admin Component
var admin_component_1 = require("./admin/admin.component");
var header_component_1 = require("./admin/header/header.component");
var sidebar_component_1 = require("./admin/sidebar/sidebar.component");
var login_component_1 = require("./admin/login/login.component");
var dashboard_component_1 = require("./admin/dashboard/dashboard.component");
var profile_component_1 = require("./admin/profile/profile.component");
var forgot_password_component_1 = require("./admin/forgot-password/forgot-password.component");
var customer_component_1 = require("./admin/customer/customer.component");
var plan_component_1 = require("./admin/plan/plan.component");
var pages_component_1 = require("./admin/pages/pages.component");
var exchange_component_1 = require("./admin/exchanges/exchange.component");
var exchangeapi_component_1 = require("./admin/exchangeapi/exchangeapi.component");
var accountdetail_component_1 = require("./admin/accountdetail/accountdetail.component");
// Frontend Component
var frontend_component_1 = require("./frontend/frontend.component");
var home_component_1 = require("./frontend/home/home.component");
var signup_component_1 = require("./frontend/signup/signup.component");
var userlogin_component_1 = require("./frontend/userlogin/userlogin.component");
var frontheader_component_1 = require("./frontend/frontheader/frontheader.component");
var frontfooter_component_1 = require("./frontend/frontfooter/frontfooter.component");
var myprofile_component_1 = require("./frontend/myprofile/myprofile.component");
var forgot_component_1 = require("./frontend/forgot/forgot.component");
var userdashboard_component_1 = require("./frontend/userdashboard/userdashboard.component");
var success_component_1 = require("./frontend/success/success.component");
var cancel_component_1 = require("./frontend/cancel/cancel.component");
var validate_service_1 = require("./services/validate.service");
var admin_service_1 = require("./services/admin.service");
var user_service_1 = require("./services/user.service");
var plan_service_1 = require("./services/plan.service");
var pages_service_1 = require("./services/pages.service");
var purchaseplan_service_1 = require("./services/purchaseplan.service");
var exchange_service_1 = require("./services/exchange.service");
var exchangeapi_service_1 = require("./services/exchangeapi.service");
var bittrex_service_1 = require("./services/bittrex.service");
var binance_service_1 = require("./services/binance.service");
var tradealert_service_1 = require("./services/tradealert.service");
var angular2_flash_messages_1 = require("angular2-flash-messages");
var admin_guard_1 = require("./guards/admin.guard");
var user_guard_1 = require("./guards/user.guard");
var ng2_order_pipe_1 = require("ng2-order-pipe");
var ng_socket_io_1 = require("ng-socket-io");
var globalVariable = require("./global");
var config = { url: globalVariable.url, options: {} };
var appRoutes = [
    {
        path: 'admin', component: admin_component_1.AdminComponent, children: [
            { path: '', component: login_component_1.LoginComponent },
            { path: 'login', component: login_component_1.LoginComponent },
            { path: 'forgotpassword', component: forgot_password_component_1.ForgotPasswordComponent },
            { path: 'resetpassword/:id', component: forgot_password_component_1.AdminResetPasswordComponent },
            { path: 'dashboard', component: dashboard_component_1.DashboardComponent, canActivate: [admin_guard_1.AuthGuard] },
            { path: 'profile', component: profile_component_1.ProfileComponent, canActivate: [admin_guard_1.AuthGuard] },
            { path: 'pages', component: pages_component_1.AdminPagesComponent, canActivate: [admin_guard_1.AuthGuard], children: [
                    { path: '', component: pages_component_1.PagesListComponent, },
                    { path: 'add', component: pages_component_1.PagesAddComponent, },
                    { path: ':id', component: pages_component_1.PagesEditComponent, },
                ] },
            { path: 'user', component: customer_component_1.AdminCustomerComponent, canActivate: [admin_guard_1.AuthGuard], children: [
                    { path: '', component: customer_component_1.CustomerListComponent, },
                    { path: 'add', component: customer_component_1.CustomerAddComponent, },
                    { path: ':id', component: customer_component_1.CustomerEditComponent, },
                ] },
            { path: 'plan', component: plan_component_1.AdminPlanComponent, canActivate: [admin_guard_1.AuthGuard], children: [
                    { path: '', component: plan_component_1.PlanListComponent, },
                    { path: 'add', component: plan_component_1.PlanAddComponent, },
                    { path: ':id', component: plan_component_1.PlanEditComponent, },
                ] },
            { path: 'exchange', component: exchange_component_1.AdminExchangeComponent, canActivate: [admin_guard_1.AuthGuard], children: [
                    { path: '', component: exchange_component_1.ExchangeListComponent, },
                    { path: 'add', component: exchange_component_1.ExchangeAddComponent, },
                    { path: ':id', component: exchange_component_1.ExchangeEditComponent, },
                ] },
            { path: 'exchangeapi', component: exchangeapi_component_1.AdminExchangeapiComponent, canActivate: [admin_guard_1.AuthGuard], children: [
                    { path: '', component: exchangeapi_component_1.ExchangeapiListComponent, },
                    { path: 'add', component: exchangeapi_component_1.ExchangeapiAddComponent, },
                    { path: ':id', component: exchangeapi_component_1.ExchangeapiEditComponent, },
                ] },
            { path: 'accountdetail', component: accountdetail_component_1.AdminAccountdetailComponent, canActivate: [admin_guard_1.AuthGuard], children: [
                    { path: '', component: accountdetail_component_1.AccountdetailListComponent, },
                ] },
        ]
    },
    {
        path: '', component: frontend_component_1.FrontendComponent, children: [
            { path: '', component: home_component_1.HomeComponent },
            { path: 'login', component: userlogin_component_1.UserloginComponent },
            { path: 'signup', component: signup_component_1.SignupComponent },
            { path: 'dashboard', component: userdashboard_component_1.UserdashboardComponent, canActivate: [user_guard_1.UserGuard] },
            { path: 'forgotpassword', component: forgot_component_1.ForgotComponent },
            { path: 'profile', component: myprofile_component_1.MyprofileComponent, canActivate: [user_guard_1.UserGuard] },
            { path: 'resetpassword/:id', component: forgot_component_1.ResetComponent },
            { path: 'success', component: success_component_1.SuccessComponent, canActivate: [user_guard_1.UserGuard] },
            { path: 'cancel', component: cancel_component_1.CancelComponent, canActivate: [user_guard_1.UserGuard] },
        ]
    }
];
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent,
            admin_component_1.AdminComponent,
            login_component_1.LoginComponent,
            header_component_1.HeaderComponent,
            dashboard_component_1.DashboardComponent,
            profile_component_1.ProfileComponent,
            customer_component_1.AdminCustomerComponent, customer_component_1.CustomerListComponent, customer_component_1.CustomerAddComponent, customer_component_1.CustomerEditComponent,
            forgot_password_component_1.ForgotPasswordComponent, forgot_password_component_1.AdminResetPasswordComponent,
            accountdetail_component_1.AdminAccountdetailComponent, accountdetail_component_1.AccountdetailListComponent,
            sidebar_component_1.SidebarComponent,
            plan_component_1.AdminPlanComponent, plan_component_1.PlanListComponent, plan_component_1.PlanAddComponent, plan_component_1.PlanEditComponent,
            pages_component_1.AdminPagesComponent, pages_component_1.PagesListComponent, pages_component_1.PagesAddComponent, pages_component_1.PagesEditComponent,
            exchange_component_1.AdminExchangeComponent, exchange_component_1.ExchangeListComponent, exchange_component_1.ExchangeAddComponent, exchange_component_1.ExchangeEditComponent,
            exchangeapi_component_1.AdminExchangeapiComponent, exchangeapi_component_1.ExchangeapiListComponent, exchangeapi_component_1.ExchangeapiAddComponent, exchangeapi_component_1.ExchangeapiEditComponent,
            frontend_component_1.FrontendComponent,
            frontheader_component_1.FrontheaderComponent,
            home_component_1.HomeComponent,
            signup_component_1.SignupComponent,
            forgot_component_1.ResetComponent,
            userlogin_component_1.UserloginComponent, frontfooter_component_1.FrontfooterComponent, myprofile_component_1.MyprofileComponent, forgot_component_1.ForgotComponent, success_component_1.SuccessComponent, cancel_component_1.CancelComponent,
            userdashboard_component_1.UserdashboardComponent
        ],
        imports: [
            platform_browser_1.BrowserModule,
            forms_1.FormsModule,
            angular2_tinymce_1.TinymceModule.withConfig({}),
            forms_1.ReactiveFormsModule,
            http_1.HttpModule,
            router_1.RouterModule.forRoot(appRoutes),
            angular2_flash_messages_1.FlashMessagesModule,
            angular2_select_1.SelectModule,
            ng2_order_pipe_1.Ng2OrderModule,
            ng_socket_io_1.SocketIoModule.forRoot(config),
            ng2_search_filter_1.Ng2SearchPipeModule
        ],
        providers: [bittrex_service_1.BittrexService, binance_service_1.BinanceService, tradealert_service_1.TradeAlertService, validate_service_1.ValidateService, admin_service_1.AdminService, admin_guard_1.AuthGuard, user_guard_1.UserGuard, user_service_1.UserService, plan_service_1.PlanService, pages_service_1.PagesService, exchange_service_1.ExchangeService, exchangeapi_service_1.ExchangeapiService, purchaseplan_service_1.PurchaseplanService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map