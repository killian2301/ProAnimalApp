import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController } from 'ionic-angular';
import { CloudProvider } from '../../providers/cloud/cloud';
import { AngularFireAuth } from 'angularfire2/auth';
import { PetDetailsPage } from '../pet-details/pet-details';

/**
 * Generated class for the MyAdoptionsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-my-adoptions',
  templateUrl: 'my-adoptions.html',
})
export class MyAdoptionsPage {

  myAdoptions: any;
  numberOfPets: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cloud: CloudProvider, private afAuth: AngularFireAuth, private modalCtrl: ModalController  ) {
    this.cloud.getMyAdoptions(this.afAuth.auth.currentUser.uid).subscribe(myAdoptions => {
      this.myAdoptions = myAdoptions;
      console.log("myAdoptions:", myAdoptions);
      this.numberOfPets = myAdoptions.length;

    });
  }

  petDetails(pet) {
    let modal = this.modalCtrl.create(PetDetailsPage, {
      pet: pet,
      category: pet.category
    });
    modal.present();
  }
}
