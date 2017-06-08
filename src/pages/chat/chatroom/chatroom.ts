import {Component, ViewChild} from '@angular/core';
import {NavController, NavParams, Content} from 'ionic-angular';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService, User} from '../../../services/authservice';
import {Http, Headers, RequestOptions} from '@angular/http';

@Component({selector: 'page-chatroom', templateUrl: 'chatroom.html'})
export class Chatroom {
    @ViewChild(Content)public content : Content;

    public user : User;
    public messageList : FirebaseListObservable < any[] >;
    public receviver : User;
    public newMessage : string;
    constructor(public navCtrl : NavController, public http : Http, public navParams : NavParams, public afDB : AngularFireDatabase, public auth : AuthService) {
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
    ionViewDidEnter() {
        this
            .content
            .scrollToBottom(0)
    }
    sendMessage() {

        const chat = this
            .navParams
            .get('chat')
        const meessage = {
            senderID: this.user.uid,
            createDt: Date.now(),
            message: this.newMessage
        }
        this
            .afDB
            .list('/chat/' + chat.$key + '/messageList')
            .push(meessage);

        const chatObj = this
            .afDB
            .object('/chat/' + chat.$key);
        if (chat.user1ID == this.user.uid) {
            chat.user2Unread =  chat.user2Unread + 1
            chatObj.update({
                updateDt: Date.now(),
                lastMessage: this.newMessage,
                user2Unread:  chat.user2Unread
            })

        } else {
            chat.user1Unread = chat.user1Unread + 1
            chatObj.update({
                updateDt: Date.now(),
                lastMessage: this.newMessage,
                user1Unread: chat.user1Unread
            })
        }
        this.newMessage = '';
        this
            .content
            .scrollToBottom(0)
        let url = 'https://fcm.googleapis.com/fcm/send';
        let body = {
            "notification": {
                "title": "New Message",
                "body": "You Have a new Message",
                "sound": "default",
                "click_action": "FCM_PLUGIN_ACTIVITY",
                "icon": "fcm_push_icon"
            },
            "to": chat.user2Token
        };
        let headers : Headers = new Headers({
            'Authorization': 'key=AIzaSyAlxDAh0WUJZIqgIwXHUHa9B5ary7SfHjs',
            'Content-Type': 'application/json'
        });
        let options = new RequestOptions({headers: headers});

        console.log(JSON.stringify(headers));

        this
            .http
            .post(url, body, options)
            .map(response => {
                return response;
            })
            .subscribe(data => {
                //post doesn't fire if it doesn't get subscribed to
                console.log(data);
            });
    }

}
