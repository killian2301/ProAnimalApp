import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CloudProvider} from "../../providers/cloud/cloud";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  cats: any;
  dogs: any;
  catKeys: string[];
  dogKeys: string[];
  pet: string;

  constructor(public navCtrl: NavController, public cloud: CloudProvider) {
    this.pet = 'cats';

    cloud.getCatsInAdoption().then(cats => {
      this.cats = cats;
      this.catKeys = Object.keys(this.cats);
    });

    cloud.getDogsInAdoption().then(dogs => {
      this.dogs = dogs;
      this.dogKeys = Object.keys(this.dogs);
    });

  };

  getTime(date) {
    let now = new Date().getMilliseconds();
    let petDate = new Date(date).getMilliseconds();
    let diff = new Date(now - petDate);
    console.log("Now: ", now);
    console.log("PetDate: ", petDate);
    console.log("Diff: ", diff);
    if (diff.getMinutes() < 1) {
      return "Now";
    }
    if (diff.getMinutes() >= 1 && diff.getMinutes() < 60) {
      return (`${diff.getMinutes()} min ago`);
    }
    if (diff.getMinutes() >= 60) {
      return (`${diff.getMinutes()} h ago`)
    }
  }
}
