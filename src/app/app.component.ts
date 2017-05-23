import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {Push, PushObject, PushOptions} from '@ionic-native/push';

@Component({templateUrl: 'app.html'})
export class MyApp {
  rootPage : any;

  constructor(platform : Platform, statusBar : StatusBar, splashScreen : SplashScreen, public afAuth : AngularFireAuth,private push: Push) {
    const authObserver = afAuth
      .authState
      .subscribe(user => {
        if (user) {
          this.rootPage = TabsPage;
          authObserver.unsubscribe();
        } else {
          this.rootPage = LoginPage;
          authObserver.unsubscribe();
        }
      });
    platform
      .ready()
      .then(() => {
        // Okay, so the platform is ready and our plugins are available. Here you can do
        // any higher level native things you might need.
        statusBar.backgroundColorByHexString('#2C3D4F');
        splashScreen.hide();
      });
  }

  pushSetUp() {
    this
      .push
      .hasPermission()
      .then((res : any) => {

        if (res.isEnabled) {
          console.log('We have permission to send push notifications');
        } else {
          console.log('We do not have permission to send push notifications');
        }

      });

    // to initialize push notifications

    const options : PushOptions = {
      android: {
        senderID: '685439005963'
      },
      ios: {
        alert: 'true',
        badge: true,
        sound: 'false'
      },
      windows: {}
    };

    const pushObject : PushObject = this
      .push
      .init(options);

    pushObject
      .on('notification')
      .subscribe((notification : any) => console.log('Received a notification', notification));

    pushObject
      .on('registration')
      .subscribe((registration : any) => console.log('Device registered', registration));

    pushObject
      .on('error')
      .subscribe(error => console.error('Error with Push plugin', error));
  }

}
