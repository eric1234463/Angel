import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {AngularFireAuth} from 'angularfire2/auth';
import * as firebase from 'firebase/app';

export class User {
  email : string;
  uid : string;
  photoUrl : string;
  displayName : string;
  constructor(email : string, uid : string, photoUrl : string, displayName : string) {
    this.email = email;
    this.displayName = displayName;
    this.uid = uid;
    this.photoUrl = photoUrl
  }
};

@Injectable()
export class AuthService {
  public currentUser : User;
  constructor(public afAuth : AngularFireAuth) {}
  loginUser(newEmail : string, newPassword : string) : firebase.Promise < any > {
    return this
      .afAuth
      .auth
      .signInWithEmailAndPassword(newEmail, newPassword)
  }
  setCurrentUser(email, uid, photoUrl, displayName) {
    this.currentUser = new User(email, uid, photoUrl, displayName);
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