import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Slides, ToastController } from 'ionic-angular';

import { User } from "../../models/user";
import { AngularFireAuth } from 'angularfire2/auth';
import { InAppBrowser, InAppBrowserOptions } from '@ionic-native/in-app-browser';





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
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://google.com/','_self', options);
    browser.show();
  }
  facebookOpen(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://fb.com/','_self', options);
    browser.show();
  }
  twitterOpen(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://twitter.com/','_self', options);
    browser.show();
  }
  youtubeOpen(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://youtube.com/','_self', options);
    browser.show();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
    
  }

}
