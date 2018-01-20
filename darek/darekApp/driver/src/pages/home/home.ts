import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
//import { NavController } from 'ionic-angular';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

import { DriversService, OrderService } from '../../app/service/index';

declare var google;

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    @ViewChild('map')mapElement: ElementRef;

    map: any;
    driver: any = {};
    public watch: any;    
    public lat: number = 0;
    public lng: number = 0;

    constructor(
        public navCtrl: NavController,
        private zone: NgZone,
        private platform: Platform,
        private backgroundGeolocation: BackgroundGeolocation,
        private geolocation: Geolocation,
        public driversService: DriversService,
        public orderService: OrderService,
        ) {
        this.driver = JSON.parse(localStorage.getItem('currentDriver'));
        this.getDriver();
        //this.initMap();
        //this.startTracking();
        /*this.geolocation.getCurrentPosition().then((resp) => {
            console.log("resp");
            console.log(resp);
        }).catch((error) => {
        console.log('Error getting location', error);
        });

        const subscription = this.geolocation.watchPosition()
            .filter((p) => p.coords !== undefined) //Filter Out Errors
            .subscribe(position => {
                console.log("position");
                console.log(position);
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;
            console.log(position.coords.longitude + ' ' + position.coords.latitude);

            let obj = {};
            obj['_id'] = this.driver._id;
            obj['lat'] = this.lat;
            obj['lng'] = this.lng;

            this.driversService.updateDriver(obj).subscribe((data)=>{
                console.log("data");
                console.log(data);
            })
        });*/

        // To stop notifications
        //subscription.unsubscribe();
    }

    getDriver(){
        this.driversService.getOne(this.driver._id).subscribe((data)=>{
            if (!data.error) {
                this.driver = data.message;
                console.log('driver ', this.driver);
                this.initMap();
            }
        });
    }

    private initMap(){

        let mapProp = {
            center: new google.maps.LatLng(this.driver.lat, this.driver.lng),
            /*center: {lat: 37.77, lng: -122.447},*/
            zoom: 10,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("map"), mapProp);
        let latLng = new google.maps.LatLng(this.driver.lat, this.driver.lng);
        let marker = new google.maps.Marker({
            position: latLng,
            title: this.driver.firstname,
            map: map,
            draggable: false,
            animation: google.maps.Animation.DROP
        });

        if (this.driver.driverStatus == 'Available') {
            let latLng = new google.maps.LatLng(this.driver.restaurantId.lat, this.driver.restaurantId.lng);
            let marker = new google.maps.Marker({
                position: latLng,
                title: this.driver.restaurantId.name,
                label: {
                    fontWeight: 'bold',
                    text: this.driver.restaurantId.name,
                },
                map: map,
                draggable: false,
                animation: google.maps.Animation.DROP
            });
            this.showRoute(map,this.driver.restaurantId.lat,this.driver.restaurantId.lng)
        }else{
            console.log('Driver is on Duty now');
            /*this.orderService.getCurrentOrderOfThisDriver(this.driver._id).subscribe((order)=>{
                console.log("order");
                console.log(order);
            });*/
        }


        /*for (var i = 0; i < this.drivers.length; i++) {
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
        this.loading.dismiss();*/    
    }

    private showRoute(map,lat,lng){
        /*for (let i = 0; i<this.drivers.length; i++) {*/
            let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
            let directionsService = new google.maps.DirectionsService;
            directionsDisplay.setMap(map);
            let origin = {location:new google.maps.LatLng(this.driver.lat, this.driver.lng),stopover: true};
            if ( (typeof this.driver['lat'] !== "undefined") && (typeof lng !== "undefined") && (typeof lat !== "undefined")) {
                directionsService.route({
                    origin: origin['location'],
                    destination: new google.maps.LatLng(lat, lng),
                    travelMode: google.maps.DirectionsTravelMode.WALKING
                }, function(response, status) {
                    if (status === 'OK') {
                        directionsDisplay.setDirections(response);
                    } else {
                        window.alert('Directions request failed due to ' + status);
                    }
                });
            }
        /*}*/
    }




    /*private initMap(){
        let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
        let directionsService = new google.maps.DirectionsService;
        let latLng = new google.maps.LatLng(40.7818060697085,-73.96514513029149);
        let mapOptions = {
            center: latLng,
            zoom: 15,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        if (this.mapElement) {
            this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
            directionsDisplay.setMap(this.map);
        }
        //this.showRoute(directionsService,directionsDisplay);
    }*/

    /*startTracking() {
        // Background Tracking
        let config = {desiredAccuracy: 0, stationaryRadius: 20, distanceFilter: 10, debug: false, interval: 1000 };
        
        this.backgroundGeolocation.configure(config).subscribe((location) => {
           // console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
            // Run update inside of Angular's zone
            console.log("location");
            console.log(location);            
            this.zone.run(() => {
                this.lat = location.latitude;
                this.lng = location.longitude;
            });
        }, (err) => {
            console.log(err);
        });
     
        // Turn ON the background-geolocation system.
        this.backgroundGeolocation.start();
        // Foreground Tracking
     
        let options = {frequency: 3000, enableHighAccuracy: true};
 
        this.watch = this.geolocation.watchPosition(options).filter((p: any) => p.code === undefined).subscribe((position: Geoposition) => {
 
            console.log(position);
     
            // Run update inside of Angular's zone
            this.zone.run(() => {
                this.lat = position.coords.latitude;
                this.lng = position.coords.longitude;

                let obj = {};
                obj['_id'] = this.driver._id;
                obj['lat'] = this.lat;
                obj['lng'] = this.lng;

                this.driversService.updateDriver(obj).subscribe((data)=>{
                    console.log("data");
                    console.log(data);
                })

            });
        });
    }*/

    /*stopTracking() {
        //console.log('stopTracking');
        this.backgroundGeolocation.finish();
        this.watch.unsubscribe();
    }*/

}