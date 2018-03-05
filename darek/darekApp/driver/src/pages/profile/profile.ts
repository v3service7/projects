import { Component, ViewChild, ElementRef } from "@angular/core";
import {
  NavController,
  ActionSheetController,
  NavParams,
  LoadingController,
  ToastController,
  AlertController,
  Platform
} from "ionic-angular";
import { Observable } from 'rxjs/Observable';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { imageUrlupload } from "./../../services/global";
import { OneService } from "./../../services/one.service";
import { TwoService } from "./../../services/two.service";
import { FileUploader } from "ng2-file-upload/ng2-file-upload";
import { File } from "@ionic-native/file";
import { Transfer, TransferObject } from "@ionic-native/transfer";
import { FilePath } from "@ionic-native/file-path";
import { Camera } from "@ionic-native/camera";
import * as globalVariable from "./../../services/global";
declare var google: any;
declare var cordova: any;

@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  driver: any;
  lat: any;
  lng: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController
  ) {
    if (JSON.parse(localStorage.getItem("driver"))) {
      this.driver = JSON.parse(localStorage.getItem("driver"));
    }
  }

  ionViewDidLoad() {
    setTimeout(() => {
      this.loadMap();
    }, 3000);
    console.log("ionViewDidLoad ProfilePage");
  }
  ionViewDidEnter() {
    setTimeout(() => {
      this.loadMap();
    }, 3000);

    if (JSON.parse(localStorage.getItem("driver"))) {
      this.driver = JSON.parse(localStorage.getItem("driver"));
    }
  }

  loadMap() {
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode({ address: this.driver.address }, function (
        results,
        status
      ) {
        if (status == google.maps.GeocoderStatus.OK) {
          this.lat = results[0].geometry.location.lat();
          this.lng = results[0].geometry.location.lng();
          var options = {
            center: new google.maps.LatLng(this.lat, this.lng),
            zoom: 12
          };
          var map = new google.maps.Map(
            document.getElementById("map"),
            options
          );

          var marker = new google.maps.Marker({
            position: new google.maps.LatLng(this.lat, this.lng),
            map: map
          });
        }
      });
    }
  }
  goToPassword() {
    this.navCtrl.push(ChangePasswordPage);
  }
  goToEdit() {
    this.navCtrl.push(ProfileEditPage);
  }
  doLogout() { }
}

