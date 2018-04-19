import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MyPhotoDetailsPage } from './my-photo-details';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MyPhotoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(MyPhotoDetailsPage),
    IonicImageViewerModule
  ],
})
export class MyPhotoDetailsPageModule {}
