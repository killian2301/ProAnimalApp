import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import 'rxjs/add/operator/map';
import {AngularFireDatabase} from 'angularfire2/database';
import * as firebase from "firebase";

@Injectable()
export class CloudProvider {

  constructor(public http: Http, public db: AngularFireDatabase) {
  }

  getCatsInAdoption() {
    return new Promise((res, rej) => {
      const refToCatsInAdoption = firebase.database().ref(`/animalsInAdoption/cats`);
      return refToCatsInAdoption.once('value', catsData => {
        res(catsData.val());
      })
    });
  }

  getDogsInAdoption() {
    return new Promise((res, rej) => {
      const refToDogsInAdoption = firebase.database().ref(`/animalsInAdoption/dogs`);
      return refToDogsInAdoption.once('value', dogsData => {
        res(dogsData.val());
      })
    });
  }

}
