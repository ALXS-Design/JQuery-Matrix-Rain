(function($) {
	$.fn.matrixrain = function( options ) {

		// Empty Variables

		var animation = null;
		var c = null;
		var ctx = null;
		var lineC = null;
		var ctx2 = null;
		var columns = null;
		var canvii = [];
		var createCodeLoop = null;
		var codesCounter = 0;

		// Default Settings
		var settings = $.extend({
			debug: true,
			backgroundColor: "#639",
			textColor: "#eee",
			codeColor: '#663399',
			canvasId: "matrix-rain",
			showContent: true,
			text: "<h3>Welcome to</h3><h2>ALXS Design</h2>",
			colWidth: "16",
			colHeight: "25",
			velMin: "2",
			velMax: "5",
			codeLengthMin: "3",
			codeLengthMax: "18",
			fontFamily: "matrix-code",
			fontSize: "30px",
			letters: ['c', 'o', 'd', 'e', 'b', 'u', 's', 't', 'a'],
			codes: ['codebusta'],
			navId: 'site-header'
		}, options);
		if (window.console) console.log('Settings initialised');

		// Setup global variables
		var navHeight = $('#' + settings.navId).height();
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
	    var canvasHeight = windowHeight-navHeight;
		if (window.console) console.log('Global variables set');

		// Show variables function
		function showGlobals(clear) {
			if (window.console) {
				clear = clear || false;

				if (clear == true) {
					console.clear();
				}

				console.log('Global Variables:');
				console.log('Window Width: ' + windowWidth);
				console.log('Window Height: ' + windowHeight);
				console.log('Nav Height: ' + navHeight);
				console.log('Canvas Height: ' + canvasHeight);
			}
		}
		
		// Show settings
		function showSettings(clear) {
			if (window.console) {

				clear = clear || false;

				if (clear == true) {
					console.clear();
				}
				
				console.log('Settings:');
				$.each(settings, function(i, val) {
					console.log( i + ": " + val );
				})
			}
		}

		// Append test content to body
		$('#main').append('<h3>This height of the header is ' + navHeight + 'px</h3>');
		if (window.console) console.log('Content appended');

		// Initialize the matrix
		function matrixInit() {
			$('.block-alxs-matrix-alxs-matrix-rain').css({'height': canvasHeight, 'position': 'absolute', 'top': navHeight, 'color': settings.textColor, 'background-color': settings.backgroundColor});
			$('#main').css({'position': 'absolute', 'top': windowHeight, 'min-height': canvasHeight});
			if(settings.showContent ==true) {
				$('section').prepend('<div id="matrix-content">' + settings.text +'</div>');
				$('#matrix-content').css({'position': 'absolute', 'top': '50%','transform': 'translate(0,-50%)'});
				$('#' + settings.canvasId).height(canvasHeight);
			}
			showGlobals(false);
		}
		matrixInit();

		// Set <body> CSS
		function setBodyCSS(overflow) {
			$('body').css({
				overflow: overflow
			});
			if (window.console) console.log('Body CSS set.');
		};
		setBodyCSS("hidden");

		// Hide the matrix function
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
				$('#main').animate({top: navHeight}, 500, function() {
					setBodyCSS("auto");
				});
				if (window.console) console.log('Made the matrix disappear');
			});
		};

		// Hide the matrix toggle
		$('#hide-matrix').on('click', function(e) {
			e.preventDefault();
			if (window.console) console.log('Preparing to hide the matrix');
			hideMatrix();
		});

		// Debug Buttons
		$('#log-globals').on('click', function(e) {
			e.preventDefault();
			showGlobals(true);
		});
		$('#log-settings').on('click', function(e) {
			e.preventDefault();
			showSettings(true);
		});
	};
}(jQuery));