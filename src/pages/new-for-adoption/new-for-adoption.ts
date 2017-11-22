import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CloudProvider } from "../../providers/cloud/cloud";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { AngularFireAuth } from "angularfire2/auth";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";

@Component({
  selector: "page-new-for-adoption",
  templateUrl: "new-for-adoption.html"
})
export class NewForAdoptionPage {
  img: any;
  sanitizedImage: any;
  name: string;
  age: string;
  sex: string;
  category: string;
  description: string;
  date: number;
  showButtons: boolean;
  isDefaultImage: boolean;
  dogImage = "./assets/imgs/dog.jpg";
  catImage = "./assets/imgs/cat.jpg";

  constructor(
    public navCtrl: NavController,
    public camera: Camera,
    public navParams: NavParams,
    public toastCtr: ToastController,
    public cloud: CloudProvider,
    public sanitizer: DomSanitizer,
    public afAuth: AngularFireAuth,
    public spinnerDialog: SpinnerDialog
  ) {
    this.category = this.navParams.get("category");
    this.showButtons = true;
    if (this.category == "dogs") {
      this.sanitizedImage = `url(${this.dogImage})`;
    } else {
      this.sanitizedImage = `url(${this.catImage})`;
    }
    this.isDefaultImage = true;

    this.name = "Prueba";
    this.age = "3";
    this.sex = "male";
    this.description = "dasefasfgas";
    this.img = "http://lorempixel.com/200/200/";
  }

  closeModal() {
    this.spinnerDialog.hide();
    return this.navCtrl.pop();
  }

  finish() {
    this.spinnerDialog.show();

    let animal = {
      profile: {
        name: this.name,
        age: this.age,
        sex: this.sex,
        category: this.category,
        description: this.description,
        img: "http://lorempixel.com/200/200/"
      },
      ownerId: this.afAuth.auth.currentUser.uid,
      ownerToken: '',
      date: Date.now(),
      wanted: []
    };
    return this.cloud
      .setNewForAdoption(animal)
      .then(result => {
        this.presentToast("Succesfully Posted");
        return this.closeModal();
      })
      .catch(err => {
        console.log(err);
      });
  }

  takePhoto() {
    var options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.CAMERA,
      saveToPhotoAlbum: true,
      correctOrientation: true
    };

    return this.camera.getPicture(options).then(
      imageUrl => {
        console.log("IMG URL: ", imageUrl);
        // this.img = this.sanitizer.bypassSecurityTrustStyle(`url(${imageUrl})`);
        this.img = "file:///" + imageUrl;
        this.showButtons = false;
        this.isDefaultImage = false;
        return true;
      },
      err => {
        this.presentToast(err);
      }
    );
  }

  selectImage() {
    var options: CameraOptions = {
      destinationType: this.camera.DestinationType.FILE_URI,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 480,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      saveToPhotoAlbum: false,
      correctOrientation: true
    };

    return (this.img = "http://lorempixel.com/200/200/");
    // return this.camera.getPicture(options).then(
    //   imageUrl => {
    //     console.log("IMG URL: ", imageUrl);
    //     this.img = imageUrl;
    //     this.sanitizedImage = imageUrl;
    //     // this.sanitizedImage = this.sanitizer.bypassSecurityTrustStyle(
    //     //   `url(file://${encodeURI(imageUrl)})`
    //     // );
    //     this.showButtons = false;
    //     this.isDefaultImage = false;
    //     return true;
    //   },
    //   err => {
    //     this.presentToast(err);
    //   }
    // );
  }

  presentToast(message) {
    let toast = this.toastCtr.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  completedForm() {
    return (
      this.name && this.age && this.description && this.sex
      // &&
      // !this.isDefaultImage
    );
  }

  setSex(sex) {
    this.sex = sex;
  }
}
