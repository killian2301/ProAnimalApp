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
import { File } from "@ionic-native/file";
import * as firebase from "firebase";
import { Cloudinary } from "@cloudinary/angular-4.x";
import { Observable } from "rxjs/Observable";
import { List } from "ionic-angular/components/list/list";

@Injectable()
export class CloudProvider {
  fileTransfer: FileTransferObject = this.transfer.create();

  constructor(
    public http: Http,
    public db: AngularFireDatabase,
    private transfer: FileTransfer,
    private file: File,
    private cloudinary: Cloudinary
  ) {}

  getMyPets(userId) {
    return this.db.list(`users/${userId}/petsInAdoption`).valueChanges();
  }

  adoptPet(pet, userId) {
    return new Promise((res, rej) => {
      const refToWantedPets = firebase
        .database()
        .ref(`users/${userId}/wantedPets/${pet.petKey}`);
      res(refToWantedPets.set(pet));
    });
  }

  deleteAdoptPet(pet, userId) {
    return new Promise((res, rej) => {
      const refToWantedPets = firebase
        .database()
        .ref(`users/${userId}/wantedPets/${pet.petKey}`);
      res(refToWantedPets.remove());
    });
  }

  sendTokenToFirebase(token, userId){
    return firebase.database().ref(`/users/${userId}/`).set({token: token});
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

  getWantedPets(userId) {
    var keys = [];
    const refToWantedPets = firebase
      .database()
      .ref(`users/${userId}/wantedPets`);
    refToWantedPets.once("value", snapshot => {
      snapshot.forEach(pet => {
        keys.push(pet.key);
        return true;
      });
    });
    return keys;
  }

  createOwner(pet) {
    return new Promise((res, rej) => {
      const refToUsers = firebase.database().ref(`users`);
      const petKey = pet.petKey;
      const ownerKey = pet.ownerId;
      res(refToUsers.child(`${ownerKey}/petsInAdoption/${petKey}`).set(pet));
    });
  }

  getDogsInAdoption() {
    return this.db
      .list("petsInAdoption/dogs")
      .valueChanges()
      .map(array => array.reverse());
  }

  setNewForAdoption(animal, category) {
    return new Promise((res, rej) => {
      const refToPet = firebase.database().ref(`petsInAdoption/${category}`);
      const petKey = refToPet.push().key;
      animal.petKey = petKey;
      res(refToPet.child(`${petKey}`).set(animal));
    });
  }

  deletePet(pet) {
    const petKey = pet.petKey;
    const ownerKey = pet.ownerId;
    return new Promise((res, rej) => {
      res(
        firebase
          .database()
          .ref(`petsInAdoption/${pet.category}/${petKey}`)
          .remove()
          .then(_ => {
            firebase
              .database()
              .ref(`users/${ownerKey}/petsInAdoption/${petKey}`)
              .remove()
              .catch(err => rej(console.log(err)));
          })
          .catch(err => rej(console.log(err)))
      );
    });
  }

  uploadPicture(image) {
    const refToCloudinary =
      "https://api.cloudinary.com/v1_1/killianjimenez/image/upload";
    console.log(encodeURI(image));
    let options: FileUploadOptions = {
      params: {
        upload_preset: "sqa8g67l"
      }
    };
    return this.fileTransfer
      .upload(encodeURI(image), refToCloudinary, options)
      .then(
        data => {
          console.log(data.response);
          return JSON.parse(data.response).url;
        },
        err => {
          console.log(err);
        }
      );

    // return this.http
    //   .post(refToCloudinary, {
    //     file: encodeURI(image),
    //     upload_preset: "sqa8g67l"
    //   })
    //   .toPromise()
    //   .then(result => result.json().url);
  }
}
