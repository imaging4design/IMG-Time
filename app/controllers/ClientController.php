<?php

class ClientController extends \BaseController {

	public function __construct() {
		// $this->beforeFilter('serviceAuth');
		// $this->beforeFilter('serviceCSRF');
		// $this->beforeFilter('auth', array('except' => 'index'));
		// Session::flush();
	}

	/**
	 * Display a listing of the resource.
	 *
	 * @return Response
	 */
	public function index()
	{
		$clients = Client::orderBy('clientName', 'ASC')->get();
		return Response::json($clients);
	}

	/**
	 * Store a newly created resource in storage.
	 *
	 * @return Response
	 */
	public function store()
	{
		Client::create( array(
			'clientName' => Input::get('clientName'),
			'clientEmail' => Input::get('clientEmail'),
			'address01' => Input::get('address01'),
			'address02' => Input::get('address02'),
			'address03' => Input::get('address03'),
			'address04' => Input::get('address04'),
			'charge_rate' => Input::get('charge_rate')
		));

		return Response::json(array('success' => true));
	}

	/**
	 * Display the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function show($id)
	{
		$clients = Client::find($id);
		return Response::json($clients);
	}

	/**
	 * Show the form for editing the specified resource.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function edit($id)
	{
		//$client = Client::find($id);
		//return Response::json($client;
		//return $client;
	}

	/**
	 * Update the specified resource in storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function update($id)
	{
		$client = Client::find($id);
		$input = Input::json()->all();

		$client->clientName = $input['clientName'];
		$client->clientEmail = $input['clientEmail'];
		$client->address01 = $input['address01'];
		$client->address02 = $input['address02'];
		$client->address03 = $input['address03'];
		$client->address04 = $input['address04'];
		$client->charge_rate = $input['charge_rate'];

		$client->save();
	}

	/**
	 * Remove the specified resource from storage.
	 *
	 * @param  int  $id
	 * @return Response
	 */
	public function destroy($id)
	{
		Client::destroy($id);
		return Response::json(array( 'success' => true));
	}

}