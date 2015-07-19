<?php

class JobController extends \BaseController {


	public function livejobs($month, $year)
	{
		//return Response::json(array('success' => true));

		// Set some date defaults
		$month = ( $month ) ? $month : date('m');
		$year = ( $year ) ? $year : date('Y');


		$time = DB::table('entries')
			->select('entries.minutes', 'entries.hours', 'clients.charge_rate', DB::raw('SUM(entries.hours + entries.minutes) as totalHours'))
			->join('jobs', 'entries.job_id', '=', 'jobs.id')
			->join('clients', 'jobs.client_id', '=', 'clients.id')
			->where(DB::raw('MONTH(entries.date)'), '=', $month) // This month
			->where(DB::raw('YEAR(entries.date)'), '=', $year) // This year
			->get();


		$revenue = DB::table('entries')
			->select('entries.minutes', 'entries.hours', 'clients.charge_rate', 'entries.date', DB::raw('MONTH(entries.date) as graphMonth, YEAR(entries.date) as graphYear'))
			->join('jobs', 'entries.job_id', '=', 'jobs.id')
			->join('clients', 'jobs.client_id', '=', 'clients.id')
			->where(DB::raw('MONTH(entries.date)'), '=', $month) // This month
			->where(DB::raw('YEAR(entries.date)'), '=', $year) // This year
			->orderBy(DB::raw('YEAR(entries.date)'))
			->get();


		// Get Sum of ALL hours/minutes for selected 'month' of each year for Graph
		$monthYearGraph = DB::table('entries')
			->select('clients.charge_rate', 'entries.date', DB::raw('MONTH(entries.date) as graphMonth, YEAR(entries.date) as graphYear, SUM(entries.hours + entries.minutes) as totalHours, SUM((entries.hours + entries.minutes) * clients.charge_rate) as totalRev'))
			->join('jobs', 'entries.job_id', '=', 'jobs.id')
			->join('clients', 'jobs.client_id', '=', 'clients.id')
			->where(DB::raw('MONTH(entries.date)'), '=', $month) // This month
			->groupBy(DB::raw('YEAR(entries.date)'))
			->orderBy(DB::raw('YEAR(entries.date)'))
			->get();

	

		// Start the json data in the format Google Chart js/API expects to recieve it
		$graph->cols[]=array("id"=>"t", "label"=>"Mark", "type"=>"string");
		$graph->cols[]=array("id"=>"s", "label"=> "Total", "type"=>"number");


		// Loop through each 'Month & Hours/Minutes' and assign to $graph->rows[]
		foreach ($monthYearGraph as $row) {
			$graphHours = $row->totalHours;
			$graphRevenue = number_format($row->totalRev, 2, '.', '');
			$graphMonth = $row->graphMonth;
			$graphYear = $row->graphYear;

			// Inject data into $graph->rows[]
			$graph->rows[] = array('c' => array(array('v' => $graphYear), array('v' => $graphHours,"f"=> strval($graphHours) . 'hrs $' . strval($graphRevenue) )));
		}


	
		// Get total time of all jobs for the month
		foreach($time as $row) {
			$totalTime = $row->totalHours;
		}
		
		
		// Get total Revenue for the month
		$totalRevenue= NULL;
		foreach($revenue as $row) {
			$total = ($row->hours + $row->minutes) * $row->charge_rate;
			$totalRevenue = $totalRevenue + $total;
		}

	
		$liveJobs = Job::with('client', 'entrys')
			->where(DB::raw('MONTH(jobs.date)'), '=', $month)
			->where(DB::raw('YEAR(jobs.date)'), '=', $year)
			//->where('closed', '=', 0)
			->get();

		
		// Json_encode the graph data so we can pass it through to the controller.js
		$graphData = json_encode($graph);


		return Response::json(array(
			'liveJobs' => $liveJobs,
			'totalTime' => $totalTime,
			'totalRevenue' => $totalRevenue,
			'graphHours' => $graphHours,
			'graphRevenue' => $graphRevenue,
			'graphMonth' => $graphMonth,
			'graphData' => $graphData
		));

	}





	

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$jobs = Job::get();
		return Response::json($jobs);
	
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$create_job = Job::create( array(
			'client_id' => Input::get('id'),
			'date' => date('Y-m-d'),
			'jobdescription' => Input::get('jobdescription'),
			'hours' => Input::get('hours'),
			'minutes' => Input::get('minutes'),
			'closed' => 0
		));
		
		// Newly created ID from this job
		$insertId = $create_job->id;

		return Response::json(array(
			'insertId' => $insertId,
			'success' => true
		));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$jobs = Job::where('client_id', '=', $id)->orderBy('id', 'DESC')->get();
		return Response::json($jobs);

		//$users = User::where('status', '=', 'active')->where('email', '=', $email)->get(); 
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		$job = Job::with('client')->find($id);
		return Response::json($job);
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$job = Job::find($id);
		$input = Input::json()->all();

		$job->client_id = $input['client_id'];
		$job->date = $input['date'];
		$job->jobdescription = $input['jobdescription'];
		$job->hours = $input['hours'];
		$job->minutes = $input['minutes'];
		$job->closed = $input['closed'];

		$job->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Job::destroy($id);
		return Response::json(array( 'success' => true));
	}

}