'use strict';
var defTransition = 'shake';
var defDuration = '800ms';
var defRepeat = 1;

var transition = angular.module('rapid.transition', ['ngAnimate']);

transition.filter('timeMsFilter', function(){
	return function(time){
		var ms = parseInt(time);
		var unit = time.replace(ms, "");
		console.log(ms);
		if(unit == "s")
			ms = (ms * 1000);
		//default time unit is ms
		return ms.toString() + 'ms';
	}
});

transition.directive('transition', function($animate, $filter){
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
				var repeat = (attrs.repeat) ? attrs.repeat : defRepeat;
				target.prop('duration', $filter('timeMsFilter')(duration));
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

var addRemoveClassAnimations = {
	//animation that can be triggered before the class is added
	beforeAddClass: function(element, className, done) {
		var style = {
			'animation-duration': element.prop('duration'),
			'animation-iteration-count': element.prop('repeat')
		}
		element.prop('old-style', element.attr('style'));
		element.css(style);
		done();
	},

	//animation that can be triggered after the class is added
	addClass: function(element, className, done) {
		element.css('animation-play-state', 'running');
		done();
	},

	//animation that can be triggered before the class is removed
	beforeRemoveClass: function(element, className, done) {
		done();
	},

	//animation that can be triggered after the class is removed
	removeClass: function(element, className, done) {
		done();
		if(element.prop('done'))
			element.prop('done')();
	}
};

transition.animation('.flash', function($animate, $timeout) {
	return {
		//animation that can be triggered before the class is added
		beforeAddClass: function(element, className, done) {
			addRemoveClassAnimations.beforeAddClass(element, className, done);
		},

		//animation that can be triggered after the class is added
		addClass: function(element, className, done) {
			var time = element.prop('duration');
			var onceDone = function(){
				$timeout(function(){
					$animate.removeClass(element, className, done);
				},parseInt(time));
			}
			addRemoveClassAnimations.addClass(element, className, onceDone);
		},

		//animation that can be triggered before the class is removed
		beforeRemoveClass: function(element, className, done) {
			addRemoveClassAnimations.beforeRemoveClass(element, className, done);
		},

		//animation that can be triggered after the class is removed
		removeClass: function(element, className, done) {
			addRemoveClassAnimations.removeClass(element, className, done);
		}
	};
}).animation('.shake', function($animate, $timeout) {
	return {
		//animation that can be triggered before the class is added
		beforeAddClass: function(element, className, done) {
			addRemoveClassAnimations.beforeAddClass(element, className, done);
		},

		//animation that can be triggered after the class is added
		addClass: function(element, className, done) {
			var time = element.prop('duration');
			var onceDone = function(){
				$timeout(function(){
					$animate.removeClass(element, className, done);
				},parseInt(time));
			}
			addRemoveClassAnimations.addClass(element, className, done);
		},

		//animation that can be triggered before the class is removed
		beforeRemoveClass: function(element, className, done) {
			addRemoveClassAnimations.beforeRemoveClass(element, className, done);
		},

		//animation that can be triggered after the class is removed
		removeClass: function(element, className, done) {
			addRemoveClassAnimations.removeClass(element, className, done);
		}
	};
}).animation('.scale', function($animate, $timeout) {
	return {
		//animation that can be triggered before the class is added
		beforeAddClass: function(element, className, done) {
			addRemoveClassAnimations.beforeAddClass(element, className, done);
		},

		//animation that can be triggered after the class is added
		addClass: function(element, className, done) {
			var time = element.prop('duration');
			var onceDone = function(){
				$timeout(function(){
					$animate.removeClass(element, className, done);
				},parseInt(time));
			}
			addRemoveClassAnimations.addClass(element, className, done);
		},

		//animation that can be triggered before the class is removed
		beforeRemoveClass: function(element, className, done) {
			addRemoveClassAnimations.beforeRemoveClass(element, className, done);
		},

		//animation that can be triggered after the class is removed
		removeClass: function(element, className, done) {
			addRemoveClassAnimations.removeClass(element, className, done);
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