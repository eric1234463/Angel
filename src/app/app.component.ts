import {Component} from '@angular/core';
import {Platform, AlertController} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireAuth} from 'angularfire2/auth';
import {TabsPage} from '../pages/tabs/tabs';
import {LoginPage} from '../pages/login/login';
import {Firebase} from '@ionic-native/firebase';
import {Push, PushObject, PushOptions} from '@ionic-native/push';
import {AuthService} from '../services/authservice';
import {Storage} from '@ionic/storage';

@Component({templateUrl: 'app.html'})
export class MyApp {
    rootPage : any;

    constructor(private platform : Platform, public localStorage : Storage, public auth : AuthService, public alertCtrl : AlertController, private push : Push, private statusBar : StatusBar, private splashScreen : SplashScreen, public afAuth : AngularFireAuth, public firebase : Firebase) {
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
        this.initializeApp();
        this.initPushNotification();
    }
    initializeApp() {
        this
            .platform
            .ready()
            .then(() => {
                // Okay, so the platform is ready and our plugins are available. Here you can do
                // any higher level native things you might need.
                this
                    .statusBar
                    .backgroundColorByHexString('#2C3D4F');
                this
                    .splashScreen
                    .hide();
            });
    }
    initPushNotification() {
        if (!this.platform.is('cordova')) {
            console.warn("Push notifications not initialized. Cordova is not available - Run in physical d" +
                    "evice");
            return;
        }
        const options : PushOptions = {
            android: {
                senderID: "685439005963",
                icon: 'icon.png',
                vibrate: "true",
                sound: "true"
            },
            ios: {
                alert: "true",
                badge: false,
                sound: "true"
            },
            windows: {}
        };
        const pushObject : PushObject = this
            .push
            .init(options);

        pushObject
            .on('registration')
            .subscribe((data : any) => {
                console.log("device token ->", data.registrationId);
                localStorage.setItem('device_token', data.registrationId);
            });

        pushObject
            .on('notification')
            .subscribe((data : any) => {
                console.log('message', data.message);
                //if user using app and push notification comes
                if (data.additionalData.foreground) {
                    // if application open, show popup
                    console.log("Push notification clicked");
                } else {
                    //if user NOT using app and push notification comes
                    //TODO: Your logic on click of push notification directly

                    console.log("Push notification clicked");
                }
            });

        pushObject
            .on('error')
            .subscribe(error => console.error('Error with Push plugin', error));
    }

}