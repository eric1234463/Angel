import {NgModule, ErrorHandler} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {IonicApp, IonicModule, IonicErrorHandler} from 'ionic-angular';
import {MyApp} from './app.component';
import {ProfilePage} from '../pages/profile/profile';
import {HomePage} from '../pages/home/home';
import {TabsPage} from '../pages/tabs/tabs';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import {Chat} from '../pages/chat/chat';
import {LoginPage} from '../pages/login/login';
import {Chatroom} from '../pages/chat/chatroom/chatroom';
import {AuthService} from '../services/authservice';
import {SignUpPage} from '../pages/signup/signup';
import {MomentModule} from 'angular2-moment';
import {Firebase} from '@ionic-native/firebase';
import { CloudSettings, CloudModule } from '@ionic/cloud-angular';
import { Push } from '@ionic-native/push';
import { Http,HttpModule} from '@angular/http';
import { IonicStorageModule } from '@ionic/storage';

export const firebaseConfig = {
  apiKey: "AIzaSyDQuiL3JT5bsT6EG806UjBbrhoz1UszMRQ",
  authDomain: "angel-b86e1.firebaseapp.com",
  databaseURL: "https://angel-b86e1.firebaseio.com",
  projectId: "angel-b86e1",
  storageBucket: "angel-b86e1.appspot.com",
  messagingSenderId: "685439005963"
};

@NgModule({
  declarations: [
    MyApp,
    ProfilePage,
    HomePage,
    TabsPage,
    SignUpPage,
    Chatroom,
    Chat,
    LoginPage
  ],
  imports: [
    BrowserModule, IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MomentModule,
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProfilePage,
    SignUpPage,
    HomePage,
    TabsPage,
    Chatroom,
    Chat,
    LoginPage  ],
  providers: [
    StatusBar,
    AuthService,
    Firebase,
    Push,
    SplashScreen, {
      provide: ErrorHandler,
      useClass: IonicErrorHandler
    }
  ]
})
export class AppModule {}