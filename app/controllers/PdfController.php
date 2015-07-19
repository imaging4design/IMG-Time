<?php

class PdfController extends \BaseController {

	public function __construct() {
		// $this->beforeFilter('serviceAuth');
		// $this->beforeFilter('serviceCSRF');
		// $this->beforeFilter('auth', array('except' => 'index'));
		// Session::flush();
	}


	/*
	|-----------------------------------------------------------------------------------------------------------------
	| Bulid Table Function()
	|-----------------------------------------------------------------------------------------------------------------
	*/
	function BuildTable($header, $data) {

		//Colours, line width and bold font
		Fpdf::SetFont('Calibri', 'B', 8);
		Fpdf::SetFillColor(245, 245, 245);
		Fpdf::SetTextColor(0, 0, 0);
		Fpdf::SetDrawColor(255, 255, 255);
		Fpdf::SetLineWidth(.1);
		
		//Header
		//Make an array for the column widths
		$w = array(20, 140, 15, 15);
		//send the headers to the pdf document
		for($i=0; $i<count($header); $i++):
		
			//Set alignment to left except right column
			$align = 'L';
			
			if($i==2 or $i==3) { $align = 'R'; } // Right align Time and Costs
		
		Fpdf::Cell($w[$i], 6, $header[$i], 1, 0, $align, 1);
		
		endfor;
				
				
		Fpdf::Ln();
		
		//Color and font restoration
		Fpdf::SetFont('Calibri', '', 8);
		Fpdf::SetFillColor(245, 245, 245);
		Fpdf::SetTextColor(0);

		//now spool out the data from the $data array
		$fill = 0; //used to alternate row color backgrounds
		
		foreach($data as $row):

			Fpdf::Cell($w[0], 6, $row[0], 'LRTB', 0, 'L', $fill); // Date
			Fpdf::Cell($w[1], 6, $row[1], 'LRTB', 0, 'L', $fill); // Description
			Fpdf::Cell($w[2], 6, $row[2], 'LRTB', 0, 'R', $fill); // Time (Hours/Mins)
			Fpdf::Cell($w[3], 6, $row[3], 'LRTB', 0, 'R', $fill); // Costs

			Fpdf::Ln();
			$fill =! $fill;
				
		endforeach;

	} // ENDS BuildTable()



	/*
	|-----------------------------------------------------------------------------------------------------------------
	| Page Footer Function()
	|-----------------------------------------------------------------------------------------------------------------
	*/
	function pageFooter() {

		Fpdf::SetLineWidth(.075);
		Fpdf::SetDrawColor(200, 200, 200);
		Fpdf::SetFillColor(200, 200, 200);
		Fpdf::Line(10, 265, 200, 265);
		
		Fpdf::SetDrawColor(255, 255, 255);

		
		Fpdf::SetY(265);
		Fpdf::Cell(0, 10, 'Hours: ' . number_format($this->total_time, 2, '.', ''), 0, 0, 'R');

		Fpdf::SetY(269);
		Fpdf::Cell(0, 10, 'Misc Costs: $' . number_format($this->total_costs, 2, '.', ''), 0, 0, 'R');

		Fpdf::SetY(273);
		Fpdf::Cell(0, 10, 'Sub Total: $' . $this->final_formatted_total, 0, 0, 'R');
		
		Fpdf::SetY(277);
		Fpdf::Cell(0, 10, 'GST: $' . $this->gst_total, 0, 0, 'R');

		Fpdf::SetY(281);
		Fpdf::SetFont('Calibri', 'B', 8);
		Fpdf::Cell(0, 10, 'Total: $' . $this->grand_total, 0, 0, 'R');


	}  // ENDS pageFooter()




	/*
	|-----------------------------------------------------------------------------------------------------------------
	| Main Index Function()
	|-----------------------------------------------------------------------------------------------------------------
	*/
	public function index($id)
	{

		//$pdfs = Entry::where('job_id', '=', $id)->get();
		$pdfs = Entry::where('job_id', '=', $id)->orderBy('jobdescription', 'ASC')-> orderBy('date', 'DESC')->get(); // Query for ALL entries
		$client = Entry::with('job.client')->where('job_id', '=', $id)->first(); // Query for Client Name


		
		Fpdf::AddPage('P', 'A4');
		Fpdf::SetAutoPageBreak('auto', '5');
		Fpdf::SetFont('Calibri', 'B', 12);
		Fpdf::Write(5.5, $client->job->client->clientName); // Print Client Name
		Fpdf::Ln(5);

		Fpdf::SetFont('Calibri', '', 12);
		Fpdf::Write(5.5, 'Job: (' . $client->job->id . ') ' . $client->job->jobdescription); // Print Client Name
		Fpdf::Ln(10);
		
		// Initialise these vars
		$this->data = false; 
		$this->total_time = false;
		$this->total_costs = false;


		// Filename of the pdf - see Fpdf::Output($this->filename.'.pdf', 'D'); at bottom of page
		$this->filename = str_replace(' ', '_', $client->job->client->clientName) . '_'.$client->job->id;


		foreach ($pdfs as $row) {

			$date = new DateTime($row->date); // Convert MySql date into Human date
			$date = $date->format('d M Y');
			
			$description = $row->jobdescription;
			$hours = $row->hours;
			$minutes = $row->minutes;
			$time = number_format($hours + $minutes, 2, '.', '') . ' hrs '; // Gets total hours / mins as time per entry
				$this->total_time += $time; // Gets total time for ALL entrys added together!
			
			$costs = number_format($row->misc_costs, 2, '.', ''); // Gets misc_costs per entry
				$this->total_costs += $costs;

			$this->data[] = array($date, $description, $time, $costs, $this->total_time);

		}


		// Get total 'Billable' rate (Charge Out Rate x Total Time)
		$this->rate = ($client->job->client->charge_rate * $this->total_time) + $this->total_costs;
		// Get the GST amount
		$this->gst_total = number_format($this->rate * 0.15, 2, '.', '');
		// Format the 'Billable' rate nice and pretty
		$this->final_formatted_total = number_format($this->rate, 2, '.', '');
		// Get the FULL TOTAL - (Sub Total + GST)
		$this->grand_total = number_format($this->rate + $this->gst_total, 2, '.', '');

		
		// Complie the PDF $header and $table prior to sending to outputPDF()!
		$header = array('Date', 'Description', 'Time', 'Costs'); // Output Header
		$table = $this->BuildTable($header, $this->data); // Output Table data
		$this->pageFooter(); // Output Footer data

		
		// Call the outputPDF function to execute the PDF
		$this->outputPDF();

	}  // ENDS index()



	/*
	|-----------------------------------------------------------------------------------------------------------------
	| Output PDF Function()
	|-----------------------------------------------------------------------------------------------------------------
	*/
	public function outputPDF() {

		//Fpdf::Output($this->filename.'.pdf', 'D'); // Download to folder
		Fpdf::Output($this->filename.'.pdf', 'I'); // Output to screen
		exit;

	}  // ENDS outputPDF()

	

}