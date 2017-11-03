import { Component } from "@angular/core";
import { CloudProvider } from "../../providers/cloud/cloud";
import * as moment from "moment";
import { ModalController } from "ionic-angular";
import { NewForAdoptionPage } from "../new-for-adoption/new-for-adoption";
import { Camera } from "@ionic-native/camera";
import { AngularFireDatabase } from "angularfire2/database";
import { PetDetailsPage } from "../pet-details/pet-details";

@Component({
  selector: "page-home",
  templateUrl: "home.html"
})
export class HomePage {
  cats: any;
  dogs: any;
  pet: string;

  constructor(
    public modalCtrl: ModalController,
    public cloud: CloudProvider,
    private db: AngularFireDatabase
  ) {
    this.pet = "cats";
  }

  ionViewDidLoad() {
    this.db
      .list("animalsInAdoption/cats")
      .valueChanges()
      .subscribe(cats => (this.cats = cats));

    this.db
      .list("animalsInAdoption/dogs")
      .valueChanges()
      .subscribe(dogs => (this.dogs = dogs));
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
    let modal = this.modalCtrl.create(NewForAdoptionPage);
    modal.present();
  }

  petDetails(pet){
    let modal = this.modalCtrl.create(PetDetailsPage, {pet: pet, category: this.pet});
    modal.present();
  }
}
