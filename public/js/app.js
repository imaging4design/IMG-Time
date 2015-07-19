//app.js

var myApp = angular.module('myApp', ['myApp.services', 'myApp.controllersClients', 'myApp.controllersJobs', 'myApp.controllersEntrys', 'ngRoute', 'ngSanitize', 'googlechart'])
	.config(['$routeProvider', function ($routeProvider) {

		/*
		|-----------------------------------------------------------------------------------------------------------------
		| CLIENT Routes
		|-----------------------------------------------------------------------------------------------------------------
		*/
		$routeProvider.when('/client-list', // Show full list of Clients
			{
				templateUrl: 'partials/client-list.html',
				controller: 'ClientListCtrl'
			});

		$routeProvider.when('/client-detail/:id', // Show form with client details ready to edit
			{
				templateUrl: 'partials/client-detail.html',
				controller: 'ClientDetailCtrl'
			});

		$routeProvider.when('/client-creation', // Show empty form ready to create a new client
			{
				templateUrl: 'partials/client-creation.html',
				controller: 'ClientCreationCtrl'
			});


		/*
		|-----------------------------------------------------------------------------------------------------------------
		| JOB Routes
		|-----------------------------------------------------------------------------------------------------------------
		*/
		$routeProvider.when('/jobs-list/:id', // Show list of Jobs by client
			{
				templateUrl: 'partials/jobs-list.html',
				controller: 'JobListCtrl'
			});

		$routeProvider.when('/jobs-detail/:id/edit/:item', // Show form with client details ready to edit
			{
				templateUrl: 'partials/jobs-detail.html',
				controller: 'JobsDetailCtrl'
			});

		$routeProvider.when('/jobs-live', // Show list of 'LIVE' Jobs by ALL clients
			{
				templateUrl: 'partials/jobs-live.html',
				controller: 'LiveJobCtrl'
			});


		/*
		|-----------------------------------------------------------------------------------------------------------------
		| ENTRY Routes
		|-----------------------------------------------------------------------------------------------------------------
		*/
		$routeProvider.when('/entrys-list/:id', // Show list of Jobs by client
			{
				templateUrl: 'partials/entrys-list.html',
				controller: 'EntryListCtrl'
			});

		$routeProvider.when('/entrys-detail/:id/edit/:item', // Show form with client details ready to edit
			{
				templateUrl: 'partials/entrys-detail.html',
				controller: 'EntrysDetailCtrl'
			});


		/*
		|-----------------------------------------------------------------------------------------------------------------
		| DEFAULT & LOGIN Routes when no matches from above
		|-----------------------------------------------------------------------------------------------------------------
		*/
		$routeProvider.when('/login', // Show login form
			{
				templateUrl: 'partials/login.html',
				controller: 'LoginCtrl'
			});

		//If none of the above routes exist - redirect to /login (default)
		$routeProvider.otherwise(
			{
				redirectTo: '/login'
			});

	}]);




myApp.config(function($httpProvider){
	var logsOutUseron401 = function($location, $q, SessionService, FlashService) {
		var success = function(response){
			return response;
		};
		var error = function(response){
			if(response.status === 401) { //HTTP Not Authorised!
				SessionService.unset('authenticated');
				FlashService.show(response.data.flash);
				$location.path('/login');
				return $q.reject(response);
			} else {
				return $q.reject(response);
			}

		};

		return function(promise){
			return promise.then(success, error);
		};
	};
});


/*
|-----------------------------------------------------------------------------------------------------------------
| ON RUN!
|-----------------------------------------------------------------------------------------------------------------
*/

// Run these functions at load (makes these globally accessible)
myApp.run(function($rootScope, $location, AuthenticationService, FlashService) {

	// Whitelist (the /login page is the only page that does NOT require Auth!) .. all other pages do!
	var routesThatRequireAuth = ['/login'];

	// Requires (underscore-min.js) in index.php!
	$rootScope.$on('$routeChangeStart', function(event, current, previous) {
		if( !_(routesThatRequireAuth).contains($location.path()) && !AuthenticationService.isLoggedIn() ) {
			//console.log('not logged in');
			$location.path('/login');
			FlashService.show('Please login to continue ...');
		}
	});

	$rootScope.logout = function() {
		AuthenticationService.logout().success(function() {
			$location.path('/login');
		});
	};

});


