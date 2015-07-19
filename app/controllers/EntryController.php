<?php

class EntryController extends \BaseController {

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		//$entrys = Entry::take(3)->get();
		//return Response::json($entrys);
	
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		$create_entry = Entry::create( array(
			'job_id' => Input::get('id'),
			'jobdescription' => Input::get('jobdescription'),
			'misc_costs' => Input::get('misc_costs'),
			'hours' => Input::get('hours'),
			'minutes' => Input::get('minutes'),
			'date' => date('Y-m-d')
		));
		
		// Newly created ID from this entry
		$insertId = $create_entry->id;
		
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
		$entrys = Entry::where('job_id', '=', $id)->orderBy('id', 'ASC')->get();
		return Response::json($entrys);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//$entry = Entry::find($id);
		//return Response::json(Entry::get());
		//return $entry;

		$entry = Entry::find($id);
		return Response::json($entry);

	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$entry = Entry::find($id);
		$input = Input::json()->all();

		$entry->job_id = $input['job_id'];
		$entry->jobdescription = $input['jobdescription'];
		$entry->misc_costs = $input['misc_costs'];
		$entry->hours = $input['hours'];
		$entry->minutes = $input['minutes'];
		$entry->date = $input['date'];

		$entry->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Entry::destroy($id);
		return Response::json(array( 'success' => true));
	}

}