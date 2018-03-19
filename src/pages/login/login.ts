import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { InAppBrowser } from '@ionic-native/in-app-browser';





@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  user = {} as User;
  @ViewChild(Slides) slides: Slides;
  
  constructor(private auth: AngularFireAuth, private toast: ToastController, private iab: InAppBrowser,
    public navCtrl: NavController, public navParams: NavParams) {
  }
  slider = [
    {
      image:"../../assets/imgs/1.png"
    },
    {
      image:"../../assets/imgs/2.png"
    },
    {
      image:"../../assets/imgs/3.png"
    }
  ];
  async login(user){
    try {
      const result =  this.auth.auth.signInAndRetrieveDataWithEmailAndPassword(user.email, user.password);
      console.log(result);
      this.navCtrl.push("LoginOkPage");    
    }
    catch(e){
      this.toast.create({
        message: `Could not find authenticathion`,
        duration: 3000
      }).present();
    }
    
  }
  register(){
    this.navCtrl.push('RegisterPage');
  }
  slideChanged() {
    let currentIndex = this.slides.getActiveIndex();
    if(currentIndex==3){
      this.slides.stopAutoplay();
    }
  }
  googleOpen(){
    let browser1 = this.iab.create('https://google.com/');
    browser1.show();
  }
  facebookOpen(){
    let browser2 = this.iab.create('https://fb.com/');
    browser2.show();
  }
  twitterOpen(){
    let browser3 = this.iab.create('https://twitter.com/');
    browser3.show();
  }
  youtubeOpen(){
    let browser4 = this.iab.create('https://youtube.com/');
    browser4.show();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
    
  }

}
