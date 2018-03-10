import { Component } from '@angular/core';
import { SlicePipe, DatePipe } from '@angular/common';
import { NavController, NavParams, ModalController, LoadingController, ToastController  } from 'ionic-angular';
import { ThreeService } from './../../services/three.service';
import { FourService } from '../../services/four.service';
import { OneService } from '../../services/one.service';
declare var google: any;

@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {
  orders: any;
  loading: any;
  driver: any;
  compOrders: any = [];
  pendorders: any = [];

  totalCash : Number = 0;
  totalTip : Number = 0;


  orderStatus: String = "pending";
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private threeService: ThreeService,
    public loadingCtrl: LoadingController
   ) {
    if (localStorage.getItem('driver')) {
      this.driver = JSON.parse(localStorage.getItem('driver'));

      console.log("this.driver");
      console.log(this.driver);
    }
  
  }
  doRefresh(refresher) {
    setTimeout(() => {
      var allowids = { rids: [] };
      this.driver.kitchensallow.forEach(element => {
        allowids.rids.push(element.resId)
      });
      this.getOrders(allowids);
      refresher.complete();
    }, 2000);
  }

  getOrders(ids){
    this.loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });
    this.loading.present();

    this.threeService.getOrders(ids).subscribe((data) => {

      console.log("data => " , data);

      if (!data.error) {

        if (data.message.length > 0) {

          this.totalCash = 0;

          data.message.forEach((order)=>{
            if (order['paymenttype'] == 'cash') {
              this.totalCash += order['total'];
            }
          })
          this.pendorders = data.message.filter((index) => {
            return index.status != 'completed';
          });
          this.compOrders = data.message.filter((index) => {
            if (typeof index.driverDetail != 'undefined'){
              return index.status == 'completed' && index.driverDetail['_id'] == this.driver['_id'];
            }
          });
        }
      }
      this.loading.dismiss();
    });
  }
  
  ionViewDidEnter(){
    var allowids = { rids: [] };

    if (this.driver['kitchensallow'].length > 0) {
      this.driver['kitchensallow'].forEach(element => {
        allowids.rids.push(element.resId)
      });
    }
    this.getOrders(allowids);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderPage');
  }

  openDetail(index, type) {
    if(type == 'pending'){
        this.navCtrl.push(OrderDetailPage, {
        orderDetail: this.pendorders[index]
      });
    }
    if(type == 'completed'){
      this.navCtrl.push(OrderDetailPage, {
      orderDetail: this.compOrders[index]
    });
  }
    
  }
} 

@Component({
  selector: 'page-order-detail',
  templateUrl: 'order-detail.html',
})
export class OrderDetailPage {
  orderDetail: any;
  driver: any;
  locations: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private fourService: FourService,
    private oneService: OneService,
    private threeService: ThreeService,
    private toastCtrl: ToastController
  ) {
    if (localStorage.getItem('driver')) {
      this.driver = JSON.parse(localStorage.getItem('driver'));
    }
    this.orderDetail = navParams.get("orderDetail");
    oneService.getRestaurant(this.orderDetail['restaurantid']).subscribe((data) => {
      if (!data.error) {
        this.orderDetail.restaurantData = data.message;
      }
    });
    fourService.getCustomers(this.orderDetail['customerid']).subscribe((data) => {
      if (!data.error) {
        this.orderDetail.customerData = data.message;
      }
    });


    console.log("this.orderDetail");
    console.log(this.orderDetail);

    setTimeout(() => {
      this.loadMap();
    }, 1000);
  }


  loadMap() {
    this.locations = [
      [this.orderDetail.customerData.firstname, this.orderDetail.fulladdress.lat, this.orderDetail.fulladdress.lng],
      [this.driver.firstname, this.driver.lat, this.driver.lng]
    ];

    console.log("this.locations");
    console.log(this.locations);


    let mapOptions = {
      center: new google.maps.LatLng(this.orderDetail.restaurantData.lat, this.orderDetail.restaurantData.lng),
      zoom: 10,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    

    let map = new google.maps.Map(document.getElementById("map"), mapOptions);
    var infowindow = new google.maps.InfoWindow();


    // restaurants
    let latLng = new google.maps.LatLng(this.orderDetail.restaurantData.lat, this.orderDetail.restaurantData.lng);
    let marker = new google.maps.Marker({
      position: latLng,
      title: 'demo',
      icon: 'http://maps.google.com/mapfiles/ms/icons/green-dot.png',
      map: map,
      draggable: false,
    });
    infowindow = new google.maps.InfoWindow({
      content: this.orderDetail.restaurantData.restaurantname
    });
    infowindow.open(map, marker);

    // driver
    latLng = new google.maps.LatLng(this.driver.lat, this.driver.lng);
    marker = new google.maps.Marker({
        position: latLng,
        map: map,
        draggable: false,
    });
    infowindow = new google.maps.InfoWindow({
      content: 'Me'
    });
    infowindow.open(map, marker);

    // order
    latLng = new google.maps.LatLng(this.orderDetail.fulladdress.lat, this.orderDetail.fulladdress.lng);
    marker = new google.maps.Marker({
      position: latLng,
      map: map,
      draggable: false,
    });
    infowindow = new google.maps.InfoWindow({
      content: this.orderDetail.customerData.firstname
    });
    infowindow.open(map, marker);
  
    this.showRoute(map);
  }
  showRoute(map) {

    if(this.locations.length > 0){
      for (let i = 0; i < this.locations.length; i++) {
        let directionsDisplay = new google.maps.DirectionsRenderer({ suppressMarkers: true });
        let directionsService = new google.maps.DirectionsService;
        directionsDisplay.setMap(map);
        let origin = { location: new google.maps.LatLng(this.orderDetail.restaurantData.lat, this.orderDetail.restaurantData.lng), stopover: true };
        directionsService.route({
          origin: origin['location'],
          destination: new google.maps.LatLng(this.locations[i][1], this.locations[i][2]),
          travelMode: google.maps.DirectionsTravelMode.DRIVING
        }, function (response, status) {
          if (status === 'OK') {
            directionsDisplay.setDirections(response);
          } else {
            window.alert('Driving route can not found.');
          }
        });

      }
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad OrderDetailPage');
  }

  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: 'Order ' + msg +' successfully',
      duration: 3000,
      position: 'bottom'
    });
    toast.present();
  }
  changeStatus(status, id){
    var obj = {
      id: id,
      status: status,
      driverDetail: {
        _id: this.driver._id,
        name: this.driver.firstname + ' ' + this.driver.lastname,
        phone: this.driver.phoneNo,
        photo: null,
        vehicleType: this.driver.vehicleType,
        vehicleName: this.driver.vehicleName,
        vehicleNo: this.driver.vehicleNo,
      }
    }
    this.threeService.updateOrdersStatus(obj).subscribe((data) => {
      console.log(data)
      if (!data.error) {
        this.presentToast(status)
        this.navCtrl.pop();
      }
    });
  }
  completeStatus(status, id) {
    var obj = {
      id: id,
      status: status
    }
    console.log(obj)
    this.threeService.updateOrdersStatus(obj).subscribe((data) => {
      console.log(data)
      if (!data.error) {
        this.presentToast(status)
        this.navCtrl.pop();
      }
  });
  }
}

