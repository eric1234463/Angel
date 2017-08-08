import {Component} from '@angular/core';
import {NavController, App, AlertController} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {EmailValidator} from '../login/email';
import {AuthService} from '../../services/authservice';
import {TabsPage} from '../tabs/tabs';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({selector: 'page-signup', templateUrl: 'signup.html'})
export class SignUpPage {
    public schoolList : FirebaseListObservable < any[] >;
    public userForm : FormGroup;
    public inputDisabled : boolean = true;
    public schoolEmail : string;
    public studentID : string;
    public school : string;
    constructor(public formBuilder : FormBuilder, public afAuth : AngularFireAuth, public navCtrl : NavController, public alertCtrl : AlertController, public auth : AuthService, public afDB : AngularFireDatabase, public appCtrl : App) {
        this.schoolList = afDB.list('/school');
        this.schoolEmail = '';
        this.studentID = '';
        this.school = '';
        this.userForm = formBuilder.group({
            gender: [
                '', Validators.compose([Validators.required])
            ],
            school: [
                '', Validators.compose([Validators.required])
            ],
            schoolEmail: [
                '', Validators.compose([Validators.required, EmailValidator.isValid])
            ],
            userName: [
                '', Validators.compose([
                    Validators.required, Validators.minLength(3),
                    Validators.maxLength(12)
                ])
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
        this.userForm.value.schoolEmail = this.userForm.value.studentID + this.userForm.value.school;
        this.schoolEmail = this.studentID + this.school;
    }
    changeStudentID() {

        this.userForm.value.schoolEmail = this.userForm.value.studentID + this.userForm.value.school;
        this.schoolEmail = this.studentID + this.school;
    }
    signup() {
        console.log(this.schoolEmail);
        console.log(this.userForm.value.password);
        this
            .auth
            .signupUser(this.schoolEmail, this.userForm.value.password)
            .then(success => {
                const token = localStorage.getItem('device_token');
                this
                    .afAuth
                    .authState
                    .subscribe(user => {
                        const userProfile = {
                            uid: user.uid,
                            email: user.email,
                            gender: this.userForm.value.gender,
                            displayName: this.userForm.value.userName,
                            photoUrl: user.photoURL,
                            token: token
                        }
                        this
                            .afDB
                            .object('/user/' + user.uid)
                            .set(userProfile);
                        console.log('Success');
                    });
                this
                    .appCtrl
                    .getRootNav()
                    .push(TabsPage);

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