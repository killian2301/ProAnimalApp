import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-interested-user-info',
  templateUrl: 'interested-user-info.html',
})
export class InterestedUserInfoPage {
  user: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.get('user');
  }

}
