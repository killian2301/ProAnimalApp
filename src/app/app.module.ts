import { NgModule, ErrorHandler } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { IonicApp, IonicModule, IonicErrorHandler } from "ionic-angular";
import { MyApp } from "./app.component";

import { StatusBar } from "@ionic-native/status-bar";
import { SplashScreen } from "@ionic-native/splash-screen";
import { CloudProvider } from "../providers/cloud/cloud";

import { AngularFireModule } from "angularfire2";
import {
  AngularFireDatabaseModule,
  AngularFireDatabase
} from "angularfire2/database";
import { AngularFireAuthModule } from "angularfire2/auth";
import { FormsModule } from "@angular/forms";
import { HttpModule } from "@angular/http";


//PIPES
import { CapitalizePipe } from "../pipes/capitalize/capitalize";
import { NewForAdoptionPage } from "../pages/new-for-adoption/new-for-adoption";
import { Camera } from "@ionic-native/camera";
import { ImagePicker } from "@ionic-native/image-picker";
import { PetDetailsPage } from "../pages/pet-details/pet-details";

//SERVICES
import { CloudinaryModule } from "@cloudinary/angular-4.x";
import * as Cloudinary from "cloudinary-core";
import { File } from "@ionic-native/file";
import { FileTransfer } from "@ionic-native/file-transfer";
import { SanitizerPipe } from "../pipes/sanitizer/sanitizer";
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { Facebook } from "@ionic-native/facebook";

//PAGES
import { HomePage } from "../pages/home/home";
import { TabsPage } from "../pages/tabs/tabs";
import { LoginPage } from "../pages/login/login";
import { MyPetsPage } from "../pages/my-pets/my-pets";
import { MissingPetPage } from "../pages/missing-pet/missing-pet";
import { MyAdoptionsPage } from "../pages/my-adoptions/my-adoptions";
import { NewUserPage } from '../pages/new-user/new-user';

const firebaseConfig = {
  apiKey: "AIzaSyCDVa6tjLnQ0NrR_i9HGZJ68n6dAvmccVc",
  authDomain: "proanimalapp.firebaseapp.com",
  databaseURL: "https://proanimalapp.firebaseio.com",
  projectId: "proanimalapp",
  storageBucket: "proanimalapp.appspot.com",
  messagingSenderId: "123565811630"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    TabsPage,
    NewForAdoptionPage,
    PetDetailsPage,
    LoginPage,
    MyPetsPage,
    MyAdoptionsPage,
    MissingPetPage,
    NewUserPage,
    CapitalizePipe,
    SanitizerPipe
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp, { mode: "ios" }),
    FormsModule,
    HttpModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CloudinaryModule.forRoot(Cloudinary, {
      cloud_name: "killianjimenez",
      upload_preset: "sqa8g67l"
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    TabsPage,
    NewForAdoptionPage,
    PetDetailsPage,
    LoginPage,
    MyPetsPage,
    MissingPetPage,
    MyAdoptionsPage,
    NewUserPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    CloudProvider,
    Camera,
    ImagePicker,
    File,
    FileTransfer,
    SpinnerDialog,
    Facebook
  ]
})
export class AppModule {}
