import {Component} from '@angular/core';
import {AuthService} from '../../services/authservice';
import {NavController, App} from 'ionic-angular';
import {LoginPage} from '../login/login';

@Component({selector: 'page-contact', templateUrl: 'profile.html'})
export class ProfilePage {

  constructor(public navCtrl : NavController, public auth : AuthService, public appCtrl : App) {}

  logout() {
    this
      .auth
      .logoutUser()
      .then(success => {
        this
          .appCtrl
          .getRootNav().setRoot(LoginPage);

      });
  }

}
