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
      image:"https://firebasestorage.googleapis.com/v0/b/ialbum-5113a.appspot.com/o/1.png?alt=media&token=dac197a0-34b2-40c1-8261-a3b7372ffceb"
    },
    {
      image:"https://firebasestorage.googleapis.com/v0/b/ialbum-5113a.appspot.com/o/2.png?alt=media&token=0a74fadd-f6cd-40e7-85b2-644237267582"
    },
    {
      image:"https://firebasestorage.googleapis.com/v0/b/ialbum-5113a.appspot.com/o/3 rm .png?alt=media&token=0a74fadd-f6cd-40e7-85b2-644237267582"
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
    const browser = this.iab.create('https://google.com/','_system', options);
    browser.show();
  }
  facebookOpen(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://fb.com/','_system', options);
    browser.show();
  }
  twitterOpen(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://twitter.com/','_system', options);
    browser.show();
  }
  youtubeOpen(){
    const options: InAppBrowserOptions = {
      zoom: 'no'
    }
    const browser = this.iab.create('https://youtube.com/','_system', options);
    browser.show();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    
    
  }

}
