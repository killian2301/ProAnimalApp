import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { CloudProvider } from "../../providers/cloud/cloud";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { DomSanitizer } from "@angular/platform-browser/src/security/dom_sanitization_service";
import { AngularFireAuth } from "angularfire2/auth";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import * as _ from "lodash";
import { RequestUserInfoPage } from "../request-user-info/request-user-info";
import { InterestedUserInfoPage } from "../interested-user-info/interested-user-info";
@Component({
  selector: "page-pet-details",
  templateUrl: "pet-details.html"
})
export class PetDetailsPage {
  pet: any;
  adopted: boolean;
  user: any;
  wantedByUsers: Array<any> = [];
  wantedObservable: any;
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
    console.log("......>",this.pet);
    console.log(".....>",this.pet.category);
    this.user = this.afAuth.auth.currentUser;
    // this.adopted =
    console.log("HOLA SOY PET-DETAILS");
  }
  ionViewDidEnter(){
    this.getWantedBy();

  }
  ionViewDidLeave(){
    this.wantedByUsers = [];
  }

  deletePet() {
    this.spinnerDialog.show();
    // Debo mirar primero quienes han solicitado este animal, y eliminar dichas solicitudes.

    // Guardo el id del animal
    // Miro en petsInAdoption/:type/:idAnimal/wantedBy
    // Meto en un array los ids de los usuarios que querían al animal.
    return this.cloud
      .deletePet(this.pet)
      .then(res => {
        this.presentToast("Succesfully deleted");
        this.spinnerDialog.hide();
        this.closeModal();
      })
      .catch(error => this.presentToast(error));
  }
  getWantedBy() {
    console.log(this.pet);
    return this.wantedObservable = this.cloud.getWantedBy(this.pet).subscribe(wantedBy => {
      this.adopted = false;
      console.log("LLEGO AQUI");
      console.log('WantedBy: ', wantedBy);

      wantedBy.forEach((wantedByUser: any) => {
        this.wantedByUsers.push(wantedByUser);
        console.log("this.wantedByUsers: ",this.wantedByUsers);
        if (wantedByUser.userId == this.user.uid) {
          this.adopted = true;
        }
      });
      // this.adopted =
    });
    // return this.cloud.getWantedBy(this.pet).then(wantedBy => {
    //   this.wantedByUsers = wantedBy;
    // });
  }

  interestedUserInfo(user) {
    this.navCtrl.push(InterestedUserInfoPage, { user: user });
  }
  closeModal() {
    this.wantedObservable.unsubscribe();
    return this.navCtrl.pop();
  }
  presentToast(message) {
    let toast = this.toastCtr.create({
      message: message,
      duration: 3000
    });
    toast.present();
  }
  adoptPet() {
    this.spinnerDialog.show();
    if (!this.adopted) {
      return this.navCtrl.push(RequestUserInfoPage, {
        pet: this.pet
      });
    } else {
      this.cloud
        .deleteAdoptPet(this.pet, this.afAuth.auth.currentUser.uid)
        .then(_ => {
          this.presentToast(
            `Deleted from "My adoptions" tab :(`
          );
        });
    }
    this.spinnerDialog.hide();
    return this.closeModal();
  }
}
