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
			backgroundColor: "#FFF",
			textColor: "#333",
			shadowColor: "rgba(172,52,185,0.5)",
			codeColor: 'rgb(0,140,186)',
			canvasId: "matrix-rain",
			showContent: true,
			text: "<h3>Welcome to</h3><h2>ALXS Design</h2>",
			colWidth: 16,
			colHeight: 25,
			velMin: 0.5,
			velMax: 2,
			codeLengthMin: 3,
			codeLengthMax: 18,
			font: "30px matrix-code",
			letters: ['c', 'o', 'd', 'e', 'b', 'u', 's', 't', 'a'],
			codes: ['codebusta'],
			navId: 'site-header'
		}, options);
		if (window.console) console.log('Settings initialised');

		// Setup global variables
		var navHeight = $('#' + settings.navId).outerHeight();
		var windowWidth = $(window).width();
		var windowHeight = $(window).height();
	    var canvasHeight = windowHeight-navHeight;
		if (window.console) console.log('Global variables set');

		// Matrix code object literal
		var M = {

			// Object-specific settings
			settings: {
				COL_WIDTH: settings.colWidth,
				COL_HEIGHT: settings.colHeight,
				VELOCITY_PARAMS: {
					min: settings.velMin,
					max: settings.velMax
				},
				CODE_LENGTH_PARAMS: {
					min: settings.codeLengthMin,
					max: settings.codeLengthMax
				}
			},

			animation: null,

			c: null,
			ctx: null,

			lineC: null,
			ctx2: null,

			WIDTH: window.innerWidth,
			HEIGHT: canvasHeight,

			COLUMNS: null,
			canvii: [],

			// font from here http://www.dafont.com/matrix-code-nfi.font
			font: settings.font,
			letters: settings.letters,
			
			codes: settings.codes,

			createCodeLoop: null,
			codesCounter: 0,

			init: function () {
				M.c = document.getElementById( settings.canvasId );
				M.ctx = M.c.getContext( '2d' );
				M.c.width = M.WIDTH;
				M.c.height = M.HEIGHT;

				M.ctx.shadowBlur = 0;
				M.ctx.fillStyle = '#663399';
				M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);
				M.ctx.font = M.font;

				M.COLUMNS = Math.ceil(M.WIDTH / M.settings.COL_WIDTH);

				for (var i = 0; i < M.COLUMNS; i++) {
					M.codes[i] = [];
					M.codes[i][0] = {
						'open': true,
						'position': {'x': 0, 'y': 0},
						'strength': 0
					};
				}

				M.loop();

				M.createCode();

				window.onresize = function () {
					var navHeight = $('#' + settings.navId).height();
					window.cancelAnimationFrame(M.animation);
					M.animation = null;
					M.ctx.clearRect(0, 0, M.WIDTH, M.HEIGHT);
					M.codesCounter = 0;

					M.WIDTH = window.innerWidth;
					M.HEIGHT = canvasHeight;
				};
			},


			loop: function () {
				M.animation = requestAnimationFrame( function(){ M.loop(); } );
				M.draw();

			},

			draw: function() {

				var velocity, height, x, y, c, ctx;

				// slow fade BG colour
				M.ctx.shadowColor = settings.shadowColor;
				M.ctx.fillStyle = settings.backgroundColor;
				M.ctx.fillRect(0, 0, M.WIDTH, M.HEIGHT);

				M.ctx.globalCompositeOperation = 'source-over';

				for (var i = 0; i < M.COLUMNS; i++) {
					
					// check member of array isn't undefined at this point
					if (M.codes[i][0].canvas) {
						velocity = M.codes[i][0].velocity;
						height = M.codes[i][0].canvas.height;
						x = M.codes[i][0].position.x;
						y = M.codes[i][0].position.y - height;
						c = M.codes[i][0].canvas;
						ctx = c.getContext('2d');

						M.ctx.drawImage(c, x, y, M.settings.COL_WIDTH, height);

						if ((M.codes[i][0].position.y - height) < M.HEIGHT){
							M.codes[i][0].position.y += velocity;
						} else {
							M.codes[i][0].position.y = 0;
						}

					}
				}

			},

			createCode: function() {

				if (M.codesCounter > M.COLUMNS) {
					clearTimeout(M.createCodeLoop);
					return;
				}

				var randomInterval = M.randomFromInterval(0, 100);
				var column = M.assignColumn();


				if (column) {
					
					var codeLength = M.randomFromInterval(M.settings.CODE_LENGTH_PARAMS.min, M.settings.CODE_LENGTH_PARAMS.max);
					var codeVelocity = (Math.random() * (M.settings.VELOCITY_PARAMS.max - M.settings.VELOCITY_PARAMS.min)) + M.settings.VELOCITY_PARAMS.min;
					var lettersLength = M.letters.length;

					M.codes[column][0].position = {'x': (column * M.settings.COL_WIDTH), 'y': 0};
					M.codes[column][0].velocity = codeVelocity;
					M.codes[column][0].strength = M.codes[column][0].velocity / M.settings.VELOCITY_PARAMS.max;

					for (var i = 1; i <= codeLength; i++) {
						var newLetter = M.randomFromInterval(0, (lettersLength - 1));
						M.codes[column][i] = M.letters[newLetter];
					}

					M.createCanvii(column);

					M.codesCounter++;

				}

				M.createCodeLoop = setTimeout(M.createCode, randomInterval);

			},

			createCanvii: function(i) {

				var codeLen = M.codes[i].length - 1;
				var canvHeight = codeLen * M.settings.COL_HEIGHT;
				var velocity = M.codes[i][0].velocity;
				var strength = M.codes[i][0].strength;
				var text, fadeStrength;

				var newCanv = document.createElement('canvas');
				var newCtx = newCanv.getContext('2d');

				newCanv.width = M.settings.COL_WIDTH;
				newCanv.height = canvHeight;

				for (var j = 1; j < codeLen; j++) {
					text = M.codes[i][j];
					newCtx.globalCompositeOperation = 'source-over';
					newCtx.font = '20px matrix-code';

					if (j < 5) {
						newCtx.shadowColor = 'rgb(' + settings.codeColor + ')';
						newCtx.shadowOffsetX = 0;
						newCtx.shadowOffsetY = 0;
						newCtx.shadowBlur = 10;
						newCtx.globalAlpha = 0.3;
						newCtx.fillStyle = settings.codeColor;
					} else if (j > (codeLen - 4)) {
						fadeStrength = j / codeLen;
						fadeStrength = 1 - fadeStrength;

						newCtx.shadowOffsetX = 0;
						newCtx.shadowOffsetY = 0;
						newCtx.shadowBlur = 0;
						newCtx.globalAlpha = 0.9;
						newCtx.fillStyle = settings.codeColor;
					} else {
						newCtx.shadowOffsetX = 0;
						newCtx.shadowOffsetY = 0;
						newCtx.shadowBlur = 0;
						newCtx.globalAlpha = 0.6;
						newCtx.fillStyle = settings.codeColor;
					}

					newCtx.fillText(text, 0, (canvHeight - (j * M.settings.COL_HEIGHT)));
				}

				M.codes[i][0].canvas = newCanv;

			},

			swapCharacters: function() {
				var randomCodeIndex;
				var randomCode;
				var randomCodeLen;
				var randomCharIndex;
				var newRandomCharIndex;
				var newRandomChar;

				for (var i = 0; i < 20; i++) {
					randomCodeIndex = M.randomFromInterval(0, (M.codes.length - 1));
					randomCode = M.codes[randomCodeIndex];
					randomCodeLen = randomCode.length;
					randomCharIndex = M.randomFromInterval(2, (randomCodeLen - 1));
					newRandomCharIndex = M.randomFromInterval(0, (M.letters.length - 1));
					newRandomChar = M.letters[newRandomCharIndex];
				
					randomCode[randomCharIndex] = newRandomChar;
				}

				M.swapCharacters();
			},

			createLines: function() {
				M.linesC = document.createElement('canvas');
				M.linesC.width = M.WIDTH;
				M.linesC.height = M.HEIGHT;
				M.linesC.style.position = 'absolute';
				M.linesC.style.top = 0;
				M.linesC.style.left = 0;
				M.linesC.style.zIndex = 10;
				document.body.appendChild(M.linesC);

				var linesYBlack = 0;
				var linesYWhite = 0;
				M.ctx2 = M.linesC.getContext('2d');

				M.ctx2.beginPath();

				M.ctx2.lineWidth = 1;
				M.ctx2.strokeStyle = 'rgba(0, 0, 0, 1)';

				while (linesYBlack < M.HEIGHT) {

					M.ctx2.moveTo(0, linesYBlack);
					M.ctx2.lineTo(M.WIDTH, linesYBlack);

					linesYBlack += 5;
				}

				M.ctx2.lineWidth = 0.15;
				M.ctx2.strokeStyle = 'rgba(102,51,153,1)';

				while (linesYWhite < M.HEIGHT) {

					M.ctx2.moveTo(0, linesYWhite+1);
					M.ctx2.lineTo(M.WIDTH, linesYWhite+1);

					linesYWhite += 5;
				}

				M.ctx2.stroke();
			},

			assignColumn: function() {
				var randomColumn = M.randomFromInterval(0, (M.COLUMNS - 1));

				if (M.codes[randomColumn][0].open) {
					M.codes[randomColumn][0].open = false;
				} else {
					return false;
				}

				return randomColumn;
			},

			randomFromInterval: function(from, to) {
				return Math.floor(Math.random() * (to - from+ 1 ) + from);
			},

			snapshot: function() {
				window.open(M.c.toDataURL());
			}

		};

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
			var navHeight = $('#' + settings.navId).outerHeight();
			var windowWidth = $(window).width();
			var windowHeight = $(window).height();
		    var canvasHeight = windowHeight-navHeight;

			$('.block-alxs-matrix-alxs-matrix-rain').css({'height': canvasHeight, 'position': 'absolute', 'top': navHeight, 'color': settings.textColor, 'background-color': settings.backgroundColor});
			$('#main').css({'position': 'absolute', 'top': windowHeight, 'min-height': canvasHeight});
			if(settings.showContent == true) {
				if($('#matrix-content').length == 0) {
					$('section').prepend('<div id="matrix-content">' + settings.text +'</div>');
				}
				$('#matrix-content').css({'position': 'absolute', 'top': '50%','transform': 'translate(0,-50%)'});
				$('#' + settings.canvasId).height(canvasHeight);
			}
			showGlobals(false);
			M.init();

		}
		matrixInit();
		$(window).resize(function(){
			matrixInit();
		});
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