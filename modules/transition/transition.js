'use strict';
var defTransition = 'scale';
var defDuration = '800ms';
var defRepeat = false;

var transition = angular.module('rapid.transition', ['ngAnimate']);
transition.directive('transition', function($animate){
	return {
		restrict: 'AE',
		link: function(scope, elem, attrs) {
			var e = (attrs.tEvent) ? $(attrs.tEvent) : 'click';
			var el = angular.element(document.querySelector('#'+attrs.target));
			var target = (el) ? el : elem;
			elem.on(e, function(){
				var animation = (attrs.transition) ? attrs.transition : defTransition;
				var callback = (attrs.done) ? attrs.done : null;
				var duration = (attrs.duration) ? attrs.duration : defDuration;
				var repeat = (attrs.loop) ? attrs.loop : defRepeat;
				target.prop('time', duration);
				target.prop('done', callback);
				target.prop('repeat', repeat);
				if(!target.hasClass(animation))
					$animate.addClass(target, animation, callback);
				else
					$animate.removeClass(target, animation, callback);
			});
		}
	}
});

transition.animation('.flash', function($animate) {
	return {
		//animation that can be triggered before the class is added
		beforeAddClass: function(element, className, done) {
			alert('pre-add');

			done();
		},

		//animation that can be triggered after the class is added
		addClass: function(element, className, done) {
			alert('add');
			
			done();
			$animate.removeClass(element, className, done);
		},

		//animation that can be triggered before the class is removed
		beforeRemoveClass: function(element, className, done) {
			alert('pre-remove');

			done();
		},

		//animation that can be triggered after the class is removed
		removeClass: function(element, className, done) {
			alert('remove');

			if(element.prop('repeat'))
				$animate.addClass(element, className, done);
			else if(done)
				done();
		}
	};
});

// transition.animation('.', function() {
// 	return {
// 		enter: function(element, done) {
// 		  //run the animation here and call done when the animation is complete
// 		  return function(cancelled) {
// 		    //this (optional) function will be called when the animation
// 		    //completes or when the animation is cancelled (the cancelled
// 		    //flag will be set to true if cancelled).
// 		  };
// 		},
// 		leave: function(element, done) {

//		},

// 		move: function(element, done) {

//		},

// 		//animation that can be triggered before the class is added
// 		beforeAddClass: function(element, className, done) {

//		},

// 		//animation that can be triggered after the class is added
// 		addClass: function(element, className, done) {

// 		},

// 		//animation that can be triggered before the class is removed
// 		beforeRemoveClass: function(element, className, done) { },

// 		//animation that can be triggered after the class is removed
// 		removeClass: function(element, className, done) { }
// 	};
// });