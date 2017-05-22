import {Component} from '@angular/core';
import {NavController, AlertController, App} from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';
import {AuthService} from '../../services/authservice';
import {LoginPage} from '../login/login';
import {AngularFireDatabase} from 'angularfire2/database';

@Component({selector: 'page-home', templateUrl: 'home.html'})
export class HomePage {

    constructor(public navCtrl : NavController, public afAuth : AngularFireAuth, public afDB : AngularFireDatabase, public auth : AuthService, public alertCtrl : AlertController, public appCtrl : App) {
    }
    ionViewDidLoad() {
        this
            .afAuth
            .authState
            .subscribe(user => {
                if (user.emailVerified) {
                    this.auth.setCurrentUser(user.email,user.uid,user.photoURL,user.displayName);
                    
                } else {
                    user.sendEmailVerification();
            
                    this
                        .afDB
                        .list('/user')
                        .push({uid: user.uid, email: user.email, displayName: user.displayName, photoUrl: user.photoURL});
                    this
                        .auth
                        .logoutUser()
                        .then(success => {

                            let verifiedAlert = this
                                .alertCtrl
                                .create({
                                    title: 'Email is not verified',
                                    message: 'Please Go to verifie your email!',
                                    buttons: [
                                        {
                                            text: 'Ok',
                                            handler: () => {
                                                this
                                                    .appCtrl
                                                    .getRootNav()
                                                    .setRoot(LoginPage);
                                            }
                                        }
                                    ]
                                });
                            verifiedAlert.present();
                        });
                }
            });

    }

}
