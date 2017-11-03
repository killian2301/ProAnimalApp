import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import "rxjs/add/operator/map";
import "rxjs/add/operator/toPromise";
import { AngularFireDatabase } from "angularfire2/database";
import * as firebase from "firebase";

@Injectable()
export class CloudProvider {
  constructor(public http: Http, public db: AngularFireDatabase) {}

  getCatsInAdoption() {
    return new Promise((res, rej) => {
      const refToCatsInAdoption = firebase
        .database()
        .ref(`/animalsInAdoption/cats`);
      return refToCatsInAdoption.once("value", catsData => {
        res(catsData.val());
      });
    });
  }

  getDogsInAdoption() {
    return new Promise((res, rej) => {
      const refToDogsInAdoption = firebase
        .database()
        .ref(`/animalsInAdoption/dogs`);
      return refToDogsInAdoption.once("value", dogsData => {
        res(dogsData.val());
      });
    });
  }

  setNewForAdoption(animal, category) {

    return new Promise((res, rej) => {
      const refToPet = firebase
        .database()
        .ref(`animalsInAdoption/${category}s`);
      const petKey = refToPet.push().key;
      animal.petKey = petKey;
      res(refToPet.child(`${petKey}`).set(animal));
    });
  }

  deletePet(petKey, category) {
    return new Promise((res, rej) => {
      res(
        firebase
          .database()
          .ref(`animalsInAdoption/${category}/${petKey}`)
          .remove()
      );
    });
  }

  uploadPicture(image){
    const refToCloudinary = "https://api.cloudinary.com/v1_1/killianjimenez/image/upload";
    return this.http.post(refToCloudinary, {
      file: image,
      upload_preset: 'sqa8g67l'
    }).toPromise().then((result) => result.json().url);
  }
}
