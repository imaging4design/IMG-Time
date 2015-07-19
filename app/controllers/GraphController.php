<?php

class GraphController extends \BaseController {


	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//return Response::json(array('success' => true));
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id, $year)
	{
		$the_year = $year;

		
		$time = DB::table('entries')
			->select('clients.clientName', 'clients.charge_rate', 'entries.minutes', 'entries.hours', 'jobs.date', DB::raw('sum(entries.hours) as totalHours, sum(entries.minutes) as totalMinutes, MONTH(jobs.date) as month, MONTHNAME(jobs.date) as monthname'))
			->join('jobs', 'entries.job_id', '=', 'jobs.id')
			->join('clients', 'jobs.client_id', '=', 'clients.id')
			->where('clients.id', '=', $id)
			->whereRaw('YEAR(jobs.date) = ?', array($the_year))
			->groupBy(DB::raw('MONTH(jobs.date)'))
			->orderBy('entries.date', 'ASC')
			->get();

			// !!!! IMPORTANT
			// we will have to loop through each month regardless of whether they hae time involved
			// other wise if the have one 'May' for example - this will end up in the 'JAN' month spot!!!

			$max = 0;
			$month_count = array();

			foreach ($time as $row)
			{
				$month = $row->month;
				$totalTime = ($row->totalHours + $row->totalMinutes);

				if ($month > $max)
				{
					$max = $month;
				}

				$month_count[$month] = $totalTime;
			}



			// Start the json data in the format Google Chart js/API expects to recieve it
			$graph->cols[]=array("id"=>"t", "label"=>"Mark", "type"=>"string");
			$graph->cols[]=array("id"=>"s", "label"=> "Total", "type"=>"number");



			// This to start the graph from the first month (i.e., Jan) even if the data only kicks in half way through the year
			for ($i = 1; $i <= $max; $i++)
			{
				$month = $i;
				$totalTime = 0;

				if (isset($month_count[$i]))
				{
					$totalTime = $month_count[$i];
				}

				switch ($month) {
					case 1:
					$monthname = 'Jan';
					break;
					case 2:
					$monthname = 'Feb';
					break;
					case 3:
					$monthname = 'Mar';
					break;
					case 4:
					$monthname = 'Apr';
					break;
					case 5:
					$monthname = 'May';
					break;
					case 6:
					$monthname = 'Jun';
					break;
					case 7:
					$monthname = 'Jul';
					break;
					case 8:
					$monthname = 'Aug';
					break;
					case 9:
					$monthname = 'Sep';
					break;
					case 10:
					$monthname = 'Oct';
					break;
					case 11:
					$monthname = 'Nov';
					break;
					case 12:
					$monthname = 'Dec';
					break;
				}

						
				// Calculate $revenue in $ and pass data to $graph->rows[] array / object
				$revenue = ($totalTime * $row->charge_rate);
				$graph->rows[] = array('c' => array(array('v' => $monthname), array('v' => $totalTime,"f"=> strval($totalTime) . 'hrs $' . strval($revenue) )));

						
				$array_month[] = $month;
				$array_totalTime[] = $totalTime;

			}

			// Json_encode the graph data so we can pass it through to the controller.js
			$graphData = json_encode($graph);

					

					// Remove this later if not working
					// if( $time ) {

					// 	// Start the json data in the format Google Chart js/API expects to recieve it
					// 	$graph->cols[]=array("id"=>"t", "label"=>"Mark", "type"=>"string");
					// 	$graph->cols[]=array("id"=>"s", "label"=>"Perf", "type"=>"number");

					// 	foreach( $time as $row ):

					// 		$totalTime = ($row->totalHours + $row->totalMinutes);
					// 		$revenue = ($totalTime * $row->charge_rate);

					// 		$graph->rows[] = array('c' => array(array('v' => $row->monthname), array('v' => $totalTime,"f"=> '$'.strval($revenue) )));

					// 	endforeach;

					// 	$test = json_encode($graph);

					// }

		

		return Response::json(array(
			'time' => $time,
			'month' => $array_month,
			'totalTime' => $array_totalTime,
			'year' => $year,
			'graphData' => $graphData
		));


	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		
	}

}