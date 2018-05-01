import { Component, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl, AbstractControl, FormBuilder, Validators, FormArray} from '@angular/forms';
import { WizardValidationService } from './wizard-validation.service';
import { WizardApiService } from './wizard-api.service';
import { PipesModule } from './../../../theme/pipes/pipes.module';
declare var $ :any;

@Component({
  selector: 'az-wizard',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './wizard.component.html',
  styleUrls: ['./wizard.component.scss'],
  providers: [ WizardValidationService, WizardApiService ] 
})
export class WizardComponent {
    
    public steps:any[];
    public accountForm:FormGroup;
    public productForm:FormGroup;
    public paymentForm:FormGroup;
    public imageUploadForm:FormGroup;
    public videoUrlsForm:FormGroup;
    public sampleDetail:FormGroup;
    public ProductKeywordsForm:FormGroup;
    public tradeDetailForm:FormGroup;
    public productId:any;
    public details:any = {};
    public showConfirm:boolean;
    public sectors: any = [];
    public industries: any = [];
    public searchCategories:any = '';
    public searchIndustries:any = '';
    public items: any = [];
    public CostDetail: any = [];
    public ImageUrls: any = [];
    public VideoUrls: any = [];
    public UnitS:any = [];
    public paytype:any = '';
    public incoTerm:any;
    public tag:any = "";
    public tags:any = [];
    public masterIncoTerms: any = ["ECX","FCA","FAS","FOB","CFR","CIF","CPT","CIP","DAT","DAP","DDP"];
    public tradeDetailOption: any = {"I4GProductCode": "",   
                                     "IncoTerms": { "Selected": [] },
                                     "PaymentWays": {"Selected": []},
                                     "PaymentTerms": { "Selected": []}
                                    };



    constructor(private formBuilder: FormBuilder, private wizardApiService: WizardApiService) {   

        this.steps = [
          {name: 'Categories', icon: 'fa-lock', active: true, valid: false, hasError:false },
          {name: 'Product Details', icon: 'fa-user', active: false, valid: false, hasError:false },
          {name: 'Media', icon: 'fa-credit-card', active: false, valid: false, hasError:false },
          {name: 'Sample Detail', icon: 'fa-info', active: false, valid: false, hasError:false },
          {name: 'Trade Detail', icon: 'fa-exchange', active: false, valid: false, hasError:false },
          {name: 'For Buyers', icon: 'fa-search', active: false, valid: false, hasError:false },
          {name: 'Confirm', icon: 'fa-check-square-o', active: false, valid: false, hasError:false }
        ];

         this.accountForm = this.formBuilder.group({
            'I4GProductCode': '',
            'I4GCompanyCode': ['20171912150036634152', Validators.required],
            'IndustryCode': ['', Validators.required],
            'SectorCode': ['', Validators.required],
            });

        this.productForm = this.formBuilder.group({
            'I4GProductCode': ['', Validators.required],
            'SKUCode': ['SKU0010', Validators.required],
            'ProductName': ['', Validators.required],
            'ProductDescription': ['', Validators.required],
            'UniversalProductCode': ['', Validators.required],
            'EuropeanArticleNumber': ['', Validators.required],
            'CompanyProductId': ['', Validators.required],
            'ProductionCapacity': ['', Validators.required],
            'SampleAvailability': ['N', Validators.required],
            'SampleFree': ['N', Validators.required],
            'items': this.formBuilder.array([this.createItem()])
        });

        this.imageUploadForm = this.formBuilder.group({
           'Name': ['', Validators.required],
           'Image': ['', Validators.required]
            });

        this.sampleDetail = this.formBuilder.group({
           'I4GProductCode': ['', Validators.required],
           'SampleCostStatus': ['1234', Validators.required],
           'SampleCost': ['', Validators.required],
           'SampleQuantity': ['', Validators.required],
           'SampleUnit': ['', Validators.required],
           'SampleIncoTerm': ['', Validators.required],
           'SampleCostValidity': '',
           'SampleNotes': ['', Validators.required],
           'SamplePaymentWaysJson': ['', Validators.required]
            });
        
        this.ProductKeywordsForm = this.formBuilder.group({
           'I4GProductCode': ['', Validators.required],
           'Word': ['', Validators.required]
            });

        this.videoUrlsForm = this.formBuilder.group({
            'VideoUrls': this.formBuilder.array([this.createVideoUrl()])
        });     
        
        this.tradeDetailForm = this.formBuilder.group({
            'I4GProductCode': ['', Validators.required],
            'TermName': ['', Validators.required],
            'NegotiableQuantity': ['', Validators.required],
            'NegotiableUnits': ['', Validators.required],
            'Terms': ['', Validators.required],
            'CostDetail': this.formBuilder.array([this.createCostDetails()]),
            });
        
       this.getSectorsAndIndustries();
       this.getUnits();

    }
    
