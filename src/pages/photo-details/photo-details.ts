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
  imageAltPage = "https://firebasestorage.googleapis.com/v0/b/ialbum-5113a.appspot.com/o/iAlbum%20storage%2Fheart";
  imageAltPageCnd = ["0.png?alt=media&token=41ac9bb4-e157-4404-baca-f303a46fff5c",
  "0.5.png?alt=media&token=94f239e0-2f12-45f2-bec9-faa4f0f8f307",
  "1.png?alt=media&token=4a7d5fcd-a645-40ff-9be2-4529a2b572e6",
  "1.5.png?alt=media&token=61c07d0a-f414-4f4c-96ab-df6c8f253c2f",
  "2.png?alt=media&token=94848298-ae57-498b-9e0a-15daf1be2509",
  "2.5.png?alt=media&token=5c13fa7d-7fd7-4520-b49d-c6a636e7a8cf",
    "3.png?alt=media&token=80c1ea77-ab97-4f73-9e89-66d72c075727",
    "3.5.png?alt=media&token=477aaa98-d482-4bae-9f4e-bcdd262f5faf",
    "4.png?alt=media&token=0fcf3f24-102f-4790-8477-0a916bba5900",
    "4.5.png?alt=media&token=88d82064-ea1f-4346-aec8-620fea8b4821",
    "5.png?alt=media&token=ea28eb3d-6db2-4b79-a1be-4e5a05775d66"]
  rateValue


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
      for(var j=0; this.rateList.length>j; j++){
        this.allRate = this.allRate + this.rateList[j].rate;
      }
      for(var i=0; this.rateList.length>i; i++){
        
        console.log(this.rateList[i]);
        console.log("rate:"+this.allRate);
        if(this.rateList[i].user == this.addr){
          this.show="rateDisable";
          this.rateImg = "rate3";
          
          this.rateValue = this.allRate/this.rateList.length
          console.log("wartość rejtu"+this.rateValue);
          //this.ratePath = `../../assets/imgs/heart${this.allRate/this.rateList.length}.png`;
          if(this.rateValue>0 && this.rateValue<0.5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[0]}`;
          }if(this.rateValue>=0.5 && this.rateValue<1){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[1]}`;
          } if(this.rateValue>=1 && this.rateValue<1.5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[2]}`;
          } if(this.rateValue>=1.5 && this.rateValue<2){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[3]}`;
          } if(this.rateValue>=2 && this.rateValue<2.5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[4]}`;
          } if(this.rateValue>=2.5 && this.rateValue<3){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[5]}`;
          } if(this.rateValue>=3 && this.rateValue<3.5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[6]}`;
          } if(this.rateValue>=3.5 && this.rateValue<4){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[7]}`;
          } if(this.rateValue>=4 && this.rateValue<4.5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[8]}`;
          } if(this.rateValue>=4.5 && this.rateValue<5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[9]}`;
          } if(this.rateValue>=5){
            this.ratePath = `${this.imageAltPage}${this.imageAltPageCnd[10]}`;
          }
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
