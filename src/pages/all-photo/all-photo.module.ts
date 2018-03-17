import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AllPhotoPage } from './all-photo';

@NgModule({
  declarations: [
    AllPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(AllPhotoPage),
  ],
})
export class AllPhotoPageModule {}
