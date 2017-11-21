import {Component} from '@angular/core';

import {HomePage} from '../home/home';
import { MyPetsPage } from '../my-pets/my-pets';
import { MissingPetPage } from '../missing-pet/missing-pet';
import { MyAdoptionsPage } from '../my-adoptions/my-adoptions';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = MyPetsPage;
  tab3Root = MyAdoptionsPage;
  tab4Root = MissingPetPage;

  constructor() {

  }
}
