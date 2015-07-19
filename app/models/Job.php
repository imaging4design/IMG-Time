<?php

class Job extends Eloquent {

	// Let Eloquent know the following attributes will be available for mass assignment
	protected $fillable = array( 'client_id', 'date', 'jobdescription', 'hours', 'minutes', 'closed' );

	public $timestamps = false;

	// Relationships
	public function client() {
		return $this->belongsTo('Client');
	}

	public function entrys()
	{
		return $this->hasMany('Entry');
	}





		// protected static function boot() {
		// 	parent::boot();
		// 	static::deleting(function($tutorial) { // called BEFORE delete()
		// 		$tutorial->entrys()->delete();
		// 	});
		// }

		protected static function boot() {

			parent::boot();

			static::deleting(function($job) { // called BEFORE delete()

				foreach($job->entrys as $entry)
				{
					$entry->delete(); // Causes any child "deleted" events to be called
				}
			});
		}


}