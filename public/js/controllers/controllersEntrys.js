var angular = angular;

var app = angular.module('myApp.controllersEntrys', []);

// ENTRYS CONTROLLER

/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: EntryListCtrl 
| Methods :: Show Entrys
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('EntryListCtrl', ['$scope', '$routeParams', 'EntrysFactory', 'JobFactory', '$location',
	function ($scope, $routeParams, EntrysFactory, JobFactory, $location) {

		$scope.loading = true;

		// This will get the current 'job_id' so we can insert it into the form
		/*****************************************************************************/
		$scope.job = JobFactory.show({id: $routeParams.id});

		$scope.entrys = EntrysFactory.show({id: $routeParams.id});
		$scope.entrys.$promise.then(function(result){
			$scope.entrys = result;
			$scope.entry.id= $routeParams.id; // Used to set the current job ID
			$scope.loading = false;
		});

		//Set up the value options for the 'Hours/minutes' drop down menu for form
		/*****************************************************************************/
		$scope.hourOptions = [
			{label: "Hours", value: "0.00"},
			{label: "1.00", value: "1.00"},
			{label: "2.00", value: "2.00"},
			{label: "3.00", value: "3.00"},
			{label: "4.00", value: "4.00"},
			{label: "5.00", value: "5.00"},
			{label: "6.00", value: "6.00"},
			{label: "7.00", value: "7.00"},
			{label: "8.00", value: "8.00"}
		];
		$scope.minuteOptions = [
			{label: 'Minutes', value: "0.00"},
			{label: '0.25', value: "0.25"},
			{label: '0.50', value: "0.50"},
			{label: '0.75', value: "0.75"}
		];

		// Set defaults for initially selected
		/*****************************************************************************/
		$scope.entry = {};
		$scope.entry.hours = $scope.hourOptions[0].value;
		$scope.entry.minutes = $scope.minuteOptions[0].value;
		$scope.entry.misc_costs = '0.00';




		// Add hours and mins together
		/*****************************************************************************/
		$scope.addNums = function( hours, minutes )
		{
			$scope.result = hours -= -minutes;
			return $scope.result;
		};

		// callback for ng-click 'editEntry':
		/*****************************************************************************/
		$scope.editEntry = function (entryId) {
			$location.path('/entrys-detail/' + entryId + '/edit/' + $routeParams.id);
		};

		// Callback for ng-click 'deleteJob':
		/*****************************************************************************/
		$scope.deleteJob = function (entry) {
			
			var entryId = entry.id;
			
			$scope.loading = true; // Start loading spinner
			EntrysFactory.delete({ id: entryId }).$promise.then(function(){ // Delete the Entry
				
				//$scope.entrys = EntrysFactory.show({id: $routeParams.id});
				
				// remove from local array
				var index = $scope.entrys.indexOf(entry);
				$scope.entrys.splice(index,1);
				
				$scope.loading = false; // Stop loading spinner
			});
			
			
			

		};


		

		// Callback for ng-click 'createNewEntry':
		/*****************************************************************************/
		$scope.createNewEntry = function () {

			$scope.loading = true; // Start loading spinner
			$scope.date = new Date();
			EntrysFactory.create($scope.entry).$promise.then(function(data){
				
				// Get the newley set ID from the EntryController.php
				// console.log(data.insertId);
				
				$scope.entrys.unshift({
					id: data.insertId,
					date: $scope.date,
					jobdescription: $scope.entry.jobdescription,
					hours: $scope.entry.hours,
					minutes: $scope.entry.minutes,
					misc_costs: $scope.entry.misc_costs
				});
								
				
				//$scope.entrys = EntrysFactory.show({id: $routeParams.id});
				$scope.loading = false; // Stop loading spinner

				// Clear and reset the form
				$scope.entryForm.$setPristine();
				$scope.entry.jobdescription = '';
				$scope.entry.hours = $scope.hourOptions[0].value;
				$scope.entry.minutes = $scope.minuteOptions[0].value;
				$scope.entry.misc_costs = '0.00';

			});
		};


}]);



app.controller('EntrysDetailCtrl', ['$scope', '$routeParams', 'EntryFactory', 'EntrysFactory', '$location',
	function ($scope, $routeParams, EntryFactory, EntrysFactory, $location) {

		// Populate 'Edit Entry form' with existing data!
		/*****************************************************************************/
		EntrysFactory.show().$promise.then(function(){
			$scope.entrys = EntryFactory.show({id: $routeParams.id});
		});

		// Callback for ng-click 'updateEntry':
		/*****************************************************************************/
		$scope.updateEntry = function () {

			$scope.loading = true; // Start loading spinner
			EntrysFactory.update($scope.entrys).$promise.then(function(){
				$scope.entrys = EntrysFactory.show({id: $routeParams.id});
				$location.path('/entrys-list/' + $routeParams.item);
				$scope.loading = false; // Stop loading spinner
			});
		};


		// Callback for ng-click 'cancel':
		/*****************************************************************************/
		$scope.cancel = function () {
			$location.path('/entrys-list/' + $routeParams.item);
		};

		$scope.hourOptions = [
			{label: "Hours", value: "0.00"},
			{label: "1.00", value: "1.00"},
			{label: "2.00", value: "2.00"},
			{label: "3.00", value: "3.00"},
			{label: "4.00", value: "4.00"},
			{label: "5.00", value: "5.00"},
			{label: "6.00", value: "6.00"},
			{label: "7.00", value: "7.00"},
			{label: "8.00", value: "8.00"}
		];
		$scope.minuteOptions = [
			{label: 'Minutes', value: "0.00"},
			{label: '0.25', value: "0.25"},
			{label: '0.50', value: "0.50"},
			{label: '0.75', value: "0.75"}
		];

}]);






