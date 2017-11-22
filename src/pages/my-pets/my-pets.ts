import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CloudProvider } from '../../providers/cloud/cloud';
import { AngularFireAuth } from 'angularfire2/auth';
import { ModalController } from 'ionic-angular/components/modal/modal-controller';
import { PetDetailsPage } from '../pet-details/pet-details';

/**
 * Generated class for the MyPetsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-my-pets',
  templateUrl: 'my-pets.html',
})
export class MyPetsPage {

  myPets: any;
  numberOfPets: number;
  constructor(public navCtrl: NavController, public navParams: NavParams, public cloud: CloudProvider, private afAuth: AngularFireAuth, private modalCtrl: ModalController  ) {
    this.cloud.getMyPets(this.afAuth.auth.currentUser.uid).subscribe(myPets => {
      this.myPets = myPets;
      console.log("Mypets:", myPets);
      this.numberOfPets = myPets.length;
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
