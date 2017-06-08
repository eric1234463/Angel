import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export class User {
    public email : string;
    public uid : string;
    public photoUrl : string;
    public displayName : string;
    public token : string;
    public gender : string;
    public horoscope : string
    constructor() {}

    setToken(token) {
        this.token = token;
    }
};

@Injectable()
export class AuthService {
    public currentUser : User;
    constructor(public afAuth : AngularFireAuth) {
        this.currentUser = new User();
    }
    loginUser(newEmail : string, newPassword : string) : firebase.Promise < any > {
        return this
            .afAuth
            .auth
            .signInWithEmailAndPassword(newEmail, newPassword)
    }
    setCurrentUser(user) {
        this.currentUser = user;
    }
    setToken(token) {
        this.setToken(token)
    }
    getCurretnUser() : User {return this.currentUser;}

    logoutUser() : firebase.Promise < any > {
        return this
            .afAuth
            .auth
            .signOut();
    }
    signupUser(newEmail : string, newPassword : string) : firebase.Promise < any > {
        return this
            .afAuth
            .auth
            .createUserWithEmailAndPassword(newEmail, newPassword);
    }
}