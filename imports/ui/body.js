import { Template } from 'meteor/templating';
import { Tasks } from '../api/tasks.js';
import { Categories } from '../api/categories.js';

 
import './body.html';
import './task.js';

 
Template.body.helpers({
tasks() {
    return Tasks.find({}, { sort: { createdAt: -1 }});
  },

 categories() {
 		return Categories.find({},  { sort: { createdAt: -1 }} );
 }

});

Template.body.events({
  'submit .new-task'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.text.value;
 
    // Insert a task into the collection
    Tasks.insert({
      text,
      createdAt: new Date(), // current time
    });
    $('.new-task').velocity("fadeOut", {duration:250});

    // Clear form
    target.text.value = '';
    $('.category').velocity("fadeIn", {duration:250});
    $('.category').focus();

  },

    'submit .category'(event) {
    // Prevent default browser form submit
    event.preventDefault();

    // Get value from form element
    const target = event.target;
    const text = target.ctext.value;
 
    // Insert a task into the collection
    Categories.insert({
      text,
      createdAt: new Date(), // current time
    });
    
    target.ctext.value = '';
    $('.category').velocity("fadeOut", {duration:250}, function() {$('.new-task').velocity("fadeIn", {duration:250})});
    console.log("Faded Out Category");
    // Clear form
    //$('.category').velocity("fadeIn", {duration:250});
    console.log("Faded In Category");
    $('.new-task').velocity("fadeIn", {duration:250});
    $('.new-task').focus();


  },


});