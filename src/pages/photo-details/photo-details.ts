import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the PhotoDetailsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-photo-details',
  templateUrl: 'photo-details.html',
})
export class PhotoDetailsPage {
  parameter1= []

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.parameter1[0] = navParams.get('param1');
    console.log(this.parameter1[0])
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PhotoDetailsPage');
  }

}
