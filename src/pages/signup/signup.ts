import {Component} from '@angular/core';
import {NavController, NavParams, App, AlertController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../login/email';
import {AuthService} from '../../services/authservice';
import {TabsPage} from '../tabs/tabs';

@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class SignUpPage {
    public schoolList : FirebaseListObservable < any[] >;
    public userForm : FormGroup;
    public inputDisabled : boolean = true;
    public schoolEmail : string;
    public studentID : string;

    constructor(public formBuilder : FormBuilder, public navCtrl : NavController, public alertCtrl : AlertController, public auth : AuthService, public afDB : AngularFireDatabase, public appCtrl : App) {
        this.schoolList = afDB.list('/school');
        this.schoolEmail = '';
        this.studentID = '';
        this.userForm = formBuilder.group({
            school: [
                '', Validators.compose([Validators.required])
            ],
            schoolEmail: [
                '', Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            studentID: [
                '', Validators.compose([
                    Validators.required, Validators.minLength(3),
                    Validators.maxLength(12)
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
    selectSchool() {
        this.userForm.value.schoolEmail = this.userForm.value.school;
        this.schoolEmail = this.studentID + this.userForm.value.school;
    }
    changeStudentID() {
        this.userForm.value.schoolEmail = this.userForm.value.studentID + this.userForm.value.school;
        this.schoolEmail = this.studentID + this.userForm.value.school;
    }
    signup() {
        console.log(this.schoolEmail);
        console.log(this.userForm.value.password);
        this
            .auth
            .signupUser(this.schoolEmail, this.userForm.value.password)
            .then(success => {
                console.log('Success');
            }, error => {
                console.log('Error');
                let alert = this
                    .alertCtrl
                    .create({
                        title: 'Sign Up Error',
                        message: 'Please Sign Up Again!',
                        buttons: [
                            {
                                text: 'Ok',
                                handler: () => {}
                            }
                        ]
                    });
                alert.present();
            });
    }

}