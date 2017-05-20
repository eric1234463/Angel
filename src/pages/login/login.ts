import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NavController, AlertController, App} from 'ionic-angular';
import {TabsPage} from '../tabs/tabs';
import {SignUpPage} from '../signup/signup';
import {EmailValidator} from './email';
import {AuthService} from '../../services/authservice';

@Component({selector: 'page-login', templateUrl: 'login.html'})

export class LoginPage {
    public loginForm : FormGroup;

    constructor(public navCtrl : NavController, public formBuilder : FormBuilder, public appCtrl : App, public alertCtrl : AlertController, public auth : AuthService) {
        this.loginForm = formBuilder.group({
            email: [
                '', Validators.compose([
                    Validators.required, Validators.minLength(10),
                    EmailValidator.isValid
                ])

            ],
            password: [
                '', Validators.compose([
                    Validators.minLength(8),
                    Validators.required
                ])
            ]
        });
    }
    loginUser() {
        console.log(this.loginForm.value.email);
        console.log(this.loginForm.value.password);
        var errorAlert;
        this
            .auth
            .loginUser(this.loginForm.value.email, this.loginForm.value.password)
            .then(success => {
                this
                      .appCtrl
                      .getRootNav()
                      .setRoot(TabsPage);
            }, error => {
                errorAlert = true;
            });
        if (errorAlert == true) {
            let alert = this
                .alertCtrl
                .create({
                    title: 'Login Error',
                    message: 'Please Login Again!',
                    buttons: [
                        {
                            text: 'Ok',
                            handler: () => {}
                        }
                    ]
                });
            alert.present();
        }
    }
    signup() {
        this
            .navCtrl
            .push(SignUpPage);
    }

}
