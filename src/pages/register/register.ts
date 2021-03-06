import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from "angularfire2/auth";

import { User } from "../../models/user";
import { ToastController } from "ionic-angular";

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  user = {} as User;
  pswConfirm;
  

  constructor(private auth: AngularFireAuth,
    public navCtrl: NavController, public navParams: NavParams, private _tc: ToastController) {
  }
  async register(user: User){
    try{
      if (user.password == this.pswConfirm){
        const result = await this.auth.auth.createUserWithEmailAndPassword(user.email, user.password);    
        
        let optionsToast = {
          message: "You are register!",
          duration: 4000,
          showCloseButton: true,
          cssClass: "home.scss"
         };
         this._tc.create(optionsToast).present();
         console.log(result);
         this.navCtrl.pop();
      }else{
        let optionsToast = {
          message: "Psw is not the same!",
          duration: 4000,
          showCloseButton: true,
          cssClass: "home.scss"
         };
         this._tc.create(optionsToast).present();
      }
    }
    catch(e){
      console.error(e);
      let optionsToast = {
        message: "Reg fail!",
        duration: 4000,
        showCloseButton: true,
        cssClass: "home.scss"
       };
       this._tc.create(optionsToast).present();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  

}