/*
|-----------------------------------------------------------------------------------------------------------------
| CUSTOM DIRECTIVES
|-----------------------------------------------------------------------------------------------------------------
*/
// Used to overcome 'Saved Password' failure to login
// Doesn't allow user to login with saved username / password details
// This directive along with (data-trigger-change="#password,#email") in the form solves it
myApp.directive('triggerChange', function($sniffer) {
	return {
		link : function(scope, elem, attrs) {
			elem.bind('click', function(){
				$(attrs.triggerChange).trigger($sniffer.hasEvent('input') ? 'input' : 'change');
			});
		},
		priority : 1
	};
});

// Back button directive
myApp.directive('backButton', function(){
	return {
		restrict: 'A',

		link: function(scope, element, attrs) {
			element.bind('click', function () {
				history.back();
				scope.$apply();
			});
		}
	};
});


// jQuery DatePicker Directive
myApp.directive("datepicker", function () {
	return {
		restrict: "A",
		require: "ngModel",
		link: function (scope, elem, attrs, ngModelCtrl) {
			var updateModel = function (dateText) {
				scope.$apply(function () {
					ngModelCtrl.$setViewValue(dateText);
				});
			};
			var options = {
				dateFormat: "yy-mm-dd",
				onSelect: function (dateText) {
					updateModel(dateText);
				}
			};
			elem.datepicker(options);
		}
	};
});





/*
|-----------------------------------------------------------------------------------------------------------------
| CUSTOM FILTERS
|-----------------------------------------------------------------------------------------------------------------
*/
// Work out total time (i.e., Hours + minutes)
myApp.filter("totalTime", function(){
	
	return function(entrys, hours, minutes) {
		
		var total = 0;
		var i = 0;

		for(i=0; i < entrys.length; i++) {
			total -= -entrys[i][hours] -entrys[i][minutes];
		}
		
		return total;
	};
});


// Work out total cost (i.e., Hours + minutes x charge_rate)
myApp.filter("totalCost", function(){
	
	return function(entrys, hours, minutes, rate, misc_costs) {

		var total = 0;
		var misc = 0;
		var i = 0;

		for(i=0; i < entrys.length; i++) {
		 	total -= -entrys[i][hours] - entrys[i][minutes];
		 	misc -= -entrys[i][misc_costs];
		}
		
		return total * rate + misc;
	};
});


// Work out MISC cost (i.e., Misc Costs like stock photography)
myApp.filter("miscCost", function(){
	
	return function(entrys, misc_costs) {
		
		var total = 0,
		i = 0;

		for( i=0; i < entrys.length; i++ ) {
			total -= -entrys[i][misc_costs];
		}

		return total;
	};
});


// Creates a 'titlecase' filter
myApp.filter('titlecase', function() {
	return function (input) {
		var smallWords = /^(a|an|and|as|at|but|by|en|for|if|in|nor|of|on|or|per|the|to|vs?\.?|via)$/i;
		 
		input = input.toLowerCase();

		return input.replace(/[A-Za-z0-9\u00C0-\u00FF]+[^\s-]*/g, function(match, index, title) {

			if (index > 0 && index + match.length !== title.length &&
				match.search(smallWords) > -1 && title.charAt(index - 2) !== ":" &&
				(title.charAt(index + match.length) !== '-' || title.charAt(index - 1) === '-') &&
				title.charAt(index - 1).search(/[^\s-]/) < 0) {
				return match.toLowerCase();
			}
			 
			if (match.substr(1).search(/[A-Z]|\../) > -1) {
				return match;
			}
		 
		return match.charAt(0).toUpperCase() + match.substr(1);
		});
	};
});

