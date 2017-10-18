import { Component, OnInit ,ViewChild,OnDestroy} from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { ReCaptchaComponent } from 'angular2-recaptcha';
import { AlertService, PageService, CountryService, AuthService, UsersService, BannerService, CustomerService, FriendService, SocketService } from '../service/index';
declare var tinymce: any;
declare var $ : any;
declare var toastr : any;
toastr.options.timeOut = 500;
import {OrderPipe} from "../order.pipe";
import {SafePipe} from "../iframe.pipe";
import * as globalVariable from "../global";
declare var OT: any;
declare var otCore: any;
declare var options: any;
declare var TB: any;
declare var OT_LayoutContainer: any;

@Component({
    selector: 'app-frontend',
    templateUrl: './frontend.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendComponent implements OnInit {
    currentCustomer : any;
    constructor(private socketService : SocketService) {}
    ngOnInit() {
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));   
        // console.log("customer ready");
        if(localStorage.getItem('currentCustomer')){
            // console.log(localStorage.getItem('currentCustomer'));
            this.socketService.customerOnline2();
        }
    }
}

@Component({
    selector: 'app-frontend-profile-summary',
    templateUrl: './frontend-profile-summary.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendProfileSummaryComponent implements OnInit {
    currentCustomer:any = {};
    url = globalVariable.url+'uploads/';
    constructor(private customerService: CustomerService){}
    ngOnInit() {
        this.currentCustomer = JSON.parse(localStorage.getItem('currentCustomer'));
        //console.log(this.currentCustomer)
    } 
}

@Component({
    selector: 'app-frontend-dashboard',
    templateUrl: './frontend-dashboard.component.html',
    styles: []
})
export class FrontenddashboardComponent implements OnInit {

    constructor() { }

    ngOnInit() { }
}

@Component({
    selector: 'frontend-profile',
    templateUrl: './frontend-profile.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendProfileComponent implements OnInit {

    profile:any={};
    profileUpdateModel: FormGroup;
    searchCriteriaModel: FormGroup;
    addVideolinkModel: FormGroup;
    changePasswordModel: FormGroup;
    err:any;
    url = globalVariable.url+'uploads/';
    cid : any ;
    sessionOBJ : any;
    apiKey : any = '45956382';
    livenowg : any ;
    Match : any = false;
    oldmatch : any = false;
    fulldetail : any ;
    file : any = "";
    defaultValue : any = 0;
    countrys : any = [];
    public uploader:FileUploader = new FileUploader({url:globalVariable.url+'upload'});
    progress1 : any = 0;
    progress2 : any = 0;
    progress3 : any = 0;
    slideIndex : any = 1;
    optionselected : any = "";
    interest : any = [];

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private socketService : SocketService,
        private countryService : CountryService
    ){}

    ngOnInit() {
        if(localStorage.getItem('currentCustomer')){
            var usersValue=localStorage.getItem('currentCustomer');
            this.cid = JSON.parse(usersValue)._id;
            this.fulldetail = JSON.parse(usersValue); 
            this.getCustomer(this.cid);
            this.initlivenow();
            this.livenowg = false;
         
             $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
        }

        this.profileUpdateModel = this.lf.group({
            _id: ['', Validators.required],
            firstname: ['', Validators.required],
            lastname: ['', Validators.required],
            email: ['', Validators.required],
            phone: [],
            age: [],
            dateofbirth: ['', Validators.required],
            sexualorient : [],
            interests : [],            
            country: ['',Validators.required],
            gender: ['', Validators.required],
            profilePic: [],
            description : []
        });

        this.searchCriteriaModel = this.lf.group({
            country: [''],
            age: [''],
            gender: [''],
            language: [''],
            sexualorient : ['']
        });

        this.addVideolinkModel = this.lf.group({
            videolinks: ['',Validators.required]         
        });

        this.changePasswordModel = this.lf.group({
            oldpassword: ['', Validators.required],
            password: ['', Validators.required],
            confirmpassword : ['', Validators.required],
            matchpass : ['', Validators.required],
            oldmatch : ['', Validators.required]
        });

        this.getCountry();       
        $(document).ready(function(){
            $('#dateofbirth').datetimepicker({format:'YYYY-MM-DD'});          
        });


        /*$(".h4m1").click(function(){
            $(".h4m1").removeClass("h4m12");
            $(this).addClass("h4m12");
            //console.log(); 
        });*/


        $(".paddingm1:first").addClass("info-tab-colors1");  
        this.showSlides(this.slideIndex);

    }

    private setimage(img){
       if (img != null) {
           var imgPath = this.url + img;
       }
       if (img == null) {
           var imgPath = "../assets/img/face.png";
       }
       return imgPath;
   }
 


    private interestupdates(type){
        var index = this.interest.indexOf(type);
        if(index == -1){
            this.interest.push(type);
        }else{
            this.interest.splice(index, 1);
        }
        console.log("this.interest")
        console.log(this.interest)
        this.profileUpdateModel.controls['interests'].setValue(this.interest);
    }

    private makeprivate(type){
        var obj = {_id : this.cid, isprivate : type};
        this.customerService.updateCustomer(obj).subscribe(data =>{
            console.log("donme");
            this.getCustomer(this.cid);
        });
    }

    private openModal() {
        document.getElementById('myModalm').style.display = "block";
    }

    private closeModal() {
        document.getElementById('myModalm').style.display = "none";
    }

    private plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    private currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    private showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        console.log("slides");
        console.log(slides.length);
        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            (<HTMLInputElement>slides[i]).style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        console.log("slides[this.slideIndex-1]");
        console.log(slides[this.slideIndex-1]);
        (<HTMLInputElement>slides[this.slideIndex-1]).style.display = "block";
        (<HTMLInputElement>dots[this.slideIndex-1]).className += " active";
        captionText.innerHTML = (<HTMLInputElement>dots[this.slideIndex-1]).alt;
    }

    private onChangeImg1(event){ 
        this.progress1 = 0;     
    }

    private onChangeImg2(event){ 
        this.progress2 = 0;     
    }

    private onChangeImg3(event){ 
        this.progress3 = 0;     
    }

    private getTimeData(even){
        var timeJ = even.getAttribute('id');
        let eleObj = (<HTMLInputElement>document.getElementById(timeJ));
        var barray = eleObj.value.split('-');
        this.profileUpdateModel.controls['dateofbirth'].setValue(eleObj.value); 
        var agev =  this.calculate_age(barray[0], barray[1], barray[2]);
        this.profileUpdateModel.controls['age'].setValue(agev);   
    }

    private calculate_age(birth_year,birth_month,birth_day){
        var today_date = new Date();
        var today_year = today_date.getFullYear();
        var today_month = today_date.getMonth();
        var today_day = today_date.getDate();
        var age = today_year - birth_year;
        if ( today_month < (birth_month - 1))
        {
            age--;
        }
        if (((birth_month - 1) == today_month) && (today_day < birth_day))
        {
            age--;
        }
        return age;
    }

    private getCountry(){
        this.countryService.getAll().subscribe((data) => {
            this.countrys = data.message;
        });
    }

    private removephotoprofile(id){
        this.profile.profilePic = "";
        var obj = {_id : id, profilePic: ""};
        this.customerService.updateCustomer(obj).subscribe((data) => {});
    }

    private removephotovideo(id){
        this.profile.profileVideo = "";
        var obj = {_id : id, profileVideo: ""};
        this.customerService.updateCustomer(obj).subscribe((data) => {});
    }

    private removephotomulti(id, index){   
        this.profile.myPhotos.splice(index, 1);
        var obj = {_id : id, myPhotos: this.profile.myPhotos};
        this.customerService.updateCustomer(obj).subscribe((data) => {});
    }

    private removeYoutubeLink(id, index){   
        this.profile.videolinks.splice(index, 1);
        var obj = {_id : id, videolinks: this.profile.videolinks};
        this.customerService.updateCustomer(obj).subscribe((data) => {});
    }

    private oldpassword(){
        console.log(this.fulldetail.password, this.changePasswordModel.value);       
        if(this.fulldetail.password == this.changePasswordModel.value.oldpassword){         
            this.changePasswordModel.controls["oldmatch"].setValue(true);
            this.oldmatch = false;
        }else{
            this.changePasswordModel.controls["oldmatch"].setValue("");
            this.oldmatch = true;
        }
    }

    private matchpassword(){  
        console.log();   
        if(this.changePasswordModel.value.password == this.changePasswordModel.value.confirmpassword){        
            this.changePasswordModel.controls["matchpass"].setValue(true);
            this.Match = false;
        }else{
            this.changePasswordModel.controls["matchpass"].setValue("");
            this.Match = true;
        }
    }  

    private updatepassword() {
        var obj = {_id : this.cid, password : this.changePasswordModel.value.password};
        this.customerService.updateCustomer(obj).subscribe(update => {  
            alert("password change");
            update.message.password = this.changePasswordModel.value.password;
            this.fulldetail = update.message;
            localStorage.setItem('currentCustomer', JSON.stringify(update.message)); 
            this.changePasswordModel.reset();
        });
    }

    private initlivenow(){
        var datat  = {_id : this.cid, islive: false, isbusy : false};
        this.customerService.updateCustomer(datat).subscribe(update => {              
            console.log(update);        
        });  
    }     

    private livenow() {
        this.livenowg = true;
        var datat  = {_id : this.cid, islive: true, isbusy : false};       
        this.customerService.updateCustomer(datat).subscribe(update => {              
            if(update.message.tokboxsessionid != '' && update.message.tokboxtoken != ''){  
                var obj3 = {_id : this.cid, status : true};
                this.socketService.liveBrodcast(obj3);                      
                this.router.navigate(['customer/live-now' , update.message.tokboxsessionid, update.message.tokboxtoken]);
            }else{            
                this.router.navigate(['customer/profile']);
            }            
        });    
    }

    private getCustomer(id) {
        this.customerService.getOne(id).subscribe(customers => { 
            this.profile = customers.message; 
            console.log("my profile detail");
            console.log(this.profile);
            this.profileUpdateModel.patchValue(this.profile);
            this.profileUpdateModel.controls['profilePic'].setValue("");
            this.file = "";
            if(this.profile.preferences){
                this.searchCriteriaModel.patchValue(this.profile.preferences);
            } 
            if(this.profile.interests){
                this.interest = this.profile.interests;
            }
            // this.userAddModel.controls['firsttitle'].setValue(this.users.firsttitle);
        });
    }

    private profileUpdate() {

        console.log("this.profileUpdateModel.value");
        console.log(this.profileUpdateModel.value);

        if(this.file == ""){
            this.profileUpdateModel.controls['profilePic'].setValue(this.profile.profilePic);   
            this.profiledetailupdate();
        }else{
            this.uploader.uploadAll();
            this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
                var responsePath = JSON.parse(response);
                this.profileUpdateModel.controls['profilePic'].setValue(responsePath.filename);        
                this.profiledetailupdate();
            };
        }
    }

    private onChange(event) {
        this.file = true;
    }

    private profiledetailupdate(){
        console.log(this.profileUpdateModel.value); 
        this.customerService.updateCustomer(this.profileUpdateModel.value).subscribe(
        (data) => {
            this.customerService.getOne(this.cid).subscribe(customers => { 
                console.log("customers");
                console.log(customers);
                localStorage.setItem("currentCustomer", JSON.stringify(customers.message));
                this.alertService.success('Profile Updated successful', true);
                this.getCustomer(this.cid);
                //$("#profile").removeClass('active');
                //$("#myPhoto").addClass('active');
                toastr.remove();
                toastr.success("Successfully Updated");
            });
        });
    }

    private addVideolink(){
        //console.log(this.addVideolinkModel.value); 
        var obj = {videolinks : [], _id : this.cid};
        obj.videolinks = this.profile.videolinks;
        // console.log(this.addVideolinkModel.value.videolinks.replace('watch?v=', 'embed/'));
        obj.videolinks.push(this.addVideolinkModel.value.videolinks.replace('watch?v=', 'embed/')); 
        this.customerService.updateCustomer(obj).subscribe((data) => {
            this.customerService.getOne(this.cid).subscribe(customers => { 
                console.log("customers");
                console.log(customers);
                localStorage.setItem("currentCustomer", JSON.stringify(customers.message));
                this.alertService.success('Profile Updated successful', true);
                this.getCustomer(this.cid);
                this.addVideolinkModel.reset();
                //$("#profile").removeClass('active');
                //$("#myPhoto").addClass('active');
                toastr.remove();
                toastr.success("Successfully Updated");
            });
        });
    }

    private profilePhoto(){
        this.uploader.uploadAll();
        this.uploader.onProgressItem = (file: any, progress: any) =>{
            this.progress1 = progress;
        }
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.customerService.updateCustomer({'profilePic':responsePath.filename,'_id':this.profile._id}).subscribe(
            (data) => {
                this.customerService.getOne(this.cid).subscribe(customers => { 
                    console.log("customers");
                    console.log(customers);
                    localStorage.setItem("currentCustomer", JSON.stringify(customers.message));
                    this.alertService.success('Profile Updated successful', true);
                    this.getCustomer(this.cid);
                    //$("#myPhoto").removeClass('active');
                    //$("#prefrences").addClass('active');
                    toastr.remove();
                    toastr.success("Successfully Updated");
                });
            });
        };   
    }

    private profileVideo(){
        this.uploader.uploadAll();
        this.uploader.onProgressItem = (file: any, progress: any) =>{
            this.progress2 = progress;
        } 
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            this.customerService.updateCustomer({'profileVideo':responsePath.filename,'_id':this.profile._id}).subscribe(
            (data) => {
                this.customerService.getOne(this.cid).subscribe(customers => { 
                    console.log("customers");
                    console.log(customers);
                    localStorage.setItem("currentCustomer", JSON.stringify(customers.message));
                    this.alertService.success('Profile Photo Updated successfully', true);
                    this.getCustomer(this.cid);
                    //  $("#myPhoto").removeClass('active');
                    // $("#prefrences").addClass('active');
                    toastr.remove();
                    toastr.success("Successfully Updated");
                });
            });
        };   
    }

    private myPhotos(){
        this.uploader.uploadAll();
        this.uploader.onProgressAll = (progress:any) =>{
            this.progress3 = progress;
        }
        var photos = [];
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            var responsePath = JSON.parse(response);
            photos.push(responsePath.filename);
            console.log("this.profile.myPhotos");
            console.log(this.profile.myPhotos);
            this.profile.myPhotos.push(responsePath.filename);
            console.log("one this.profile");
            console.log(this.profile);
            //console.log(photos);
            this.customerService.updateCustomer({'myPhotos':this.profile.myPhotos,'_id':this.profile._id}).subscribe(
            (data) => {
                this.customerService.getOne(this.cid).subscribe(customers => { 
                    console.log("customers");
                    console.log(customers);
                    localStorage.setItem("currentCustomer", JSON.stringify(customers.message));
                    this.alertService.success('Profile Photo Updated successfully', true);
                    this.getCustomer(this.cid);
                    //$("#myPhoto").removeClass('active');
                    //$("#prefrences").addClass('active');
                    toastr.remove();
                    toastr.success("Successfully Updated");
                });
            });
        };  
    }

    private searchCriteria() {
        var customer ={preferences:{},_id:''};
        customer.preferences = this.searchCriteriaModel.value;
        customer._id = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        this.customerService.updateCustomer(customer).subscribe(
        (data) => { 
            this.customerService.getOne(this.cid).subscribe(customers => { 
                console.log("customers");
                console.log(customers);
                localStorage.setItem("currentCustomer", JSON.stringify(customers.message));
                this.alertService.success('Profile Photo Updated successfully', true);
                this.getCustomer(this.cid);                           
                //$("#prefrences").removeClass('active');
                // $("#profile").addClass('active');
                toastr.remove();
                toastr.success("Successfully Updated");
            });
            //this.alertService.success('search Criteria Updated successful', true);
            //this.router.navigate(['/customer/dashboard']);
        });
    }
}


