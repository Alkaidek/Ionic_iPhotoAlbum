import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { AngularFireDatabase } from 'angularfire2/database';



@IonicPage()
@Component({
  selector: 'page-all-photo',
  templateUrl: 'all-photo.html',
})
export class AllPhotoPage {

  arrData = []; 

  constructor(private fdb: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
    this.fdb.list(`/photo/`).valueChanges().subscribe(_data =>{
      
      this.arrData = _data;    
      this.arrData.reverse();
    })
  }
  openPhotoPage(arg1){
    let lenghtOfArray = this.arrData.length - arg1;
    this.navCtrl.push('PhotoDetailsPage', {
      param1: this.arrData[arg1],
      param2: lenghtOfArray,
  });
  }
  ionViewDidLoad() {
  
  }

}
