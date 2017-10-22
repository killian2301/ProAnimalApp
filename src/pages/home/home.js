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
import { NavController } from 'ionic-angular';
import { CloudProvider } from "../../providers/cloud/cloud";
var HomePage = /** @class */ (function () {
    function HomePage(navCtrl, cloud) {
        var _this = this;
        this.navCtrl = navCtrl;
        this.cloud = cloud;
        this.pet = 'cats';
        cloud.getCatsInAdoption().then(function (cats) {
            _this.cats = cats;
            _this.catKeys = Object.keys(_this.cats);
        });
        cloud.getDogsInAdoption().then(function (dogs) {
            _this.dogs = dogs;
            _this.dogKeys = Object.keys(_this.dogs);
        });
    }
    ;
    HomePage.prototype.getTime = function (date) {
        var now = new Date().getMilliseconds();
        var petDate = new Date(date).getMilliseconds();
        var diff = new Date(now - petDate);
        console.log("Now: ", now);
        console.log("PetDate: ", petDate);
        console.log("Diff: ", diff);
        if (diff.getMinutes() < 1) {
            return "Now";
        }
        if (diff.getMinutes() >= 1 && diff.getMinutes() < 60) {
            return (diff.getMinutes() + " min ago");
        }
        if (diff.getMinutes() >= 60) {
            return (diff.getMinutes() + " h ago");
        }
    };
    HomePage = __decorate([
        Component({
            selector: 'page-home',
            templateUrl: 'home.html'
        }),
        __metadata("design:paramtypes", [NavController, CloudProvider])
    ], HomePage);
    return HomePage;
}());
export { HomePage };
//# sourceMappingURL=home.js.map