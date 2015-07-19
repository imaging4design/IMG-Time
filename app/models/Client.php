<?php

class Client extends Eloquent {

	// Let Eloquent know the following attributes will be available for mass assignment
	protected $fillable = array( 'clientName', 'clientEmail', 'address01', 'address02', 'address03', 'address04', 'charge_rate' );

	public $timestamps = false;

	// Relationships
	public function jobs() {
		return $this->hasMany('Job');
	}

	public function entry() {
		return $this->hasManyThrough('Entry', 'Job', 'client_id', 'job_id');

		//return $this->hasManyThrough('Job', 'Entry', 'job_id', 'client_id');
	}

}

