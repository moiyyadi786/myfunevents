import {Component} from '@angular/core';
import {NavController, Modal} from 'ionic-angular';
import {FormBuilder, ControlGroup, Validators} from '@angular/common';
import {PeopleModalPage} from '../common/peoplemodal';

@Component({
  templateUrl: 'build/pages/createnew/createnewevent.html'
})
export class CreateNewEvent {
   createNewEvent: ControlGroup;
   private invitees: Array<any> = [{name:'akash'},{name:'hoze'}];
   currDate: String = new Date().toISOString();
   constructor(private navController: NavController,private formBuilder: FormBuilder) {
  	this.createNewEvent = formBuilder.group({
        eventName: [''],
        description: [''],
        date: ['']
    });
  };
  goBack() {
    this.navController.pop();
  }
  openPeopleModal(){
	const modal = Modal.create(PeopleModalPage, {users: this.invitees});
  this.navController.present(modal);
  }
  onSubmit(form){
  	console.log(form);
  }
}
