import { Component, OnInit } from '@angular/core';
import { AlertService, RestaurantsService, UsersService,OrderService,KitchenMenuService} from '../service/index';
import { Router, ActivatedRoute, Params } from '@angular/router';

declare var google: any;
declare var toastr: any;

@Component({
    selector: 'app-reporting',
    templateUrl: './reporting.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingComponent implements OnInit {

    constructor() { }

    ngOnInit() {
    }

}

@Component({
    selector: 'app-reporting-nav',
    templateUrl: './reportingnav.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingnavComponent implements OnInit {
	currentOwner:any={};
	restaurants:any ={};
    constructor(private restaurantsService: RestaurantsService) { 

        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }

    ngOnInit() {}

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
        });
    }
}

@Component({
    selector: 'app-reporting-overview',
    templateUrl: './reportingoverview.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingoverviewComponent implements OnInit {
	currentOwner:any={};
	restaurants:any ={};
	overview:any = {};
	acceptedOrderTotal : Number = 0;
	avgAcceptedOrderTotal : Number;
	lastWeekOrderTotal : Number = 0;
	avglastWeekOrderTotal : Number;
    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getOverview(this.restaurants._id);
        });
    }

    private getOverview(id){
        this.orderService.overview(id).subscribe(users => { 
            this.overview = users.data;
            if (this.overview.totalAcceptedOrder) {
                for (var i = 0; i < this.overview.totalAcceptedOrder.length; i++) {
                    this.acceptedOrderTotal = this.acceptedOrderTotal + this.overview.totalAcceptedOrder[i].gTotal;
                }
                this.avgAcceptedOrderTotal = Number(this.acceptedOrderTotal) / Number(this.overview.totalAcceptedOrder.length);
            }
            console.log("this.overview");
            console.log(this.overview);

            if (this.overview.asPerDayOrder) {
                for (var i = 0; i < this.overview.asPerDayOrder.length; i++) {
                    this.lastWeekOrderTotal = this.lastWeekOrderTotal + this.overview.asPerDayOrder[i].gTotal;
                }
                this.avglastWeekOrderTotal = Number(this.lastWeekOrderTotal) / Number(this.overview.asPerDayOrder.length);
            }
        }
        );
    }
}

