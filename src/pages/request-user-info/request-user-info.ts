import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { CloudProvider } from "../../providers/cloud/cloud";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";

@Component({
  selector: "page-request-user-info",
  templateUrl: "request-user-info.html"
})
export class RequestUserInfoPage {
  userName: string = "";
  pet: any;
  userProfile = {
    displayName: "",
    email: "",
    phone: ""
  };
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public cloud: CloudProvider,
    public spinnerDialog: SpinnerDialog
  ) {
    this.spinnerDialog.hide();
    this.pet = navParams.get("pet");
    this.userProfile.displayName = this.afAuth.auth.currentUser.displayName;
    this.userProfile.email = this.afAuth.auth.currentUser.email;
  }

  sendRequest() {
    if (this.userProfile.phone == "" || this.phoneIsValid()) {
      this.cloud.setUserProfile(
        this.userProfile,
        this.afAuth.auth.currentUser.uid
      );
      return this.cloud
        .adoptPet(this.pet, this.afAuth.auth.currentUser.uid)
        .then(_ => {
          this.cloud
            .showToast(
              `The owner has been notified! :)`
            )
            .then(_ => this.navCtrl.pop());
        });
    } else {
      this.cloud.showToast(
        "Oooops! This is not a valid phone number. Try again."
      );
      this.userProfile.phone = "";
    }
  }

  phoneIsValid() {
    return /[0-9]{8}$/.test(this.userProfile.phone) ? true : false;
  }
  closeModal() {
    this.navCtrl.pop();
  }
}
