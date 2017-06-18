import {Component} from '@angular/core';
import {NavController, App, AlertController} from 'ionic-angular';
import {Chatroom} from './chatroom/chatroom';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import {AuthService, User} from '../../services/authservice';

@Component({templateUrl: 'chat.html'})
export class Chat {
    public user : User;
    public chatList : FirebaseListObservable < any[] >;
    constructor(public navCtrl : NavController, public afDB : AngularFireDatabase, public alertCtrl : AlertController, public appCtrl : App, public auth : AuthService) {
        this.navCtrl = navCtrl;
        this.user = this.auth.currentUser;
        console.log(this.user);
        this.chatList = this
            .afDB
            .list('/chat', {
                query: {
                    orderByChild: 'status',
                    equalTo: true
                }
            });
    }
    navigate(chat) {
        const chatObj = this
            .afDB
            .object('/chat/' + chat.$key);
        if (chat.user1ID == this.user.uid) {
            chatObj.update({user1Unread: 0})

        } else {
            chatObj.update({user2Unread: 0})
        }
        this
            .appCtrl
            .getRootNav()
            .push(Chatroom, {chat: chat});
    }
    remove(chat) {
        let alert = this
            .alertCtrl
            .create({
                title: 'Relationship Break',
                message: 'Are you sure to break this relationship?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            this
                                .afDB
                                .object('/chat/' + chat.$key)
                                .update({status: false})
                        }
                    }
                ]
            });
        alert.present();
    }
    love(chat){
         let alert = this
            .alertCtrl
            .create({
                title: 'Chance',
                message: 'Are you sure to this people a chance? ?',
                buttons: [
                    {
                        text: 'No',
                        role: 'cancel',
                        handler: () => {
                            console.log('Cancel clicked');
                        }
                    }, {
                        text: 'Yes',
                        handler: () => {
                            if(chat.user1 == this.user.uid){
                                this
                                    .afDB
                                    .object('/chat/' + chat.$key)
                                    .update({user1Love: true})
                            }else{
                                this
                                    .afDB
                                    .object('/chat/' + chat.$key)
                                    .update({user1Love: true})
                            }
                        }
                    }
                ]
            });
        alert.present();
    }
}
