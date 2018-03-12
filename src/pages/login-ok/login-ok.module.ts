import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LoginOkPage } from './login-ok';

@NgModule({
  declarations: [
    LoginOkPage,
  ],
  imports: [
    IonicPageModule.forChild(LoginOkPage),
  ],
})
export class LoginOkPageModule {}
