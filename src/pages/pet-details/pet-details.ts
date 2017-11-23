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
  bgImg: any;
  wantedByUsers: Array<any> = [];
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
    this.getWantedBy();
    // this.adopted =
    this.setAdopted();
  }
  setAdopted() {
    console.log("--->", this.wantedByUsers);
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
  getWantedBy() {
    return this.cloud.getWantedBy(this.pet).subscribe(wantedBy => {
      this.adopted = false;
      wantedBy.forEach((wantedByUser: any) => {
        this.wantedByUsers.push(wantedByUser);
        console.log(wantedByUser);
        if (wantedByUser.userId == this.user.uid) {
          console.log("SIII");
          this.adopted = true;
        }
        console.log("o====>", this.wantedByUsers);
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
            `Deleted ${this.pet.name} from "My adoptions" tab :(`
          );
        });
    }
    this.spinnerDialog.hide();
    return this.closeModal();
  }
}
