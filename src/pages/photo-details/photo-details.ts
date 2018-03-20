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
  rateList = []
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
  curRate1 = "rate";
  curRate2 = "rate";
  curRate3 = "rate";
  curRate4 = "rate";
  curRate5 = "rate";
  currRate
  show
  allRate = 0;
  rateImg="rateDisable";
  ratePath



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
  this.fdb.list(`/photo/${this.parameter2}/rate/`).valueChanges().subscribe(_data =>{
    console.log(_data);
    this.rateList = _data; 
    if(this.rateList.length>0){
      console.log(this.rateList.length)
      for(var i=0; this.rateList.length>i; i++){
        console.log(this.rateList[i]);
        this.allRate = this.allRate + this.rateList[i].rate;
        console.log("rate:"+this.allRate);
        if(this.rateList[i].user == this.addr){
          this.show="rateDisable";
          this.rateImg = "rate3";
          console.log(this.allRate/this.rateList.length);
          this.ratePath = `../../assets/imgs/heart${this.allRate/this.rateList.length}.png`;
        }
      }
    }
  });
}
addComment(){
  var date = this.year +"."+ this.month +"."+ this.day+ " - " + this.hours+":"+this.min; 
  const cachCard = this.fdb.object(`/photo/${this.parameter2}/comment/${this.commentList.length+1}`)
  cachCard.set({"content": this.currentComment,"user": this.addr,"data": date});
  this.currentComment="";
}
rate(x){
  console.log(x)
  this.currRate = x;
  if(x>0){
    this.curRate1 = "rate2";
    this.curRate2 = "rate";
    this.curRate3 = "rate";
    this.curRate4 = "rate";
    this.curRate5 = "rate";
    
  }
  if(x>1){
    this.curRate2 = "rate2";
    this.curRate3 = "rate";
    this.curRate4 = "rate";
    this.curRate5 = "rate";
  }
  if(x>2){
    this.curRate3 = "rate2";
    this.curRate4 = "rate";
    this.curRate5 = "rate";
  }
  if(x>3){
    this.curRate4 = "rate2";
    this.curRate5 = "rate";
  }
  if(x>4){
    this.curRate5 = "rate2";
  }
  
}
addRate(){
  console.log("add rate"+this.currRate);
  const cachCard = this.fdb.object(`/photo/${this.parameter2}/rate/${this.rateList.length+1}`)
  cachCard.set({"rate": this.currRate, "user": this.addr});
  this.show="rateDisable";
  this.rateList[this.rateList.length+1] = this.currRate;
  this.allRate=0;
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
