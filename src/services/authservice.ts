import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export class User {
  email : string;
  constructor(email : string) {
    this.email = email;
  }
};

@Injectable()
export class AuthService {
  public currentUser : any;
  constructor(public afAuth : AngularFireAuth) {}
  loginUser(newEmail : string, newPassword : string) : firebase.Promise < any > {
    return this
      .afAuth
      .auth
      .signInWithEmailAndPassword(newEmail, newPassword)
  }
  getCurretnUser() : any {return this.currentUser;}
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