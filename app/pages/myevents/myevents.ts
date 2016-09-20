import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';
import {CreateNewEvent} from '../createnew/createnewevent';

@Component({
  templateUrl: 'build/pages/myevents/myevents.html'
})
export class MyeventsPage {
  constructor(private navController: NavController) {
  };
  createnewevent(){
	this.navController.push(CreateNewEvent);
  }
}