@Component({
    selector: 'app-frontend-customer-account',
    templateUrl: './frontend-customer-account.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendCustomerAccountComponent implements OnInit {

    cid : any;
    profile: any = {};
    url = globalVariable.url+'uploads/';
    packages : any = [];
    packageDetail : any = {};

    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        var usersValue=localStorage.getItem('currentCustomer');  
        this.cid = JSON.parse(usersValue)._id;
        this.refresh();
         $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
         $(".paddingm1:first").addClass("info-tab-colors1");  
    }

    refresh(){
        this.getCustomer();
        this.getPackages();
    }
   
    private setimage(img){
       if (img != null) {
           var imgPath = this.url + img;
       }
       if (img == null) {
           var imgPath = "../assets/img/face.png";
       }
       return imgPath;
   }

    private getCustomer() {
        this.customerService.getOne(this.cid).subscribe(customers => {
            console.log("myypackage"); 
            console.log(customers); 
            this.profile = customers.message;             
        });
    }

    private getPackages(){      
        this.customerService.getAllPackage().subscribe(customers => { 
            this.packages = customers.message;            
        });      
    }

    private choosePackage(packages){
        //delete packages.description;
        packages.remaincalls = packages.noofcalls;        
        var cpackage = {_id : this.cid, mypackage : packages};        
        this.customerService.updateCustomer(cpackage).subscribe(customers => {             
            this.refresh();            
        }); 
    }

    private getOnePackageDetail(id){
        this.customerService.getOnePackage(id).subscribe(customers => {             
            this.packageDetail =  customers.message;           
        });
    }
}

@Component({
    selector: 'app-frontend-customer-account',
    templateUrl: './frontend-customer-views.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendCustomerViewsComponent implements OnInit {

    profile : any = {};
    url = globalVariable.url+'uploads/';
    viewss : any = [];
    cid:any;
    constructor(private customerService: CustomerService) { }

    ngOnInit() {
        var usersValue=localStorage.getItem('currentCustomer');  
        this.cid = JSON.parse(usersValue)._id;
        this.getCustomer();

         $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
         $(".paddingm1:first").addClass("info-tab-colors1");  
    }
    

     private setimage(img){
         var imgPath = "";
       if (img != null) {
           imgPath = this.url + img;
       }
       if (img == null) {
           imgPath = "../assets/img/face.png";
       }
       return imgPath;
     } 

    private getCustomer() {
        this.customerService.getOne(this.cid).subscribe(customers => { 
            this.profile = customers.message; 

            console.log("customers.message.visitors");
            console.log(customers.message.visitors);

            this.viewss = customers.message.visitors;            
        });
    }

    private viewDelete(id){
        var indexs = this.viewss.findIndex(item => {return item._id == id});
        if(indexs != -1){
            this.viewss.splice(indexs , 1);
        }
        this.customerUpdate();  
    }

    private customerUpdate(){   
        var obj = { _id : this.cid ,  visitors : this.viewss };
        this.customerService.updateCustomer(obj).subscribe((data) => {       
            this.getCustomer();
        });
    }
}

@Component({
    selector: 'app-frontend',
    templateUrl: './pagesshow.component.html'  
})
export class FrontendPageComponent implements OnInit {

    page : any;
    pageDetail : any = {};

    constructor(private lf: FormBuilder, 
        private customerService: CustomerService,
        private friendService: FriendService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private pageService : PageService
    ) {}

    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.page = params['page'];
            this.getPage();
        });
    }

    getPage(){
        this.pageService.getPage(this.page).subscribe(data => {                
            this.pageDetail = data.message[0];                                                            
        });
    }
}

