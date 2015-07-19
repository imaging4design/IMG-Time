var angular = angular;

var app = angular.module('myApp.controllersJobs', []);

// JOBS CONTROLLER

app.controller('LiveJobCtrl', ['$scope', '$rootScope', '$routeParams', '$location', 'LiveJobsFactory', 'ShowStats',
	function ($scope, $rootScope, $routeParams, $location, LiveJobsFactory, ShowStats) {

		//Format Date
		var d = new Date();
		$rootScope.todaysDate = d.toDateString();


		$scope.loading = true;

		// Set up the value options for the 'Months/Years' drop down menu for form
		/*****************************************************************************/
		$scope.monthOptions = [
			{label: "Month", value: "0"},
			{label: "Jan", value: "1"},
			{label: "Feb", value: "2"},
			{label: "Mar", value: "3"},
			{label: "Apr", value: "4"},
			{label: "May", value: "5"},
			{label: "Jun", value: "6"},
			{label: "Jul", value: "7"},
			{label: "Aug", value: "8"},
			{label: "Sep", value: "9"},
			{label: "Oct", value: "10"},
			{label: "Nov", value: "11"},
			{label: "Dec", value: "12"}
		];
		$scope.yearOptions = [
			{label: 'Year', value: "0"},
			{label: '2007', value: "2007"},
			{label: '2008', value: "2008"},
			{label: '2009', value: "2009"},
			{label: '2010', value: "2010"},
			{label: '2011', value: "2011"},
			{label: '2012', value: "2012"},
			{label: '2013', value: "2013"},
			{label: '2014', value: "2014"},
			{label: '2015', value: "2015"},
			{label: '2016', value: "2016"}
		];



		// Set defaults for initially selected
		/*****************************************************************************/
		$scope.job = {};
		$scope.job.months = new Date().getMonth()+1;
		$scope.job.years = new Date().getFullYear();

		
		// On page load execute ...
		/*****************************************************************************/
		ShowStats.get({month: $scope.job.months, year: $scope.job.years }).$promise.then(function (result) {
			//$scope.array = result;
			$scope.liveJobs = result.liveJobs; // data for each 'LIVE' job
			$scope.totalTime = result.totalTime; // total time for all 'LIVE' jobs this month
			$scope.totalRevenue = result.totalRevenue; // total time for all 'LIVE' jobs this month
			$scope.loading = false;


			$scope.numLiveJobs = $scope.liveJobs.length; // number of current live jobs

			if (result === '') {
				$scope.message = 'No Live Jobs';
			} else {
				$scope.message = '';
			}

		});


		// On form submit execute ...
		/*****************************************************************************/
		$scope.selectDate = function(dateRange) {
			
			// Get date from datePicker and split mm/yyyy into separate vars
			var splitDate = dateRange.split("/");
			$scope.month = splitDate[0];
			$scope.year = splitDate[1];


			// Inject 'month' and 'year' values
			ShowStats.get({month: $scope.month, year: $scope.year }).$promise.then(function(result) {

				$scope.liveJobs = result.liveJobs; // data for each 'LIVE' job
				$scope.totalTime = result.totalTime; // total time for all 'LIVE' jobs this month
				$scope.totalRevenue = result.totalRevenue; // total time for all 'LIVE' jobs this month
				$scope.graphData = result.graphData;
				$scope.graphMonth = result.graphMonth;
				$scope.loading = false;

				//console.log($scope.graphData);

				$scope.numLiveJobs = $scope.liveJobs.length; // number of current live jobs

				if (result === '') {
					$scope.message = 'No Live Jobs';
				} else {
					$scope.message = '';
				}

				//Convert $scope.graphMonth to text label name
				var month = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
				$scope.myMonth = month[$scope.graphMonth-1];//Will give you the desired month


				// Display Google Graph
				/*****************************************************************************/
				$scope.chartObject = {};


				// Get Graph Data from JobController.php (livejobs)
				$scope.chartObject.data = $scope.graphData;

				// Chart Colour
				// var chartColor = '#F8654F';
				var chartColor = '#E1295F';

				$scope.chartObject.type = 'ColumnChart'; // ( Can be 'LineChart', 'BarChart' or 'AreaChart' )
				$scope.chartObject.options = {
					//'title': $scope.stats.genderLabel + 's ' + $scope.eventLabel + ': Rank ' + $scope.stats.rank,
					'title': $scope.myMonth + ' - Yearly History',
					'width': '100%',
					pointSize: 10,
					colors: [chartColor],
					fontSize: 16,
					fontName: 'Raleway',
					color: '#333',
					//lineDashStyle: [5, 5],
					lineWidth: 1,
					gridlineColor: '#DDD',
					baselineColor: '#DDD',
					backgroundColor: { fill: 'none' },
					viewWindowMode: 'pretty',
					pieHole: 0.4,
					curveType: 'function',


					chartArea:{
						left:80,
						top:100,
						width:"75%",
					},

					titleTextStyle: {
						fontSize: 24,
						color: '#333333',
					},

					legend: {
						'textStyle': {'color': '#333333'}
					},

					vAxis:{
						textStyle: {
							color: '#BBB'
						}
					},

					hAxis:{
						textStyle: {
							color: '#BBB'
						}
					}

				}; // ENDS $scope.chartObject.options

			});


		}; // ENDS $scope.selectDate


	
		
}]); // ENDS Controller :: LiveJobCtrl








