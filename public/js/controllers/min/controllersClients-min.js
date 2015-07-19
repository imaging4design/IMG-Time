var angular=angular,app=angular.module("myApp.controllersClients",[]);app.controller("LoginCtrl",["$rootScope","$scope","$location","AuthenticationService",function(n,t,e,i){t.login=function(){i.login(t.credentials).success(function(){e.path("/jobs-live")})}}]),app.controller("menuCtrl",["$scope","$location",function(n,t){n.menuItems=[{name:"Live Jobs",url:"/jobs-live",icon:'<i class="fa fa-paper-plane"></i> '},{name:"Client List",url:"/client-list",icon:'<i class="fa fa-user"></i> '},{name:"Add Client",url:"/client-creation",icon:'<i class="fa fa-male"></i> '}],n.isActive=function(n){return n.url===t.path()?!0:!1}}]),app.controller("ClientListCtrl",["$scope","$rootScope","ClientsFactory","ClientFactory","$location",function(n,t,e,i,l){n.loading=!0,n.editClient=function(n){l.path("/client-detail/"+n)},n.deleteClient=function(t){i.delete({id:t}),e.show().$promise.then(function(){n.clients=e.show()})},n.showCreateClientForm=function(){l.path("/client-creation")},n.clients=e.show(),n.clients.$promise.then(function(t){n.clients=t,n.loading=!1,n.numClients=n.clients.length})}]),app.controller("ClientDetailCtrl",["$scope","$routeParams","ClientFactory","$location",function(n,t,e,i){n.client=e.show({id:t.id}),n.updateClient=function(){n.loading=!0,e.update(n.client).$promise.then(function(){i.path("/client-list/"),n.loading=!1})},n.cancel=function(){i.path("/client-list")}}]),app.controller("ClientCreationCtrl",["$scope","ClientsFactory","$location",function(n,t,e){n.createNewClient=function(){t.create(n.client),e.path("/client-list")}}]);