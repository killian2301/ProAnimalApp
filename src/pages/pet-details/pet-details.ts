import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CloudProvider } from "../../providers/cloud/cloud";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

/**
 * Generated class for the PetDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: "page-pet-details",
  templateUrl: "pet-details.html"
})
export class PetDetailsPage {
  pet: {
    name: "";
    petKey: "";
    category: "";
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cloud: CloudProvider,
    public toastCtr: ToastController
  ) {
    this.pet = navParams.get("pet");
    this.pet.category = navParams.get("category");
    console.log("pet: ", this.pet.name);
  }

  deletePet() {
    return this.cloud
      .deletePet(this.pet.petKey, this.pet.category)
      .then(res => {
        console.log("Borrado");
        this.presentToast("Succesfully deleted")
        this.navCtrl.pop();
      })
      .catch(error => this.presentToast(error));
  }

  presentToast(message) {
    let toast = this.toastCtr.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
}
