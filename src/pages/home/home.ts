import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import {AngularFireAuth} from 'angularfire2/auth';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController,public afAuth : AngularFireAuth) {
    const authObserver = afAuth
      .authState
      .subscribe(user => {
        if (user) {
          console.log(user);
          authObserver.unsubscribe();
        } else {
          authObserver.unsubscribe();
        }
      });
  }

}
