import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { storage } from 'firebase';

import { Camera, CameraOptions } from "@ionic-native/camera";
import { ToastController } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  bigImg = 'https://vignette.wikia.nocookie.net/nikita2010/images/d/d2/Blank.png/revision/latest/scale-to-width-down/640?cb=20130725195235'; 

  constructor(private camera: Camera,public navCtrl: NavController, public navParams: NavParams, private _tc: ToastController) {
    
  }
  async takePhotoViaGallery(){
    try{
    //Defining camera options
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
      const result =  await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref('gallery/myPhoto' + (Math.floor(Math.random() * 6) + 1));

      pictures.putString(image, 'data_url');
      
      let base64data = 'data:image/jpeg;base64,' + result;
      this.bigImg = base64data;
      
      let optionsToast = {
        message: "Your photo is taken!",
        duration: 4000,
        showCloseButton: true,
        cssClass: "home.scss"
       };
      
      this._tc.create(optionsToast).present();
    }
    catch (e){
      console.error(e);
    }
  }
  async takePhotoViaCamera(){
    try{
    //Defining camera options
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      }
      const result =  await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;

      let base64data = 'data:image/jpeg;base64,' + result;
      this.bigImg = base64data;

      const pictures = storage().ref('camera/myPhoto' + (Math.floor(Math.random() * 6) + 1));

      pictures.putString(image, 'data_url');
      let optionsToast = {
        message: "Your photo is taken!",
        duration: 4000,
        showCloseButton: true,
        cssClass: "home.scss"
       };
      
      this._tc.create(optionsToast).present();
    }
    catch (e){
      console.error(e);
    }
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
