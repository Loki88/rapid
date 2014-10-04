angular.module('rapid', [
	'rapid.transition'
	]);
'use strict';

var transition = angular.module('rapid.transition', ['ngAnimate']);

transition.animation('.flash', function() {
  return {
    enter: function(element, done) {
      //run the animation here and call done when the animation is complete
      return function(cancelled) {
        //this (optional) function will be called when the animation
        //completes or when the animation is cancelled (the cancelled
        //flag will be set to true if cancelled).
      };
    },
    leave: function(element, done) { },
    move: function(element, done) { },

    //animation that can be triggered before the class is added
    beforeAddClass: function(element, className, done) { },

    //animation that can be triggered after the class is added
    addClass: function(element, className, done) { },

    //animation that can be triggered before the class is removed
    beforeRemoveClass: function(element, className, done) { },

    //animation that can be triggered after the class is removed
    removeClass: function(element, className, done) { }
  };
});