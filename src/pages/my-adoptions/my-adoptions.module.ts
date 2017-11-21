import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyAdoptionsPage } from './my-adoptions';

@NgModule({
  declarations: [
    MyAdoptionsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyAdoptionsPage),
  ],
})
export class MyAdoptionsPageModule {}
