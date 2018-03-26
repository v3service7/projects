import { Component, Input, OnInit, NgZone, OnDestroy, ViewChild, AfterViewInit, ElementRef, ViewEncapsulation, ViewContainerRef, EventEmitter, Output } from '@angular/core';
import { Router, ActivatedRoute, Params, NavigationEnd } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { FileUploader } from 'ng2-file-upload';
import { UserService } from '../../services/user.service';
import { CategoryService } from '../../services/category.service';
import { BookmarkService } from '../../services/bookmark.service';
import { ValidateService } from '../../services/validate.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/interval';
declare var Masonry;
declare var $;
declare var twttr;
declare var jQuery;
declare var instgrm;
import * as globalVariable from '../../global';
//import { AngularMasonry, MasonryOptions, AngularMasonryBrick } from 'angular2-masonry';

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
    public static updateUserStatus: Subject<boolean> = new Subject();
    customer: any;
    bookmarkposition: any = 'top';
    isCopied1: any = false;
    invalidUrl: any = false;
    currentCustomer: any;
    currentCustomerImage: any;
    addCategoryForm: FormGroup;
    addLinkForm: FormGroup;
    categories: any;
    isHere = false;
    liCount: any;
    category_id: any;
    category: any;
    socialShareUrl: any;
    shareUrl: any;
    textToCopy: any;
    showcaseField: any = false;
    categorySelectedId: any = false;
    @Input() childMessage: string;
    @Output() sendIdEvent = new EventEmitter<object>(); 
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
        ProfileHeaderComponent.updateUserStatus.subscribe(res => {
            this.getMyCategories();
        });
        this.customer = JSON.parse(localStorage.getItem('customer'));
        this.checkCustomer();
        this.getMyCategories();
        this.toastr.setRootViewContainerRef(vRef);
    }

    ngOnInit() {
        this.shareUrl = window.location.href;
        this.addCategoryForm = this.lf.group({
            name: ['', Validators.required],
            position: ['', Validators.required]
        });

        this.addLinkForm = this.lf.group({
            title: ['', Validators.required],
            type: [''],
            body: [''],
            position: [''],
            category_id: ['']
        });

        this.category_id = this.childMessage;
        this.checkCustomer();
    }
    copyToClipboard() {
        // tslint:disable-next-line:max-line-length
        this.toastr.info('Copied to Clipboard');
    }
    doShare(category) {
        this.category = category;
        this.socialShareUrl = globalVariable.url + 'public/' + category._id;
        this.modelShareOpen();
    }
    doEmbed(category) {
        this.category = category;
        // tslint:disable-next-line:max-line-length
        this.textToCopy = '<div id="showcaseSocialBlock" data-showcaseID=' + this.category._id + '></div><script src="https://measuremight.com:3002/embed.min.js"></script>';
        this.modelEmbedOpen();
    }
    bookmarkPosition(position) {
        this.bookmarkposition = position;
        this.addLinkForm.controls['position'].setValue(this.bookmarkposition);
    }
    addBoodmark(id) {
        if (id) {
            this.addLinkForm.controls['category_id'].setValue(id);
        }
        this.bookService.bookmarkAdd(this.addLinkForm.value).subscribe((data) => {
            if (!data.eror) {
                this.toastr.success('Bookmark added succesfully.', 'Success!');
                this.modelCopyToClose();
                this.sendIdEvent.emit(this.addLinkForm.value);
                setTimeout(() => {
                    //ViewComponent.updateBookmarkStatus.next(true); // here
                    //this.router.navigate(['view', this.addLinkForm.value['category_id']]);
                    this.addLinkForm.reset();
                }, 500);
            } else {
                this.toastr.error('Error while adding bookmark, Try again.', 'Oops!');
            }
        });
    }
    openCopyToModel() {
        if (this.currentCustomer.ispaid) {
            this.modelBookmarkClose();
            this.modelCopyToOpen();
            this.addLinkForm.controls['position'].setValue(this.bookmarkposition);
        } else {
            this.addLinkForm.controls['category_id'].setValue(this.category_id);
            this.addLinkForm.controls['position'].setValue(this.bookmarkposition);
            console.log(this.addLinkForm.value);
            this.addBoodmark('');
            this.modelBookmarkClose();
        }
    }
    openNewShowcase() {
        this.showcaseField = true;
        this.categorySelectedId = false;
    }
    categorySelected(id) {
        this.showcaseField = false;
        this.categorySelectedId = true;
        this.addLinkForm.controls['position'].setValue(this.bookmarkposition);
        //console.log(this.addLinkForm.value);
        this.addLinkForm.controls['category_id'].setValue(id);
    }

    addLink() {
        this.embedLink(this.addLinkForm.value['title']);
        this.modelBookmarkOpen();
    }
    modelBookmarkCloseEmptyForm() {
        this.addLinkForm.reset();
        this.modelBookmarkClose();
    }
    embedFacebook(url) {
        // public => https://www.facebook.com/notes/facebook/public-search-listings-on-facebook/2963412130/
        // private => https://www.facebook.com/bob.brello
        const inputURL = encodeURIComponent(url);
        const ur = 'https://www.facebook.com/plugins/post.php?href=' + inputURL + '%26type%3D3&width=600';
        // tslint:disable-next-line:max-line-length
        const embedHTML = '<iframe id="bookmarkiframe" src="https://www.facebook.com/plugins/post.php?href=' + inputURL + '%26type%3D3&width=600" height="400" style="border:none;overflow:hidden" scrolling="no" frameborder="0" allowTransparency="true"></iframe>';
        const htmlToAdd = this.convertToGridItem(embedHTML);
        this.addLinkForm.controls['title'].setValue(ur);
        this.addLinkForm.controls['body'].setValue(embedHTML);
        this.addLinkForm.controls['type'].setValue('facebook');
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = htmlToAdd;
    }

    embedInsta(url) {
        this.validateService.getInsta(url)
            .subscribe(data => {
                this.addLinkForm.controls['title'].setValue(url);
                this.addLinkForm.controls['body'].setValue(data.html);
                this.addLinkForm.controls['type'].setValue('instagram');
                document.getElementById('loader').style.display = 'none';
                document.getElementById('bookMark').innerHTML = data.html;
                instgrm.Embeds.process();
            }, error => {
                document.getElementById('bookMark').innerHTML = 'Invalid Url';
                this.invalidUrl = true;
                document.getElementById('loader').style.display = 'none';
            });
    }

    embedTwitter(url) {
        this.validateService.getTwitter(url)
            .subscribe(data => {
                this.addLinkForm.controls['title'].setValue(url);
                this.addLinkForm.controls['body'].setValue(data.html);
                this.addLinkForm.controls['type'].setValue('twitter');
                document.getElementById('loader').style.display = 'none';
                document.getElementById('bookMark').innerHTML = data.html;
                twttr.widgets.load();
            }, error => {
                document.getElementById('bookMark').innerHTML = 'Invalid Url';
                this.invalidUrl = true;
                document.getElementById('loader').style.display = 'none';
            });
    }

    embedPinterest(url) {
        const embedHTML = '<a data-pin-do="embedPin" data-pin-width="large" data-pin-terse="true" href="' + url + '"></a>';
        const htmlToAdd = this.convertToGridItem(embedHTML);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = htmlToAdd;
    }

    embedSoundCloud(url) {
        // tslint:disable-next-line:max-line-length
        const ur = 'https://w.soundcloud.com/player/?url="' + url + '"';
        const embedHTML = '<iframe width="100%" height="166" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=' + url + '"></iframe>';
        const htmlToAdd = this.convertToGridItem(embedHTML);
        document.getElementById('loader').style.display = 'none';
        document.getElementById('bookMark').innerHTML = htmlToAdd;
        this.addLinkForm.controls['title'].setValue(ur);
        this.addLinkForm.controls['body'].setValue(embedHTML);
        this.addLinkForm.controls['type'].setValue('facebook');
    }

    convertToGridItem(htmlInc) {
        if (htmlInc.match('facebook.com')) {
            // need to fix up BS facebook stuff
            // console.log(htmlInc);
        }

        let html = '<div class="grid-item">';
        html += '   ' + htmlInc;
        html += '</div>';

        return html;
    }

    embedYoutube(url) {
        const youtubeID = url.split('v=')[1];
        this.validateService.getYoutube(youtubeID)
            .subscribe(data => {
                if (data.items.length > 0) {
                    // tslint:disable-next-line:max-line-length
                    const embedHTML = '<iframe width="100%" id="bookmarkiframe" height="337" src="https://www.youtube.com/embed/' + youtubeID + '" frameborder="0" allowfullscreen></iframe>';
                    this.addLinkForm.controls['title'].setValue('https://www.youtube.com/embed/' + youtubeID);
                    this.addLinkForm.controls['body'].setValue(embedHTML);
                    this.addLinkForm.controls['type'].setValue('youtube');
                    const htmlToAdd = this.convertToGridItem(embedHTML);
                    document.getElementById('loader').style.display = 'none';
                    this.invalidUrl = false;
                    document.getElementById('bookMark').innerHTML = htmlToAdd;
                } else {
                    document.getElementById('bookMark').innerHTML = 'Invalid Url';
                    this.invalidUrl = true;
                    document.getElementById('loader').style.display = 'none';
                }
            }, err => {
                document.getElementById('loader').style.display = 'none';
                document.getElementById('bookMark').innerHTML = 'Invalid Url';
                this.invalidUrl = true;
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

    addCategoryData(action) {
        if (action === 'close') {
            this.modelCopyToClose();
        }
        const position = this.addCategoryForm.value['position'];
        const obj = this.addCategoryForm.value;
        obj.user_id = this.customer._id;
        this.categoryService.categoryPositionUpdate(position).subscribe((data) => {
            if (!data.error) {
                this.categoryService.categoryAdd(obj).subscribe((data2) => {
                    if (!data2.error) {
                        this.toastr.success('Board added successfully.', 'Success!');
                        if (action) {
                            this.addBoodmark(data2.message._id);
                        }
                        this.modelClose();
                        this.getMyCategories();
                        this.addCategoryForm.reset();
                    } else {
                        this.toastr.error('Erro while adding board, Try again.', 'Oops!');
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
    modelEmbedClose() {
        document.getElementById('embedModal').style.display = 'none';
    }

    modelEmbedOpen() {
        document.getElementById('embedModal').style.display = 'block';
    }
    modelCopyToOpen() {
        document.getElementById('copytokModal').style.display = 'block';
    }
    modelCopyToClose() {
        document.getElementById('copytokModal').style.display = 'none';
    }

    modelShareOpen() {
        document.getElementById('shareModal').style.display = 'block';
    }
    modelShareClose() {
        document.getElementById('shareModal').style.display = 'none';
    }

    checkCustomer() {
        this.customer = JSON.parse(localStorage.getItem('customer'));
        if (this.customer) {
            if (!this.isHere) {
                this.userService.getProfile().subscribe((data) => {
                    if (data.user) {
                        this.isHere = true;
                        if (data.user.provider === 'google') {
                            this.currentCustomerImage = data.user.image;
                        } else {
                            this.currentCustomerImage = globalVariable.url + data.user.image;
                        }
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
        this.getProfile();
    }

    ngOnInit() {
        this.getProfile();
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

    makeFileRequest(url: string, params: Array<string>, files: Array<File>) {
        return new Promise((resolve, reject) => {
            const ImageURL = this.croppedImage;
            // Split the base64 string in data and contentType
            const block = ImageURL.split(';');
            // Get the content type
            const contentType = block[0].split(':')[1]; // In this case 'image/gif'
            // get the real base64 content of the file
            const realData = block[1].split(',')[1]; // In this case "iVBORw0KGg...."

            // Convert to blob
            const blob = this.b64toBlob(realData, contentType, 512);
            const formData: any = new FormData();
            const xhr = new XMLHttpRequest();
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


    public modelOpen() {
        document.getElementById('imageuploadModal').style.display = 'block';
    }
    public modelClose() {
        document.getElementById('imageuploadModal').style.display = 'none';
    }
    public imageCropped(image: string) {
        this.croppedImage = image;
    }
    public b64toBlob(b64Data, contentType, sliceSize) {
        contentType = contentType || '';
        sliceSize = sliceSize || 512;

        const byteCharacters = atob(b64Data);
        const byteArrays = [];

        for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
            const slice = byteCharacters.slice(offset, offset + sliceSize);
            const byteNumbers = new Array(slice.length);
            for (let i = 0; i < slice.length; i++) {
                byteNumbers[i] = slice.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            byteArrays.push(byteArray);
        }
        const blob = new Blob(byteArrays, { type: contentType });
        return blob;
    }
    getProfile() {
        this.userService.getProfile().subscribe((data) => {
            if (data.user) {
                this.customer = data.user;
                if (this.customer.provider === 'google') {
                    this.croppedImage = data.user.image;
                } else {
                    this.croppedImage = globalVariable.url + data.user.image;
                }
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
        const obj = {
            id: this.customer['_id'],
            password: this.customerPasswordUpdateForm.value['oldpassword']
        };
        this.userService.checkPassword(obj).subscribe((data) => {
            if (!data.error) {
                if (this.customerPasswordUpdateForm.value['newpassword'] === this.customerPasswordUpdateForm.value['confirmpassword']) {
                    var obj = {};
                    obj['_id'] = this.customer['_id'];
                    obj['password'] = this.customerPasswordUpdateForm.value['newpassword'];
                    // tslint:disable-next-line:no-shadowed-variable
                    this.userService.resetPassword(obj).subscribe((data) => {
                        if (!data.error) {
                            this._flashMessagesService.show('Password Updated  Successfully', { cssClass: 'alert-success', timeout: 5000 });
                        }
                    });
                } else {
                    // tslint:disable-next-line:max-line-length
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
            return 'https://www.w3schools.com/howto/img_avatar.png';
        }
    }

    onChange(event) {
        this.uploader.uploadAll();
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            const responsePath = JSON.parse(response);
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
    currentCustomer: any;
    category: any;
    categories: any;
    scrollCount: any;
    pageNumber: any = 1;
    bookmarks = [];
    bookmarkData: any;
    bookmarks_ids = [];
    categorySelectedId: any = false;
    showcaseField: any = false;
    copyShowcaseBookmark: any;
    copyShowcaseBookmarks: any;
    flag: any = true;
    updateCategoryForm: FormGroup;
    addCategoryForm: FormGroup;
    constructor(private router: Router,
        private route: ActivatedRoute,
        vRef: ViewContainerRef,
        public categoryService: CategoryService,
        public bookmarkService: BookmarkService,
        public sanitizer: DomSanitizer,
        private lf: FormBuilder,
        public toastr: ToastsManager,
        public userService: UserService) {
        this.toastr.setRootViewContainerRef(vRef);
        this.customer = JSON.parse(localStorage.getItem('customer'));
        this.getProfile();
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    this.id = params['id'];
                    this.bookmarks_ids = [];
                    this.parentMessage = this.id;
                    this.getMyCategories();
                    this.getbookmark(this.id);
                });
            }
        });
    }

    getProfile() {
        this.userService.getProfile().subscribe((data) => {
            if (data.user) {
                this.currentCustomer = data;
            }
        });
    }
    onScroll() {
        this.scrollCount = 20 * this.pageNumber;
        const obj = {
            start: this.scrollCount,
            end: 20
        };
        this.getbookmark(this.parentMessage, obj);
        this.pageNumber++;
    }
    videoUrl(url) {
        return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }

    ngOnInit() {
        this.addCategoryForm = this.lf.group({
            name: ['', Validators.required],
            position: ['', Validators.required]
        });
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
    }
    doDeleteBookmark(id) {
        this.bookmarkService.bookmarkDelete(id).subscribe((data) => {
            if (!data.error) {
                this.toastr.success('Bookmark deleted succesfully.', 'Success!');
                this.getbookmark(this.id);
            } else {
                this.toastr.error('Error while deleting bookmark, Try again', 'Oops!');
            }
        });
    }
    getbookmark(id, obj?: any) {
        this.bookmarkService.categoryBookmarks(id, obj).subscribe((data) => {
            if (!data.error) {
                console.log(data.message.length);
                for (let index = 0; index < data.message.length; index++) {
                    this.bookmarks.push(data.message[index]);
                }
                setTimeout(() => {
                    instgrm.Embeds.process();
                    twttr.widgets.load();
                }, 3000);
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
    myCategories() {
        this.userService.mycategory().subscribe((data) => {
            if (!data.err) {
                this.categories = data.message;
            }
        });
    }
    changePosition(type, bookmark_id, position) {
        const obj = {
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
                this.toastr.error('Erro while chaning bookmark position, Try again.', 'Oops!');
            }
        });
    }
    doSelect(obj) {
        const index = this.bookmarks_ids.findIndex((item) => {
            return item._id === obj._id;
        });
        if (index > -1) {
            this.bookmarks_ids.splice(index, 1);
        } else {
            this.bookmarks_ids.push(obj);
        }
    }
    doDelete() {
        const obj = {
            ids: this.bookmarks_ids
        };
        this.bookmarkService.bookmarkDeleteSelected(obj).subscribe((data) => {
            if (!data.error) {
                this.toastr.success('Bookmarks deleted succesfully.', 'Success!');
                this.getbookmark(this.id);
            } else {
                this.toastr.error('Error while deleting bookmarks, Try again', 'Oops!');
            }
        });
    }
    doSelectedCopy() {
        const obj = {
            ids: this.bookmarks_ids
        };
        this.copyShowcaseBookmarks = this.bookmarks_ids;
        this.modelCopy2Open();
    }
    doCopy(bookmark) {
        this.myCategories();
        this.copyShowcaseBookmark = bookmark;
        this.modelCopy2Open();
    }
    modelCopy2Open() {
        document.getElementById('copy2Modal').style.display = 'block';
    }
    modelCopy2Close() {
        document.getElementById('copy2Modal').style.display = 'none';
    }
    categorySelected(bookmark, category_id, copyShowcaseBookmarks) {
        this.showcaseField = false;
        this.categorySelectedId = true;
        if (copyShowcaseBookmarks) {
            this.bookmarkData = copyShowcaseBookmarks.filter((data) => {
                delete data['_id'];
                return data.category_id = category_id;
            });
        }
        if (bookmark) {
            delete bookmark['_id'];
            bookmark.category_id = category_id;
            this.bookmarkData = bookmark;
        }
    }
    openNewShowcase(bookmark, bookmarks) {
        this.showcaseField = true;
        this.categorySelectedId = false;
        if (bookmarks) {
            this.bookmarkData = bookmarks.filter((data) => {
                return delete data['_id'];
            });
        }
        if (bookmark) {
            delete bookmark['_id'];
            this.bookmarkData = bookmark;
        }
    }
    updateCatIdINBookmark(id) {
        if (this.bookmarkData.length > 0) {
            this.bookmarkData = this.bookmarkData.filter((data) => {
                delete data['_id'];
                return data.category_id = id;
            });
        }
        if (typeof this.bookmarkData.length === 'undefined') {
            this.bookmarkData.category_id = id;
        }
        this.addBoodmark();
    }
    addCategoryData() {
        const position = this.addCategoryForm.value['position'];
        const obj = this.addCategoryForm.value;
        obj.user_id = this.customer._id;
        this.categoryService.categoryPositionUpdate(position).subscribe((data) => {
            if (!data.error) {
                this.categoryService.categoryAdd(obj).subscribe((data2) => {
                    if (!data2.error) {
                        this.updateCatIdINBookmark(data2.message._id);
                        this.toastr.success('Board added successfully.', 'Success!');
                        this.getMyCategories();
                        setTimeout(() => {
                            window.location.reload();
                        }, 500);
                        this.addCategoryForm.reset();
                    } else {
                        this.toastr.error('Erro while adding board, Try again.', 'Oops!');
                        this.addCategoryForm.reset();
                        this.getMyCategories();
                    }
                });
            }
        });
    }
    addBoodmark() {
        if (this.bookmarkData.length > 0) {
            this.modelCopy2Close();
            this.toastr.success('Bookmarks copied succesfully.', 'Success!');
            let flag = false;
            for (let index = 0; index < this.bookmarkData.length; index++) {
                this.bookmarkService.bookmarkAdd(this.bookmarkData[index]).subscribe((data) => {
                    if (!data.error) {
                        flag = true;
                    }
                });
            }
        }
        if (typeof this.bookmarkData.length === 'undefined') {
            this.bookmarkService.bookmarkAdd(this.bookmarkData).subscribe((data) => {
                if (!data.error) {
                    this.toastr.success('Bookmarks copied succesfully.', 'Success!');
                    this.modelCopy2Close();
                } else {
                    this.toastr.error('Error while coping bookmarks, Try again', 'Oops!');
                }
            });
        }
    }
    doDeleteBoard(id) {
        this.categoryService.categoryDelete(id).subscribe((data) => {
            if (!data.error) {
                this.toastr.success('Board deleted succesfully.', 'Success!');
                setTimeout(() => {
                    this.router.navigate(['/dashboard']);
                }, 1000);
            } else {
                this.toastr.error('Error while deleting board, Try again', 'Oops!');
            }
        });
    }
    updateCategoryData() {
        const position = this.updateCategoryForm.value['position'];
        const obj = this.updateCategoryForm.value;
        obj.user_id = this.customer._id;
        if (position !== this.category[0].position) {
            this.categoryService.categoryPositionUpdate(position).subscribe((data) => {
                if (!data.error) {
                    this.categoryService.categoryUpdate(obj).subscribe((data2) => {
                        if (!data2.error) {
                            this.toastr.success('Category updated succesfully.', 'Success!');
                            ProfileHeaderComponent.updateUserStatus.next(true); // here
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
                    ProfileHeaderComponent.updateUserStatus.next(true); // here
                    this.getMyCategories();
                } else {
                    this.toastr.error('Error while updating category. Try again.', 'Oops!');
                    this.getMyCategories();
                }
            });
        }
    }
}

@Component({
    selector: 'app-viewpublic',
    templateUrl: './viewpublic.component.html',
    styleUrls: ['./frontenddashboard.component.css']
})
export class ViewPublicComponent implements AfterViewInit, OnInit {
    bookmarks = [];
    flag: any = true;
    parentMessage: any;
    scrollCount: any;
    pageNumber: any = 1;
    curColWidth = 0;
    gridColWidth = '';

    constructor(private router: Router,
        private route: ActivatedRoute,
        private bookmarkService: BookmarkService,
        private categoryService: CategoryService,
        private sanitizer: DomSanitizer) {
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    const id = params['id'];
                    this.parentMessage = id;
                    this.getbookmark(id);
                });
            }
        });
    }

    ngOnInit() {
        this.manageUI();
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    const id = params['id'];
                    //console.log('on');
                    this.parentMessage = id;
                    // this.getbookmark(id);
                });
            }
        });
    }
    onScroll() {
        this.scrollCount = 20 * this.pageNumber;
        const obj = {
            start: this.scrollCount,
            end: 20
        };
        this.getbookmark(this.parentMessage, obj);
        this.pageNumber++;
    }

    ngAfterViewInit() {
        this.route.params.subscribe((params: Params) => {
            const id = params['id'];
            this.parentMessage = id;
            Observable.interval(1000).subscribe(x => {
                this.manageUI();
            });
        });
    }

    setHeight(type) {
        if (type = 'facebook') {
            return '400';
        } else if (type = 'youtube') {
            return '337';
        }
    }

    setWidth(type) {
        return this.curColWidth;
    }
    manageUI() {
        let cols = 4;
        if (document.body.clientWidth > 1600) {
            cols = 4;
        } else if (document.body.clientWidth > 1000) {
            cols = 3;
        } else if (document.body.clientWidth > 600) {
            cols = 2;
        } else {
            cols = 1;
        }
        const theW = (document.body.clientWidth - (document.body.clientWidth / 50)) / cols;
        this.curColWidth = theW;
        const iframes = document.querySelectorAll('iframe');
        for (let i = 0; i < iframes.length; i++) {
            (<any>iframes[i]).style.width = theW - 15;
            /* (<any>iframes[i]).style.cssText = 'margin-top: 0px !important;'; */
        }
        const twitterwidget = document.querySelectorAll('twitterwidget');
        for (let i = 0; i < twitterwidget.length; i++) {
            (<any>twitterwidget[i]).style.width = theW;
            (<any>twitterwidget[i]).style.cssText = 'margin-top: 0px !important;';
        }
        const th = theW + (theW / 50) - 9;
        this.gridColWidth = th + 'px';
        const gridItems = document.querySelectorAll('.grid-item');
        for (let i = 0; i < gridItems.length; i++) {
            (<any>gridItems[i]).style.cssText = 'width : ' + (theW + (theW / 50) - 15) + 'px !important;margin :0 5px 5px 0 !important';
        }
        const msnry = new Masonry('#showcaseSocialBlock', {
            itemSelector: '.grid-item'
        });
        // $('.grid').masonry();
    }

    setStyles() {
        const styles = {
            'width': this.gridColWidth
        };
        return styles;
    }

    convertToGridItem(htmlInc) {
        let html = '<div class="grid-item">';
        html += ' ' + htmlInc;
        html += '</div>';
        return html;
    }

    getbookmark(id, obj?: any) {
        if (typeof obj === 'undefined') {
            (<HTMLInputElement>document.getElementById('showcaseSocialBlock')).innerHTML = '';
        }
        this.bookmarkService.categoryBookmarksPublic(id, obj).subscribe((data) => {
            if (!data.error) {
                if (data.message.length > 0) {
                    console.log(data.message.length);
                    for (let i = 0; i < data.message.length; i++) {
                        this.bookmarks.push(data.message[i]);
                        // tslint:disable-next-line:max-line-length
                        (<HTMLInputElement>document.getElementById('showcaseSocialBlock')).innerHTML += this.convertToGridItem(this.bookmarks[i]['body']);
                    }
                    setTimeout(() => {
                        instgrm.Embeds.process();
                        twttr.widgets.load();
                    }, 3000);
                }
            }
        });
    }
}

@Component({
    selector: 'app-view',
    templateUrl: './view.component.html',
    styleUrls: ['./frontenddashboard.component.css']
})
export class ViewComponent implements AfterViewInit, OnInit, OnDestroy {
    public static updateBookmarkStatus: Subject<boolean> = new Subject();
    scrollCount: any;
    pageNumber: any = 1;
    bookmarks = [];
    obTime: any;
    flag: any = true;
    parentMessage: any;
    msnry: any;
    curColWidth = 0;
    gridColWidth = '';

    constructor(private router: Router,
        private route: ActivatedRoute,
        private bookmarkService: BookmarkService,
        private categoryService: CategoryService,
        private sanitizer: DomSanitizer) {
        ViewComponent.updateBookmarkStatus.subscribe(res => {
            this.route.params.subscribe((params: Params) => {
                const id = params['id'];
                this.parentMessage = id;
                this.getbookmark(id);
            });
        });
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    const id = params['id'];
                    this.parentMessage = id;
                    this.getbookmark(id);
                });
            }
        });
    }
    ngOnInit() {
        console.log('tent')
        //this.manageUI();
        this.router.events.subscribe((val) => {
            if (this.flag) {
                this.flag = false;
                this.route.params.subscribe((params: Params) => {
                    const id = params['id'];
                    this.parentMessage = id;
                });
            }
        });
    }
    printMsg(msg) {
        let el1 = this.convertToGridItem(msg['body']);
        var el = $(el1);
        $("#showcaseSocialBlock").prepend(el).masonry( 'prepended', el);
        instgrm.Embeds.process();
        twttr.widgets.load();
        //console.log(instgrm.Embeds)
    }
    onScroll() {
        this.scrollCount = 20 * this.pageNumber;
        const obj = {
            start: this.scrollCount,
            end: 20
        };

        this.bookmarkService.categoryBookmarks(this.parentMessage , obj).subscribe((data) => {
            if (!data.error) {
                console.log(data.message.length)
                if (data.message.length > 0) {
                    var htmlBlocks = "";
                    for (let i = 0; i < data.message.length; i++) {
                        this.bookmarks.push(data.message[i]);
                        htmlBlocks = this.convertToGridItem(data.message[i]['body']);                    
                        var el = $(htmlBlocks);
                        //console.log(el)
                        $("#showcaseSocialBlock").append(el).masonry( 'appended', el)
                    }
                    setTimeout(() => {

                        //.masonry( 'appended', el);
                        instgrm.Embeds.process();
                        twttr.widgets.load();

                        /*$('#showcaseSocialBlock').masonry({
                            itemSelector: '.grid-item'
                        });
                        $(document).ready(function(){
                            $('#showcaseSocialBlock').masonry();
                            //$('.grid').masonry();
                        });*/
                    }, 3000);
                }
            }
        });
        //this.getbookmark(this.parentMessage, obj);
        this.pageNumber++;
    }
    ngOnDestroy() {
        this.obTime.unsubscribe();
    }
    ngAfterViewInit() {
        this.obTime = Observable.interval(1000).subscribe(x => {
            this.manageUI();
        });
    }

    setHeight(type) {
        if (type = 'facebook') {
            return '400';
        } else if (type = 'youtube') {
            return '337';
        }
    }

    setWidth(type) {
        return this.curColWidth;
    }

    manageUI() {
        $(document).ready(function(){
            var curColWidth = 400;
            var cols = 4;
            if($("body").width()>1600){
                cols = 4;
            }else if($("body").width()>1000){
                cols = 3;
            }else if($("body").width()>600){
                cols = 2;
            }else{
                cols = 1;
            }
            var theW = ($("body").width() - ($("body").width() / 50)) / cols;
            curColWidth = theW;
            $("iframe").css("width", theW - 15);
            $("twitterwidget").css("width", theW);
            $("twitterwidget").css('margin-top',  '0px !important');
            $(".grid-item").css("width", (theW + (theW/50) -15 ));
            $(".grid-item").css('margin' , '0 5px 5px 0 !important');
            //$('.grid').masonry();
            $('#showcaseSocialBlock').masonry();
        });
    }

    setStyles() {
        const styles = {
            'width': this.gridColWidth
        };
        return styles;
    }

    convertToGridItem(htmlInc) {
        let html = '<div class="grid-item">';
        html += ' ' + htmlInc;
        html += '</div>';
        return html;
    }

    getbookmark(id, obj?: any) {
        if (typeof obj === 'undefined') {
            (<HTMLInputElement>document.getElementById('showcaseSocialBlock')).innerHTML = '';
        }
        this.bookmarkService.categoryBookmarks(id, obj).subscribe((data) => {
            if (!data.error) {
                if (data.message.length > 0) {
                    var htmlBlocks = "";
                    for (let i = 0; i < data.message.length; i++) {
                        this.bookmarks.push(data.message[i]);
                        htmlBlocks += this.convertToGridItem(this.bookmarks[i]['body']);
                        // tslint:disable-next-line:max-line-length
                        //(<HTMLInputElement>document.getElementById('showcaseSocialBlock')).innerHTML += this.convertToGridItem(this.bookmarks[i]['body']);
                    }
                    $("#showcaseSocialBlock").html(htmlBlocks);
                    setTimeout(() => {
                        instgrm.Embeds.process();
                        twttr.widgets.load();

                        $('#showcaseSocialBlock').masonry({
                            itemSelector: '.grid-item'
                        });
                        $(document).ready(function(){
                            $('#showcaseSocialBlock').masonry();
                            //$('.grid').masonry();
                        });
                    }, 3000);
                }
            }
        });
    }
}