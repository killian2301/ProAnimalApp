import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, Platform } from "ionic-angular";
import { AngularFireAuth } from "angularfire2/auth";
import * as firebase from "firebase";
import { HomePage } from "../home/home";
import { TabsPage } from "../tabs/tabs";
import { SpinnerDialog } from "@ionic-native/spinner-dialog";
import { Facebook, FacebookLoginResponse } from "@ionic-native/facebook";
import { NewUserPage } from "../new-user/new-user";
import { ModalController } from "ionic-angular/components/modal/modal-controller";
import { FCM } from "@ionic-native/fcm";
import { CloudProvider } from "../../providers/cloud/cloud";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Component({
  selector: "page-login",
  templateUrl: "login.html"
})
export class LoginPage {
  displayName: string;
  email: string = "";
  password: string = "";
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    private afAuth: AngularFireAuth,
    private spinnerDialog: SpinnerDialog,
    private fb: Facebook,
    private platform: Platform,
    private fcm: FCM,
    private cloud: CloudProvider,
    private toast: ToastController
  ) {
    afAuth.authState.subscribe(user => {
      if (!user) {
        this.displayName = null;
        return;
      }
      this.displayName = user.displayName;
    });
  }

  signInWithFacebook() {
    this.spinnerDialog.show();
    if (this.platform.is("cordova")) {
      return this.fb.login(["email", "public_profile"]).then(res => {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(
          res.authResponse.accessToken
        );
        return firebase
          .auth()
          .signInWithCredential(facebookCredential)
          .then(_ => {
            return this.fcm.getToken().then(token => {
              return this.cloud.registerToken(
                this.afAuth.auth.currentUser.uid,
                token
              );
            });
          });
      });
    } else {
      return this.afAuth.auth
        .signInWithPopup(new firebase.auth.FacebookAuthProvider())
        .then(_ => {
          const token = this.fcm.getToken();
          return this.cloud.registerToken(
            this.afAuth.auth.currentUser.uid,
            token
          );
        });
    }
  }

  goToHome() {
    this.navCtrl.push(TabsPage);
  }

  createNewAccount() {
    this.modalCtrl.create(NewUserPage).present();
  }

  login() {
    this.spinnerDialog.show();
    this.afAuth.auth
      .signInWithEmailAndPassword(this.email, this.password)
      .catch(err => this.cloud.showToast(err))
      .then(_ => {
        this.spinnerDialog.hide();
      });
  }

  signOut() {
    this.afAuth.auth.signOut();
  }
}
