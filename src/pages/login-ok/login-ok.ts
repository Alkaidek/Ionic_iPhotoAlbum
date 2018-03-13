import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the LoginOkPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login-ok',
  templateUrl: 'login-ok.html',
})
export class LoginOkPage {

  constructor(private ofAuth: AngularFireAuth, private toast: ToastController,
    public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.ofAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        //console.log(data.email + data.uid);
        this.toast.create({
          message: `Hello, ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this.toast.create({
          message: `Could not find authenticathion`,
          duration: 3000
        }).present();

      }
    });
    
  }
  goTo(place){
    this.navCtrl.push(place);
  }


}