@Component({
    selector: 'frontend-public-profile',
    templateUrl: './frontend-public-profile.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendPublicProfileComponent implements OnInit {

    addmodel : FormGroup;
    cid : any ;  
    url : any = globalVariable.url+'uploads/';  
    profile : any = {};
    vid : any;
    friendallow : any = [];
    profiles : any = [];
    showbuttons : any = false;
    objectFriend : any = [];
    slideIndex : any = 1;

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private socketService : SocketService,
        private friendService: FriendService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private pageService : PageService
        ) {}

    ngOnInit() { 

        this.addmodel = this.lf.group({             
            description : ['',Validators.required]            
        });

        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        this.route.params.subscribe((params: Params) => {
            this.vid = params['vid'];
            this.attachVisitors();
            this.getCustomerDetail();
            this.getAllAllow();
        });

        if(localStorage.getItem('currentCustomer')){

            this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;

        }

        this.friendService.getAllFriendAllow(this.vid).subscribe((item) => {

            var data = item.message;
            console.log("list item1");
            console.log(data);

            if(data.length > 0){
                var index1 = data.findIndex(item => item.FromId._id == this.cid);
                var index2 = data.findIndex(item => item.ToId._id == this.cid);
                console.log(index1 , index2);
                if(index1 != -1 || index2 != -1){
                    this.showbuttons = false;  
                }else{
                    this.showbuttons = true;  
                }
            }else{
                this.showbuttons = true; 
            }
        });
 
       this.viewBy();
      $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
       $(".paddingm1:first").addClass("info-tab-colors1");  

        this.showSlides(this.slideIndex);

    }

    private viewBy(){
        console.log("viewby");
      var obj = {FromId : this.cid, ToId: this.vid , title: 'view'};  
      console.log(obj);
      this.socketService.viewby(obj);
    }

    

    /*private setFriend(item){ 
        this.objectFriend = [];     
        for(var i = 0; i < item.length; i++){
            if(this.objectFriend.indexOf(item["ToId"]._id) == -1){
                this.objectFriend.push(item["ToId"]._id);  
            }
            if(this.objectFriend.indexOf(item["FromId"]._id) == -1){
                this.objectFriend.push(item["FromId"]._id);  
            }
        }
    }*/
     
  

    private openModal() {
        document.getElementById('myModalm').style.display = "block";
    }

    private closeModal() {
        document.getElementById('myModalm').style.display = "none";
    }

    private plusSlides(n) {
        this.showSlides(this.slideIndex += n);
    }

    private currentSlide(n) {
        this.showSlides(this.slideIndex = n);
    }

    private showSlides(n) {
        var i;
        var slides = document.getElementsByClassName("mySlides");
        var dots = document.getElementsByClassName("demo");
        var captionText = document.getElementById("caption");
        console.log("slides");
        console.log(slides.length);

        if (n > slides.length) {this.slideIndex = 1}
        if (n < 1) {this.slideIndex = slides.length}
        for (i = 0; i < slides.length; i++) {
            (<HTMLInputElement>slides[i]).style.display = "none";
        }
        for (i = 0; i < dots.length; i++) {
            dots[i].className = dots[i].className.replace(" active", "");
        }
        (<HTMLInputElement>slides[this.slideIndex-1]).style.display = "block";
        (<HTMLInputElement>dots[this.slideIndex-1]).className += " active";
        captionText.innerHTML = (<HTMLInputElement>dots[this.slideIndex-1]).alt;
    }

    private sendRequest() {
        var friendobj={FromId:this.cid,ToId:this.vid,status:0}
        this.friendService.addFriend(friendobj).subscribe(
        (data) => {
            toastr.remove();
            toastr.success('friend request Sent');    
            this.showbuttons = false;   
        }); 
        this.requestFromTo(this.cid, this.vid);
    }


 private requestFromTo(from, to){

      console.log("requestby");

      var obj = {FromId : from, ToId: to, title: 'request'}; 
      this.socketService.viewby(obj);
    }




   private sendReport(){
        var obj = {FromId: this.cid, ForId: this.vid, type: "Public Profile", description : this.addmodel.value.description};
        this.customerService.sendReport(obj).subscribe((data) => {
            if(!data.error){
                alert("Your Abuse Report Has been submitted!");
                this.addmodel.reset();
                $(function () {
                    $('#report1').modal('toggle');
                });  
            }else{
                alert("Something Wrong!"); 
            }
        });
    }

    getCustomerDetail(){
        this.customerService.getOne(this.vid).subscribe(data => { 
            console.log(data);
            this.profile = data.message;                                                     
        });
    }

    attachVisitors(){
        var obj = {id : this.vid, vid : this.cid};
        this.customerService.attachvisitor(obj).subscribe(data => {});
    }

    private getCustomerAllDetail(){
        this.customerService.getAll().subscribe(data => {           
            this.profiles = data.message;                                                     
        });
    } 

    private getAllAllow(){
        this.friendService.getAllFriendAllow(this.cid).subscribe(data => {           
            this.friendallow = data.message;   
            this.getCustomerAllDetail();      
        });
    }

    private report(){}
}

@Component({   
    selector: 'frontend-all-profile', 
    templateUrl: './frontend-all-profile.component.html',
    styleUrls: ['./frontend.component.css']  
})
export class FrontendAllProfileComponent implements OnInit { 

    order: string = 'firstname';
    reverse : any = "";
    customerFilter: any = { email: '' };
    cid : any ;  
    url : any = globalVariable.url+'uploads/';
    profiles : any = [];
    friendallow : any = [];  
    alen : any;
    myonline : any = [];
    filterBy : any = { gender : [], online : "xyz", age: {min : "", max : ""}, country: [], sexualorient:[] };
    currentcall : any;
    countrys : any = [];
    loadcheck : any = false;
    Countrycheck : any;
    gendervalue : any = '';
    min : any;
    max : any;
    customerpackage : any = {mypackage : ''};
    allcheckcountryfilter : any = false;
    prefRun : any = true;
    videolinks : any  = [];
    callingto : any;


    constructor(private lf: FormBuilder, 
        private customerService: CustomerService,
        private friendService: FriendService,
        private router: Router,
        private alertService: AlertService,
        private route: ActivatedRoute,
        private pageService : PageService,
        private socketService : SocketService,
        private countryService : CountryService
    ) {this.getCountry();}

    ngOnInit() {
        
        //this.socketService.onlineList2emit();       
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id; 
        this.getCustomerr();
        this.getAllAllow(); 
        //this.getCustomerDetail();        
        this.onlinenew();
        this.onlinenew2();
        this.onlinenew3();
        // this.socketService.onlineList2();  
        //this.socketService.onlineList();
        this.socketService.onlineList2emit();  
        this.socketService.onlineList3emit();
        this.offlinenew2();
        
        this.sortBy("firstname");
        /* this.customerService.getOne(this.cid).subscribe(customers => { 
           console.log("customers ghdfsfgghghdf detai;");
           console.log(customers);
        });*/
    }

    private sortBy(data) {
        this.order = data;
       if (this.reverse == false) {
           this.reverse = true;
       }else{
           this.reverse = false;
       }
    }

    /*ngOnDestroy() {
        this.connection.unsubscribe();
    }*/

    private checkSexualOrient(type){

        var indexset = this.filterBy.sexualorient.indexOf(type);
        console.log(" sec indexset");
        console.log(indexset);
        if(indexset != -1){
          this.filterBy.sexualorient.splice(indexset, 1);
        }else{
          this.filterBy.sexualorient.push(type);
        }
        console.log("this.filterall()1");
        this.filterall();
    }

      private countyallcheck(){ 
          this.filterBy.country = []; 
          this.filterBy.country = this.countrys.map(function(a) {return a._id;});
          console.log("this.filterall()2");    
          this.filterall();
      }

      private countyalluncheck(){
          this.filterBy.country = []; 
          console.log("this.filterall()3");        
          this.filterall();
      }

  private getCustomerr() {
      this.customerService.getOne(this.cid).subscribe(customer => { 
          console.log("customerpackage");
          console.log(customer);
          this.customerpackage = customer.message;   
      });
  }

  private initprefrences(){

      this.route.queryParams.subscribe(params => {

          if((params['gender'] != "") && (typeof params['gender'] !== "undefined")){
              if(this.filterBy.gender.indexOf(params['gender']) == -1){
                this.filterBy.gender.push(params['gender']);
              }
          }

          if((params['country'] != "" ) && (typeof params['country'] !== "undefined")){  
               console.log("my country", params['country']);
               this.filterBy.country = []; 
              if(params['country'] == 'all'){
               this.countyallcheck();
              }else{

                  if(this.filterBy.country.indexOf(params['country']) == -1){
                      this.filterBy.country.push(params['country']); 
                  }
             } 
          }

          if((params['age'] != "") && (typeof params['age'] !== "undefined")){
              console.log("age");
              console.log(params['age']);
              var newage1 = params['age'];
              var newage2 = newage1.split("-");
              this.filterBy.age.min = newage2[0];
              this.min = newage2[0];
              this.filterBy.age.max = newage2[1];
              this.max = newage2[1];
          }

          if((params['sexualorient'] != "" ) && (typeof params['sexualorient'] !== "undefined")){
              if(this.filterBy.sexualorient.indexOf(params['sexualorient']) == -1){
              this.filterBy.sexualorient.push(params['sexualorient']);    
                }
          }

          this.loadcheck = true;

          console.log("this.filterBy.gender"); 
          console.log(this.filterBy.gender); 
          //this.gendercheckvalue =  this.filterBy.gender; 
          console.log("this.filterall()4");

         
          this.filterall();  

      });
     } 

  private getCountry(){
      this.countryService.getAll().subscribe((data) => {
          
          console.log("country data");
          console.log(data);

          this.countrys = data.message;
      });
  }

  private countryFilter(id){        
      var indexset =  this.filterBy.country.indexOf(id);
      console.log("index");
      console.log(indexset);
      if(indexset != -1){
          this.filterBy.country.splice(indexset, 1);
      }else{
          this.filterBy.country.push(id);
      }
      console.log("this.filterall()5");
      this.filterall();      
  }

  private onlinenew(){
      this.socketService.onlineList2().subscribe(response => {   
          //console.log("chat-list-response-front1");
          // console.log(response);           
          this.myonline = response.chatList;
          this.getAllAllow();
          console.log("main 1");     
          //this.getCustomerDetail();  
          // this.initprefrences();
      }); 
  }

  private onlinenew3(){
      this.socketService.onlineList3().subscribe(response => {   
          // console.log("chat-list-response-front3");
          // console.log(response);           
          this.myonline = response.chatList;
          this.getAllAllow();   
          console.log("main 2");
          if(this.prefRun == true) 
          {
              this.initprefrences();
              this.prefRun = false;
          }  
          // this.getCustomerDetail();  
          //this.initprefrences();
      }); 
  }

