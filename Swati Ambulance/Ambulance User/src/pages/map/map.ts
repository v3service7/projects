import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, MenuController } from 'ionic-angular';
import { PanicService } from '../../app/services/panic.service';

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

  constructor(
  	public navCtrl: NavController, 
  	public navParams: NavParams,
  	public menu: MenuController,
  	private panicService: PanicService,
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
    console.log("map display");
    var myLatLng = {lat: parseFloat(userLocation.lat), lng: parseFloat(userLocation.lng)};
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: myLatLng
    });
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: userLocation.address,
        destination: driverLocation.address,
        travelMode: 'DRIVING'
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

}