// edit profile component
@Component({
  selector: "page-profile-edit",
  templateUrl: "profile-edit.html"
})
export class ProfileEditPage {
  driver: any;
  editlat: any;
  editlng: any;
  loading: any;
  lastImage: string = null;
  editForm: FormGroup;
  URL: any = globalVariable.url1 + "upload/";
  public uploader: FileUploader = new FileUploader({
    url: this.URL,
    itemAlias: "file"
  });
  public phoneRegex = /^[+]?\d+(\.\d+)?$/;
  emailp: any = /^([a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+(\.[a-z\d!#$%&'*+\-\/=?^_`{|}~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]+)*|"((([ \t]*\r\n)?[ \t]+)?([\x01-\x08\x0b\x0c\x0e-\x1f\x7f\x21\x23-\x5b\x5d-\x7e\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|\\[\x01-\x09\x0b\x0c\x0d-\x7f\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))*(([ \t]*\r\n)?[ \t]+)?")@(([a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\d\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.)+([a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]|[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF][a-z\d\-._~\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]*[a-z\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])\.?$/i;
  formErrors = {
    username: "",
    email: "",
    firstname: "",
    lastname: "",
    phoneNo: "",
    vehicleType: "",
    vehicleName: "",
    vehicleNo: ""
  };
  validationMessages = {
    firstname: {
      required: "Email is required."
    },
    lastname: {
      required: "Email is required."
    },
    username: {
      required: "Username is required.",
      minlength: "Username must be at least 4 and maximum 64 characters long.",
      maxlength: "Username cannot be more than 64 characters long.",
      pattern: "Username cannot use Numberic, Special characters, Space Etc. "
    },
    email: {
      required: "Email is required.",
      pattern: "Email not in well format."
    },
    phoneNo: {
      required: "Phone no. is required.",
      minlength: "Phone no. should minimum 4 digit.",
      pattern: "Password use only Numbers Digits"
    },
    vehicleType: {
      required: "Vehicle type is required."
    },
    vehicleName: {
      required: "Vehicle name is required."
    },
    vehicleNo: {
      required: "Vehicle no. is required."
    }
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lf: FormBuilder,
    private oneService: OneService,
    public loadingCtrl: LoadingController,
    public actionSheetCtrl: ActionSheetController,
    public toastCtrl: ToastController,
    private camera: Camera,
    private transfer: Transfer,
    private file: File,
    private filePath: FilePath,
    public platform: Platform
  ) {
    this.uploader.onAfterAddingFile = file => {
      this.loading = this.loadingCtrl.create({
        content: "Please wait..."
      });
      this.loading.present();
      file.withCredentials = false;
    };

    this.uploader.onCompleteItem = (
      item: any,
      response: any,
      status: any,
      headers: any
    ) => {
      this.editForm.controls["image"].setValue(JSON.parse(response).filename);

      this.loading.dismiss();
    };
    this.editForm = this.lf.group({
      _id: ["", Validators.required],
      username: [
        "",
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(64),
          Validators.pattern("[a-zA-Z ]*")
        ]
      ],
      firstname: ["", [Validators.required]],
      lastname: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.pattern(this.emailp)]],
      phoneNo: ["", [Validators.required, Validators.pattern(this.phoneRegex)]],
      vehicleType: ["", [Validators.required]],
      vehicleName: ["", [Validators.required]],
      vehicleNo: ["", [Validators.required]],
      image: [""],
      address: [""]
    });
    if (JSON.parse(localStorage.getItem("driver"))) {
      this.driver = JSON.parse(localStorage.getItem("driver"));
      this.editForm.patchValue(this.driver);
    }
    this.editForm.valueChanges.subscribe(data => this.onValueChanged(data));
    this.onValueChanged();
  }
  placeAutocomplete() {
    let input = <HTMLInputElement>document.getElementById(
      "addressautocomplete"
    );
    if (input) {
      var autocomplete = new google.maps.places.Autocomplete(input);
      autocomplete.addListener("place_changed", () => {
        var place = autocomplete.getPlace();
        this.editForm.controls["address"].setValue(place.formatted_address);
      });
    }
  }
  ionViewDidLoad() {
    setTimeout(() => {
      this.placeAutocomplete();
    }, 3000);
    console.log("ionViewDidLoad ProfileEditPage");
  }
  profileUpload() { }
  public presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Load from Library",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }
  public takePicture(sourceType) {
    // Create options for the Camera Dialog
    var options = {
      quality: 100,
      sourceType: sourceType,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    // Get the data of an image
    this.camera.getPicture(options).then(
      imagePath => {
        // Special handling for Android library
        if (
          this.platform.is("android") &&
          sourceType === this.camera.PictureSourceType.PHOTOLIBRARY
        ) {
          this.filePath.resolveNativePath(imagePath).then(filePath => {
            let correctPath = filePath.substr(0, filePath.lastIndexOf("/") + 1);
            let currentName = imagePath.substring(
              imagePath.lastIndexOf("/") + 1,
              imagePath.lastIndexOf("?")
            );
            this.copyFileToLocalDir(
              correctPath,
              currentName,
              this.createFileName()
            );
          });
        } else {
          var currentName = imagePath.substr(imagePath.lastIndexOf("/") + 1);
          var correctPath = imagePath.substr(0, imagePath.lastIndexOf("/") + 1);
          this.copyFileToLocalDir(
            correctPath,
            currentName,
            this.createFileName()
          );
        }
      },
      err => {
        this.presentToast("Error while selecting image.");
      }
    );
  }
  // Create a new name for the image
  private createFileName() {
    var d = new Date(),
      n = d.getTime(),
      newFileName = n + ".jpg";
    return newFileName;
  }

  // Copy the image to a local folder
  private copyFileToLocalDir(namePath, currentName, newFileName) {
    this.file
      .copyFile(namePath, currentName, cordova.file.dataDirectory, newFileName)
      .then(
        success => {
          this.lastImage = newFileName;
          console.log(this.lastImage)
        },
        error => {
          this.presentToast("Error while storing file.");
        }
      );
  }
  profileUpdate() {

    if (typeof this.lastImage != 'undefined' && this.lastImage != null) {
      this.uploadImage();     
    } else {
      this.EditInfo();
    }

  }
  EditInfo() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    this.oneService.editDriver(this.editForm.value).subscribe(data => {
      if (!data.error) {
        this.oneService
          .getDriver(JSON.parse(localStorage.getItem("driver"))._id)
          .subscribe(data => {
            if (!data.error) {
              localStorage.removeItem("driver");
              localStorage.setItem("driver", JSON.stringify(data.message));
              loading.dismiss();
              this.getToast("Profile updated successfully.");
              this.navCtrl.pop();
            } else {
              this.getToast(data.message);
            }
          });
      }
    });
  }
  public uploadImage() {
    // Destination URL
    var url = this.URL;

    // File for Upload
    var targetPath = this.pathForImage(this.lastImage);

    // File name only
    var filename = this.lastImage;

    var options = {
      fileKey: "file",
      fileName: filename,
      chunkedMode: false,
      mimeType: "multipart/form-data",
      params: { fileName: filename }
    };

    const fileTransfer: TransferObject = this.transfer.create();

    this.loading = this.loadingCtrl.create({
      content: "Uploading..."
    });
    this.loading.present();

    // Use the FileTransfer to upload the image
    fileTransfer.upload(targetPath, url, options).then(
      data => {
        this.editForm.controls["image"].setValue(
          JSON.parse(data.response).filename
        );
        this.loading.dismissAll();
        this.driver.image = JSON.parse(data.response).filename;
        this.presentToast("Image succesful uploaded.");
        this.EditInfo();
      },
      err => {
        this.loading.dismissAll();
        this.presentToast("Error while uploading file.");
      }
    );
  }
  private presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000,
      position: "top"
    });
    toast.present();
  }

  // Always get the accurate path to your apps folder
  public pathForImage(img) {
    if (img === null) {
      return "";
    } else {
      return cordova.file.dataDirectory + img;
    }
  }
  EditMap() {
    var marker;
    var geocoder = new google.maps.Geocoder();
    if (geocoder) {
      geocoder.geocode(
        { address: this.editForm.controls.address.value },
        (results, status) => {
          if (status == google.maps.GeocoderStatus.OK) {
            this.editlat = results[0].geometry.location.lat();
            this.editlng = results[0].geometry.location.lng();
            var options = {
              center: new google.maps.LatLng(this.editlat, this.editlng),
              zoom: 12
            };
            var map = new google.maps.Map(
              document.getElementById("editmap"),
              options
            );

            marker = new google.maps.Marker({
              position: new google.maps.LatLng(this.editlat, this.editlng),
              map: map,
              draggable: true
            });
            google.maps.event.addListener(marker, "dragend", event => {
              var latlng = new google.maps.LatLng(
                marker.position.lat(),
                marker.position.lng()
              );
              geocoder.geocode({ latLng: latlng }, (results, status) => {
                if (status == google.maps.GeocoderStatus.OK) {
                  this.editForm.controls["address"].setValue(
                    results[0].formatted_address
                  );
                }
              });
            });
          }
        }
      );
    }
  }

  onValueChanged(data?: any) {
    if (!this.editForm) {
      return;
    }
    const form = this.editForm;
    for (const field in this.formErrors) {
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }

  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom" //top,middle,bottom
    });
    toast.present();
  }
}