  private onlinenew2(){
      this.socketService.onlineListon2().subscribe(response => {   
          //console.log("chat-list-response-front2");
          //console.log(response);           
          this.myonline = response.chatList;
          this.getAllAllow();
          console.log("main 3"); 
          if(this.prefRun == true) 
          {
              this.initprefrences();
              this.prefRun = false;
          }
          //this.getCustomerDetail();
      }); 
  }

  private offlinenew2(){
      this.socketService.offline2().subscribe(response => { 
          //console.log("offline 2");
          //console.log(response);
          this.myonline = response.chatList;
          this.getAllAllow();     
          //this.getCustomerDetail();
          console.log("main 4"); 
          console.log("this.filterall()6");
          this.filterall(); 
      }); 
  }  

    private selectNewChat(id){
        this.socketService.selectForChat(id, this.cid);
    }

    private cancelrequest(id){
    /* this.friendService.cancelRequest(this.cid).subscribe(data => {
            this.friendallow = data.message; 
            this.alen = this.friendallow.length;   
            console.log("this.friendallow");
            console.log(this.friendallow);
        });*/
    }

    private check(id){    
        const index = this.myonline.findIndex(item => item._id == id);
        if(index != -1){         
            return true;
        }else{        
            return false;
        }
    }

    private getAllAllow(){
        this.friendService.getAllFriendAllow(this.cid).subscribe(data => {
            this.friendallow = data.message;
            this.alen = this.friendallow.length; 
            console.log("this.friendallow");
            console.log(this.friendallow);
        });
    }

    private checkblock(id){
        var index1 = this.friendallow.findIndex(item => {
            return item.ToId._id == id && item.status == 4 
        });
        var index2 = this.friendallow.findIndex(item => {
            return item.FromId._id == id && item.status == 4 
        });
        if(index1 != -1 || index2 != -1){
            return false;
        } else{
            return true;
        }
    }
    
    private getCustomerDetail(){
        this.customerService.getAllActive().subscribe(data => {  
            console.log("getAllActive");              
            console.log(data);              
            this.profiles = data.message;                                                     
        });
    } 

    private sendRequest(id) {
        var friendobj={FromId:this.cid,ToId:id,status:0}
        this.friendService.addFriend(friendobj).subscribe(
        (data) => {
            this.getAllAllow();
            console.log("this.filterall()7");
            this.filterall();
            //this.getCustomerDetail();
            this.alertService.success('Send request Successful', true);       
        }); 
        this.requestFromTo(this.cid, id, 'request');
    }
    
    private requestFromTo(from, to, type){
      console.log("requestby");
      var obj = {FromId : from, ToId: to, title: type}; 
      this.socketService.viewby(obj);
    }

    private anyBlockRequest(id) {
        var friendobj={FromId:this.cid,ToId:id,status:4}
        this.friendService.addFriend(friendobj).subscribe(
        (data) => {
            this.getAllAllow();
            console.log("this.filterall()8");
            this.filterall();
            //this.getCustomerDetail();
            this.alertService.success('Send request Successful', true);       
        });
    }

    private blockrequest(id :any,tid :any) {
        var friendobj={_id : id,FromId :this.cid,ToId: tid,status: 2};
        this.friendService.updateFriend(friendobj).subscribe(
        (data) => {
            this.getAllAllow(); 
            //this.getCustomerDetail();
            console.log("this.filterall()9");
            this.filterall();
            this.alertService.success('Send request Successful', true);       
        }); 
    }

    private acceptrequest(id, pid) {

        var friendobj={_id: id, status:1};

        console.log("this.cid, id, 'accept'");
        console.log(this.cid, id, 'accept');

        this.requestFromTo(this.cid, pid, 'accept');
        this.friendService.updateFriend(friendobj).subscribe(
        (data) => {
            this.getAllAllow(); 
            //this.getCustomerDetail();
            console.log("this.filterall()10");
            this.filterall();
            this.alertService.success('Send request Successful', true);       
        }); 
      
    }
 
    private unblockrequest(data, type) {         
        if(type == 2){
            var friendobj ={_id:data._id, FromId: data.ToId._id, ToId: data.FromId._id, status:0};
            this.friendService.updateFriend(friendobj).subscribe(
            (data) => {
                this.getAllAllow(); 
                //this.getCustomerDetail();
                console.log("this.filterall()11");
                this.filterall();
                this.alertService.success('Send request Successful', true);       
            });
        }else{
            this.deleteBlock(data._id);   
        }
    }

    private deleteBlock(id){        
        this.friendService.deleteOne(id).subscribe(
        (data) => {
            this.getAllAllow();
            console.log("this.filterall()12");
            this.filterall(); 
            //this.getCustomerDetail();
            this.alertService.success('Send request Successful', true);       
        });  
    }

    private checkforinvite(id, idd){ 
        const index1 = this.friendallow.findIndex(item => item.FromId._id == id);
        const index2 = this.friendallow.findIndex(item => item.ToId._id == id);
        if(index1 != -1 || index2 != -1){
            return false;
        } else {
            return true;
        } 
    }

    private genderfiler(type){
        if(type == 'male'){
            var indexset = this.filterBy.gender.indexOf(type);
            if(indexset != -1){
                this.filterBy.gender.splice(indexset, 1);
            }else{
                this.filterBy.gender.push(type);
            }
        }
        if(type == 'female'){
            var indexset = this.filterBy.gender.indexOf(type);
            if(indexset != -1){
                this.filterBy.gender.splice(indexset, 1);
            }else{
                this.filterBy.gender.push(type);
            }
        }
        console.log("this.filterall()13");
        this.filterall();
    }

    private online(){
        if(this.filterBy.online == 'xyz'){
            this.filterBy.online = 'Y';
        }else{
            this.filterBy.online = 'xyz';
        }
        console.log("this.filterall()14");
        this.filterall();
       }

    private agefilterd(type, value, event){
        ////alert();
        //console.log("moo", event);
        if((type == 'min' || type == 'max')){ 
            if(type == 'min'){
                this.filterBy.age.min = value;   
            }
            if(type == 'max'){
                this.filterBy.age.max = value;
            } 
            console.log("run");
            console.log("this.filterall()15");
            this.filterall();
            /*if(this.filterBy.age.min == "" || this.filterBy.age.max != ""){
              this.filterall();
            } 
            else if(this.filterBy.age.min != "" || this.filterBy.age.max == ""){
              this.filterall();
            } 
            else if(this.filterBy.age.min == "" || this.filterBy.age.max == "") 
            {   console.log("new1");
                this.getAllAllow(); 
                this.getCustomerDetail();    
            }else{
                console.log("new2");
            }*/
        }
    }


    filterall(){

        console.log("this.filterBy");
        console.log(this.filterBy);

        if(this.filterBy.sexualorient.length > 0 || this.filterBy.country.length > 0 || this.filterBy.gender.length > 0 || ((typeof this.filterBy.age.min != 'undefined') && (typeof this.filterBy.age.max != 'undefined')) && ((this.filterBy.age.min != '') && (this.filterBy.age.max != '')) || this.filterBy.online != "xyz")
        {
            this.customerService.filter(this.filterBy).subscribe(data => {
                this.profiles = data.message;
                this.sortBy("firstname");
            });
        }else{
            this.getAllAllow(); 
            this.getCustomerDetail();
            this.sortBy("firstname");
        }
    }

    vediocall(id, cid){
        this.callingtouser(id);
        this.currentcall = {_id :  id, cid : cid};

/* 
        var object = {_id :  id, cid : cid}; 
        console.log("vedio call");       
        console.log(object);  
*/
        this.socketService.video(this.currentcall);
        this.opencallingpopup();
    }

    callingtouser(id){

        this.customerService.getOne(id).subscribe((data) => {

         console.log("callingtouser");
         console.log(data);

         this.callingto = data.message;

        });

    }

    opencallingpopup(){document.getElementById('myModalb').style.display='block';}

    closecallingpopup(){document.getElementById('myModalb').style.display='none';}   

    videocallcancel(){
        this.socketService.callcancel(this.currentcall);  
        this.currentcall = {}; 
        this.closecallingpopup();    
    } 
}

