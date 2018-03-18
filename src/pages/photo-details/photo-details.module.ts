import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PhotoDetailsPage } from './photo-details';

@NgModule({
  declarations: [
    PhotoDetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(PhotoDetailsPage),
  ],
})
export class PhotoDetailsPageModule {}
