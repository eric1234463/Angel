import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { Chatroom } from './chatroom/chatroom';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
    templateUrl: 'chat.html'
})
export class Chat {

    public chatList: FirebaseListObservable <any[]> ;
    constructor(public navCtrl: NavController, public afDB: AngularFireDatabase, public appCtrl: App) {
        this.navCtrl = navCtrl;
        this.chatList = afDB.list('/chat');
        console.log(this.chatList);
    }
    navigate() {
        this.appCtrl.getRootNav().push(Chatroom);
    }
}
