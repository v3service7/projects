import { Component } from '@angular/core';
import { ToastController, LoadingController, Nav, NavController, NavParams ,ViewController,MenuController} from 'ionic-angular';
import { CustomersService } from '../../app/service/customer.service';

import { LoginPage } from '../login/login';

@Component({
    selector: 'page-step',
    templateUrl: 'step.html',
})
export class StepPage {
    loading : any;
    user : any = {};
    preference : any = {};

    colorSelect : String = 'Black';
    colorSelectPref : String = 'Black';

    bodySelect : String = 'Petite';
    bodySelectPref : String = 'Petite';

    children : String = 'true';
    childrenPref : String = 'true';

    smoke : String = 'false';
    smokePref : String = 'false';

    drink : String = 'false';
    drinkPref : String = 'false';

    education : String = 'High School';
    educationPref : String = 'High School';

    typeOfWork : String = 'Aircraft Dispatcher';
    typeOfWorkPref : String = 'Aircraft Dispatcher';

    married : boolean;
    marriedPref : boolean;

    profileCompletePercent : number = 15;

    constructor(
        public nav: Nav,
        public loadingCtrl: LoadingController,
        public menuCtrl: MenuController,
        public navCtrl: NavController,
        private viewCtrl: ViewController,
        public toastCtrl: ToastController,
        private customerService: CustomersService,
        public navParams: NavParams
        ){
        this.showNextStep(0);
        this.user = JSON.parse(localStorage.getItem('user'));
        console.log(this.user)
        this.stringifyNumber();
    }

    private backgroundImage(){
        return ("url('assets/images/bgImage.jpg')");
    }

    private stringifyNumber(){
        this.profileCompletePercent = this.profileCompletePercent + 8;
    }

    private showNextStep(index){
        this.loading = this.loadingCtrl.create({
            content: 'Saving...'
        });
        this.loading.present();
        setTimeout(()=>{
            var step = document.querySelectorAll("[id^=step]");
            for(var i=0; i<step.length; i++){
                (<HTMLInputElement>step[i]).style.display = "none";
            }
            (<HTMLInputElement>step[index]).style.display = "block";
            this.loading.dismiss();
        }, 1000);
    }

    private height(event){
        this.user['height'] = event.target.value;
    }

    private addData(type){
        if (type == 'height') {
            if (typeof this.user['height'] == 'undefined' || this.user['height'] == "") {
                this.user['height'] = null;
            }else{
                this.stringifyNumber();
            }
            this.showNextStep(1);
        }

        if (type == 'haircolor') {
            this.hairColorFunction();
            this.stringifyNumber();
            this.showNextStep(2);
        }

        if (type == 'bodyshape') {
            this.bodyFunction();
            this.stringifyNumber();
            this.showNextStep(3);
        }

        if (type == 'maritalStatus') {
            this.user['maritalStatus'] = this.married;
            this.haveChildren();
            this.stringifyNumber();
            this.showNextStep(4);
        }

        if (type == 'smoke') {
            this.smoker();
            this.stringifyNumber();
            this.showNextStep(5);
        }

        if (type == 'drink') {
            this.drinker();
            this.stringifyNumber();
            this.showNextStep(6);
        }

        if (type == 'prof') {
            this.profession();
            this.stringifyNumber();
            this.showNextStep(7);
        }
       }

    private skipStep(type){
        if (type == 'height') {
            this.user['height'] = null;
            this.showNextStep(1);
        }
        if (type == 'haircolor') {
            this.user['haircolor'] = null;
            this.showNextStep(2);
        }
        if (type == 'bodyshape') {
            this.user['bodyshape'] = null;
            this.showNextStep(3);
        }
        if (type == 'maritalStatus') {
            this.user['maritalStatus'] = null;
            this.user['haveChildren'] = null;
            this.showNextStep(4);
        }
        if (type == 'smoke') {
            this.user['smoke'] = null;
            this.showNextStep(5);
        }
        if (type == 'drink') {
            this.user['drink'] = null;
            this.showNextStep(6);
        }        
        if (type == 'prof') {
            this.user['profession'] = null;
            this.showNextStep(7);
        }
       }

    private hairColorFunction(){
        console.log(this.colorSelect);
        this.user['haircolor'] = this.colorSelect;       
        }

    private bodyFunction(){
        this.user['bodyshape'] = this.bodySelect;
    }

    private  maritalS(type){
        this.married = type;
        this.user['maritalStatus'] = this.married;
        }

    private haveChildren(){
        if (this.married) {
            if(this.children == 'false'){
                this.user['haveChildren'] = false;
            }else{
                this.user['haveChildren'] = true;
            }
        }
       }

    private smoker(){
        if(this.smoke == 'false'){
            this.user['smoke'] = false;
        }else{
            this.user['smoke'] = true;
        }
        }

    private drinker(){
        if(this.drink == 'false'){
            this.user['drink'] = false;
        }else{
            this.user['drink'] = true;
        }
        }

    private profession(){
        this.user['profession'] = this.typeOfWork;
        }


   /* Start Preferences  */

    private minheightPref(event){
        this.preference['minheight'] = event.target.value;
    } 
    private maxheightPref(event){
        this.preference['maxheight'] = event.target.value;
    }

    private hairColorFunctionPref(){
        this.preference['haircolor'] = this.colorSelectPref;
    }

    private bodyFunctionPref(){
        this.preference['bodyshape'] = this.bodySelectPref;
    }
   

    private addDataPref(type){

         console.log(type);

        if (type == 'minheight') {
            if (typeof this.preference['minheight'] == 'undefined' || this.preference['minheight'] == "") {
            this.preference['minheight'] = null;
            }else{
            this.stringifyNumber();
            }  
            this.showNextStep(8);          
          }

        if (type == 'maxheight') {
            if (typeof this.preference['maxheight'] == 'undefined' || this.preference['maxheight'] == "") {
            this.preference['maxheight'] = null;
            }else{
            this.stringifyNumber();
            }
            this.showNextStep(8);
        }

        if (type == 'haircolor') {
            this.hairColorFunctionPref();
            this.stringifyNumber();
            this.showNextStep(9);
        }

        if (type == 'bodyshape') {
            this.bodyFunctionPref();
            this.stringifyNumber();
            this.showNextStep(10);
        }
    }

    private skipStepPref(type){
        if (type == 'minheight') {
            this.preference['minheight'] = null;
            this.showNextStep(8);
        }
        if (type == 'maxheight') {
            this.preference['maxheight'] = null;
            this.showNextStep(8);
        }
        if (type == 'haircolor') {
            this.preference['haircolor'] = null;
            this.showNextStep(9);
        }
        if (type == 'bodyshape') {
            this.preference['bodyshape'] = null;
            this.showNextStep(10);
        }
    }

    private activateAccount(){
        this.user['preferences'] = this.preference;
        this.user['profileCompletePercent'] = this.profileCompletePercent;

        this.customerService.updateCustomer(this.user).subscribe((data)=>{
            if (!data.error) {
                this.customerService.addactivate(data.message).subscribe((dataq) => {
                    console.log("dataq");
                    console.log(dataq);
                    this.nav.setRoot(LoginPage);
                });
            }
        })
    }
   
    private goToLoginPage(){
    this.nav.setRoot(LoginPage);
    }

}