/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: JobListCtrl 
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('JobListCtrl', ['$scope', '$routeParams', 'JobsFactory', 'ClientFactory', 'GraphsFactory', '$location',
	function ($scope, $routeParams, JobsFactory, ClientFactory, GraphsFactory, $location) {

		$scope.loading = true;

		// This will get JSON obj info about the current client
		/*****************************************************************************/
		$scope.client = ClientFactory.show({id: $routeParams.id});


		// $SCOPE DATA available through this controller
		/*****************************************************************************/
		$scope.jobs = JobsFactory.show({id: $routeParams.id});
		$scope.jobs.$promise.then(function (result) {
			$scope.jobs = result;
			$scope.job.id= $routeParams.id; // Used to set the current client_id
			$scope.loading = false;
		});


		// Set up the value options for the 'Hours/minutes' drop down menu for form
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
		$scope.job = {};
		$scope.job.hours = $scope.hourOptions[0].value;
		$scope.job.minutes = $scope.minuteOptions[0].value;



		// FUNCTION :: Add hours and mins together
		/*****************************************************************************/
		$scope.addNums = function( hours, minutes )
		{
			$scope.result = hours -= -minutes;
			return $scope.result;
		};


		// FUNCTION :: Job Status
		/*****************************************************************************/
		$scope.status = function( closed )
		{
			if(closed === '1') {
				$scope.closed = 'closed';
			}
			else {
				$scope.closed = 'open';
			}
			return $scope.closed;
		};


		// FUNCTION :: Callback for ng-click 'editJOB':
		/*****************************************************************************/
		$scope.editJob = function (jobId) {
			$location.path('/jobs-detail/' + jobId + '/edit/' + $routeParams.id);
		};


		// FUNCTION :: Callback for ng-click 'deleteJob':
		/*****************************************************************************/
		$scope.deleteJob = function (job) {
			
			var jobId = job.id;

			$scope.loading = true; // Start loading spinner
			JobsFactory.delete({ id: jobId }).$promise.then(function(){
				
				// remove from local array
				var index = $scope.jobs.indexOf(job);
				$scope.jobs.splice(index,1);
				
				//$scope.jobs = JobsFactory.show({id: $routeParams.id});
				$scope.loading = false; // Stop loading spinner
			});
		};


		// FUNCTION :: Callback for ng-click 'createNewJob':
		/*****************************************************************************/
		$scope.createNewJob = function () {

			$scope.loading = true; // Start loading spinner
			$scope.date = new Date();
			JobsFactory.create($scope.job).$promise.then(function(data){
				
				// Get the newley set ID from the JobController.php
				//console.log(data.insertId);
				
				$scope.jobs.unshift({
					id: data.insertId,
					date: $scope.date,
					jobdescription: $scope.job.jobdescription,
					hours: $scope.job.hours,
					minutes: $scope.job.minutes,
					misc_costs: $scope.job.misc_costs
				});
				
				
				//$scope.jobs = JobsFactory.show({id: $routeParams.id});
				$scope.loading = false; // Stop loading spinner

				// Clear and reset the form
				$scope.jobForm.$setPristine();
				$scope.job.jobdescription = '';
				$scope.job.hours = $scope.hourOptions[0].value;
				$scope.job.minutes = $scope.minuteOptions[0].value;
			});
		};




		/*****************************************************************************/
		// DISPLAY GRAPH
		/*****************************************************************************/
		$scope.showGraph = function(clientId, theYear, chartType) {

			$scope.loading = true; // Start loading spinner

			$scope.clientId = (clientId) ? clientId : $routeParams.id; // Gets/Sets the 'Client ID'
			$scope.theYear = (theYear) ? theYear : 2014; // Gets/Sets the 'Year'
			$scope.chartType = (chartType) ? chartType : 'LineChart'; // Gets/Sets the 'Chart Type'

			//console.log($scope.theYear);
			

			GraphsFactory.show({ id: $scope.clientId, year: $scope.theYear }).$promise.then(function(result) {



				$scope.data = result;
				$scope.errorMessage = false;
				$scope.performance = [];
				$scope.charge_rate = $scope.data.time[0].charge_rate; // Get the client 'Charge Rate'


				$scope.graphData = result.graphData;
				//console.log($scope.graphData);

				//var count = result.length; // Get total number of results returned and use them as 'count var'
				var count = 12;


				for (var x = 0; x <= count-1; x++) {


					$scope.performance[x] = parseFloat($scope.data.totalTime[x]);
					

				}

				$scope.loading = false;

				/*
				|-----------------------------------------------------------------------------------------------------------------
				|
				| START GOOGLE CHARTS
				|
				|-----------------------------------------------------------------------------------------------------------------
				*/

				$scope.chartObject = {};

					
					// Get Graph Data from GraphController.php (graphData)
					$scope.chartObject.data = $scope.graphData;


					// Chart Colour
					// var chartColor = '#F8654F';
					var chartColor = '#E1295F';


					$scope.chartObject.type = $scope.chartType; // ( Can be 'LineChart', 'BarChart' or 'AreaChart' )
					$scope.chartObject.options = {
						//'title': $scope.stats.genderLabel + 's ' + $scope.eventLabel + ': Rank ' + $scope.stats.rank,
						'title': 'Year: ' + $scope.data.year,
						'width': '100%',
						pointSize: 10,
						colors: [chartColor],
						fontSize: 16,
						fontName: 'Raleway',
						color: '#333',
						//lineDashStyle: [5, 5],
						lineWidth: 1,
						gridlineColor: '#DDD',
						baselineColor: '#DDD',
						backgroundColor: { fill: 'none' },
						viewWindowMode: 'pretty',
						pieHole: 0.4,
						curveType: 'function',


						chartArea:{
							left:80,
							top:100,
							width:"75%",
						},

						titleTextStyle: {
							fontSize: 24,
							color: '#333333',
						},

						legend: {
							'textStyle': {'color': '#333333'}
						},
						vAxis:{
							textStyle: {
								color: '#BBB'
							}
						},
						hAxis:{
							textStyle: {
								color: '#BBB'
							}
						}


					}; // ENDS $scope.chartObject.options

			}, function(error) {

				$scope.error = error;
				$scope.loading = false;
				$scope.errorMessage = 'big fat nothing!' ;

			}); // ENDS GraphsFactory.show()

		}; // ENDS $scope.showGraph()


}]); // ENDS Controller :: JobListCtrl