@Component({
    selector: 'app-reporting-method',
    templateUrl: './reportingMethod.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingMethodComponent implements OnInit {
	currentOwner:any={};
	restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;

    // lineChart
    public lineChartData:Array<any> = [
    {data: [], label: ''},
    {data: [], label: ''}
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { // grey
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    isShow:boolean = false;
    public lineChartType:string = 'line';

    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) { 
    }

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
    }

    private lastSevenDays(day){
        var array = [];
        for (var i = 0; i < day; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }
    private getMethodData(id , days) {
        this.orderService.getMethodChart(id , days).subscribe(users => {
            /*console.log("users.message");
            console.log(users.message);*/
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;
            }

            if(users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }
    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getMethodData(this.restaurants._id , this.selectedTime);

        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getMethodData(this.restaurants._id , this.selectedTime);
    }
}

@Component({
    selector: 'app-reporting-result',
    templateUrl: './reportingResult.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingResultComponent implements OnInit {
    currentOwner:any={};
    restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
    
    public lineChartData:Array<any> = [
    {data: [], label: ''},
    {data: [], label: ''},
    {data: [], label: ''},
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public isShow:boolean = false;

    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
        
    }
    private lastSevenDays(days){
        var array = [];
        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }
    private getResultData(id, days) {
        this.orderService.getResultChart(id,days).subscribe(users => {
            /*console.log("users.message");
            console.log(users.message);*/
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;
            }

            if(users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }
    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getResultData(this.restaurants._id , this.selectedTime);

        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getResultData(this.restaurants._id , this.selectedTime);
    }
}

@Component({
    selector: 'app-reporting-type',
    templateUrl: './reportingType.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingTypeComponent implements OnInit {
    currentOwner:any={};
    restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
    
    public lineChartData:Array<any> = [
    {data: [], label: ''},
    {data: [], label: ''} 
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public isShow:boolean = false;

    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
    }
    private lastSevenDays(days){
        var array = [];
        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }
    private getTypeData(id, days) {
        this.orderService.getTypeChart(id,days).subscribe(users => {
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;
            }

            if(users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }
    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getTypeData(this.restaurants._id, this.selectedTime);
        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getTypeData(this.restaurants._id , this.selectedTime);
    }
}

@Component({
    selector: 'app-reporting-payment-method',
    templateUrl: './reportingPaymentMethod.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingPaymentMethodComponent implements OnInit {
    currentOwner:any={};
    restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
   
    public lineChartData:Array<any> = [
    {data: [], label: ''},
    {data: [], label: ''},
    {data: [], label: ''}
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public isShow:boolean = false;

    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
    }
    private lastSevenDays(days){
        var array = [];
        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }
    private getPaymentData(id,days) {
        this.orderService.getPaymentChart(id,days).subscribe(users => {
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;
            }

            if(users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }
    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getPaymentData(this.restaurants._id , this.selectedTime);
        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getPaymentData(this.restaurants._id , this.selectedTime);
    }
}

@Component({
    selector: 'app-reporting-items',
    templateUrl: './reportingItems.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingItemsComponent implements OnInit {
    currentOwner:any={};
    restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
    
    public lineChartData:Array<any>=[{data: [], label: ''},
    {data: [], label: ''}];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public isShow:boolean = false;

    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
    }
    private lastSevenDays(days){
        var array = [];
        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }

    private getItemData(id,days) {
        this.orderService.getItemChart(id,days).subscribe(users => {
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;
            }

            if(users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getItemData(this.restaurants._id, this.selectedTime);
        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getItemData(this.restaurants._id , this.selectedTime);
    }
}

@Component({
    selector: 'app-reporting-item-category',
    templateUrl: './reportingItemCategory.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingItemCategoriesComponent implements OnInit {
    currentOwner:any={};
    restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
    menu = [];
    menuId:string;
    menuName : string;
    public lineChartData:Array<any>=[{data: [], label: ''}];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public isShow:boolean = false;

    constructor(
        private restaurantsService: RestaurantsService,
        private kitchenMenuService: KitchenMenuService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
    }
    private changeMenu(id) {
        this.menuId = id;
        this.getItemCategoryData(this.restaurants._id,this.menuId, this.selectedTime);
        //console.log(this.menuId);
    }

    private loadAllMenu() {
        this.kitchenMenuService.getAll(this.restaurants._id).subscribe(users => {             
            this.menu = users.message;
            this.menuId = this.menu[0]._id;
            this.menuName = this.menu[0]._id;
            this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getItemCategoryData(this.restaurants._id,this.menuId, this.selectedTime);
        });
    }
    
    private lastSevenDays(days){
        var array = [];
        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }

    private getItemCategoryData(id,menuid,days) {
        this.orderService.getItemCategoryChart({'id':id,'menuid':menuid, 'days':days}).subscribe(users => {
            console.log(users.message);
            console.log(users.message.length);
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;

            }

            if (users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this. loadAllMenu();
        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getItemCategoryData(this.restaurants._id,this.menuId , this.selectedTime);
    }
}

@Component({
    selector: 'app-reporting-sales',
    templateUrl: './reportingSales.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingSaleDetailComponent implements OnInit {
    currentOwner:any={};
    restaurants:any ={};
    timeValue = [{name: 7}, {name: 15}, {name: 30}, {name: 90}, {name: 180}];
    selectedTime = this.timeValue[0].name;
    
    public lineChartData:Array<any> = [
    {data: [], label: ''}
    ];
    public lineChartLabels:Array<any> = [];
    public lineChartOptions:any = {responsive: true};
    public lineChartColors:Array<any> = [
    { 
        backgroundColor: 'rgba(148,159,177,0.2)',
        borderColor: 'rgba(148,159,177,1)',
        pointBackgroundColor: 'rgba(148,159,177,1)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgba(148,159,177,0.8)'
    }
    ];
    public lineChartLegend:boolean = true;
    public lineChartType:string = 'line';
    public isShow:boolean = false;

    constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) {}

    ngOnInit() {
        document.getElementById('noRecordClass').style.display = 'none';
        this.getRestaurants();
    }
    private lastSevenDays(days){
        var array = [];
        for (var i = 0; i < days; i++) {
            var date = new Date();
            date.setDate(date.getDate()-i)
            array.push(new Date(date).toDateString())
        }
        return array;
    }
    private getAllSaleData(id,days) {
        this.orderService.getAllSaleChart(id,days).subscribe(users => {
            if (users.message.length > 0) {
                this.lineChartData = users.message;
                this.isShow = true;
            }

            if (users.message.length == 0){
                this.isShow = false;
                document.getElementById('noRecordClass').style.display = 'block';
            }
        });
    }
    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
                    this.lineChartLabels = this.lastSevenDays(this.selectedTime);
            this.getAllSaleData(this.restaurants._id , this.selectedTime);
        });
    }
    onChangeObj(newObj) {
        this.selectedTime = newObj;
        this.lineChartLabels = this.lastSevenDays(this.selectedTime);
        this.getAllSaleData(this.restaurants._id , this.selectedTime);
    }
}


@Component({
    selector: 'app-reporting-client',
    templateUrl: './reportingClient.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingClientComponent implements OnInit {
	currentOwner:any={};
	restaurants:any ={};
	client:any = [];
	constructor(
		private restaurantsService: RestaurantsService,
        private orderService: OrderService
        ) { }

	ngOnInit() {
		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }
    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getClient(this.restaurants._id);
        });
    }
    private getClient(id){
        this.orderService.client(id).subscribe(users => { 
            this.client = users.message;

            console.log(this.client);
        });
    }
}

@Component({
    selector: 'app-reporting-order',
    templateUrl: './reportingOrder.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingOrderComponent implements OnInit {
	currentOwner:any={};
	restaurants:any ={};
	orders:any = [];
	constructor(
		private restaurantsService: RestaurantsService,
        private router: Router,
        private orderService: OrderService
        ) { }

	ngOnInit() {
		this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        this.getRestaurants();
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.getOrders(this.restaurants._id);
        });
    }

    private getOrders(id){
        this.orderService.orders(id).subscribe(users => { 
            this.orders = users.message;
            console.log("this.orders");
            console.log(this.orders);
        });
    }

    private showOrderDetail(id){
        this.router.navigate(['/owner/reports/detail',id]);
    }
}

@Component({
    selector: 'app-reporting-detail',
    templateUrl: './reportingDetail.component.html',
    styleUrls: ['./reporting.component.css']
})
export class ReportingDetailComponent implements OnInit {
	currentOwner:any={};
	restaurants:any ={};
	detail:any = [];
	orderID :String;
	constructor(
        private restaurantsService: RestaurantsService,
        private orderService: OrderService,
        private router: Router,
        private activatedRoute:ActivatedRoute
        ) {}
	ngOnInit() {
		this.activatedRoute.params.subscribe((params: Params) => {
            let id = params['id'];
            this.orderID = id;
            this.getCompleteDetail(id);
            this.currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
        });
    }

    private getRestaurants() {
        this.restaurantsService.getOwnerRestaurants(JSON.parse(localStorage.getItem('currentOwner'))._id).subscribe(users => {
            this.restaurants = users.message;
            this.mapInit();
        });
    }


    private getCompleteDetail(id){
        this.orderService.getDetail(id).subscribe(users => { 
            this.detail = users.message;
            console.log("this.detail");
            console.log(this.detail);
            this.getRestaurants();
        });
    }

     private deleteOrder(id){
        this.orderService.deleteOneOrder(id).subscribe(data=>{
            console.log("data");
            console.log(data);
            this.router.navigate(['/owner/reports/orders']);
        });
    }

    private mapInit(){
        let mapProp = {
            center: new google.maps.LatLng(this.restaurants.lat, this.restaurants.lng),
            zoom: 14,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        let map = new google.maps.Map(document.getElementById("gmap"), mapProp);
        let latLng = new google.maps.LatLng(this.restaurants.lat, this.restaurants.lng);
        let marker = new google.maps.Marker({
            position: latLng,
            map: map,
            label:'R',
            draggable: false,
        });

        if (typeof this.detail.orderMethod.mType != 'undefined' && this.detail.orderMethod.mType == 'Delivery' && typeof this.detail.orderMethod.lat != 'undefined') {

            let latLngC = new google.maps.LatLng(this.detail.orderMethod.lat, this.detail.orderMethod.lng);
            let markerC = new google.maps.Marker({
                position: latLngC,
                map: map,
                label:'C',
                draggable: false,
            });

            var lineCoordinates = [
            new google.maps.LatLng(parseFloat(this.restaurants.lat), parseFloat(this.restaurants.lng)),
            new google.maps.LatLng(parseFloat(this.detail.orderMethod.lat), parseFloat(this.detail.orderMethod.lng))
            ];
            var lineSymbol = {path: 'M 0,-1 0,1',strokeOpacity: 1,scale: 4};
            var line = new google.maps.Polyline({
                path: lineCoordinates,
                strokeOpacity: 0,
                icons: [{
                    icon: lineSymbol,
                    offset: '0',
                    repeat: '20px'
                }],
                map: map
            });
        }
    }
}
