<!doctype html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
	<title>PaR nz</title>

	<!-- CSS -->
	<link href='http://fonts.googleapis.com/css?family=Roboto+Condensed:300,400,700' rel='stylesheet' type='text/css'>
	<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"><!-- Font Awesome -->
	<link rel="stylesheet" href="css/bootstrap.css"><!-- Twitter Bootstrap -->
	<link rel="stylesheet" href="css/jquery-ui-1.10.4.custom.min.css">
	<link rel="stylesheet" href="http://css-spinners.com/css/spinner/spinner.css" type="text/css"><!-- Loading Spinner css -->
	<link rel="stylesheet" href="css/styles.css"><!-- Custom Styles -->

	<!-- JS -->
	<script src="//ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
	<script src="js/lib/jquery-1.11.1.min.js"></script>  
	<!--<script src="js/lib/jquery-ui-1.10.4.custom.js"></script>-->
	<script src="https://ajax.googleapis.com/ajax/libs/angularjs/1.2.16/angular.min.js"></script><!-- Angular JS -->

</head>
<body>
	

		<div class="navbar navbar-inverse navbar-fixed-top" role="navigation">
			<div class="container-fluid">
				<div class="navbar-header">
					<button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
						<span class="sr-only">Toggle navigation</span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
						<span class="icon-bar"></span>
					</button>
					<a class="navbar-brand" href="#">PaR nz Database</a>
				</div>
				<div class="navbar-collapse collapse">
					<ul class="nav navbar-nav navbar-right">
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Customers <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">Search Customer</a></li>
								<li><a href="#">Add Customer</a></li>
								<li><a href="#">Edit Customer</a></li>
							</ul>
						</li>
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">Suppliers <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">Search Suppliers</a></li>
								<li><a href="#">Add Suppliers</a></li>
								<li><a href="#">Edit Suppliers</a></li>
							</ul>
						</li>
						<li class="dropdown">
						<a href="#" class="dropdown-toggle" data-toggle="dropdown">IAGTO <span class="caret"></span></a>
							<ul class="dropdown-menu" role="menu">
								<li><a href="#">Search IAGTO</a></li>
								<li><a href="#">Add IAGTO</a></li>
								<li><a href="#">Edit IAGTO</a></li>
							</ul>
						</li>
						<li><a href="#">Logout</a></li>
					</ul>
					<form class="navbar-form navbar-right">
						<input type="text" class="form-control" placeholder="Search...">
					</form>
				</div>
			</div>
		</div>

		<div class="container-fluid">
			<div class="row">
				<div class="col-sm-3 col-md-2 sidebar">
					<ul class="nav nav-sidebar">
						<li class="active"><a href="#">CUSTOMERS</a></li>
						<li><a href="#"><i class="fa fa-search"></i> Search</a></li>
						<li><a href="#"><i class="fa fa-plus"></i> Add</a></li>
						<li><a href="#"><i class="fa fa-pencil-square-o"></i> Edit</a></li>
					</ul>
					<ul class="nav nav-sidebar">
						<li><a href="#">SUPPLIERS</a></li>
						<li><a href="#"><i class="fa fa-search"></i> Search</a></li>
						<li><a href="#"><i class="fa fa-plus"></i> Add</a></li>
						<li><a href="#"><i class="fa fa-pencil-square-o"></i> Edit</a></li>
					</ul>
					<ul class="nav nav-sidebar">
						<li><a href="#">IAGTO</a></li>
						<li><a href="#"><i class="fa fa-search"></i> Search</a></li>
						<li><a href="#"><i class="fa fa-plus"></i> Add</a></li>
						<li><a href="#"><i class="fa fa-pencil-square-o"></i> Edit</a></li>
					</ul>
				</div>


				<div class="col-sm-9 col-sm-offset-3 col-md-10 col-md-offset-2 main">

				<!-- INSERT Partials here -->


					<h1 class="page-header"><i class="fa fa-tachometer"></i> Dashboard</h1>

					<div class="row placeholders">
						<div class="col-xs-6 col-sm-3 placeholder">
							<img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
							<h4>Label</h4>
							<span class="text-muted">Something else</span>
						</div>
						<div class="col-xs-6 col-sm-3 placeholder">
							<img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="Generic placeholder thumbnail">
							<h4>Label</h4>
							<span class="text-muted">Something else</span>
						</div>
						<div class="col-xs-6 col-sm-3 placeholder">
							<img data-src="holder.js/200x200/auto/sky" class="img-responsive" alt="Generic placeholder thumbnail">
							<h4>Label</h4>
							<span class="text-muted">Something else</span>
						</div>
						<div class="col-xs-6 col-sm-3 placeholder">
							<img data-src="holder.js/200x200/auto/vine" class="img-responsive" alt="Generic placeholder thumbnail">
							<h4>Label</h4>
							<span class="text-muted">Something else</span>
						</div>
					</div>

					<h2 class="sub-header">Section title</h2>
					<div class="table-responsive">

						<table class="table table-striped">
							<thead>
								<tr>
									<th>#</th>
									<th>Header</th>
									<th>Header</th>
									<th>Header</th>
									<th>Header</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>1,001</td>
									<td>Lorem</td>
									<td>ipsum</td>
									<td>dolor</td>
									<td>sit</td>
								</tr>
								<tr>
									<td>1,002</td>
									<td>amet</td>
									<td>consectetur</td>
									<td>adipiscing</td>
									<td>elit</td>
								</tr>
								<tr>
									<td>1,003</td>
									<td>Integer</td>
									<td>nec</td>
									<td>odio</td>
									<td>Praesent</td>
								</tr>
								<tr>
									<td>1,003</td>
									<td>libero</td>
									<td>Sed</td>
									<td>cursus</td>
									<td>ante</td>
								</tr>
								<tr>
									<td>1,004</td>
									<td>dapibus</td>
									<td>diam</td>
									<td>Sed</td>
									<td>nisi</td>
								</tr>
								<tr>
									<td>1,005</td>
									<td>Nulla</td>
									<td>quis</td>
									<td>sem</td>
									<td>at</td>
								</tr>
								<tr>
									<td>1,006</td>
									<td>nibh</td>
									<td>elementum</td>
									<td>imperdiet</td>
									<td>Duis</td>
								</tr>
								<tr>
									<td>1,007</td>
									<td>sagittis</td>
									<td>ipsum</td>
									<td>Praesent</td>
									<td>mauris</td>
								</tr>
								<tr>
									<td>1,008</td>
									<td>Fusce</td>
									<td>nec</td>
									<td>tellus</td>
									<td>sed</td>
								</tr>
								<tr>
									<td>1,009</td>
									<td>augue</td>
									<td>semper</td>
									<td>porta</td>
									<td>Mauris</td>
								</tr>
								<tr>
									<td>1,010</td>
									<td>massa</td>
									<td>Vestibulum</td>
									<td>lacinia</td>
									<td>arcu</td>
								</tr>
								<tr>
									<td>1,011</td>
									<td>eget</td>
									<td>nulla</td>
									<td>Class</td>
									<td>aptent</td>
								</tr>
								<tr>
									<td>1,012</td>
									<td>taciti</td>
									<td>sociosqu</td>
									<td>ad</td>
									<td>litora</td>
								</tr>
								<tr>
									<td>1,013</td>
									<td>torquent</td>
									<td>per</td>
									<td>conubia</td>
									<td>nostra</td>
								</tr>
								<tr>
									<td>1,014</td>
									<td>per</td>
									<td>inceptos</td>
									<td>himenaeos</td>
									<td>Curabitur</td>
								</tr>
								<tr>
									<td>1,015</td>
									<td>sodales</td>
									<td>ligula</td>
									<td>in</td>
									<td>libero</td>
								</tr>
							</tbody>
						</table>

					</div><!-- ENDS table-responsive -->
				</div><!-- ENDS col -->
			</div><!-- ENDS row -->
		</div><!-- ENDS container-fluid -->

		<!-- Bootstrap core JavaScript
		================================================== -->
		<!-- Placed at the end of the document so the pages load faster -->
		<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
		<script src="js/bootstrap.min.js"></script>

		<script src="js/lib/angular-resource.min.js"></script>
		<script src="js/lib/angular-route.min.js"></script>
		<script src="js/lib/angular-animate.min.js"></script>
		<script src="js/lib/angular-cookies.min.js"></script>
		<script src="js/lib/angular-sanitize.min.js"></script>
		<script src="js/lib/underscore-min.js"></script>


		<!-- ANGULAR -->
		<!-- all angular resources wull be loaded from the /public folder -->
		<script src="js/app.js"></script> <!--load our application -->
		<!--<script src="js/services/services.js"></script> load our service -->
		<!--<script src="js/controllers/controllers.js"></script> load our controller -->

		<!-- COMPRESS ALL THESE INTO SINGLE FILE BELOW -->
		<!--<script src="js/controllers/controllersClients.js"></script> load our controller -->
		<!--<script src="js/controllers/controllersJobs.js"></script> load our controller -->
		<!--<script src="js/controllers/controllersEntrys.js"></script> load our controller -->

	</body>
</html>