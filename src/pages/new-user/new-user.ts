import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-new-user',
  templateUrl: 'new-user.html',
})
export class NewUserPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  closeModal() {
    return this.navCtrl.pop();
  }
}
