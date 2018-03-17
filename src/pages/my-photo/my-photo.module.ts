import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPhotoPage } from './my-photo';

@NgModule({
  declarations: [
    MyPhotoPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPhotoPage),
  ],
})
export class MyPhotoPageModule {}
