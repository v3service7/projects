import { Component, Input, OnInit, NgZone, ViewChild, ElementRef, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { BookmarkService } from '../../services/bookmark.service';
import { ValidateService } from '../../services/validate.service';
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
  showcaseField: any = false;
  @Input() childMessage: string;
  // tslint:disable-next-line:max-line-length
  constructor(
    private route: ActivatedRoute,
    public toastr: ToastsManager,
    public validateService: ValidateService,
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
      title: ['', Validators.required],
      type: [''],
      body: [''],
      category_id: ['']
    });

    this.category_id = this.childMessage;
    this.checkCustomer();
  }
  addBoodmark() {
    this.bookService.bookmarkAdd(this.addLinkForm.value).subscribe((data) => {
      if (!data.eror) {
        this.router.navigate(['view', this.addLinkForm.value['category_id']]);
        this.toastr.success('Bookmark added succesfully.', 'Success!');
        this.modelCopyToClose();
        this.addLinkForm.reset();
      } else {
        this.toastr.error('Error while adding bookmark, Try again.', 'Oops!');
      }
    });
  }
  openCopyToModel() {
    this.modelBookmarkClose();
    this.modelCopyToOpen();
  }
  openNewShowcase() {
    this.showcaseField = !this.showcaseField;
  }
  categorySelected(id) {
    this.addLinkForm.controls['category_id'].setValue(id);
    console.log(this.addLinkForm.value);
  }
  addLink() {
    this.embedLink(this.addLinkForm.value['title']);
    this.modelBookmarkOpen();
    /*var obj = this.addLinkForm.value;
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
    });*/
  }
  embedFacebook(url) {
    // public => https://www.facebook.com/notes/facebook/public-search-listings-on-facebook/2963412130/
    // private => https://www.facebook.com/bob.brello
    var inputURL = encodeURIComponent(url);
    var embedHTML = '<iframe id="bookmarkiframe" src="https://www.facebook.com/plugins/post.php?href=' + inputURL + '%26type%3D3&width=600" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
    var htmlToAdd = this.convertToGridItem(embedHTML);
    document.getElementById('loader').style.display = 'none';
    document.getElementById('bookMark').innerHTML = htmlToAdd;
  }

  embedInsta(url) {

  }

  embedTwitter(url) {

  }

  embedPinterest(url) {
    var embedHTML = '<a data-pin-do="embedPin" data-pin-width="large" data-pin-terse="true" href="' + url + '"></a>';
    var htmlToAdd = this.convertToGridItem(embedHTML);
    document.getElementById('loader').style.display = 'none';
    document.getElementById('bookMark').innerHTML = htmlToAdd;
  }

  embedSoundCloud(url) {
    // tslint:disable-next-line:max-line-length
    var embedHTML = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + url + '"></iframe>';
    var htmlToAdd = this.convertToGridItem(embedHTML);
    document.getElementById('loader').style.display = 'none';
    document.getElementById('bookMark').innerHTML = htmlToAdd;
  }
  convertToGridItem(htmlInc) {
    if (htmlInc.match('facebook.com')) {
      // need to fix up BS facebook stuff
      // console.log(htmlInc);
    }

    var html = '<div class="grid-item">';
    html += '   ' + htmlInc;
    html += '</div>';

    return html;
  }
  embedYoutube(url) {
    var youtubeID = url.split('v=')[1];
    this.validateService.getYoutube(youtubeID)
      .subscribe(data => {
        if (data.items.length > 0) {
          // tslint:disable-next-line:max-line-length
          let embedHTML = '<iframe width="100%" id="bookmarkiframe" height="337" src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allowfullscreen></iframe>';
          var embedObj = { title: url, body: embedHTML };
          /* this.addLinkForm.controls['title'].setValue(url); */
          this.addLinkForm.controls['body'].setValue(embedHTML);
          this.addLinkForm.controls['type'].setValue('youtube');
          var htmlToAdd = this.convertToGridItem(embedHTML);
          document.getElementById('bookMark').innerHTML = htmlToAdd;
        } else {
          document.getElementById('bookMark').innerHTML = 'invalid Url';
          document.getElementById('loader').style.display = 'none';
        }
      }, err => {
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = 'invalid Url';
      });
  }

  embedLink(link) {
    document.getElementById('loader').style.display = 'block';
    if (link.match('instagram.com')) {
      this.embedInsta(link);
    } else if (link.match('youtube.com')) {
      this.embedYoutube(link);

    } else if (link.match('facebook.com')) {
      this.embedFacebook(link);

    } else if (link.match('twitter.com')) {
      this.embedTwitter(link);

    } else if (link.match('pinterest.co')) {
      this.embedPinterest(link);
    } else if (link.match('soundcloud.com')) {
      this.embedSoundCloud(link);
    }
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

  modelBookmarkClose() {
    document.getElementById('bookmarkModal').style.display = 'none';
  }

  modelBookmarkOpen() {
    document.getElementById('bookmarkModal').style.display = 'block';
  }
  modelCopyToOpen() {
    document.getElementById('copytokModal').style.display = 'block';
  }
  modelCopyToClose() {
    document.getElementById('copytokModal').style.display = 'none';
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
  bookmarks_ids = [];
  flag: any = true;
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
      if (this.flag) {
        this.flag = false;
        this.route.params.subscribe((params: Params) => {
          this.id = params['id'];
          this.parentMessage = this.id;
          this.getMyCategories();
          this.getbookmark(this.id);
        });
      }
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
  changePosition(type, bookmark_id, position) {
    var obj = {
      type: type,
      bookmark_id: bookmark_id,
      category_id: this.id,
      position: position
    };
    this.bookmarkService.changePosition(obj).subscribe((data) => {
      if (!data.error) {
        this.toastr.success('Bookmark position changed succesfully.', 'Success!');
        this.getbookmark(this.id);
      } else {
        this.toastr.error('Erro while chaning bookmakr position, Try again.', 'Oops!');
      }
    });
  }
  doSelect(id) {
    var index = this.bookmarks_ids.indexOf(id);
    if (index > -1) {
      this.bookmarks_ids.splice(index, 1);
    } else {
      this.bookmarks_ids.push(id);
    }
  }
  doDelete() {
    var obj = {
      ids: this.bookmarks_ids
    };
    this.bookmarkService.bookmarkDeleteSelected(obj).subscribe((data) => {
      if (!data.error) {
        this.toastr.success('Bookmark deleted succesfully.', 'Success!');
        this.getbookmark(this.id);
      } else {
        this.toastr.error('Error while deleting bookmark, Try again', 'Oops!');
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
@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./frontenddashboard.component.css']
})
export class ViewComponent implements OnInit {
  constructor() {
  }
  ngOnInit() {

  }
}