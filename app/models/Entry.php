<?php

class Entry extends Eloquent {

	// Let Eloquent know the following attributes will be available for mass assignment
	protected $fillable = array( 'job_id', 'jobdescription', 'misc_costs', 'hours', 'minutes', 'date' );

	public $timestamps = false;

	// Relationships
	public function job() {
		return $this->belongsTo('Job');
	}

}