/*
|-----------------------------------------------------------------------------------------------------------------
| NAME :: JobsDetailCtrl 
|-----------------------------------------------------------------------------------------------------------------
*/
app.controller('JobsDetailCtrl', ['$scope', '$routeParams', 'JobFactory', 'JobsFactory', '$location',
	function ($scope, $routeParams, JobFactory, JobsFactory, $location) {

		// Use $promise to ensure page is refreshed with data
		/*****************************************************************************/
		$scope.jobs = JobFactory.show({id: $routeParams.id});
		$scope.jobs.$promise.then(function (result) {
			$scope.jobs = result;
		});


		// FUNCTION :: Callback for ng-click updateJob()'
		/*****************************************************************************/
		$scope.updateJob = function () {

			$scope.loading = true; // Start loading spinner
			JobsFactory.update($scope.jobs).$promise.then(function(){
				$scope.jobs = JobsFactory.show({id: $routeParams.id});
				$location.path('/jobs-list/' + $routeParams.item);
				$scope.loading = false; // Stop loading spinner
			});
		};

		// FUNCTION :: Callback for ng-click 'cancel':
		/*****************************************************************************/
		$scope.cancel = function () {
			$location.path('/jobs-list/' + $routeParams.item);
		};


		// Set up the value options for the 'Hours/Minutes/Closed' drop down menu for form
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
		$scope.jobStatusOptions = [
			{label: 'Open', value: "0"},
			{label: 'Closed', value: "1"},
		];


		


}]); // ENDS Controller :: JobsDetailCtrl

