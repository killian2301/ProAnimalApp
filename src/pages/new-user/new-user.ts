import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import { ToastController } from "ionic-angular/components/toast/toast-controller";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';

@IonicPage()
@Component({
  selector: "page-new-user",
  templateUrl: "new-user.html"
})
export class NewUserPage {
  name: string = "";
  email: string = "";
  password: string = "";
  password2: string = "";

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afAuth: AngularFireAuth,
    public toast: ToastController,
    public spinnerDialog: SpinnerDialog
  ) {}

  completedForm() {
    return this.name != "" &&
      this.email != "" &&
      this.password != "" &&
      this.password2 != ""
      ? true
      : false;
  }
  passwordMatches() {
    return this.password == this.password2 ? true : false;
  }
  createUser() {
    if (this.passwordMatches()) {
      this.spinnerDialog.show();
      this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(result => {
        return this.afAuth.auth.currentUser.updateProfile({
          displayName: this.name,
          photoURL: ''
        }).then(success => {
          console.log(result);
          this.spinnerDialog.hide();
          this.closeModal();
        })
      })
    } else {
      this.showToast("Password do not match!");
      this.password2 = "";
    }
  }

  showToast(message) {
    return this.toast
      .create({
        message: message,
        duration: 3000,
        position: "bottom"
      })
      .present();
  }
  closeModal() {
    return this.navCtrl.pop();
  }
}
