<?php

class UserTableSeeder extends Seeder {

	public function run()
	{
		$users =[
			'email' => 'gavin@imaging4design.co.nz',
			'password' => Hash::make('123456'),
			'created_at' => date('Y-m-d H:i:s'),
			'updated_at' => date('Y-m-d H:i:s')
		];

		DB::table('users')->insert($users);

	}

}