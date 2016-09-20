import {Page, ViewController, NavParams} from 'ionic-angular';

@Page({
  templateUrl: 'build/pages/common/people.html'
})
export class PeopleModalPage {
  private invitees: Array<any>;
  constructor(private viewCtrl: ViewController, private navParams: NavParams) {
     this.invitees = this.navParams.get("users");
  }

  dismiss(data) {
  	console.log(this.viewCtrl);
    this.viewCtrl.dismiss(this.invitees);
  }

}