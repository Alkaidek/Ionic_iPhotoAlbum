import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { storage, initializeApp } from 'firebase';
import { FIREBASE_CONFIG } from "../../app/firebase.config";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ToastController } from "ionic-angular";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(private camera: Camera, public navCtrl: NavController, private _tc: ToastController) {
    initializeApp(FIREBASE_CONFIG);
  }
  async takePhoto(sourceType:number){
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

      const pictures = storage().ref('pictures/myPhoto' + (Math.floor(Math.random() * 6) + 1));
      pictures.putString(image, 'data_url');
      let optionsToast = {
        message: "Your photo is taken!",
        duration: 3000,
        cssClass: "home.scss"
       };
      
      this._tc.create(optionsToast).present();
    }
    catch (e){
      console.error(e);
    }
  }

}
