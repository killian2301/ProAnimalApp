var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { AngularFireDatabase } from 'angularfire2/database';
import * as firebase from "firebase";
var CloudProvider = /** @class */ (function () {
    function CloudProvider(http, db) {
        this.http = http;
        this.db = db;
    }
    CloudProvider.prototype.getCatsInAdoption = function () {
        return new Promise(function (res, rej) {
            var refToCatsInAdoption = firebase.database().ref("/animalsInAdoption/cats");
            return refToCatsInAdoption.once('value', function (catsData) {
                res(catsData.val());
            });
        });
    };
    CloudProvider.prototype.getDogsInAdoption = function () {
        return new Promise(function (res, rej) {
            var refToDogsInAdoption = firebase.database().ref("/animalsInAdoption/dogs");
            return refToDogsInAdoption.once('value', function (dogsData) {
                res(dogsData.val());
            });
        });
    };
    CloudProvider = __decorate([
        Injectable(),
        __metadata("design:paramtypes", [Http, AngularFireDatabase])
    ], CloudProvider);
    return CloudProvider;
}());
export { CloudProvider };
//# sourceMappingURL=cloud.js.map