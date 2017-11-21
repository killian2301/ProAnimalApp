import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MissingPetPage } from './missing-pet';

@NgModule({
  declarations: [
    MissingPetPage,
  ],
  imports: [
    IonicPageModule.forChild(MissingPetPage),
  ],
})
export class MissingPetPageModule {}
