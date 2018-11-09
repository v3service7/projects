import { Component } from '@angular/core';
import { NavController, NavParams, Nav, MenuController, AlertController, ToastController } from 'ionic-angular';
import { PanicService } from '../../app/services/panic.service';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

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
	name: string;
  isAccept = '0';
  panics = [];
  loader: any;
  panicID: any;
  myPanic:any;
  firestore = firebase.database().ref('/panic');

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams, 
    public nav: Nav,
    private panicService: PanicService,
    public menu: MenuController,
    public toastCtrl: ToastController,
    public alertCtrl: AlertController,
    private geolocation: Geolocation,
    public loadingCtrl: LoadingController,
    public afd: AngularFireDatabase) {

      menu.enable(true);
    	var user = JSON.parse(localStorage.getItem('user'));
    	this.name = user.firstname; 

      this.getPanics();
      this.getMyPanics();
  }

  ionViewDidLoad() {
    var that = this;
    console.log('ionViewDidLoad MainPage');
    FCMPlugin.onNotification(function(data){
      console.log(data);
      if(data.wasTapped){
        alert(JSON.stringify(data));
      }else{
        // App is Running
        //alert(JSON.stringify(data));
        let confirmAlert = that.alertCtrl.create({
          title: 'Patient Notification',
          message: data.message,
          buttons: [{
              text: 'Cancel',
              role: 'cancel'
              /*handler: () => {
                this.getPanics();
                this.getMyPanics();
                confirmAlert.dismiss();
              }*/
          }, {
              text: 'Accept',
              handler: () => {
                that.chkRequestAccept(data.panicID);
              }
          }]
        });
        confirmAlert.present();
      }
      },
      function(msg){
        console.log('onNotification callback successfully registered: ' + msg);
      },
      function(err){
        console.log('Error registering onNotification callback: ' + err);
    });
    
    FCMPlugin.onTokenRefresh(function(token){
        alert( "onTokenRefresh" );
    });  

  }

  chkRequestAccept(id) {
    this.panicService.panic(id).subscribe(
      (data) => {
        if (!data.error) {
          if(data.message.status==0) {
            this.loader = this.loadingCtrl.create({
              content: "Please wait..."
            });
            this.loader.present();
            this.requestAccept(id);
          }
          else
            this.getToast("Request already accepted by other user!");
        }else {
          this.getToast("Unable to process request, please check your connection !");
        }
      },(err) => {
        this.getToast('Unable to process request, please check your connection !');
    });
  }

  requestAccept(id)  {

    this.geolocation.getCurrentPosition().then((resp) => {
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

        const myDate = new Date();

        var panic = {};
        panic['_id'] = id;
        panic['driver'] = JSON.parse(localStorage.getItem('user'));
        panic['driverLocation'] = locationData;
        panic['driverReached_at'] = myDate;
        panic['status'] = 1;

        this.panicService.panicUpdate(panic).subscribe(
          (data) => {
            if (!data.error) {
              this.isAccept = '1';
              this.loader.dismiss();
              this.panicID = data.message._id;
              console.log("Accepted");
              this.myPanic = data.message;
              this.initMap(data.message.userLocation, locationData);
            }else {
              this.getToast("Unable to process request, please check your connection !");
            }
          },(err) => {
            this.getToast('Unable to process request, please check your connection !');
        });

      }); // Get Location based on Lat/Lng Ends     

    }).catch((error) => {
      this.getToast('Unable to process request, please check your connection !');
    });  // Get Lat/Lng Ends

  }

  getPanics() {
    this.panicService.panicPendingList().subscribe(
      (data) => {
        if (!data.error) {
          this.panics = data.message;
          console.log(this.panics);
        }else {
          this.getToast("Unable to process request, please check your connection !");
        }
      },(err) => {
        this.getToast('Unable to process request, please check your connection !');
    });
  }

  getMyPanics() {
    const user = JSON.parse(localStorage.getItem('user'))
    this.panicService.panicMyList(user._id).subscribe(
      (data) => {
        console.log(data);
        if (!data.error && data.message.length>0) {
          this.panicID = data.message[0]._id;
          this.isAccept = '1';
          this.myPanic = data.message[0];
          this.initMap(data.message[0].userLocation, data.message[0].driverLocation);
        }
      },(err) => {
        this.getToast('Unable to process request, please check your connection !');
    });
  }

  requestCancel(id) {
    var panic = {};
    panic['_id'] = id;
    panic['status'] = 0;
    this.panicService.panicUpdate(panic).subscribe(
      (data) => {
        if (!data.error) {
          this.isAccept = '0';
          this.getPanics();
          console.log("Cancelled");
          let mpDiv = document.getElementById('map');
          if (mpDiv != null) {
            mpDiv.style.height = '0px';
          }
          this.updateFirebase(id);
        }else {
          this.getToast("Unable to process request, please check your connection !");
        }
      },(err) => {
        this.getToast('Unable to process request, please check your connection !');
    });
  }

  updateFirebase(id) {  
    console.log("Updating Firebase");    
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
      this.afd.list(this.firestore).update(key, { timevalue: d }).then(() => {
        console.log("Firebase Panic Updated", key)
      }); 
    }, 5000)
  }

  requestComplete(id) {
    var panic = {};
    panic['_id'] = id;
    panic['status'] = 2;
    this.panicService.panicUpdate(panic).subscribe(
      (data) => {
        if (!data.error) {
          this.isAccept = '0';
          this.getPanics();
          console.log("Completed");
          let mpDiv = document.getElementById('map');
          if (mpDiv != null) {
            mpDiv.style.height = '0px';
          }
        }else {
          this.getToast("Unable to process request, please check your connection !");
        }
      },(err) => {
        this.getToast('Unable to process request, please check your connection !');
    });
  }


  initMap(userLocation, driverLocation) {
    console.log("map display");
    let mpDiv = document.getElementById('map');
    if (mpDiv != null) {
      mpDiv.style.height = '300px';
    }
    var myLatLng = {lat: parseFloat(userLocation.lat), lng: parseFloat(userLocation.lng)};

    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: myLatLng
    });
    directionsDisplay.setMap(map);

    directionsService.route({
        origin: driverLocation.address,
        destination: userLocation.address,
        travelMode: 'DRIVING'
      }, function(response, status) {
        if (status === 'OK') {
          directionsDisplay.setDirections(response);
        } else {
          window.alert('Directions request failed due to ' + status);
        }
      });

    /*let marker = new google.maps.Marker({
      position: myLatLng,
      map: map,
      title: userLocation.address
    });
    
    var myLatLng2 = {lat: parseFloat(driverLocation.lat), lng: parseFloat(driverLocation.lng)};
    let marker2 = new google.maps.Marker({
      position: myLatLng2,
      map: map,
      title: driverLocation.address,
      icon: 'assets/imgs/driver.png'
    });*/

  }
  
  getToast(msg){
    const toast = this.toastCtrl.create({
      message: msg,
      duration: 3000
    });
    toast.present();
  }

}