@Component({
    selector: 'app-frontend-customer-friend',
    templateUrl: './frontend-customer-friend.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendFriendComponent implements OnInit {

    profile:any = [];
    cid : any;
    err:any;
    friendlst:any=[];
    sendrequiestfriendlst:any=[];
    acceptrequiestfriendlst:any=[];
    url:any = globalVariable.url+'uploads/';
    friendacceptlst :any = [];
    blockrequiestfriendlst : any = [];

    constructor(
        private lf: FormBuilder, 
        private customerService: CustomerService,
        private friendService: FriendService,
        private router: Router,
        private alertService: AlertService,
        private socketService: SocketService,
        private route: ActivatedRoute,
    ) { }

    ngOnInit() {    
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        this.getCustomerDetail();
        this.getAllSendRequistMe(this.cid);
        this.getAllfriendAcceptRequistMe(this.cid);
        this.acceptFriendList(this.cid);
        this.blockFriendList(this.cid);

         $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
         $(".paddingm1:first").addClass("info-tab-colors1");  
    }
     

    private setimage(img){
         var imgPath = "";
       if (img != null) {
           imgPath = this.url + img;
       }
       if (img == null) {
           imgPath = "../assets/img/face.png";
       }
       return imgPath;
     } 

    private  getCustomerDetail(){
        this.customerService.getOne(this.cid).subscribe(data => {                
            this.profile = data.message;
            /*if((typeof this.profile.profilePic != "undefined") && ( this.profile.profilePic != "")) {
                this.profile.profilePic = this.url +  data.message.profilePic;    
            }else{
                this.profile.profilePic = '/assets/images/face.png';
            }*/
        });
    }
    
    private getAllSendRequistMe(id) {
        var dataLst = [];
        dataLst.push(id);
        this.friendService.getAllSendRequistMe(id).subscribe(friends => { 
            this.sendrequiestfriendlst= friends.message;
            this.sendrequiestfriendlst.forEach(element => {
                dataLst.push(element.ToId);
            });
            this.friendService.getAllRequiestNotInSelf(dataLst).subscribe(friends => { 
                this.friendlst=friends.message;
            });      
        });
    }

    allrequests(){
        this.getAllfriendAcceptRequistMe(this.cid);
        this.acceptFriendList(this.cid);
        this.blockFriendList(this.cid);
    }

    private getAllRequiestAcceptSelf(id) {
        this.friendService.getAllRequiestAcceptSelf(id).subscribe(friends => { 
            this.acceptrequiestfriendlst= friends.message;
        });
    }

    private sendRequiest(id) { 
        var friendobj={FromId:this.cid, ToId:id, status:0}
        this.friendService.addFriend(friendobj).subscribe(
        (data) => {
            this.alertService.success('Send requiest successful', true);
            this.getAllSendRequistMe(this.cid);
        });
    }

    private getAllfriendAcceptRequistMe(id) {
        this.friendService.getAllAcceptRequistMe(id).subscribe(friends => {
            //console.log(friends.message); 
            this.acceptrequiestfriendlst= friends.message;      
            var dataLst = [];
            this.acceptrequiestfriendlst.forEach(element => {
                dataLst.push(element.FromId);
            });
            this.friendService.getAllRequiestAcceptSelf(dataLst).subscribe(friends => { 
                this.friendacceptlst=friends.message;
            });
        });
    }

    private acceptRequiest(id) {
        var usersValue=localStorage.getItem('currentCustomer');
        var customerId=JSON.parse(usersValue)._id;

        var friendobj={FromId:id,ToId:customerId,status:1}

        this.friendService.updateacceptblockFriend(friendobj).subscribe(
        (data) => {
            this. getAllfriendAcceptRequistMe(customerId);
            this.acceptFriendList(this.cid);
            this.alertService.success('Send requiest successful', true);
        });

        this.requestFromTo(customerId,id);
    }
    
     private requestFromTo(from, to){
      console.log("requestby");
      var obj = {FromId : from, ToId: to, title: 'accept'}; 
      this.socketService.viewby(obj);
    }

    private blockRequiest(id) {
        var usersValue=localStorage.getItem('currentCustomer');
        var customerId=JSON.parse(usersValue)._id;
        var friendobj={FromId:id,ToId:customerId,status:2}
        this.friendService.updateacceptblockFriend(friendobj).subscribe(
        (data) => {
            this. getAllfriendAcceptRequistMe(customerId);        
            this.blockFriendList(this.cid);
            this.alertService.success('Send requiest successful', true);
        });
    }

    private blockFriendList(id) {
        var usersValue=localStorage.getItem('currentCustomer');
        var customerId=JSON.parse(usersValue)._id;
        var friendobj={id:customerId, status:4}
        this.friendService.blockFriendList(friendobj).subscribe(
        (data) => {
            console.log(data);
            this.blockrequiestfriendlst = data.message;
            // this.alertService.success('Send requiest successful', true);
            //this.router.navigate(['/customer/list']);
        });
    }

    private acceptFriendList(id) {
        var usersValue=localStorage.getItem('currentCustomer');
        var customerId=JSON.parse(usersValue)._id;
        var friendobj={id:customerId,status:1}
        this.friendService.acceptFriendList(friendobj).subscribe(
        (data) => {
            console.log(data.message);
            this.acceptrequiestfriendlst=data.message;
        });
    }

    private deleteBlock(id){
        console.log(id);
        var usersValue=localStorage.getItem('currentCustomer');
        var customerId=JSON.parse(usersValue)._id;
        var friendobj={ FromId: id, ToId: customerId,  status:0};
        this.friendService.findForDelete(friendobj).subscribe(item => {
            console.log(item);
            this.friendService.deleteOne(item.message._id).subscribe((data) => {
                this.allrequests();
                this.alertService.success('Send request Successful', true);       
            }); 
        });
    }

    private deleteBlockfrind(id){    
        this.friendService.deleteOne(id).subscribe((data) => {
            this.allrequests();
            this.alertService.success('Send request Successful', true);       
        }); 
    }
}

@Component({
    selector: 'app-frontend-customer-message',
    templateUrl: './frontend-customer-message.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendCustomerMessageComponent implements OnInit {

    cid : any;
    profile: any = {};
    url = globalVariable.url+'uploads/';
    allunreadmsg = [];
    profiles = [];

    constructor(private customerService: CustomerService, private socketService : SocketService) { }

    ngOnInit() {        
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        this.refresh();
         $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
         $(".paddingm1:first").addClass("info-tab-colors1");  
    }


    private setimage(img){
         var imgPath = "";
       if (img != null) {
           imgPath = this.url + img;
       }
       if (img == null) {
           imgPath = "../assets/img/face.png";
       }
       return imgPath;
     } 


    private refresh(){
        this.getCustomer(); 
        this.getCustomers();
    }

    private getCustomer() {
        this.customerService.getOne(this.cid).subscribe(customers => { 
            this.profile = customers.message;             
        });
    }

    private getCustomers(){
        this.customerService.getAll().subscribe(customers=> {      
            //console.log("customers");
            //console.log(customers);
            this.profiles =  customers.message; 
            this.messages();    
        });
    }

    private messages(){
        this.customerService.unreadMessage(this.cid).subscribe(messages=> {
            this.allunreadmsg = messages.message;
            //console.log("messages")
            //console.log(messages)   
        });
    }

    private getId(id){
        const index = this.profiles.findIndex(item => item._id == id);
        if(index != -1){
            return true;
        }else{
            return false;
        }
    }

    private readmessage(id){
        this.customerService.getOne(id).subscribe(customers => { 
            this.profile = customers.message;             
        });
    }

    private selectChat(id){
        //console.log("get data");        
        this.socketService.selectForChat(id, this.cid);
        setTimeout(() => {
            this.messages();        
        }, 1000);
    }
}

@Component({
    selector: 'app-frontend-customer-video-call',
    templateUrl: './frontend-customer-video-call.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendVideoCallComponent implements OnInit , OnDestroy{

    msg : any;
    cid : any;
    profile: any = {};
    url = globalVariable.url+'uploads/';    
    profiles = [];
    callsessionid : any;
    publishedUser:any ={};
    apiKey = '45956382';
    publisher:any;
    session:any;
    sessionOBJ:any;
    token:any;
    form:any;
    tokenid : any;
    banner : any = [];
    bannerImage : any = [];
    bannerImg : any ;
    bannervideo : any;
    timeslot : any = [];
    timeslotImage : any = [];
    itemplayed : any = 0;
    itemplayedImage : any = 0;
    donebanner : any = [];
    donebannerImage : any = [];
    connectedTo : any;

    constructor(private customerService: CustomerService, private bannerService : BannerService , private socketService : SocketService, private activatedRoute: ActivatedRoute, private router : Router) { this.disconnectcall();}

    ngOnInit() { 
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id; 
        console.log(this.cid);
        this.activatedRoute.params.subscribe((params: Params) => {
            this.callsessionid = params['sessionid'];
            this.tokenid = params['tokenid'];            
            this.connectedTo = params['connectedTo'];            
        });
        this.loadAllTime();
        this.loadAllTimeImage();
        this.getCustomer(); 
        //this.whenothervideodisconnect();
        this.donebanner = [];
    }

    ngOnDestroy(){
        this.disconnectcall();
        this.setNewTokboxToken();
    }

    /*private whenothervideodisconnect(){
         this.socketService.disconnectToOtherResponse().subscribe(response => {
             this.disconnectcall();
             console.log("dicconed to other");
         });   
    }*/
   
   private setNewTokboxToken(){
   this.customerService.changeTokboxToken(this.cid).subscribe((item) => {
       console.log(item);
   })
   }


    private loadAllTime() {
         this.bannerService.getAllTime().subscribe(users => { 
             console.log("users.message[0]");        
             console.log(users.message[0]); 
             if(users.message[0].bannertiming.length > 0){
                 this.timeslot = users.message[0].bannertiming;
                 this.loadbanners('video');         
             }else{
                 this.timeslot = [];
             }
         });
    }

    private loadAllTimeImage() {
         this.bannerService.getAllTimeImage().subscribe(users => { 
             console.log("users.message[0] Image");        
             console.log(users.message[0]); 
             if(users.message[0].bannertiming.length > 0){
                 this.timeslotImage = users.message[0].bannertiming;
                 this.loadbanners('image');         
             }else{
                 this.timeslotImage = [];
             }
         });
    }

    private loadbanners(type){        
         var obj = {type : type};
         this.bannerService.getAllTypeBanner(obj).subscribe((banner) => {
             console.log("banner" + type);
             console.log(banner);
             if(type == 'video' ){
                 this.banner = banner.message;  
             }else{
                 this.bannerImage = banner.message; 
             }                   
         });
    }

    private open(random){ 
         this.bannervideo = '';                
         document.getElementById('myModalbanner').style.display='block';
         this.bannervideo =  this.banner[random];
    }

    private openImage(random){ 
         this.bannerImg = '';                
         document.getElementById('mybannerimage').style.display='block';
         this.bannerImg =  this.bannerImage[random];
    }

    private  opencall(){
         console.log("qopencallqqqqq index"); 
         var random = this.randno();
         console.log(this.donebanner.indexOf(random));
         /*if(this.donebanner.indexIf(random) != -1){}*/
         if(this.donebanner.length < this.timeslot.length){
             //alert();
             this.setitem(random);    
         }
    }

    private  opencallImage(){
         console.log("bopencallqqqqq");  
         if(this.donebannerImage.length < this.timeslotImage.length){ 
             var random = this.randnoImage();
             this.setitemImage(random);
         }  
    } 

    private setitem(temp){    
         var random = temp;    
         var find1 = this.donebanner.indexOf(random);
         if((find1 != -1) && (this.donebanner.length != this.timeslot.length)){ 
             random = this.opencall();
         }else{
             this.donebanner.push(random); 
             this.repeatset(random);
         } 
    }

    private setitemImage(temp){
         var random = temp;    
         var find1 = this.donebannerImage.indexOf(random);
         if((find1 != -1) && (this.donebannerImage.length != this.timeslotImage.length)){ 
             random = this.opencallImage();
         }else{
             this.donebannerImage.push(random); 
             this.repeatsetImage(random);
         } 
    }  

    private repeatset(random){ 
         console.log("repeatsetqqqqqqq");   
         this.itemplayed = this.itemplayed+1;
         var timesetout1 = (this.timeslot[this.itemplayed-1].time * 1000);
         setTimeout(()=>{      
             this.open(random);      
             this.vi();
         },timesetout1);
    } 

    private repeatsetImage(random){ 
         console.log("repeatsetqqqqqqq");   
         this.itemplayedImage = this.itemplayedImage+1;
         var timesetout = (this.timeslotImage[this.itemplayedImage-1].time * 1000);
         setTimeout(()=>{      
             this.openImage(random);      
             // this.viImage();
             console.log(100);
         },timesetout);
    } 

    private randno(){
         var random = Math.floor(Math.random() * this.banner.length);
         console.log("randno"+ random);
         return random;
    }

    private randnoImage(){
         var random = Math.floor(Math.random() * this.bannerImage.length);
         console.log("randno"+ random);
         return random;
    }

    private sendMessageOnCall(data){
         let nme = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
         console.log('name',nme)
         this.sessionOBJ.signal({
             type: 'msg',
             data:  nme+'@@'+data
         }, function(error) {
             if (error) {
                 console.log('Error sending signal:', error.name, error.message);
             } else {
                 data = '';
             }
         });
         // this.msgList();
         (<HTMLInputElement>document.getElementById('btn-input')).value = "";
    }

    private close(){
         // Get the modal
         document.getElementById('myModalbanner').style.display='none';          
    }

    private closeImage(){
         // Get the modal
         document.getElementById('mybannerimage').style.display='none';          
    }

    private vi(){
         setTimeout(()=>{ 
             var vid = document.getElementById("myVideo");
             vid.onended = () => {                 
                 this.bannervideo = ''; 
                 this.close();
                 console.log(this.donebanner.length, this.timeslot.length);
                 if(this.donebanner.length < this.timeslot.length)
                 {
                     //alert();
                     this.opencall();    
                 }
             }               
         },500);
    }

    private closeviImage(){
         setTimeout(()=>{ 
             var vid = document.getElementById("mybannerimage");                                  
             this.bannerImg = ''; 
             this.closeImage();
             if(this.donebannerImage.length < this.timeslotImage.length){
                 this.opencallImage();     
             }                                                
         },500);
    }

    /* private msgList(){
        this.sessionOBJ.on('signal:msg', function(event) {
            var msgHis = document.getElementById('msgHistory');
            var msg = document.createElement('p');
            msg.innerText = event.data;
            msgHis.appendChild(msg);
            msg.scrollIntoView();
        });
    }*/

    private getCustomer() {
        this.customerService.getOne(this.cid).subscribe(customers => { 
            this.profile = customers.message; 
            this.token = customers.message.tokboxtoken;
            console.log(customers.message.tokboxsessionid);
            this.initializeSession(this.callsessionid, this.tokenid);
        });
    }
    
    private deductPackageCalls(){
        this.activatedRoute.queryParams.subscribe(params => {
            if(params["connected"] == 'yes'){
                this.customerService.getOne(this.cid).subscribe(customers => { 
                    console.log("customers caals");
                    if(customers.message.mypackage){
                        var calls = customers.message.mypackage.remaincalls - 1;
                        customers.message.mypackage.remaincalls = calls;
                        var newob = {_id : this.cid, mypackage : customers.message.mypackage}
                        this.customerService.updateCustomer(newob).subscribe((data) => {
                            console.log("data 22");
                        })
                    }
                }); 
            }  
        });     
    }

    private initializeSession(sessionId,token) {
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, (error) => {
            if (!error) {
                var publisherProperties = {insertMode: "append"};
                let publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log(this.sessionOBJ);
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Publishing a stream.');                        
                    }
                });
            } else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: (event) => {
                session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    this.deductPackageCalls();
                    this.opencall();
                    this.opencallImage();                   
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }else{
                    console.log('not any client connected. ');
                }
                /*session.signal(
                {
                    data:"hello"
                },
                (error) => {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");                  
                    }
                }
                );*/
            },
            connectionDestroyed: (event) => {
                connectionCount--;
                this.disconnectcall(); 
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.')
                }
            },
            streamCreated:function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = {width: '100%', height: '100%',insertMode: "append"};
                var subscriber = session.subscribe(event.stream,
                'subscriberContainer',
                subscriberProperties,
                function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                        //console.log(event)
                        console.log('Subscriber added.');
                    }
                });
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                        + 'or because the other party lost their connection.';
                        event.preventDefault();   // Prevent the Subscriber from being removed
                    }
                }
            },
            signal:function(event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
                let cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                let nameAndMsg = event.data.split("@@");
                let name = '';
                if (nameAndMsg[0] == cusObj.firstname) {
                    name = 'Me';
                }else{
                    name = nameAndMsg[0];
                }
                let msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerText = name+' : ' +msgggg ;
                    msgHis.appendChild(msg);
                }
                var list =  document.querySelector(`div#msgHistory`);
                list.scrollTop = list.scrollHeight;
            }
        });
    }

    private handleError(error) {
        if (error) {
            alert(error.message);
        }
    }

    private disconnectcall(){
        if(this.sessionOBJ){
            this.sessionOBJ.disconnect(); 
            // this.disconnectOther(); 
            this.router.navigate(['customer/allprofile']);    
        }        
    }

    /* disconnectOther(){
         var disconnectobj = {_id : this.connectedTo};
        this.socketService.disconnectToOther(disconnectobj);
    }*/  
}

