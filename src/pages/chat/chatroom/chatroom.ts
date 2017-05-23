import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService, User} from '../../../services/authservice';

@Component({selector: 'page-chatroom', templateUrl: 'chatroom.html'})
export class Chatroom {
    public user : User;
    public messageList : FirebaseListObservable < any[] >;
    public receviver : User;
    public newMessage : string;
    constructor(public navCtrl : NavController, public navParams : NavParams, public afDB : AngularFireDatabase, public auth : AuthService) {
        this.navCtrl = navCtrl;
        this.navParams = navParams;
        this.newMessage = '';
        this.user = this.auth.currentUser;
        const chat = this
            .navParams
            .get('chat');
        this.messageList = this
            .afDB
            .list('/chat/' + chat.$key + '/messageList', {
                query: {
                    orderByChild: 'createDt'
                }
            });
        console.log(this.messageList);
        this.receviver = new User();
        if (this.user.uid == chat.user1ID) {
            this.receviver.displayName = chat.user2ID
        } else {
            this.receviver.displayName = chat.user1ID
        }
    }

    sendMessage() {
        const chat = this
            .navParams
            .get('chat');
        const meessage = {
            senderID: this.user.uid,
            createDt: Date.now(),
            message: this.newMessage
        }
        chat.lastMessage = this.newMessage;
        chat.updateDt = Date.now();
        this
            .afDB
            .list('chat')
            .update(chat.$key, chat);
        this
            .afDB
            .list('/chat/' + chat.$key + '/messageList')
            .push(meessage);

        this.newMessage = '';
    }

}