    public updateTradeDetailForm(){
       $("#Incoterm").modal('show');
    }

    public addTag(){
      var value = this.tag.trim();
      if(value.length > 0){
      this.tags.push(JSON.parse(JSON.stringify(this.tag)));
      this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      if(this.tags.length > 0){
      this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      }else{
      this.ProductKeywordsForm.controls["Word"].setValue("");
      }
      this.tag = "";
      }
    }
    
    public removeTag(index){
      this.tags.splice(index, 1);
      if(this.tags.length > 0){
      this.ProductKeywordsForm.controls["Word"].setValue(this.tags);
      }else{
      this.ProductKeywordsForm.controls["Word"].setValue("");
      }
    }
       

    public selectedPaymentWays(value){
     var index = this.tradeDetailOption.PaymentWays.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.PaymentWays.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.PaymentWays.Selected.push(value);  
     }
    }
    
    public selectPaymentTerms(value){
     var index = this.tradeDetailOption.PaymentTerms.Selected.indexOf(value);
     if(index > -1) {
     this.tradeDetailOption.PaymentTerms.Selected.splice(index, 1);
     }else{
     this.tradeDetailOption.PaymentTerms.Selected.push(value);  
     }
    }



    public selectIncoTermInTrade(prm){
       this.tradeDetailForm.controls["TermName"].setValue(prm);
    }
    
    public saveIncoTermCostDetail(){
      this.tradeDetailForm.value["CostDetails"] = { "CostDetail": this.tradeDetailForm.value.CostDetail };
      var obj = {"ExportTerms" : {"ExportTerm" : this.tradeDetailForm.value}};
      delete obj.ExportTerms.ExportTerm.CostDetail;

      this.wizardApiService.saveIncoTermCostDetail(obj).subscribe((data) => {
             this.getIncoTermCostDetail(obj.ExportTerms.ExportTerm.TermName);
             var index = this.tradeDetailOption.IncoTerms.Selected.indexOf(obj.ExportTerms.ExportTerm.TermName);
             if(index > -1) {
             this.tradeDetailOption.IncoTerms.Selected.splice(index, 1);
             }else{
             this.tradeDetailOption.IncoTerms.Selected.push(obj.ExportTerms.ExportTerm.TermName);  
             }

             // this.tradeDetailForm.reset();

             this.tradeDetailForm.controls["I4GProductCode"].setValue(this.productId); 
             $("#Incoterm").modal('hide');
      });
    }

    public getIncoTermCostDetail(incoterm){
           var obj = {"Product":{"I4GProductCode": this.productId, "IncoTerm": incoterm}};
           this.wizardApiService.getIncoTermCostDetail(obj).subscribe((data) => {
                console.log("data", data);
                this.incoTerm = data.ExportTerms.ExportTerm;
           });
    }

    public saveSectorIndustryDetail(){
         var obj = {"Product": this.accountForm.value};
         this.wizardApiService.saveSectorIndustryDetail(obj).subscribe((data) => {
           this.productId = data.message;
           this.productForm.controls["I4GProductCode"].setValue(this.productId);
           this.sampleDetail.controls["I4GProductCode"].setValue(this.productId);
           this.tradeDetailForm.controls["I4GProductCode"].setValue(this.productId);
           this.ProductKeywordsForm.controls["I4GProductCode"].setValue(this.productId);
           this.tradeDetailOption.I4GProductCode = this.productId;
         }, (error) => {
           console.log("error", error);
         });
    }

    public createItem(): FormGroup {
            return this.formBuilder.group({
            "Name": ['', Validators.required],
            "Value": ['', Validators.required]
            });
    }

     public createCostDetails(): FormGroup {
            return this.formBuilder.group({
            "Cost": ['', Validators.required],
            "Quantity": ['', Validators.required],
            "Unit": ['', Validators.required],
            "CostValidity": ''
            });
       }

    public createVideoUrl(): FormGroup {
            return this.formBuilder.group({
             'Name': ['', Validators.required],
             'Url': ['', Validators.required]
            });
    }

    public addVideoUrl(): void {
            this.VideoUrls = this.videoUrlsForm.get('VideoUrls') as FormArray;
            this.VideoUrls.push(this.createVideoUrl());
    }

    public removeVideoUrl(i): void {
            this.VideoUrls = this.videoUrlsForm.get('VideoUrls') as FormArray;
            this.VideoUrls.removeAt(i)
    }
    
    public addItemCostTrade(): void {
            this.CostDetail = this.tradeDetailForm.get('CostDetail') as FormArray;
            this.CostDetail.push(this.createVideoUrl());
    }

    public removeItemCostTrade(i): void {
            this.CostDetail = this.tradeDetailForm.get('CostDetail') as FormArray;
            this.CostDetail.removeAt(i)
    }
    

    public addItem(): void {
            this.items = this.productForm.get('items') as FormArray;
            this.items.push(this.createItem());
    }

    public removeItem(i): void {
            this.items = this.productForm.get('items') as FormArray;
            this.items.removeAt(i)
    }


    public updateSampleAvailability(){
           if(this.productForm.value.SampleAvailability == 'N'){
              this.productForm.controls["SampleAvailability"].setValue('Y');  
           }else{
             this.productForm.controls["SampleAvailability"].setValue('N');    
           }
           console.log("avail", this.productForm.value.SampleAvailability);
    }

    public updateSampleFree(){
           if(this.productForm.value.SampleFree == 'N'){
             this.productForm.controls["SampleFree"].setValue('Y');  
           }else{
             this.productForm.controls["SampleFree"].setValue('N');  
           }
           console.log("avail", this.productForm.value.SampleFree);

         }

    public getSectorsAndIndustries(){
           this.wizardApiService.getSectorsAndIndustries().subscribe((data) => {
           this.sectors = data.Details.Sectors.Sector.map((obj) => { obj.active = false; return obj; });
       }, (error)=> {
           this.sectors = [];
           });
    }
    

    public getUnits(){
           this.wizardApiService.getUnits().subscribe((data) => {
           this.UnitS = data.UnitS;
       }, (error)=> {
           console.log(error);
           this.UnitS = [];
           });
    }

    public selectSector(code){
              var index = this.sectors.findIndex((item) => {
              return item.Code == code;
              });
               if(index > -1){
                   this.sectors = this.sectors.map((obj) => { obj.active = false; return obj; });
                   this.sectors[index].active = true;
                   this.accountForm.controls["SectorCode"].setValue(this.sectors[index].Code);
                   var obj = {"Sector": {"Code": this.sectors[index].Code}};

                   this.wizardApiService.getIndustriesBySector(obj).subscribe((data) =>{
                   this.industries = data.Industries.Industry.map((obj) => { obj.active = false; return obj; });
               if(this.industries.length > 0){
                   this.industries[0].active = true;    
                   this.accountForm.controls["IndustryCode"].setValue(this.industries[0].Code);
                  }
               }, (error)=> {
                   this.industries = [];
                   this.accountForm.controls["IndustryCode"].setValue("");
               });
        }
    }


    public selectIndustry(code){
           var index = this.industries.findIndex((item) => {
            return item.Code == code;
           });
           if(index > -1){
           this.industries = this.industries.map((obj) => { obj.active = false; return obj; });
           this.industries[index].active = true;
           this.accountForm.controls["IndustryCode"].setValue(this.industries[index].Code);
           }
    }

   public createProductProfile(){
       var objspec = {"ProductSpecs" : {"Spec" : this.productForm.value.items}};
       this.productForm.value["ProductSpecs"] = objspec.ProductSpecs;
       var productFormData = {"Product" : JSON.parse(JSON.stringify(this.productForm.value))};
       delete productFormData.Product.SampleFree;
       delete productFormData.Product.items;
       this.wizardApiService.createProductProfile(productFormData).subscribe((data) => {
        console.log("Status data", data)
        // this.saveProductProfile();
       },(error)=> {
        console.log("Status error", error)
       });
     }

  /* public saveProductProfile(){
    var obj = {"Product": this.productForm.value};
    this.wizardApiService.saveProductProfile(obj).subscribe((data) => {
         console.log("saveProductProfile", data);
         // this.saveProductSpecs();
    }, (error) => {
         console.log("saveProductProfile error", error);
    });
   } 

   public saveProductSpecs(){
    this.wizardApiService.saveProductSpecs(this.productForm.value).subscribe((data) => {
         console.log("saveProductSpecs", data);
    }, (error) => {
        console.log("saveProductSpecs error", error);
    });
 
   } */

   public imageChange(event){
    //console.log("event", event);
    this.imageUploadForm.controls["Name"].setValue("");
    this.imageUploadForm.controls["Image"].setValue(event);
   }
   
   public paymentType(parm){
          this.paytype = parm;
          this.sampleDetail.controls["SamplePaymentWaysJson"].setValue(this.paytype);
          }


   public saveSampleDetail(){
     var obj = {"Product": this.sampleDetail.value};
     console.log(obj);
     this.wizardApiService.saveSampleDetail(obj).subscribe((data) => {
     console.log("saveSampleDetail", data);
     })
   }       
    
    public saveTradeDetails(){
     this.wizardApiService.saveTradeDetails(this.tradeDetailOption).subscribe((data) => {

     })
   } 

   public productKeywords(){
     this.wizardApiService.ProductKeywords(this.ProductKeywordsForm.value).subscribe((data) => {

     })
   }    
   
   public uploadProductImage(){
     //var obj = {"i4gProductCode" : this.productId, file : this.imageUploadForm.value.Image};
     this.imageUploadForm.value["i4gProductCode"] = this.productId;
     console.log(this.imageUploadForm.value);
     this.wizardApiService.uploadProductImage(JSON.stringify(this.imageUploadForm.value)).subscribe((data) => {

     });
   }

    public next(){

        let accountForm = this.accountForm;
        let productForm = this.productForm;
        let sampleDetail = this.sampleDetail;
        let ProductKeywordsForm = this.ProductKeywordsForm;
        let tradeDetailForm = this.tradeDetailForm;
        let tradeDetailOption = this.tradeDetailOption;

        if(this.steps[this.steps.length-1].active)
        return false;
            
        this.steps.some((step, index, steps) =>{
            if(index < steps.length-1){
                if(step.active){

                    if(step.name=='Categories'){
                        if (accountForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            this.saveSectorIndustryDetail();
                            return true;
                            }else{
                            step.hasError = true;
                            }  

                    }
                    if(step.name=='Product Details'){
                        if (productForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            this.createProductProfile();
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                    if(step.name=='Media'){
                        if (true) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        /*else{
                            step.hasError = true;
                        }*/                      
                    }

                    if(step.name=='Sample Detail'){
                        if (sampleDetail.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            this.saveSampleDetail();
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }

                    if(step.name=='Trade Detail'){
                        console.log("Trade Detail", tradeDetailOption.IncoTerms.Selected.length ,  tradeDetailOption.PaymentWays.Selected.length , tradeDetailOption.PaymentTerms.Selected.length);
                        if (tradeDetailOption.IncoTerms.Selected.length > 0 && tradeDetailOption.PaymentWays.Selected.length > 0 && tradeDetailOption.PaymentTerms.Selected.length > 0) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                             this.saveTradeDetails();
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }

                    if(step.name=='For Buyers'){
                        if (ProductKeywordsForm.valid) {
                            step.active = false;
                            step.valid = true;
                            steps[index+1].active=true;
                            return true;
                        }
                        else{
                            step.hasError = true;
                        }                      
                    }
                }
            }   
        });

        /*this.details.username = this.accountForm.value.username;*/
        /*this.details.fullname = this.productForm.value.firstname + " " + this.productForm.value.lastname;
        this.details.gender = this.productForm.value.gender;
        this.details.email = this.productForm.value.email;
        this.details.phone = this.productForm.value.phone;
        this.details.country = this.productForm.value.country;
        this.details.zipcode = this.productForm.value.zipcode;
        this.details.address = this.productForm.value.address;
        this.details.cardtype = this.paymentForm.value.cardtype;
        this.details.cardnumber = this.paymentForm.value.cardnumber; */ 
    }

    public prev(){
        if(this.steps[0].active)
            return false;
        this.steps.some(function (step, index, steps) {
            if(index != 0){
                if(step.active){
                    step.active = false;
                    steps[index-1].active=true;
                    return true;
                }
            }             
        });
    }

    public confirm(){
        this.steps.forEach(step => step.valid = true);
    }

   
}

