import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {LoginPage} from '../login/login';
import {AuthService, User} from '../../services/authservice';

@Component({selector: 'page-contact', templateUrl: 'profile.html'})
export class ProfilePage {
    public user : User;

    constructor(public navCtrl : NavController, public auth : AuthService, public appCtrl : App) {
        this.user = this.auth.currentUser;
        console.log(this.user);
    }

    logout() {
        this
            .auth
            .logoutUser()
            .then(success => {
                this
                    .appCtrl
                    .getRootNav()
                    .setRoot(LoginPage);
            });
    }
    edit(){
        
    }

}
