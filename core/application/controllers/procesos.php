<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Procesos extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}


	public function lectura_csv_fe(){

		 	$archivo = "./facturacion_electronica/csv/facturas.csv";
		 	/*if(file_exists($archivo)){
		 		$content_csv = file_get_contents($archivo);
		 	}else{
		 		$content_csv = $factura->dte;
		 	}*/

			$this->load->model('facturaelectronica');
			$this->facturaelectronica->guarda_csv($archivo);
			$this->facturaelectronica->crea_dte_csv();


	}


}









