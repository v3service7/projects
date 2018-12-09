import { Component } from '@angular/core';
import { NavController, NavParams, Nav, ToastController, MenuController, AlertController } from 'ionic-angular';
import { PanicService } from '../../app/services/panic.service';


import { MainPage } from '../main/main';




import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

declare var google: any;

/**
 * Generated class for the MapPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  myPanic:any;
  firestore = firebase.database().ref('/panic');

  constructor(
    public navCtrl: NavController, 
  	public nav: Nav, 
  	public navParams: NavParams,
  	public menu: MenuController,
  	private panicService: PanicService,
    public afd: AngularFireDatabase,
    public alertCtrl: AlertController,
  	public toastCtrl: ToastController) {

    let id = navParams.get('panicID');
  	menu.enable(true);    
  	this.getPanicDetail(id);

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MapPage');
  }

  getPanicDetail(id) {
    this.panicService.panic(id).subscribe(
      (data) => {
        console.log(data);
        if (!data.error) {
          this.myPanic = data.message; 
        	setTimeout(()=>{
            this.initMap(data.message.userLocation, data.message.driverLocation);  
          }, 7000);
        }else {
          this.getToast("Unable to process request, please check your connection !");
        }
      },(err) => {
        this.getToast('Unable to process request, please check your connection !');
    });
  }

  initMap(userLocation, driverLocation) {
    var myLatLng = new google.maps.LatLng(parseFloat(userLocation.lat), parseFloat(userLocation.lng));
    let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: userLocation.address
    });
    
    var myLatLng2 = new google.maps.LatLng(parseFloat(driverLocation.lat), parseFloat(driverLocation.lng));
    let marker2 = new google.maps.Marker({
      position: myLatLng2,
      map: map,
      title: driverLocation.address
    });


    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: myLatLng
    });
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: new google.maps.LatLng(parseFloat(driverLocation.lat), parseFloat(driverLocation.lng)),
        destination: new google.maps.LatLng(parseFloat(userLocation.lat), parseFloat(userLocation.lng)),
        travelMode: google.maps.DirectionsTravelMode.DRIVING
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });
  }

  getToast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }



  cancePanic(){

    let confirmAlert = this.alertCtrl.create({
      title: 'Cancel Panic Request?',
      message: 'Are your sure you want to cancel your panic request?',
      buttons: [{
        text: 'Cancel',
        role: 'cancel'
      }, {
        text: 'Yes',
        handler: () => {
          var panic = {};
          panic['_id'] = this.myPanic['_id'];
          panic['status'] = 0;
          this.panicService.panicUpdate(panic).subscribe((data) => {
            if (!data.error) {
              /*this.updateFirebase(this.myPanic['_id']);*/
              this.nav.setRoot(MainPage);
            }
          })
        }
      }]
    });
    confirmAlert.present();
  }

  /*updateFirebase(id) {
    let itemRef = this.afd.object('panic');
    var d = Math.floor(Date.now() / 1000);
    var key;
    itemRef.snapshotChanges().subscribe(action => {
      let arr = action.payload.val();
      for (var k in arr){
        if (arr.hasOwnProperty(k)) {
          if(arr[k].panic._id == id)
          {
            console.log("match done", k);  
            key = k;
            break;
          }
        }
      }
    });
    setTimeout(()=>{
      if (typeof key != 'undefined' && key != null) {
        this.afd.list(this.firestore).remove(key).then(() => {
          console.log("Firebase Panic Deleted by user himself => ", key)
        }); 
      }
    })
  }*/

}
