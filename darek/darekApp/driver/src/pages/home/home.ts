import { Component, OnInit, ElementRef, ViewChild, NgZone } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';

import { BackgroundGeolocation } from '@ionic-native/background-geolocation';
import { Geolocation, Geoposition } from '@ionic-native/geolocation';
import 'rxjs/add/operator/filter';

import { AuthService } from '../../app/service/auth.service';

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
        private authService: AuthService,
        ) {
        this.driver = JSON.parse(localStorage.getItem('currentDriver'));
        this.getDriver();
        /*this.startTracking();*/
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
        
        var infowindow = new google.maps.InfoWindow();
        infowindow = new google.maps.InfoWindow({
            content: 'abc'
        });
        infowindow.open(map, marker);



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
            this.showRoute(map,this.driver.restaurantId.lat,this.driver.restaurantId.lng,infowindow)
        }else{
            console.log('Driver is on Duty now');
        } 
    }

    private showRoute(map,lat,lng,infowindow){
        let directionsDisplay = new google.maps.DirectionsRenderer({suppressMarkers: true});
        let directionsService = new google.maps.DirectionsService;
        directionsDisplay.setMap(map);
        let origin = {location:new google.maps.LatLng(this.driver.lat, this.driver.lng),stopover: true};
        if ( (typeof this.driver['lat'] !== "undefined") && (typeof lng !== "undefined") && (typeof lat !== "undefined")) {
            directionsService.route({
                origin: origin['location'],
                destination: new google.maps.LatLng(lat, lng),
                travelMode: google.maps.DirectionsTravelMode.DRIVING
            }, function(response, status) {
                if (status === 'OK') {
                    directionsDisplay.setDirections(response);
                    var totalDist = 0;
                    var totalTime = 0;
                    var myroute = response.routes[0];
                    for (let i = 0; i < myroute.legs.length; i++) {
                        totalDist += myroute.legs[i].distance.value;
                        totalTime += myroute.legs[i].duration.value;
                    }
                    totalDist = totalDist / 1000;
                    let time = totalTime/60;
                    var hours = Math.floor( time / 60);          
                    var minutes = time % 60;

                    let hour2 = hours > 0 ? hours + ' hrs' : '';
                    let minutes2 = minutes > 0 ? minutes.toFixed(0) + ' mins' : '';

                    infowindow.setContent(infowindow.getContent()+"<br>Distance = " + (totalDist / 0.621371).toFixed(2) + " miles<br>Time = " + hour2 + minutes2);
                } else {
                    window.alert('Directions request failed due to ' + status);
                }
            });
        }
    }

    startTracking() {
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

                    let obj2 = {};

                    obj2['email'] = this.driver['email'];
                    obj2['password'] = this.driver['password'];

                    this.authService.getDriver(obj2).subscribe((data2) => {
                        console.log("data2");
                        console.log(data2);
                        if (data2.status) {
                            localStorage.removeItem('currentDriver');
                            localStorage.setItem('currentDriver', JSON.stringify(data2.data));
                        }
                    });
                });

            });
        });
    }
}