import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { AngularFireDatabase } from "angularfire2/database";
import {
  FileTransfer,
  FileUploadOptions,
  FileTransferObject
} from "@ionic-native/file-transfer";
// import { File } from "@ionic-native/file";
import * as firebase from "firebase";
import { Observable } from "rxjs/Observable";
import { List } from "ionic-angular/components/list/list";
import { ToastController } from "ionic-angular/components/toast/toast-controller";

@Injectable()
export class CloudProvider {
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    private transfer: FileTransfer,
    private toast: ToastController
  ) {}

  getMyPets(userId) {
    return this.db.list(`users/${userId}/petsInAdoption`).valueChanges();
  }

  registerToken(userId, token) {
    return firebase
      .database()
      .ref(`users/${userId}/`)
      .update({
        token: token,
        userId: userId
      });
  }

  adoptPet(pet, userId) {
    return firebase
      .database()
      .ref(`users/${userId}/wantedPets/${pet.petKey}`)
      .set(pet);
  }

  deleteAdoptPet(pet, userId) {
    return firebase
      .database()
      .ref(`users/${userId}/wantedPets/${pet.petKey}`)
      .remove();
  }

  sendTokenToFirebase(token, userId) {
    return firebase
      .database()
      .ref(`/users/${userId}/`)
      .set({ token: token });
  }

  getCatsInAdoption() {
    return this.db
      .list("petsInAdoption/cats")
      .valueChanges()
      .map(array => array.reverse());
  }

  getMyAdoptions(userId) {
    return this.db.list(`users/${userId}/wantedPets`).valueChanges();
  }

  getWantedBy(pet) {
    // return firebase.database().ref(``)
    return this.db
      .list(`petsInAdoption/${pet.profile.category}/${pet.petKey}/wantedBy`)
      .valueChanges();
  }

  // getWantedPets(userId) {
  //   var keys = [];
  //   firebase
  //     .database()
  //     .ref(`users/${userId}/wantedPets`)
  //     .once("value", snapshot => {
  //       snapshot.forEach(pet => {
  //         keys.push(pet.key);
  //         return true;
  //       });
  //     });
  //   return keys;
  // }

  getDogsInAdoption() {
    return this.db
      .list("petsInAdoption/dogs")
      .valueChanges()
      .map(array => array.reverse());
  }

  setNewForAdoption(pet) {
    const ownerKey = pet.ownerId;
    pet.petKey = firebase
      .database()
      .ref(`users/${ownerKey}/petsInAdoption`)
      .push().key;
    return firebase
      .database()
      .ref(`users/${ownerKey}/token`)
      .once("value")
      .then(token => {
        pet.ownerToken = token.val();
        return firebase
          .database()
          .ref(`users/${ownerKey}/petsInAdoption/${pet.petKey}`)
          .set(pet);
      });
  }

  deletePet(pet) {
    const petKey = pet.petKey;
    const ownerKey = pet.ownerId;
    return firebase
      .database()
      .ref(`users/${ownerKey}/petsInAdoption/${petKey}`)
      .remove()
      .catch(err => console.log(err));
  }

  setUserProfile(userProfile, userId) {
    return firebase
      .database()
      .ref(`/users/${userId}/profile`)
      .set(userProfile);
  }

  uploadPicture(image) {
    const refToCloudinary =
      "https://api.cloudinary.com/v1_1/killianjimenez/image/upload";
    console.log(image);
    let options: FileUploadOptions = {
      params: {
        upload_preset: "sqa8g67l"
      }
    };
    return this.fileTransfer
      .upload(decodeURI(image), refToCloudinary, options)
      .then(
        data => {
          console.log(data.response);
          return JSON.parse(data.response).url;
        },
        err => {
          console.log(err);
        }
      );
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
}
