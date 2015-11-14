(function($) {
	$.fn.matrixrain = function( options ) {

		// Init Settings
		var settings = $.extend({
			backgroundColor: "#639",
			color: "#fff",
			canvasId: "matrix-rain",
			showContent: true,
			text: "<h3>Welcome to</h3><h2>ALXS Design</h2>"
		}, options);
		if (window.console) console.log('Settings initialised');

		// Setup global variables
		var navHeight = $('#site-header').height();
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
	    var canvasHeight = windowHeight-navHeight;
		if (window.console) console.log('Global variables set');

		// Show variables function
		function showGlobals() {
			if (window.console) {
				console.clear();
				console.log('Global Variables:');
				console.log('Window Width: ' + windowWidth);
				console.log('Window Height: ' + windowHeight);
				console.log('Nav Height: ' + navHeight);
				console.log('Canvas Height: ' + canvasHeight);
			}
		}
		showGlobals();

		// Append test content to body
		$('#main').append('<h3>This height of the header is ' + navHeight + 'px</h3>');
		if (window.console) console.log('Content appended');

		// Initialize the matrix
		function matrixInit() {
			$('.block-alxs-matrix-alxs-matrix-rain').css({'height': canvasHeight, 'position': 'absolute', 'top': navHeight});
			$('#main').css({'position': 'absolute', 'top': windowHeight});
			if(settings.showContent ==true) {
				$('section').prepend('<div id="matrix-content">' + settings.text +'</div>');
				$('#matrix-content').css({'position': 'absolute', 'top': '50%','transform': 'translate(0,-50%)'});
				$('#' + settings.canvasId).height(canvasHeight)
			}
		}
		matrixInit();

		// Set <body> CSS
		function setBodyCSS() {
			$('body').css({
				color: settings.color,
				backgroundColor: settings.backgroundColor,
				overflow: "hidden"
			});
			if (window.console) console.log('Body CSS set.');
		};
		setBodyCSS();

		// Hide the matrix
		function hideMatrix() {
			var hideHeight = $('#hide-wrapper').height();
			if (window.console) console.log('Got height of "Read More" link');
			if (window.console) console.log('Hiding content');
			$('#matrix-content').fadeOut(500);
			$('#hide-wrapper').animate({
				bottom: -hideHeight
			}, 250, function() {
				if (window.console) console.log('Hiding matrix');
				$('#matrix-rain').parent().slideUp(1000);
				$('#main').animate({top: navHeight}, 500);
				if (window.console) console.log('Made the matrix disappear');
			});
		};
		$('#hide-matrix').on('click', function(e) {
			e.preventDefault();
			if (window.console) console.log('Preparing to hide the matrix');
			hideMatrix();
		});

		// Debug Buttons
		$('#log-globals').on('click', function(e) {
			e.preventDefault();
			showGlobals();
		});
		$('#log-settings').on('click', function(e) {
			e.preventDefault();
			if (window.console) {
				console.clear();
				console.log('Settings:');
				$.each(settings, function(i, val) {
					console.log( i + ": " + val );
				})
			}
		});
	};
}(jQuery));