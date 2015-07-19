var angular = angular;

var services = angular.module('myApp.services', ['ngResource', 'ngSanitize']);

/*
|-----------------------------------------------------------------------------------------------------------------
| LOGIN
|-----------------------------------------------------------------------------------------------------------------
*/
	
	services.factory('SessionService', function(){
		return {
			get: function(key) {
				//console.log('get');
				return sessionStorage.getItem(key);
			},
			set: function(key, val) {
				//console.log('set');
				return sessionStorage.setItem(key, val);
			},
			unset: function(key) {
				//console.log('unset');
				return sessionStorage.removeItem(key);
			}
		};

	});


	services.factory('FlashService', function($rootScope) {
		return {
			show: function(message) {
				$rootScope.flash = message;
			},
			clear: function() {
				$rootScope.flash = '';
			}
		};
	});
	

	services.factory('AuthenticationService', function($http, SessionService, FlashService) {
			//return $resource('/img_time/public/service/authenticate/', {});

			var cacheSession = function() {
				SessionService.set('authenticated', true);
			};

			var uncacheSession = function() {
				SessionService.unset('authenticated');
			};

			var loginError = function(response) {
				FlashService.show(response.flash);
			};


			return {
				login: function(credentials, response) {
					var login = $http.post('/img_time/public/api/auth/login', credentials);
					login.success(cacheSession);
					login.success(FlashService.clear);
					login.response = response;
					login.error(loginError);
					return login;
				},
				logout: function() {
					var logout = $http.get('/img_time/public/api/auth/logout');
					logout.success(uncacheSession);
					return logout;
				},
				isLoggedIn: function() {
					return SessionService.get('authenticated');
				}
			};
	});



/*
|-----------------------------------------------------------------------------------------------------------------
| CLIENTS
|-----------------------------------------------------------------------------------------------------------------
*/
	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: LiveJobsFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('LiveJobsFactory', function($http) {
		return {
			// get all 'LIVE' jobs by ALL clients
			get: function() {
				return $http.get('/img_time/public/api/jobs-live');
				//return $http.get('/img_time/public/api/jobs-live/' + $routeParams.id);
			}
		};
	});


	services.factory('ShowStats', function($resource) {
		return $resource('/img_time/public/api/jobs-live/:month/:year', {}, {
			show: { method: 'GET', params: {month: '@month', year: '@year'} }
		});
	});


	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: ClientsFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('ClientsFactory', function($resource) {
		return $resource('/img_time/public/api/comments', {}, {
			show: { method: 'GET', isArray: true },
			create: { method: 'POST' }
		});
	});


	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: ClientFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('ClientFactory', function($resource) {
		return $resource('/img_time/public/api/comments/:id', {}, {
			show: { method: 'GET', isArray: false },
			update: { method: 'PUT', params: {id: '@id'} },
			delete: { method: 'DELETE', params: {id: '@id'} }
		});
	});


/*
|-----------------------------------------------------------------------------------------------------------------
| JOBS
|-----------------------------------------------------------------------------------------------------------------
*/
	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: JobsFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('JobsFactory', function($resource) {
		return $resource('/img_time/public/api/jobs/:id', {}, {
			show: { method: 'GET', isArray: true },
			create: { method: 'POST' },
			update: { method: 'PUT', params: {id: '@id'} },
			delete: { method: 'DELETE', params: {id: '@id'} }
		});
	});


	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: JobFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('JobFactory', function($resource) {
		return $resource('/img_time/public/api/jobs/:id/edit', {}, {
			show: { method: 'GET' },
		});
	});


/*
|-----------------------------------------------------------------------------------------------------------------
| ENTRYS
|-----------------------------------------------------------------------------------------------------------------
*/
	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: EntrysFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('EntrysFactory', function($resource) {
		return $resource('/img_time/public/api/entrys/:id', {}, {
			show: { method: 'GET', isArray: true },
			create: { method: 'POST' },
			update: { method: 'PUT', params: {id: '@id'} },
			delete: { method: 'DELETE', params: {id: '@id'} }
		});
	});


	/*
	|-----------------------------------------------------------------------------------------------------------------
	| FACTORY :: EntryFactory
	|-----------------------------------------------------------------------------------------------------------------
	*/
	services.factory('EntryFactory', function($resource) {
		return $resource('/img_time/public/api/entrys/:id/edit', {}, {
			show: { method: 'GET' },
		});
	});


/*
|-----------------------------------------------------------------------------------------------------------------
| GRAPHS
|-----------------------------------------------------------------------------------------------------------------
*/
	services.factory('GraphsFactory', function($resource) {
		return $resource('/img_time/public/api/graphs/:id/:year', {}, {
			show: { method: 'GET', params: {id: '@id', year: '@year'} }
			//show: { method: 'GET', params: {id: '@id'}, isArray: true }
		});
	});

