import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CloudProvider} from "../../providers/cloud/cloud";
import * as moment from 'moment';

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
    let now = moment();
    let petDate = moment(date);
    let diffMinutes = now.diff(petDate, 'minutes');
    let diffHours = now.diff(petDate, 'hours');
    let diffDays = now.diff(petDate, 'days');
    let diffMonths = now.diff(petDate, 'months');

    if (diffMinutes < 1) {
      return "Now";
    }
    if (diffMinutes >= 1 && diffMinutes < 60) {
      return (`${diffMinutes} min ago`);
    }
    if (diffMinutes >= 60) {
      return (`${diffHours}h ago`);
    }
    if (diffHours >= 24) {
      if (diffHours == 1) {
        return (`${diffDays} day ago`);
      } else {
        return (`${diffDays} days ago`);
      }
    }
    if (diffDays >= 31) {
      if (diffDays == 1) {
        return (`${diffMonths} month ago`);
      } else {
        return (`${diffMonths} months ago`);
      }
    }
  }
}