@Component({
    selector: 'app-frontend-customer-live-now',
    templateUrl: './frontend-customer-live-now.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendLiveNowComponent implements OnInit {

    msg : any;
    cid : any;
    profile: any = {};
    url = globalVariable.url+'uploads/';    
    profiles = [];
    callsessionid : any;
    publishedUser:any ={};
    apiKey = '45956382';
    publisher:any;
    session:any;
    sessionOBJ:any;
    token:any;
    form:any;
    tokenid : any;

    constructor(private customerService: CustomerService, private socketService : SocketService, private activatedRoute: ActivatedRoute, private router : Router) { }

    ngOnInit() { 
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id; 
        console.log(this.cid)
        this.activatedRoute.params.subscribe((params: Params) => {
            this.callsessionid = params['sessionid'];
            this.tokenid = params['tokenid'];
        }); 
        this.getCustomer();
    }
    
    private sendMessageOnCall(data){
        this.sessionOBJ.signal({
            type: 'msg',
            data:  data
        }, function(error) {
            if (error) {
                console.log('Error sending signal:', error.name, error.message);
            } else {
                data = '';
            }
        });
        //this.msgList();
        (<HTMLInputElement>document.getElementById('btn-input')).value = "";
    }

    /*   private msgList(){
        this.sessionOBJ.on('signal:msg', function(event) {
            var msgHis = document.getElementById('msgHistory');
            var msg = document.createElement('p');
            //msg.className = event.from.connectionId === this.sessionOBJ.connection.connectionId ? 'mine' : 'theirs';
            console.log(event.data)
            msg.innerText = event.data;
            msgHis.appendChild(msg);
            msg.scrollIntoView();
        });
    }*/

    private getCustomer() {
        this.customerService.getOne(this.cid).subscribe(customers => { 
            this.profile = customers.message; 
            this.token = customers.message.tokboxtoken;
            console.log(customers.message.tokboxsessionid);
            this.initializeSession(this.callsessionid, this.tokenid);
        });
    }

    private initializeSession(sessionId,token) {
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, function(error) {
            if (!error) {
                var publisherProperties = {width: '100%', height: '100%',insertMode: "append"};
                let publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Publishing a stream.');
                    }
                });
            } else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: function (event) {
                if(connectionCount == 0){connectionCount++;}
                //connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }else{
                    console.log('not any client connected. ');
                }
                session.signal(
                {
                    data:"hello"
                },
                function(error) {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");
                    }
                });
            },
            connectionDestroyed: function (event) {
                connectionCount--;
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.')
                }
            },
            streamCreated:function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = {insertMode: 'append'};
                var subscriber = session.subscribe(event.stream,
                    'subscriberContainer',
                    subscriberProperties,
                    function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            console.log('Subscriber added.');
                        }
                    });
                subscriber.subscribeToVideo(false);
                subscriber.subscribeToAudio(false);
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                        + 'or because the other party lost their connection.';
                        event.preventDefault();   // Prevent the Subscriber from being removed
                    }
                }
            },
            signal:function(event) {
                console.log("Signal sent from connection " + event.from.id);
                //console.log(event);
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                console.log(event.data)
                msg.innerText = event.data;
                msgHis.appendChild(msg);
                var list =  document.querySelector(`div#msgHistory`);
                list.scrollTop = list.scrollHeight;
                // msg.scrollTop = msg.scrollHeight;
                // msg.scrollIntoView();
            }
        });
        this.sessionOBJ = session;
    }

    private handleError(error) {
        if (error) {
            alert(error.message);
        }
    }

    disconnectcall(){
        this.sessionOBJ.disconnect();  
        var obj3 = {_id : this.cid, status : false};
        this.socketService.liveBrodcast(obj3);
        this.router.navigate(['customer/profile']);
    }
}

@Component({
    selector: 'app-frontend-customer-live-now-list',
    templateUrl: './frontend-customer-live-now-list.component.html',
    styleUrls: ['./frontend.component.css']
})

export class FrontendLiveNowListComponent implements OnInit {

    livelist :any = [];
    url : any = globalVariable.url+ 'uploads/';
    cid : any;
    apiKey = '45956382';
    sessionOBJ :any;
    curindex :  any ; 
    liveactiveid : any;
    constructor(private customerService: CustomerService, private router : Router, private socketService : SocketService) { }

    ngOnInit() {
        this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id; 
        console.log(this.cid)
        this.getalllivenow(); 
        this.liveBrodcastRes();
    }

    private liveBrodcastRes(){
        this.socketService.liveBrodcastResponse().subscribe(response => {             
            var indexf = this.livelist.findIndex(item => item._id == response._id);  
            if(indexf != -1){
                if(this.liveactiveid == this.livelist[indexf]._id)
                {
                    this.popupclose();
                }
                this.livelist.splice(indexf, 1);
            }else{
                this.livelist.push(response); 
            }
        });
    }
    
