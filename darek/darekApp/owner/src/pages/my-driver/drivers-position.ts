import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalController,ToastController, LoadingController, Nav, IonicPage, NavController, NavParams,ViewController,MenuController  } from 'ionic-angular';
import { OrderService, RestaurantsService, DriversService } from '../../app/service/index';

import { MyDriverPage } from './my-driver';

declare var google: any;

/**
* Generated class for the Add Driver page.
*
* See http://ionicframework.com/docs/components/#navigation for more info
* on Ionic pages and navigation.
*/

@Component({
    selector: 'page-drivers-position',
    templateUrl: 'drivers-position.html',
})
export class DriversPositionPage {

    currentOwner:any={};
    restaurants:any ={};

    drivers = [];
    loading:any;

    constructor(
        public modalCtrl: ModalController,
        public navCtrl: NavController,
        private lf: FormBuilder,
        public loadingCtrl: LoadingController,
        public toastCtrl: ToastController,
        public navParams: NavParams,
        private restaurantsService: RestaurantsService,
        private orderService: OrderService,
        private driversService: DriversService
        ) {
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));

        console.log("this.currentOwner");
        console.log(this.currentOwner);
        this.loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        this.loading.present();
        this.getRestaurants();
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Add Driver');
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            //this.getOrders();
            this.getDrivers(this.restaurants._id);
        });
    }

    private getDrivers(resID){
        this.driversService.getRestaurantDrivers(resID).subscribe(
        (users) => {
            this.drivers = users.message;
            console.log(this.drivers,'drivers');
            this.initMap();
        },
        (err)=>{
            this.loading.dismiss();
            this.getToast('Some thing went wrong! Try Later.');
        });
    }

    private getToast(msg){
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position:'top' //top,middle,bottom
        });
        toast.present();
    }

    /*private getOrders(){
        this.orderService.getPendingOrders(this.restaurants._id).subscribe((data)=>{
            console.log("data");
            console.log(data);
        })
    }*/

    private initMap(){

        let mapProp = {
            center: new google.maps.LatLng(this.restaurants.lat, this.restaurants.lng),
            /*center: {lat: 37.77, lng: -122.447},*/
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("map"), mapProp);
        let latLng = new google.maps.LatLng(this.restaurants.lat, this.restaurants.lng);
        let marker = new google.maps.Marker({
            position: latLng,
            title: this.restaurants.name,
            icon:'assets/img/red.png',
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });


        for (var i = 0; i < this.drivers.length; i++) {
            let latLng = new google.maps.LatLng(this.drivers[i].lat, this.drivers[i].lng);
            let marker = new google.maps.Marker({
                position: latLng,
                title: this.drivers[i].firstname,
                label: {
                    fontWeight: 'bold',
                    text: this.drivers[i].firstname,
                },
                icon:'assets/img/green.png',
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP
            });
        }
        this.showRoute(map);
        this.loading.dismiss();    
    }

    private showRoute(map){
        for (let i = 0; i<this.drivers.length; i++) {
            let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            let directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            let origin = {location:new google.maps.LatLng(this.restaurants.lat, this.restaurants.lng),stopover: true};
            directionsService.route({
                origin: origin['location'],
                destination: new google.maps.LatLng(this.drivers[i].lat, this.drivers[i].lng),
                travelMode: google.maps.DirectionsTravelMode.WALKING
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    }
}
