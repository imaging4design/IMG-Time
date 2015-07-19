<!doctype html>
<html lang="en" ng-app="myApp">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>IMAGING4DESIGN TIME</title>

	<!-- CSS -->
	<link href='http://fonts.googleapis.com/css?family=Raleway:400,600,700' rel='stylesheet' type='text/css'>
	<link href="//maxcdn.bootstrapcdn.com/font-awesome/4.2.0/css/font-awesome.min.css" rel="stylesheet"><!-- Font Awesome -->
	<link rel="stylesheet" href="css/bootstrap.css"><!-- Twitter Bootstrap -->
	<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css">
	<link rel="stylesheet" href="http://css-spinners.com/css/spinner/spinner.css" type="text/css"><!-- Loading Spinner css -->
	<link rel="stylesheet" href="css/datepicker3.css">
	<link rel="stylesheet" href="css/styles.css"><!-- Custom Styles -->

	<!-- JS -->
	<!--<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>-->
	<script src="//code.jquery.com/jquery-1.11.0.min.js"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.21/angular.min.js"></script><!-- Angular JS -->


</head>
<body>
	

		



		<!-- Add your site or application content here -->
		<div class="main-container" ng-view=""></div>




				

		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="js/bootstrap.min.js"></script>
		<script src="js/lib/jquery-ui-1.10.4.custom.js"></script>
		<script src="js/lib/bootstrap-datepicker.js"></script>


		

		
		<script src="js/jquery.stopwatch.js"></script> <!-- Stopwatch JS -->

		

		<script src="js/lib/angular-resource.min.js"></script>
		<script src="js/lib/angular-route.min.js"></script>
		<script src="js/lib/angular-animate.min.js"></script>
		<script src="js/lib/angular-cookies.min.js"></script>
		<script src="js/lib/angular-sanitize.min.js"></script>
		<script src="js/lib/underscore-min.js"></script>

		<script src="js/lib/google/ng-google-chart.js"></script>


		<!-- ANGULAR -->
		<!-- all angular resources wull be loaded from the /public folder -->
		<script src="js/app.js"></script> <!--load our application -->
		<script src="js/services/services.js"></script><!-- load our service -->

		<!-- COMPRESS ALL THESE INTO SINGLE FILE BELOW -->
		<script src="js/controllers/controllersClients.js"></script><!-- load our controller -->
		<script src="js/controllers/controllersJobs.js"></script><!-- load our controller -->
		<script src="js/controllers/controllersEntrys.js"></script><!-- load our controller -->

		

	</body>
</html>