    popupclose(){       
        document.getElementById('myModalb').style.display='block';       
    } 

    getalllivenow(){
        this.customerService.getAllLiveNow(this.cid).subscribe(list => {
            this.livelist = list.message;
        });
    }

    popupForChat(lid, i){
        this.curindex = i;
        document.getElementById('myModalb').style.display='block';
        this.customerService.getOne(lid).subscribe(item => {
            this.initializeSession(item.message.tokboxsessionid, item.message.tokboxtoken);
        });
    }

    private livenext(){
        console.log("livenext");
        this.curindex = this.curindex +1;       
        console.log(this.curindex, this.livelist.length);
        if( this.curindex < this.livelist.length){  
            this.liveactiveid = this.livelist[this.curindex]._id;         
            this.customerService.getOne(this.livelist[this.curindex]._id).subscribe(item => {
                this.sessionOBJ.disconnect(); 
                this.initializeSession(item.message.tokboxsessionid, item.message.tokboxtoken);
            });
        }else{
            this.sessionOBJ.disconnect();  
            this.curindex = "";
            this.liveactiveid  = "";
            this.router.navigate(['customer/profile']);
        }  
    }  

    private disconnect(){
        this.sessionOBJ.disconnect();  
        this.curindex = "";
        document.getElementById("myModalb").style.display = "none";
        //this.router.navigate(['customer/profile']);
    }

    private initializeSession(sessionId,token) {
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;
        session.connect(token, function(error) {
            if (!error) {
                var publisherProperties = {width: '100%', height: '100%',insertMode: "append"};
                let publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Publishing a stream.');
                    }
                });
            } else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: function (event) {
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }else{
                    console.log('not any client connected. ');
                }
                session.signal(
                {
                    data:"hello"
                },
                function(error) {
                    if (error) {
                        console.log("signal error ("
                            + error.name
                            + "): " + error.message);
                    } else {
                        console.log("signal sent.");
                    }
                });
            },
            connectionDestroyed: function (event) {
                connectionCount--;
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.')
                }
            },
            streamCreated:function (event) {
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = {insertMode: 'append'};
                var subscriber = session.subscribe(event.stream,
                'subscriberContainer',
                subscriberProperties,
                function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Subscriber added.');
                    }
                });
                subscriber.subscribeToVideo(false);
                subscriber.subscribeToAudio(false);
            },
            streamDestroyed: function (event) {
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                        + 'or because the other party lost their connection.';
                        event.preventDefault();   // Prevent the Subscriber from being removed
                    }
                }
            },
            signal:function(event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
            }
        });
    }
}

@Component({
    selector: 'app-ownerprofile',
    template: ''
})
export class CustomermailactivateComponent implements OnInit {
    cid : any;
    constructor(private router : Router, private activatedRoute : ActivatedRoute, private customerService: CustomerService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.cid = params['activationid'];  
            this.mailactivate();              
        });    
    }

    private mailactivate(){
        var obj = {_id : this.cid, activate: true};
        this.customerService.updateCustomer(obj).subscribe((data) => {
            console.log(data);
            if (data.error) {
                toastr.remove();
                toastr.error("Something Wrong"); 
            }else{
                toastr.remove();
                toastr.success("Account Activated"); 
                //alert("Account Activated");
                this.router.navigate(['/']);
            }
        });  
    }
}

@Component({
    selector: 'app-resetpassword',
    templateUrl: './resetpassword.component.html',
})
export class CustomerResetPasswordComponent implements OnInit {
    
    changePasswordModel : FormGroup;       
    Match : any = false;   
    cid : any;
    
    constructor(private lf: FormBuilder, private router : Router, private activatedRoute : ActivatedRoute, private customerService: CustomerService) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe((params: Params) => {
            this.cid = params['id']; 
        }); 
        this.changePasswordModel = this.lf.group({            
            password: ['', Validators.required],
            confirmpassword : ['', Validators.required],
            matchpass : ['', Validators.required]            
        });
    }

    private matchpassword(){  
        if(this.changePasswordModel.value.password == this.changePasswordModel.value.confirmpassword){        
            this.changePasswordModel.controls["matchpass"].setValue(true);
            this.Match = false;
        }else{
            this.changePasswordModel.controls["matchpass"].setValue("");
            this.Match = true;
        }
    }  

    private updatepassword() {
        var obj = {_id : this.cid, password : this.changePasswordModel.value.password};
        this.customerService.updateCustomer(obj).subscribe(update => {  
            alert("password change");
            this.router.navigate(['/']);
        });
    }
}

@Component({
    selector: 'app-frontend',
    templateUrl: './frontend-contactus.component.html'    
})
export class FrontendContactUsComponent implements OnInit {
    
    @ViewChild(ReCaptchaComponent) captcha: ReCaptchaComponent;
    page : any;
    pageDetail : any = {};
    contactAddModel : any;
    cp : any = '';
    success : any = false;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,        
        private router: Router,       
        private route: ActivatedRoute,
        private customerService: CustomerService
    ) {}
    
    ngOnInit() {
        this.route.params.subscribe((params: Params) => {
            this.page = params['page'];
            //this.getPage();
        });
        this.contactAddModel = this.lf.group({ 
            name : ['',Validators.required],
            email : ['',Validators.required], 
            phone : ['',Validators.required],
            message : ['',Validators.required],
            capcontrol : ['',Validators.required]
        }); 
    }

    sfalse(){
        this.success = false;
    }
    
    handleCorrectCaptcha(event){
        this.cp = true;
        this.contactAddModel.controls["capcontrol"].setValue(this.cp); 
    }

    onCaptchaExpired(){
        this.cp = ''; 
        this.contactAddModel.controls["capcontrol"].setValue(this.cp); 
        this.captcha.reset();   
    }

    contactSubmit(){
        this.customerService.sendContactQuery(this.contactAddModel.value).subscribe(data => {                
            this.success =  true; 
            this.contactAddModel.reset(); 
            this.cp = '';           
            this.captcha.reset();                                                        
        });
    }
}

@Component({
    selector: 'app-frontend',
    templateUrl: './view-abuse-report.component.html'    
})
export class FrontendReportComponent implements OnInit {

    addmodel : FormGroup;
    cid : any;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,        
        private router: Router,       
        private route: ActivatedRoute,
        private customerService: CustomerService
    ) {}
  
    ngOnInit() {  
        this.addmodel = this.lf.group({             
            description : ['',Validators.required]            
        });
        if(localStorage.getItem('currentCustomer')){
            this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        }
    }

    sendReport(){
        var obj = {FromId: this.cid, description : this.addmodel.value.description};
        this.customerService.sendReport(obj).subscribe((data) => {
            if(!data.error){
                alert("Your Abuse Report Has been submitted!");
                this.addmodel.reset();  
            }else{
                alert("Something Wrong!"); 
            }
        });
    }
}

@Component({
    selector: 'app-frontend-live-button',
    templateUrl: './frontend-live-button.component.html'    
})
export class FrontendLiveButtonComponent implements OnInit {

    addmodel : FormGroup;
    cid : any;
    livenowg : any;
    showb : any = false;
    profile : any ;

    constructor(
        private lf: FormBuilder, 
        private authService: AuthService,        
        private router: Router,       
        private route: ActivatedRoute,
        private customerService: CustomerService,
        private socketService : SocketService
    ) {}

    ngOnInit() { 
        if(localStorage.getItem('currentCustomer')){
            this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
        }
        this.initlivenow();
        this.livenowg = false;  
        if(this.route.snapshot.url[0].path == 'allprofile'){
            this.showb = true;
        }
        this.getCustomer();
    }

    private initlivenow(){
        var datat  = {_id : this.cid, islive: false, isbusy : false};
        this.customerService.updateCustomer(datat).subscribe(update => {              
            console.log(update);        
        });  
    } 

    private livenow(){
        this.livenowg = true;
        var datat  = {_id : this.cid, islive: true, isbusy : false};       
        this.customerService.updateCustomer(datat).subscribe(update => {              
            if(update.message.tokboxsessionid != '' && update.message.tokboxtoken != ''){   
                var obj3 = {_id : this.cid, status : true};
                this.socketService.liveBrodcast(obj3);                      
                this.router.navigate(['customer/live-now' , update.message.tokboxsessionid, update.message.tokboxtoken]);
            }else{            
                this.router.navigate(['customer/profile']);
            }            
        }); 
    }

    private findUsers(){        
        this.customerService.getOne(this.cid).subscribe((data) => {

            console.log("findUsers");
            console.log(data);
            console.log(data.message.preferences);

            if(typeof data.message.preferences != 'undefined'){
                this.router.navigate(['/customer/allprofile'], { queryParams: { gender: data.message.preferences.gender, country : data.message.preferences.country, age:  data.message.preferences.age, sexualorient : data.message.preferences.sexualorient}});
            }else{
                this.router.navigate(['/customer/allprofile']);  
            }
        });
    }


     private findGlobalUsers(){        
        this.customerService.getOne(this.cid).subscribe((data) => {  

            console.log("findUsers");
            console.log(data);
            console.log(data.message.preferences);

            if(typeof data.message.preferences != 'undefined'){
                this.router.navigate(['/customer/allprofile'], { queryParams: { gender: data.message.preferences.gender, country : "all", age:  data.message.preferences.age, sexualorient : data.message.preferences.sexualorient}});
            }else{
                this.router.navigate(['/customer/allprofile']);  
            }

        });
    }



    private getCustomer(){
        this.customerService.getOne(this.cid).subscribe((data) => {
            console.log("findUsers");
            console.log(data);
            this.profile = data.message;
        });
    } 

    private makeprivate(type){
        var obj = {_id : this.cid, isprivate : type};
        this.customerService.updateCustomer(obj).subscribe(data =>{
            console.log("donme");
            this.getCustomer();
        });
    }
}

