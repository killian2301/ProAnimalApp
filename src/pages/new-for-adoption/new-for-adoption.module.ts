import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewForAdoptionPage } from './new-for-adoption';

@NgModule({
  declarations: [
    NewForAdoptionPage,
  ],
  imports: [
    IonicPageModule.forChild(NewForAdoptionPage),
  ],
})
export class NewForAdoptionPageModule {}
