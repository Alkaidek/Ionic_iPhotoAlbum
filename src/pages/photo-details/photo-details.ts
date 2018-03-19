import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';


@IonicPage()
@Component({
  selector: 'page-photo-details',
  templateUrl: 'photo-details.html',
})
export class PhotoDetailsPage {
  parameter1= []
  commentList = []
  parameter2
  currentComment
  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth()+1; 
  year = this.today.getFullYear();
  hours = this.today.getHours();
  min = this.today.getMinutes();
  sec = this.today.getSeconds();
  addr;


  constructor(private ofAuth:AngularFireAuth, private fdb: AngularFireDatabase,
  public navCtrl: NavController, public navParams: NavParams) {
    this.parameter1[0] = navParams.get('param1');
    console.log(this.parameter1[0])
    this.parameter2 = navParams.get('param2');
    console.log(this.parameter2)
    this.fdb.list(`/photo/${this.parameter2}/comment`).valueChanges().subscribe(_data =>{
      this.commentList = _data;
      this.commentList.reverse();
      console.log(this.commentList);
  });
}
addComment(){
  var date = this.year +"."+ this.month +"."+ this.day+ " - " + this.hours+":"+this.min; 
  const cachCard = this.fdb.object(`/photo/${this.parameter2}/comment/${this.commentList.length+1}`)
  cachCard.set({"content": this.currentComment,"user": this.addr,"data": date});
  this.currentComment="";
}

  ionViewDidLoad() {
    this.ofAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        //console.log(data.email + data.uid);
        this.addr=data.email;
      }
    });
  }

}
