<?php
if ($_GET['version']) {
	$js = file_get_contents('droidscript.js');
	$js = str_replace("\n", "", $js);
	$js = str_replace("\r", "", $js);
	$js = str_replace("\t", "", $js);
	/*
	GetVersion: function () {
		return '2.20';
	}
	*/
	echo preg_replace("/.*GetVersion\s*\:\s*function\s*\(\s*\)\s*\{\s*return\s*\'(\d+\.\d+)\'\s*\;\s*\}.*/", '$1', $js);
} else if ($_GET['stat']) {
	$file = null;
	switch ($_GET['stat']) {
		case 'visit':
			$file = "visit.txt";
			break;
		case 'show':
			$file = "show.txt";
			break;
		case 'stat':
			$visit = file_get_contents('visit.txt');
			$show = file_get_contents('show.txt');
			$time = file_get_contents('time.txt');
			echo "Visits: $visit\n<br/>\nShow: $show\n<br/>\nTime: $time";
			die();
			break;
		case 'reset':
			file_put_contents('visit.txt', 0);
			file_put_contents('show.txt', 0);
			file_put_contents('time.txt', date('d-m-Y H:i:s'));
			echo "RESET!";
			die();
			break;
	}
	if ($file != null) {
		$count = strval(file_get_contents($file));
		file_put_contents($file, $count + 1);
	}
} else {
	$page = file_get_contents('aKoKo.html');

	# Clean
	$page = str_replace("<script src='file:///android_asset/app.js'></script>", '', $page);

	# Google Analytics
	$analytics = file_get_contents('_analytics.php');
	$page = str_replace('<!-- Analytics -->', $analytics, $page);

	# Render
	echo $page;
}