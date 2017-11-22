import { Component } from "@angular/core";
import { CloudProvider } from "../../providers/cloud/cloud";
import * as moment from "moment";
import { ModalController, NavController, App } from "ionic-angular";
import { NewForAdoptionPage } from "../new-for-adoption/new-for-adoption";
import { Camera } from "@ionic-native/camera";
import { AngularFireDatabase } from "angularfire2/database";
import { PetDetailsPage } from "../pet-details/pet-details";
import { AngularFireAuth } from "angularfire2/auth";
import { LoginPage } from "../login/login";
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import * as firebase from "firebase";
import { tokenKey } from "@angular/core/src/view/util";
import { FCM } from "@ionic-native/fcm";

declare var FCMPlugin: any;

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})

export class HomePage {
  user: any;
  userToken: any;
  cats: any;
  dogs: any;
  numberOfCats = 0;
  numberOfDogs = 0;
  petCategory: string;
  catsSubscription: Subscription;
  dogsSubscription: Subscription;

  constructor(
    public modalCtrl: ModalController,
    public cloud: CloudProvider,
    private db: AngularFireDatabase,
    private afAuth: AngularFireAuth,
    private navCtrl: NavController,
    private app: App,
    private spinnerDialog: SpinnerDialog,
    private fcm : FCM
  ) {
    this.petCategory = "cats";
    this.user = afAuth.auth.currentUser;
    fcm.onNotification().subscribe(data => {
      if (data.wasTapped) {
        console.log("Received in background");
      } else {
        console.log("Received in foreground");
      }
    });

    fcm.onTokenRefresh().subscribe(token => {
      this.cloud.registerToken(this.user.profile.uid, token);
    });
  }

  ionViewDidLoad() {
    this.catsSubscription = this.cloud.getCatsInAdoption().subscribe(cats => {
      this.cats = cats;
      this.numberOfCats = cats.length;
    });

    this.dogsSubscription = this.cloud.getDogsInAdoption().subscribe(dogs => {
      this.dogs = dogs;
      this.numberOfDogs = dogs.length;
    });
    this.spinnerDialog.hide();
  }


  getTime(date) {
    let now = moment();
    let petDate = moment(date);
    let diffMinutes = now.diff(petDate, "minutes");
    let diffHours = now.diff(petDate, "hours");
    let diffDays = now.diff(petDate, "days");
    let diffMonths = now.diff(petDate, "months");

    if (diffMinutes < 1) {
      return "Now";
    }
    if (diffMinutes >= 1 && diffMinutes < 60) {
      return `${diffMinutes} min ago`;
    }
    if (diffMinutes >= 60 && diffHours <= 24) {
      return `${diffHours}h ago`;
    }
    if (diffHours >= 24 && diffDays < 31) {
      if (diffDays == 1) {
        return `${diffDays} day ago`;
      } else {
        return `${diffDays} days ago`;
      }
    }
    if (diffDays >= 31) {
      if (diffDays == 1) {
        return `${diffMonths} month ago`;
      } else {
        return `${diffMonths} months ago`;
      }
    }
  }

  addForAdoption() {
    let modal = this.modalCtrl.create(NewForAdoptionPage, {
      category: this.petCategory
    });
    modal.present();
  }

  petDetails(pet) {
    let modal = this.modalCtrl.create(PetDetailsPage, {
      pet: pet,
      category: this.petCategory
    });
    modal.present();
  }

  signOut() {
    var promise1 = new Promise((res, rej) => {
      this.catsSubscription.unsubscribe();
      this.dogsSubscription.unsubscribe();
      this.afAuth.auth.signOut();
    });
    return promise1.then(_ => this.app.getRootNav().pop());
    // return this.afAuth.auth.signOut().then(_ => this.app.getRootNav());
  }
}
