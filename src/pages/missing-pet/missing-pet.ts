import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

/**
 * Generated class for the MissingPetPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-missing-pet',
  templateUrl: 'missing-pet.html',
})
export class MissingPetPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public spinnerDialog: SpinnerDialog) {
  }

  ionViewDidLoad() {
  }

}
