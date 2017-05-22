import {Component} from '@angular/core';
import {NavController, App} from 'ionic-angular';
import {Chatroom} from './chatroom/chatroom';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService, User} from '../../services/authservice';
import {Observable} from 'rxjs/Observable';

@Component({templateUrl: 'chat.html'})
export class Chat {
    public user : User;
    public chatList : FirebaseListObservable < any[] >;
    constructor(public navCtrl : NavController, public afDB : AngularFireDatabase, public appCtrl : App, public auth : AuthService) {
        this.navCtrl = navCtrl;
        this.user = this.auth.currentUser;
        this.chatList = this
            .afDB
            .list('/chat');
    }
    navigate(chat) {
        this
            .appCtrl
            .getRootNav()
            .push(Chatroom, {chat: chat});
    }
}
