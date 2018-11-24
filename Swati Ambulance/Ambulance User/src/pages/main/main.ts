import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Nav, MenuController, ToastController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { PanicService } from '../../app/services/panic.service';
import { Geolocation } from '@ionic-native/geolocation';
import { MapPage } from '../map/map';

declare var FCMPlugin : any;
declare var google: any;

/**
 * Generated class for the MainPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  @ViewChild('animationDiv') animationDiv;
	name: string;
	msg: string;
  firestore = firebase.database().ref('/panic');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    private panicService: PanicService,
    public nav: Nav,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public afd: AngularFireDatabase,
    private geolocation: Geolocation) {

    menu.enable(true);
  	var user = JSON.parse(localStorage.getItem('user'));
  	this.name = user.firstname;
  }

  ionViewDidLoad() {
    if (typeof this.animationDiv != 'undefined') {
      this.animationDiv.nativeElement.style.display = 'none';
    }
  }

  helpButton() {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.msg = "SEARCHING FOR NEARBY HELP. PLEASE HAVE PATIENCE....";
      
      let latlng = {lat: resp.coords.latitude, lng: resp.coords.longitude};
      let geocoder = new google.maps.Geocoder;
      geocoder.geocode({'location': latlng}, (results, status) => {
        var locationData = {};
        if(status=="OK" && results.length>0)
          locationData['address'] = results[0].formatted_address;
        else
          locationData['address'] = "";
        locationData['lat'] = resp.coords.latitude;
        locationData['lng'] = resp.coords.longitude;

        var panic = {};
        panic['user'] = JSON.parse(localStorage.getItem('user'));
        panic['userLocation'] = locationData;

       // resp.coords.longitude
        this.panicService.panicAdd(panic).subscribe(
          (data) => {
            if (!data.error) {
              if (typeof this.animationDiv != 'undefined') {
                this.animationDiv.nativeElement.style.display = 'block';
              }
              
              this.tokensetup().then((token) => {
                this.storetoken(token, data.message);
              });
              let count = 0;  
              var checkPanicStatus = setInterval(()=>{
                count++;
                console.log("checkPanicStatus", count);
                this.panicService.panic(data.message._id).subscribe(
                  (data2) => {
                    if (!data2.error) {
                      if(typeof data2.message.status !== 'undefined' && data2.message.status==1)
                      {
                        clearInterval(checkPanicStatus);
                        this.nav.setRoot(MapPage, {panicID:data.message._id});                      
                      }
                      if(count>10){
                        this.msg = "No Driver Found...";
                        if (typeof this.animationDiv != 'undefined') {
                          this.animationDiv.nativeElement.style.display = 'none';
                        }
                        clearInterval(checkPanicStatus);
                      }
                    }
                  });
              }, 20000);

            }else {
              this.msg = "";
              this.getToast("Unable to handle your request. Please try again!");
            }
          },(err) => {
            this.msg = "";
            this.getToast('Unable to process request, please check your connection !');
          });

      });     

    }).catch((error) => {
      this.msg = "";
      this.getToast('Unable to process request, please check your connection !');
    });    

  }

  tokensetup() {
    var promise = new Promise((resolve, reject) => {
      FCMPlugin.getToken(function(token){
        resolve(token);
      }, (err) => {
        reject(err);
      });
    })
    return promise;
  }

  storetoken(token, data) {
    this.afd.list(this.firestore).push({
      devtoken: token,
      panic: data      
      }).then(() => {
        //alert('Token stored');
        })/*.catch(() => {
          alert('Token not stored');
        })*/
  }

  getToast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
