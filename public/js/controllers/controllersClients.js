var angular = angular;

var app = angular.module('myApp.controllersClients', []);

/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: LoginCtrl
| Methods :: Login | Logout
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('LoginCtrl', ['$rootScope', '$scope', '$location', 'AuthenticationService',
	function($rootScope, $scope, $location, AuthenticationService) {

	//$scope.credentials = { username: "", password: "" }

	$scope.login = function() {
		AuthenticationService.login($scope.credentials).success(function() {
			$location.path('/jobs-live');
		});
	};

	// GLOBAL LOGOUT CAN BE FOUND IN 'app.js' UNDER 'run()'
	
}]);


app.controller('menuCtrl', ['$scope', '$location', function ($scope, $location) {

	$scope.menuItems = [
		{'name' : 'Live Jobs', 'url' : '/jobs-live', 'icon' : '<i class="fa fa-paper-plane"></i> '},
		{'name' : 'Client List', 'url' : '/client-list', 'icon' : '<i class="fa fa-user"></i> '},
		{'name' : 'Add Client', 'url' : '/client-creation', 'icon' : '<i class="fa fa-male"></i> '}
	];

	$scope.isActive = function(menuItem) {
	if (menuItem.url === $location.path()) {
		return true;
	}
		return false;
	};

	

}]);

/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: ClientListCtrl
| Methods :: editClient / deleteClient / showCreateClientForm
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('ClientListCtrl', ['$scope', '$rootScope', 'ClientsFactory', 'ClientFactory', '$location',
	function ($scope, $rootScope, ClientsFactory, ClientFactory, $location) {

		$scope.loading = true;


		// Callback for ng-click 'editClient':
		/*****************************************************************************/
		$scope.editClient = function (clientId) {
			$location.path('/client-detail/' + clientId);
		};

		// Callback for ng-click 'deleteClient':
		/*****************************************************************************/
		$scope.deleteClient = function (clientId) {
			ClientFactory.delete({ id: clientId });
			ClientsFactory.show().$promise.then(function() {
				$scope.clients = ClientsFactory.show();
			});
		};

		// Callback for ng-click 'showCreateClientForm':
		/*****************************************************************************/
		$scope.showCreateClientForm = function () {
			$location.path('/client-creation');
		};

		// Query database for ALL clients
		/*****************************************************************************/
		$scope.clients = ClientsFactory.show();
		$scope.clients.$promise.then(function(result) {
			$scope.clients = result;
			$scope.loading = false;
			$scope.numClients = $scope.clients.length;
		});

}]);



/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: ClientDetailCtrl
| Methods :: updateClient / cancel
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('ClientDetailCtrl', ['$scope', '$routeParams', 'ClientFactory', '$location',
	function ($scope, $routeParams, ClientFactory, $location) {

		$scope.client = ClientFactory.show({id: $routeParams.id});

		// Callback for ng-click 'updateClient':
		/*****************************************************************************/
		$scope.updateClient = function () {

			$scope.loading = true; // Start loading spinner
			ClientFactory.update($scope.client).$promise.then(function() {
				$location.path('/client-list/');
				$scope.loading = false; // Stop loading spinner
			});
		};

		// Callback for ng-click 'cancel':
		/*****************************************************************************/
		$scope.cancel = function () {
			$location.path('/client-list');
		};

}]);



/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: ClientCreationCtrl
| Methods :: createNewClient
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('ClientCreationCtrl', ['$scope', 'ClientsFactory', '$location',
	function ($scope, ClientsFactory, $location) {

		// Callback for ng-click 'createNewClient':
		/*****************************************************************************/
		$scope.createNewClient = function () {
			ClientsFactory.create($scope.client);
			$location.path('/client-list');
		};

}]);