@Component({
    selector: 'app-frontend-customer-speeddating',
    templateUrl: './frontend-customer-speeddating.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontendSpeedDatingComponent implements OnInit , OnDestroy{

    private newCandidate: any = "";
    private cid : any = "";
    private processing : any = false;
    private donestack : any = [];
    private sessionOBJ : any;
    private apiKey = '45956382';
    //private timetrack : any = false;

    constructor(private customerService: CustomerService, private socketService : SocketService, private router: Router, private route: ActivatedRoute) {}

    ngOnInit(){               
        //this.openModal();

        if(localStorage.getItem('currentCustomer')){
            this.cid = JSON.parse(localStorage.getItem('currentCustomer'))._id;
            if(typeof this.cid != 'undefined'){
            this.donestack.push(this.cid);
            }            
            var objinit = {speedstatus : true};
            this.updateCustomer(objinit);
        }       
        this.initSpeeddateresponse(); 
       }

    ngOnDestroy(){
        this.changetokbox();
        
        console.log("leave component & sessionOBJ");
        console.log(this.sessionOBJ);
        
        var objdestroy = {speedstatus : false, isbusyspeed : false};

       // this.isbusySpeed(false);
        this.updateCustomer(objdestroy); 
       
        if(typeof this.sessionOBJ != "undefined"){
            this.sessionOBJ.disconnect();
            console.log("leave component & sessionOBJ inside");
        }        
    }

    private initSpeeddateresponse(){

        this.socketService.speeddatingResponse().subscribe((data) => {
            
            console.log("speeddatingResponse");
            console.log(data);
            console.log("before"); 

             if(typeof this.sessionOBJ != "undefined"){                
                console.log("after");
                this.sessionOBJ.disconnect();
                }

            //console.log('data["fromid"]');
            //console.log(data["fromid"]);
     
            if(this.donestack.indexOf(data["fromid"]) == -1){
                 this.donestack.push(data["fromid"]); 
                 }    
            this.initializeSession(data["sessionid"], data["tokenid"]);
        });

    }

    private updateCustomer(newdata){
        
        var data = {_id : this.cid};
        
        if(typeof newdata.speedstatus !== 'undefined')
        {
          data["speedstatus"] = newdata.speedstatus;
        }

        if(typeof newdata.isbusyspeed !== 'undefined')
        {
          data["isbusyspeed"] = newdata.isbusyspeed;
        }

        this.customerService.updateCustomer(data).subscribe((item) => {
            if(newdata.speedstatus == true){
                this.speedCustomerAvail();
            }
        });
    }

    private next(){
        if(typeof this.sessionOBJ != "undefined")
        {
        this.sessionOBJ.disconnect();    
        }        
        this.speedCustomerAvail();
    }

    private disconnectall(){
        var objdisconnect = {speedstatus : false, isbusyspeed : false};
        this.updateCustomer(objdisconnect);
        this.sessionOBJ.disconnect();  
        this.router.navigate(['customer/profile']);
    }

    private speedCustomerAvail(){

        this.openModal();
        var obj = {ids : this.donestack};
        
       console.log("obj donestack",obj );
        

        this.customerService.allSpeedCustomerAvail(obj).subscribe((data) => {

             console.log("new user",data);
             this.newCandidate = data.data;
             

            if((data.data != "") && (this.newCandidate._id != 'undefined')){ 
                 this.newCandidate.fromid = this.cid;               
                 this.socketService.speeddatingvideo(this.newCandidate);
                 this.initializeSession(this.newCandidate.tokboxsessionid , this.newCandidate.tokboxtoken);
                 if(this.donestack.indexOf(this.newCandidate._id) == -1){
                    this.donestack.push(this.newCandidate._id);    
                 }
            }else{
                
                //this.closeModal(); 
                 //this.router.navigate(['customer/profile']);

                setTimeout(() => {
                this.customerService.getOne(this.cid).subscribe((data)=>{
                
                    console.log("TimeOut");
                    console.log(data);

                     if(data.message.isbusyspeed == false){
                            toastr.remove();
                     toastr.success("No On Avail In Speed Dating"); 
                        this.router.navigate(['customer/profile']);
                        } 
                                                         
                });                 
               }, 30000);           
            }
        });
    }

/*
    private isbusySpeed(type){
        var objp = {_id : this.cid , isbusyspeed : type};  
        this.customerService.updateCustomer(objp).subscribe((item) => {       
        console.log("done busy status change");
        });
    }
     */
     private changetokbox(){         
         this.customerService.changeTokboxToken(this.cid).subscribe((item) => {       
        console.log("done token chnage");
        
        });
     }

    private initializeSession(sessionId,token) {

        var objdisconnect = {isbusyspeed : true};
        this.updateCustomer(objdisconnect);
     
        var session = OT.initSession(this.apiKey, sessionId);
        this.sessionOBJ = session;

        session.connect(token, (error) => {
            if (!error) {
                var publisherProperties = {insertMode: "append"};
                let publisher = OT.initPublisher('publisherContainer', publisherProperties, function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        //console.log(this.sessionOBJ);
                        console.log("Publisher initialized.");
                    }
                });
                session.publish(publisher, function(error) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Publishing a stream.');                        
                    }
                });
            } else {
                console.log('There was an error connecting to the session: ', error.code, error.message);
            }
        });
        var connectionCount = 0;
        session.on({
            connectionCreated: (event) => {
                session.connection.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                connectionCount++;
                console.log(connectionCount + ' connections.');
                if (event.connection.connectionId != session.connection.connectionId) {                                   
                    console.log('Another client connected. ' + connectionCount + ' total.');
                }else{
                    console.log('not any client connected. ');
                }
            },
            streamCreated: (event) => {
                this.closeModal();
                console.log("New stream in the session: " + event.stream.streamId);
                var subscriberProperties = {width: '100%', height: '100%',insertMode: "append"};
                var subscriber = session.subscribe(event.stream,
                'subscriberContainer',
                subscriberProperties,
                function (error) {
                    if (error) {
                        console.log(error);
                    } else {
                        event.data = JSON.parse(localStorage.getItem('currentCustomer')).firstname
                        //console.log(event)
                        
                        console.log('Subscriber added.');
                    }
                });
            },
             connectionDestroyed: (event) => {
                connectionCount--;
              //  this.disconnectcall();
              console.log("last disconnect other");
                this.sessionOBJ.disconnect();     
                this.changetokbox();            
                this.openModal();        
                var objdisconnect = {isbusyspeed : false};        
                this.updateCustomer(objdisconnect);
                this.speedCustomerAvail(); 
                console.log(connectionCount + ' connections.');
            },
            sessionDisconnected: function sessionDisconnectHandler(event) {
                // The event is defined by the SessionDisconnectEvent class
                console.log('Disconnected from the this.session.');
                document.getElementById('disconnectBtn').style.display = 'none';
                if (event.reason == 'networkDisconnected') {
                    alert('Your network connection terminated.')
                }
            },
            streamDestroyed: function (event) {
              
                if (event.reason === 'networkDisconnected') {
                    event.preventDefault();
                    var subscribers = session.getSubscribersForStream(event.stream);
                    if (subscribers.length > 0) {
                        var subscriber = document.getElementById(subscribers[0].id);
                        // Display error message inside the Subscriber
                        subscriber.innerHTML = 'Lost connection. This could be due to your internet connection '
                        + 'or because the other party lost their connection.';
                        event.preventDefault();   // Prevent the Subscriber from being removed
                    }
                }
            },
            signal: function(event) {
                console.log("Signal sent from connection " + event.from.id);
                console.log(event);
                let cusObj = JSON.parse(localStorage.getItem('currentCustomer'));
                let nameAndMsg = event.data.split("@@");
                let name = '';
                if (nameAndMsg[0] == cusObj.firstname) {
                    name = 'Me';
                }else{
                    name = nameAndMsg[0];
                }
                let msgggg = nameAndMsg[1];
                var msgHis = document.getElementById('msgHistory');
                var msg = document.createElement('p');
                msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
                //console.log(event.data)
                if (msgggg != '') {
                    msg.innerText = name+' : ' +msgggg ;
                    msgHis.appendChild(msg);
                }
                var list =  document.querySelector(`div#msgHistory`);
                list.scrollTop = list.scrollHeight;
            }
        });
    }

    private handleError(error) {
        if (error) {
            alert(error.message);
        }
       }
    
     private sendMessageOnCall(data){
         let nme = JSON.parse(localStorage.getItem('currentCustomer')).firstname;
         console.log('name',nme)
         this.sessionOBJ.signal({
             type: 'msg',
             data:  nme+'@@'+data
         }, function(error) {
             if (error) {
                 console.log('Error sending signal:', error.name, error.message);
             } else {
                 data = '';
             }
         });
         // this.msgList();
         (<HTMLInputElement>document.getElementById('btn-input')).value = "";
        }

    private openModal() {
        document.getElementById('process').style.display = "block";
        }

    private closeModal() {
        document.getElementById('process').style.display = "none";
        }

}



@Component({
    selector: 'app-frontend-customer-Noti',
    templateUrl: './frontend-customer-notifications.component.html',
    styleUrls: ['./frontend.component.css']
})
export class FrontenNotificationsComponent implements OnInit {

    profile : any = {};
    url = globalVariable.url+'uploads/';
    viewss : any = [];
    cid : any;
    notificationsdata : any = [];

    constructor(private customerService: CustomerService, private socketService : SocketService) { }


    ngOnInit() {
        var usersValue = localStorage.getItem('currentCustomer');  
        this.cid = JSON.parse(usersValue)._id;
         this.getCustomer();
         this.getnotifications();
  
         $(".paddingm1").click(function(){
                $(".paddingm1").removeClass("info-tab-colors1");
                $(this).addClass("info-tab-colors1");
             });
         $(".paddingm1:first").addClass("info-tab-colors1");  
    }

  
     private setimage(img){
         var imgPath = "";
       if (img != null) {
           imgPath = this.url + img;
       }
       if (img == null) {
           imgPath = "../assets/img/face.png";
       }
       return imgPath;
     } 


  private getnotifications(){
  this.customerService.allnotifications(this.cid).subscribe(ndata => {    
    this.notificationsdata = ndata.message;
     console.log("myndata.message");
     console.log(ndata.message);
  });
  }


     private getCustomer() {
        this.customerService.getOne(this.cid).subscribe(customers => { 
            this.profile = customers.message;                    
        });
    }



}