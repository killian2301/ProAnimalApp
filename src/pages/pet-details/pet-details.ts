import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CloudProvider } from "../../providers/cloud/cloud";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DomSanitizer } from "@angular/platform-browser/src/security/dom_sanitization_service";
import { AngularFireAuth } from "angularfire2/auth";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";

@Component({
  selector: "page-pet-details",
  templateUrl: "pet-details.html"
})
export class PetDetailsPage {
  pet: {
    name: "";
    petKey: "";
    category: "";
    img: "";
    ownerId: "";
  };
  adopted: boolean;
  user: any;
  bgImg: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public cloud: CloudProvider,
    public toastCtr: ToastController,
    public afAuth: AngularFireAuth,
    public spinnerDialog: SpinnerDialog
  ) {
    this.pet = navParams.get("pet");
    this.pet.category = navParams.get("category");
    this.bgImg = `url(${this.pet.img})`;
    this.user = this.afAuth.auth.currentUser;
    this.checkIfIWantThisPet();
  }

  deletePet() {
    this.spinnerDialog.show();
    return this.cloud
      .deletePet(this.pet)
      .then(res => {
        this.presentToast("Succesfully deleted");
        this.spinnerDialog.hide();
        this.closeModal();
      })
      .catch(error => this.presentToast(error));
  }

  closeModal() {
    return this.navCtrl.pop();
  }

  presentToast(message) {
    let toast = this.toastCtr.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }

  checkIfIWantThisPet(){
    var wantedPets = [];
    wantedPets = this.cloud.getWantedPets(this.afAuth.auth.currentUser.uid);
    console.log(wantedPets);
    if(wantedPets.includes(this.pet.petKey)){
      this.adopted = true;
    }
    else{
      this.adopted = false;
    }
  }

  adoptPet() {
    this.spinnerDialog.show();
    if (!this.adopted) {
      this.cloud
        .adoptPet(this.pet, this.afAuth.auth.currentUser.uid)
        .then(_ => {
          this.presentToast(
            `You will find ${this.pet.name} in your "My adoptions" tab :)`
          );
        });
    } else {
      this.cloud
        .deleteAdoptPet(this.pet, this.afAuth.auth.currentUser.uid)
        .then(_ => {
          this.presentToast(
            `Deleted ${this.pet.name} from "My adoptions" tab :(`
          );
        });
    }
    this.spinnerDialog.hide();
    return this.closeModal();
  }
}
