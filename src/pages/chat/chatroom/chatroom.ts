import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

@Component({
    selector: 'page-chatroom',
    templateUrl: 'chatroom.html'
})
export class Chatroom {
    constructor(public navCtrl: NavController) {
        this.navCtrl = navCtrl;
    }
   
}