// change password
@Component({
  selector: "page-change-password",
  templateUrl: "change-password.html"
})
export class ChangePasswordPage {
  passwordForm: FormGroup;
  passwordp: any;
  fulldetail: any;
  oldmatch: any;
  MutchPassword: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private twoService: TwoService,
    private oneService: OneService,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    private lf: FormBuilder
  ) {
    this.twoService.getComplexity().subscribe(data => {
      if (!data.error) {
        this.passwordp = data.message[0].ownerpasscomplexity.regex;
        this.setpasswordmessage(data.message[0].ownerpasscomplexity.name);
        this.passwordForm = this.lf.group({
          _id: ["", Validators.required],
          oldpassword: ["", [Validators.required]],
          password: [
            "",
            [Validators.required, Validators.pattern(this.passwordp)]
          ],
          confirmpassword: [
            "",
            [Validators.required, Validators.pattern(this.passwordp)]
          ],
          matchpass: ["", Validators.required],
          oldmatch: ["", Validators.required]
        });
        this.fulldetail = JSON.parse(localStorage.getItem("driver"));
        this.passwordForm.controls["_id"].setValue(this.fulldetail._id);

        this.passwordForm.valueChanges.subscribe(data =>
          this.onValueChanged(data)
        );
        this.onValueChanged();
      }
    });
  }
  public oldpassword() {
    if (this.fulldetail.password == this.passwordForm.value.oldpassword) {
      this.passwordForm.controls["oldmatch"].setValue(true);
      this.oldmatch = false;
    } else {
      this.passwordForm.controls["oldmatch"].setValue("");
      this.oldmatch = true;
    }
  }
  public matchpassword() {
    if (
      this.passwordForm.value.password ==
      this.passwordForm.value.confirmpassword
    ) {
      this.passwordForm.controls["matchpass"].setValue(true);
      this.MutchPassword = false;
    } else {
      this.passwordForm.controls["matchpass"].setValue("");
      this.MutchPassword = true;
    }
  }
  setpasswordmessage(name) {
    if (name == "simplepassword") {
      this.validationMessages.password.pattern =
        "Password must contain min 8 Digits alphanumeric only";
    }

    if (name == "medium") {
      this.validationMessages.password.pattern = "TBD";
    }

    if (name == "complex") {
      this.validationMessages.password.pattern = "TBD";
    }

    if (name == "none") {
      this.validationMessages.password.pattern = "";
    }
  }
  formErrors = {
    oldpassword: "",
    password: ""
  };

  validationMessages = {
    oldpassword: {
      required: "Password is required.",
      pattern:
        "Password must contain 8-25 characters, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Charecter"
    },
    password: {
      required: "Password is required.",
      pattern:
        "Password must contain 8-25 characters, 1 Uppercase, 1 Lowercase, 1 Number, and 1 Special Charecter"
    }
  };

  public onValueChanged(data?: any) {
    if (!this.passwordForm) {
      return;
    }
    const form = this.passwordForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = "";
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + " ";
        }
      }
    }
  }
  ionViewDidLoad() {
    console.log("ionViewDidLoad ChagnePasswordPage");
  }
  passwordUpdate() {
    let loading = this.loadingCtrl.create({
      content: "Please wait..."
    });
    loading.present();
    var obj = {
      _id: this.fulldetail._id,
      newpassword: this.passwordForm.value.password,
      oldpassword: this.passwordForm.value.oldpassword
    };
    this.oneService.passwordEditDriver(obj).subscribe(data => {
      if (!data.error) {
        this.oneService
          .getDriver(JSON.parse(localStorage.getItem("driver"))._id)
          .subscribe(data => {
            if (!data.error) {
              localStorage.removeItem("driver");
              localStorage.setItem("driver", JSON.stringify(data.message));
              loading.dismiss();
              this.getToast("Password updated successfully.");
              this.navCtrl.pop();
            }
          });
      } else {
        this.getToast(data.message);
        loading.dismiss();
      }
    });
  }
  private getToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: "bottom" //top,middle,bottom
    });
    toast.present();
  }
}
