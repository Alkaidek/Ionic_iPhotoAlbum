import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';

@IonicPage()
@Component({
  selector: 'page-my-photo',
  templateUrl: 'my-photo.html',
})
export class MyPhotoPage {

  arrData = []; 
  userPhoto = [];
  addr;

  constructor(private ofAuth:AngularFireAuth, private fdb: AngularFireDatabase,
    public navCtrl: NavController, public navParams: NavParams) {
      this.fdb.list(`/photo/`).valueChanges().subscribe(_data =>{
        
        this.arrData = _data;
        console.log(this.arrData);
        this.arrData.reverse();
        var n = 0;
        for(var i=0; this.arrData.length; i++){
          if(this.arrData[i].user == this.addr){
            this.userPhoto[n] = this.arrData[i];
            n = n+1;
          }
        }

      })
    }
    openPhotoPage(arg1){
      console.log("index: "+ this.userPhoto[arg1].index);
      
      this.navCtrl.push('MyPhotoDetailsPage', {
        param1: this.userPhoto[arg1],
        param2: this.userPhoto[arg1].index,
    });
    }
  ionViewDidLoad() { 
    this.ofAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        //console.log(data.email + data.uid);
        this.addr=data.email;
        console.log(this.addr);
      
      }
      else{
        console.log("jakis blad");
      }
    });
  }

}
