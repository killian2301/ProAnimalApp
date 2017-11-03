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
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CloudProvider } from "../../providers/cloud/cloud";
import { Camera } from '@ionic-native/camera';
import { ImagePicker } from "@ionic-native/image-picker";
var NewForAdoptionPage = /** @class */ (function () {
    function NewForAdoptionPage(navCtrl, imagePicker, camera, navParams, cloud) {
        this.navCtrl = navCtrl;
        this.imagePicker = imagePicker;
        this.camera = camera;
        this.navParams = navParams;
        this.cloud = cloud;
        this.img = "https://www.cesarsway.com/sites/newcesarsway/files/styles/large_article_preview/public/How%20to%20calm%20a%20hyper%20dog.jpg?itok=Vg7ueySi";
    }
    NewForAdoptionPage.prototype.closeModal = function () {
        return this.navCtrl.pop();
    };
    NewForAdoptionPage.prototype.finish = function () {
        var _this = this;
        var animal = {
            name: this.name,
            age: this.age,
            sex: this.sex,
            date: Date.now(),
            description: this.description,
            img: this.img
        };
        this.cloud.setNewForAdoption(animal, this.category).then(function (result) {
            console.log(result);
            return _this.closeModal();
        });
    };
    NewForAdoptionPage.prototype.openCamera = function () {
        var options = {
            quality: 100,
            destinationType: this.camera.DestinationType.DATA_URL,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        };
        this.camera.getPicture(options).then(function (imageData) {
            // imageData is either a base64 encoded string or a file URI
            // If it's base64:
            var base64Image = 'data:image/jpeg;base64,' + imageData;
            console.log("Entre");
        }, function (err) {
            // Handle error
        });
    };
    NewForAdoptionPage.prototype.uploadImage = function () {
        var options = { maximumImagesCount: 1 };
        this.imagePicker.getPictures(options).then(function (results) {
            for (var i = 0; i < results.length; i++) {
                console.log('Image URI: ' + results[i]);
            }
        }, function (err) {
        });
    };
    NewForAdoptionPage = __decorate([
        IonicPage(),
        Component({
            selector: 'page-new-for-adoption',
            templateUrl: 'new-for-adoption.html',
        }),
        __metadata("design:paramtypes", [NavController, ImagePicker, Camera, NavParams, CloudProvider])
    ], NewForAdoptionPage);
    return NewForAdoptionPage;
}());
export { NewForAdoptionPage };
//# sourceMappingURL=new-for-adoption.js.map