var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { CloudProvider } from "../../providers/cloud/cloud";
import * as moment from 'moment';
import { ModalController } from 'ionic-angular';
import { NewForAdoptionPage } from "../new-for-adoption/new-for-adoption";
var HomePage = /** @class */ (function () {
    function HomePage(modalCtrl, cloud) {
        this.modalCtrl = modalCtrl;
        this.cloud = cloud;
        this.pet = 'cats';
    }
    ;
    HomePage.prototype.ionViewWillEnter = function () {
        var _this = this;
        return this.getCats().then(function (_) {
            return _this.getDogs();
        });
    };
    HomePage.prototype.getDogs = function () {
        var _this = this;
        this.cloud.getDogsInAdoption().then(function (dogs) {
            _this.dogs = dogs;
            _this.dogKeys = Object.keys(_this.dogs);
        });
    };
    HomePage.prototype.getCats = function () {
        var _this = this;
        return this.cloud.getCatsInAdoption().then(function (cats) {
            _this.cats = cats;
            _this.catKeys = Object.keys(_this.cats);
        });
    };
    HomePage.prototype.getTime = function (date) {
        var now = moment();
        var petDate = moment(date);
        var diffMinutes = now.diff(petDate, 'minutes');
        var diffHours = now.diff(petDate, 'hours');
        var diffDays = now.diff(petDate, 'days');
        var diffMonths = now.diff(petDate, 'months');
        if (diffMinutes < 1) {
            return "Now";
        }
        if (diffMinutes >= 1 && diffMinutes < 60) {
            return (diffMinutes + " min ago");
        }
        if (diffMinutes >= 60 && diffHours <= 24) {
            return (diffHours + "h ago");
        }
        if (diffHours >= 24 && diffDays < 31) {
            if (diffDays == 1) {
                return (diffDays + " day ago");
            }
            else {
                return (diffDays + " days ago");
            }
        }
        if (diffDays >= 31) {
            if (diffDays == 1) {
                return (diffMonths + " month ago");
            }
            else {
                return (diffMonths + " months ago");
            }
        }
    };
    HomePage.prototype.addForAdoption = function () {
        var modal = this.modalCtrl.create(NewForAdoptionPage);
        modal.present();
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [ModalController, CloudProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map