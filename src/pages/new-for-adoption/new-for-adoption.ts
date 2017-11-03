import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CloudProvider } from "../../providers/cloud/cloud";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DomSanitizer } from "@angular/platform-browser";
import { Cloudinary } from "cloudinary-core";

@IonicPage()
@Component({
  selector: "page-new-for-adoption",
  templateUrl: "new-for-adoption.html"
})
export class NewForAdoptionPage {
  img: any;
  name: string;
  age: string;
  sex: string;
  category: string;
  description: string;
  date: number;
  showButtons: boolean;
  baseImage: any;
  defaultImage = "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/How%20to%20calm%20a%20hyper%20dog.jpg?itok=Vg7ueySi";

  constructor(
    public navCtrl: NavController,
    private imagePicker: ImagePicker,
    private camera: Camera,
    public navParams: NavParams,
    public toastCtr: ToastController,
    public cloud: CloudProvider,
    public sanitizer: DomSanitizer
  ) {
    this.showButtons = true;
    this.img = `url(${this.defaultImage})`;
    //this.img = sanitizer.bypassSecurityTrustStyle(`url(${this.defaultImage})`);
  }

  closeModal() {
    return this.navCtrl.pop();
  }

  finish() {
    return this.cloud.uploadPicture(this.baseImage).then(imgUrl => {
      let animal = {
        name: this.name,
        age: this.age,
        sex: this.sex,
        date: Date.now(),
        description: this.description,
        img: imgUrl
      };
      return this.cloud
        .setNewForAdoption(animal, this.category)
        .then(result => {
          this.presentToast("Succesfully Posted");
          return this.closeModal();
        });
    });
  }

  takePhoto() {

    var options: CameraOptions = {
      // quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      // sourceType: this.camera.PictureSourceType.CAMERA,
      // encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 480,
      correctOrientation: true,
      saveToPhotoAlbum: false
    };

    return this.camera.getPicture(options).then(
      imageData => {
        this.baseImage = 'data:image/jpeg;base64,' + imageData;
        this.img = this.sanitizer.bypassSecurityTrustStyle(`url(${imageData})`);
        this.showButtons = false;
        return true;
      },
      err => {
        this.presentToast("ERROR: "+ err);
      }
    );
  }

  presentToast(message) {
    let toast = this.toastCtr.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  selectImage() {
    const options = { maximumImagesCount: 1, outputType: 1 };

    return this.imagePicker.getPictures(options).then(
      results => {
        this.baseImage = 'data:image/jpeg;base64,' + results[0];
        this.img = this.sanitizer.bypassSecurityTrustStyle(
          `url(${results[0]})`
        );
        this.showButtons = false;
        return true;
      },
      err => {
        this.presentToast("ERROR: "+ err);
      }
    );
  }

  completedForm() {
    return (
      this.name && this.age && this.category && this.description && this.sex
    );
  }
}
