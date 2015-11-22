<?php
/**
 * This is a jQuery Matrix Rain plugin.
 */

?>
<!DOCTYPE html>
<html lang="en">
	<head>
		<title>ALXS Matrix Rain (jQuery Plugin)</title>
		<meta http-equiv="Content-Type" content="txt/html; charset=utf-8" />
		<link rel="stylesheet" media="all" href="css/style.css">
		<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css">
	</head>
	<body>
		<header id="site-header">
			<a id="brand" href="/">jQuery Matrix Rain</a>
		</header>
		<section class="block-alxs-matrix-alxs-matrix-rain">
			<canvas id="matrix-rain">Sorry, your browser is not supported</canvas>
			<div id="hide-wrapper">
				<a href="#main" id="hide-matrix"><i class="fa fa-2x fa-hand-o-down"></i> Read More</a>
			</div>
		</section>
		<main id="main">
		</main>
		<footer id="site-footer">
		</footer>
		<div id="debug-tools">
			<a href="log.settings" alt="Log Settings" id="log-settings">Log Settings</a>
			<a href="log.variables" alt="Log Variables" id="log-globals">Log Vars</a>
		</div>
		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="js/jquery.requestAnimationFrame.min.js"></script>
		<script src="js/jquery.matrixrain.js" ></script>
		<script>
			$(document).ready(function() {
				$('#matrix-rain').matrixrain({
					backgroundColor: '#000',
					textColor: '#eee',
					colWidth: 25,
					velMin: 1,
					velMax: 4
				});
			});
		</script>
	</body>
</html>
