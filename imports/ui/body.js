import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';
import { Tasks } from '../api/tasks.js';
import { Categories } from '../api/categories.js';


import './body.html';
import './task.js';

Template.body.onCreated(function bodyOnCreated() {
	this.state = new ReactiveDict();
  this.state.set('task-input', 'task');
});


Template.body.helpers({
	tasks() {
		const instance = Template.instance();
		if (instance.state.get('hideCompleted')) {
			//If 'Hide Completed' is checked, filter the tasks
			return Tasks.find({ checked: {$ne: true}}, {sort: {createdAt: -1}});
		}
		// Otherwise, return all the tasks
    return Tasks.find({}, { sort: { createdAt: -1 }});
  },

  incompleteCount() {
  	return Tasks.find({ checked: { $ne: true}}).count();
  },

  categories() {
   return Categories.find({},  { sort: { createdAt: -1 }} );
 },
  
  currentState(state) {
    return Template.instance().state.get('task-input') === state;
  }

});

Template.body.events({
	'change #taskz'({target: {value}}, {state}) {
		const current = state.get('task-input');

		if (current === 'task') {
			// Insert a task into the collection
     Tasks.insert({
       text: value,
	      createdAt: new Date(), // current time
	    });
     $('#taskz').val('');
      state.set('task-input', 'category');
   } else if (current === 'category') {
			// Insert a task into the collection
			Categories.insert({
       text: value,
	      createdAt: new Date(), // current time
	    });
      $('#taskz').val('');
      state.set('task-input', 'task');

		}

		// if (keyCode === 13) {

		// }
	},

  'change .hide-completed input'(event, instance) {
  	instance.state.set('hideCompleted', event.target.checked);
  },


});