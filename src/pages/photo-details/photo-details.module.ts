import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetailsPage } from './photo-details';
import { IonicImageViewerModule } from 'ionic-img-viewer';


@NgModule({
  declarations: [
    PhotoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoDetailsPage),
    IonicImageViewerModule
  ],
})
export class PhotoDetailsPageModule {}
