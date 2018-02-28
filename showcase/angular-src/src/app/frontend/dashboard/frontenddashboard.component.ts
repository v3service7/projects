import { Component, Input, OnInit, NgZone, ViewChild, ElementRef, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { BookmarkService } from '../../services/bookmark.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var $;
import * as globalVariable from '../../global';

@Component({
  selector: 'app-frontenddashboard',
  templateUrl: './frontenddashboard.component.html',
  styleUrls: ['./frontenddashboard.component.css']
})
export class FrontendDashboardComponent implements OnInit {
constructor() {
}
ngOnInit() {

}
}
@Component({
  selector: 'app-profileheader',
  templateUrl: './profileheader.component.html',
  styleUrls: ['./frontenddashboard.component.css']
})
export class ProfileHeaderComponent implements OnInit {
  customer: any;
  currentCustomer: any;
  addCategoryForm: FormGroup;
  addLinkForm: FormGroup;
  categories: any;
  isHere = false;
  liCount: any;
  category_id: any;
  @Input() childMessage: string;
  // tslint:disable-next-line:max-line-length
  constructor(
    private route: ActivatedRoute,
    public toastr: ToastsManager,
    vRef: ViewContainerRef,
    public userService: UserService,
    public categoryService: CategoryService,
    public bookService: BookmarkService,
    private router: Router,
    private lf: FormBuilder) {
    this.customer = JSON.parse(localStorage.getItem('customer'));
    this.checkCustomer();
    this.getMyCategories();
    this.toastr.setRootViewContainerRef(vRef);
  }
  ngOnInit() {
    setTimeout(() => {
      this.liCount = document.getElementById('category-navbar').getElementsByTagName('li').length;
    }, 1000);
    this.addCategoryForm = this.lf.group({
      name: ['', Validators.required],
      position: ['', Validators.required]
    });
    this.addLinkForm = this.lf.group({
      url: ['', Validators.required]
    });
    this.category_id = this.childMessage;
    this.checkCustomer();
    // this.customer = JSON.parse(localStorage.getItem('customer'));
    // console.log(localStorage.getItem('customer'),'hedder');
  }
  addLink() {
    var obj = this.addLinkForm.value;
    obj.category_id = this.category_id;
    obj.position = 0;
    obj.title = this.addLinkForm.value['url'];
    this.bookService.bookmarkAdd(obj).subscribe((data) => {
      if (!data.error) {
        this.toastr.success(data.message, 'Success!');
        this.addLinkForm.reset();
      } else {
        this.toastr.error(data.message, 'Oops!');
      }
    });
  }
  slugify(text) {
    return text.toString().toLowerCase()
      .replace(/\s+/g, '-')           // Replace spaces with -
      .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
      .replace(/\-\-+/g, '-')         // Replace multiple - with single -
      .replace(/^-+/, '')             // Trim - from start of text
      .replace(/-+$/, '');            // Trim - from end of text
  }
  getMyCategories() {
    this.userService.mycategory().subscribe((data) => {
      if (!data.err) {
        this.categories = data.message;
      }
    });
  }
  addCategory() {
    this.modelOpen();
  }
  addCategoryData() {
    var position = this.addCategoryForm.value['position'];
    var obj = this.addCategoryForm.value;
    obj.user_id = this.customer._id;
    this.categoryService.categoryPositionUpdate(position).subscribe((data) => {
      if (!data.error) {
        this.categoryService.categoryAdd(obj).subscribe((data2) => {
          if (!data2.error) {
            this.toastr.success(data2.message, 'Success!');
            this.modelClose();
            this.getMyCategories();
            // tslint:disable-next-line:max-line-length
            //$('.category-navbar').prepend('<li class="nav-item dropdown px-3"><a class="nav-link dropdown-toggle" id="dropdown01" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + this.addCategoryForm.value['name'] + '</a><div class="dropdown-menu" aria-labelledby="dropdown01"><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-share" > </i> Share</a><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-code"> </i> Embeded</a><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-cog"> </i> Setting</a></div></li>');
            // tslint:disable-next-line:max-line-length
            //
            /*    if (position === 'Top') {
                 // tslint:disable-next-line:max-line-length
                 $('.category-navbar').prepend('<li class="nav-item dropdown px-3"><a class="nav-link dropdown-toggle" id="dropdown01" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + this.addCategoryForm.value['name'] + '</a><div class="dropdown-menu" aria-labelledby="dropdown01"><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-share" > </i> Share</a><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-code"> </i> Embeded</a><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-cog"> </i> Setting</a></div></li>');
               }else {
                 // tslint:disable-next-line:max-line-length
                 var liPosition = this.slugify(position.replace('After ', ''));
                 console.log('li.' + liPosition);
                 // tslint:disable-next-line:max-line-length
                 $('li.' + liPosition).after('<li class="nav-item dropdown px-3"><a class="nav-link dropdown-toggle" id="dropdown01" href="" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + this.addCategoryForm.value['name'] + '</a><div class="dropdown-menu" aria-labelledby="dropdown01"><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-share" > </i> Share</a><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-code"> </i> Embeded</a><a class="dropdown-item" href="javascript:void(0)"> <i class="fa fa-cog"> </i> Setting</a></div></li>');
               } */
            this.addCategoryForm.reset();
          } else {
            this.toastr.error(data2.message, 'Oops!');
            this.modelClose();
            this.addCategoryForm.reset();
            this.getMyCategories();
          }
        });
      }
    });
  }
  modelOpen() {
    document.getElementById('categoryModal').style.display = 'block';
  }
  modelClose() {
    document.getElementById('categoryModal').style.display = 'none';
  }

  checkCustomer() {
    this.customer = JSON.parse(localStorage.getItem('customer'));
    if (this.customer) {
      if (!this.isHere) {
        this.userService.getProfile().subscribe((data) => {
          if (data.user) {
            this.isHere = true;
            this.currentCustomer = data.user;
          }
        });
      }
      return true;
    } else {
      return false;
    }

  }
  logout() {
    localStorage.clear();
    this.router.navigate(['/']);
  }
}



@Component({
  selector: 'app-myprofile',
  templateUrl: './myprofile.component.html',
  styleUrls: ['./frontenddashboard.component.css']
})
export class MyProfileComponent implements OnInit {
  public uploader: FileUploader = new FileUploader({ url: globalVariable.url + 'upload' });
  imageChangedEvent: any = '';
  croppedImage: any = '';
  customer: any = {};
  customerProfileForm: FormGroup;
  customerPasswordUpdateForm: FormGroup;
  filesToUpload: Array<File>;
  constructor(private lf: FormBuilder, public userService: UserService, private _flashMessagesService: FlashMessagesService) {
    this.filesToUpload = [];
  }

  ngOnInit() {
    this.customer = JSON.parse(localStorage.getItem('customer'));
    // console.log(this.customer,'profile');
    this.customerProfileForm = this.lf.group({
      _id: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      image: ['', Validators.required],
      email: ['', Validators.required],
    });

    this.customerPasswordUpdateForm = this.lf.group({
      _id: [''],
      oldpassword: ['', Validators.required],
      newpassword: ['', Validators.required],
      confirmpassword: ['', Validators.required],
    });

    this.getProfile();
  }
  upload() {
    this.makeFileRequest('https://measuremight.com:3002/upload', [], this.filesToUpload).then((result) => {
      this.customerProfileForm.controls['image'].setValue('/uploads/' + result['filename']);
      this.profileUpdate();
      this.modelClose();
    }, (error) => {
      console.error(error);
    });
  }
  fileChangeEvent(fileInput: any) {
    this.modelOpen();
    this.imageChangedEvent = event;
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }
  /* fileChangeEvent(event: any): void {
    console.log(this.imageChangedEvent);
  } */
  makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
    return new Promise((resolve, reject) => {
      var ImageURL = this.croppedImage;
      // Split the base64 string in data and contentType
      var block = ImageURL.split(';');
      // Get the content type
      var contentType = block[0].split(':')[1]; // In this case 'image/gif'
      // get the real base64 content of the file
      var realData = block[1].split(',')[1]; // In this case "iVBORw0KGg...."

      // Convert to blob
      var blob = this.b64toBlob(realData, contentType, 512);
      let formData: any = new FormData();
      let xhr = new XMLHttpRequest();
      for (let i = 0; i < files.length; i++) {
        formData.append('file', blob, files[i].name);
      }
      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            resolve(JSON.parse(xhr.response));
          } else {
            reject(xhr.response);
          }
        }
      };
      xhr.open('POST', url, true);
      xhr.send(formData);
    });
  }


  modelOpen() {
    document.getElementById('imageuploadModal').style.display = 'block';
  }
  modelClose() {
    document.getElementById('imageuploadModal').style.display = 'none';
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  b64toBlob(b64Data, contentType, sliceSize) {
    contentType = contentType || '';
    sliceSize = sliceSize || 512;

    var byteCharacters = atob(b64Data);
    var byteArrays = [];

    for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      var slice = byteCharacters.slice(offset, offset + sliceSize);

      var byteNumbers = new Array(slice.length);
      for (var i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }

      var byteArray = new Uint8Array(byteNumbers);

      byteArrays.push(byteArray);
    }

    var blob = new Blob(byteArrays, { type: contentType });
    return blob;
  }
  getProfile() {
    this.userService.getProfile().subscribe((data) => {
      if (data.user) {
        this.customer = data.user;
        this.customerProfileForm.patchValue(data.user);
      }
    });
  }

  profileUpdate() {
    this.userService.updateProfile(this.customerProfileForm.value).subscribe((data) => {
      if (!data.error) {
        this.getProfile();
        this._flashMessagesService.show('Profile Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
      } else {
        this._flashMessagesService.show('Something went wrong', { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  passwordUpdate() {
    let obj = {
      id: this.customer['_id'],
      password: this.customerPasswordUpdateForm.value['oldpassword']
    };
    this.userService.checkPassword(obj).subscribe((data) => {
      if (!data.error) {
        if (this.customerPasswordUpdateForm.value['newpassword'] === this.customerPasswordUpdateForm.value['confirmpassword']) {
          let obj = {};
          obj['_id'] = this.customer['_id'];
          obj['password'] = this.customerPasswordUpdateForm.value['newpassword']
          // tslint:disable-next-line:no-shadowed-variable
          this.userService.resetPassword(obj).subscribe((data) => {
            if (!data.error) {
              this._flashMessagesService.show('Password Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
            }
          });
        } else {
          this._flashMessagesService.show('New Password & confirm password does not match', { cssClass: 'alert-danger', timeout: 5000 });
        }
      } else {
        this._flashMessagesService.show('Old password is worng.', { cssClass: 'alert-danger', timeout: 5000 });
      }
    });
  }

  imageParse() {
    if (this.customer.image) {
      return this.customer.image;
    } else {
      return 'http://placehold.it/150';
    }
  }

  onChange(event) {
    this.uploader.uploadAll();
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
      let responsePath = JSON.parse(response);
      this.customerProfileForm.controls['image'].setValue('/uploads/' + responsePath.filename);
      this.profileUpdate();
    };
  }
}

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {
  parentMessage: any;
  id: any;
  customer: any;
  category: any;
  categories: any;
  bookmarks: any;
  updateCategoryForm: FormGroup;
  constructor(private router: Router,
    private route: ActivatedRoute,
    vRef: ViewContainerRef,
    public categoryService: CategoryService,
    public bookmarkService: BookmarkService,
    private lf: FormBuilder,
    public toastr: ToastsManager,
    public userService: UserService) {
    this.toastr.setRootViewContainerRef(vRef);
    this.customer = JSON.parse(localStorage.getItem('customer'));
    this.router.events.subscribe((val) => {
      this.route.params.subscribe((params: Params) => {
        this.id = params['id'];
        this.parentMessage = this.id;
        this.getMyCategories();
        this.getbookmark(this.id);
      });
    });
  }

  ngOnInit() {
    this.updateCategoryForm = this.lf.group({
      _id: [''],
      name: ['', Validators.required],
      position: ['', Validators.required]
    });
    this.updateCategoryForm.reset();
    this.route.params.subscribe((params: Params) => {
      this.id = params['id'];
    });
    this.getMyCategories();
    this.getbookmark(this.id);
  }
  getbookmark(id) {
    this.bookmarkService.categoryBookmarks(id).subscribe((data) => {
      if (!data.error) {
        this.bookmarks = data.message;
      }
    });
  }
  getMyCategories() {
    this.userService.mycategory().subscribe((data) => {
      if (!data.err) {
        this.categories = data.message;
        this.category = data.message;
        this.category = this.category.filter((cid) => cid._id === this.id);
        this.updateCategoryForm.patchValue(this.category[0]);
      }
    });
  }
  updateCategoryData() {
    var position = this.updateCategoryForm.value['position'];
    var obj = this.updateCategoryForm.value;
    obj.user_id = this.customer._id;
    if (position !== this.category[0].position) {
      this.categoryService.categoryPositionUpdate(position).subscribe((data) => {
        if (!data.error) {
          this.categoryService.categoryUpdate(obj).subscribe((data2) => {
            if (!data2.error) {
              this.toastr.success('Category updated succesfully.', 'Success!');
              $('#' + this.updateCategoryForm.value['_id']).text(this.updateCategoryForm.value['name']);
              this.getMyCategories();
            } else {
              this.toastr.error('Error while updating category. Try again.', 'Oops!');
              this.getMyCategories();
            }
          });
        }
      });
    } else {
      this.categoryService.categoryUpdate(obj).subscribe((data2) => {
        if (!data2.error) {
          this.toastr.success('Category updated succesfully.', 'Success!');
          $('#' + this.updateCategoryForm.value['_id']).text(this.updateCategoryForm.value['name']);
          this.getMyCategories();
          window.location.reload();
        } else {
          this.toastr.error('Error while updating category. Try again.', 'Oops!');
          this.getMyCategories();
        }
      });
    }
  }
}
