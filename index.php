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
			<a href="#" id="log-settings">Log Settings</a>
			<a href="#" id="log-globals">Log Vars</a>
		</div>
		<script src="https://code.jquery.com/jquery-1.11.3.min.js"></script>
		<script src="js/jquery.matrixrain.js" ></script>
		<script>
			$(document).ready(function() {
				$().matrixrain();
			});
		</script>
	</body>
</html>