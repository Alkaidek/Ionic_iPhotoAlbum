import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { storage } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';



import { Camera, CameraOptions } from "@ionic-native/camera";
import { ToastController } from "ionic-angular";


@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild('myimg') myImgElement;
  bigImg = 'https://vignette.wikia.nocookie.net/nikita2010/images/d/d2/Blank.png/revision/latest/scale-to-width-down/640?cb=20130725195235'; 
  list = [];
  addr;
  name;
  email;
  albumName;
  currentPhotoAddress;
  assetCollection; 
  public myPhotosRef: any;
  public isenabled:boolean;
  arrData = []; 
  userPhoto =[];
  myInput;
  today = new Date();
  day = this.today.getDate();
  month = this.today.getMonth()+1; 
  year = this.today.getFullYear();
  hours = this.today.getHours();
  min = this.today.getMinutes();
  sec = this.today.getSeconds();




  constructor(private ofAuth:AngularFireAuth, private fdb: AngularFireDatabase, public loadingCtrl: LoadingController,
    private camera: Camera,public navCtrl: NavController, public navParams: NavParams, private _tc: ToastController) {
    this.fdb.list(`/photo/`).valueChanges().subscribe(_data =>{
      
      this.arrData = _data;
      console.log(this.arrData);
      var n = 0;
      for(var i=0; this.arrData.length; i++){
        if(this.arrData[i].user == this.addr){
          this.userPhoto[n] = this.arrData[i];
          n = n+1;
        }
      }
      
    })
  }
  async getImage(){
   

    this.fdb.list(`/photo/`).valueChanges().subscribe(_data =>{
      this.arrData = _data;
    });
    let loader = this.loadingCtrl.create({
      spinner: "bubbles",
      content: "Please wait!",
      duration: 10000
    });
    loader.present();
    var storageRef = storage().ref(`${this.addr}/${this.name}`);
    var downloadedURL;
    storageRef.getDownloadURL().then(function(url) {
      //console.log(url);
      console.log(url);
      setTimeout(()=>{
        console.log(url);
        downloadedURL = url.toString();
      }, 3000);
      
     // this.myImgElement.nativeElement.src = url;
    });
    
    setTimeout(()=>{
      this.currentPhotoAddress=downloadedURL;
      this.bigImg = this.currentPhotoAddress;
      this._tc.create({
        message: `Hello, ${this.bigImg}`,
        duration: 3000
      }).present();
      var date = this.year +"."+ this.month +"."+ this.day;
      var control = this.year +""+ this.month +""+ this.day +""+ this.hours +""+ this.min+this.sec;
      //this.fdb.list("photo").push({"index":(this.arrData.length+1),"name": this.name,"photo":this.bigImg,"user": this.addr,"date":date,"controlData": control, "album": this.albumName});
      const cachCard = this.fdb.object(`/photo/${this.arrData.length+1}`)
      cachCard.set({"index":(this.arrData.length+1),"name": this.name,"photo":this.bigImg,"user": this.addr,"date":date,"controlData": control, "album": this.albumName});
    }, 10000);
   
   // newshit = 'https://firebasestorage.googleapis.com/v0/b/ialbum-5113a.appspot.com/o/dropsik03%40gmail.com%2FStarwars2?alt=media&token=3e68fef4-727e-460a-82ad-8b8251a803b6';
    
  }
  async takePhotoViaGallery(){
    try{
    //Defining camera options
    
     
     // this.bigImg = "https://firebasestorage.googleapis.com/v0/b/ialbum-5113a.appspot.com/o/dropsik03%40gmail.com%2FStarwars2?alt=media&token=3e68fef4-727e-460a-82ad-8b8251a803b6";
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
        sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
      }
      const result =  await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;

      const pictures = storage().ref(`${this.addr}/${this.name}`);
      
      pictures.putString(image, 'data_url');
      
      let base64data = 'data:image/jpeg;base64,' + result;
      this.bigImg = base64data;
      
      let optionsToast = {
        message: "Your photo is taken!",
        duration: 4000,
        showCloseButton: true,
        cssClass: "home.scss"
       };
      
      this._tc.create(optionsToast).present();
    }
    catch (e){
      console.error(e);
    }
    this.isenabled = true;
   /* setTimeout(()=>{
      storageRef = storage().ref("/"+this.addr+"/"+this.name);
      storageRef.getDownloadURL().then(this.currentPhotoAddress = function(url) {
        return url;
        
    });}, 3000);
    storageRef.child("/"+this.addr+"/"+this.name+".jpeg").getDownloadURL().then(function(url) {
      console.log("elo:" url);
    });
    console.log(this.currentPhotoAddress+"siema");
    this.bigImg = this.currentPhotoAddress;*/
  }
  async takePhotoViaCamera(){
    try{
    //Defining camera options
      const options: CameraOptions = {
        quality: 50,
        targetHeight: 600,
        targetWidth: 600,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE,
      }
      const result =  await this.camera.getPicture(options);
      const image = `data:image/jpeg;base64,${result}`;
      

      let base64data = 'data:image/jpeg;base64,' + result;
      this.bigImg = base64data;

      const pictures = storage().ref(`${this.addr}/${this.name}`);
      
      pictures.putString(image, 'data_url');
      let optionsToast = {
        message: "Your photo is taken!",
        duration: 4000,
        showCloseButton: true,
        cssClass: "home.scss"
       };
      
      this._tc.create(optionsToast).present();
    }
    catch (e){
      console.error(e);
    }
    this.isenabled = true;
  }
  btnAddClicked(){
    this.fdb.list("/myItems/").push(this.myInput);
  }
  ionViewDidLoad() {
    this.isenabled=false; 
    this.ofAuth.authState.subscribe(data => {
      if(data.email && data.uid){
        //console.log(data.email + data.uid);
        this.addr=data.email;
        this._tc.create({
          message: `Hello, ${data.email}`,
          duration: 3000
        }).present();
      }
      else{
        this._tc.create({
          message: `Could not find authenticathion`,
          duration: 3000
        }).present();

      }
    });
  }
 

}
