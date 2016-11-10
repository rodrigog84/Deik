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
			$this->load->model('facturaelectronica');
			$codproceso = $this->facturaelectronica->guarda_csv($archivo);
			$this->facturaelectronica->crea_dte_csv($codproceso);


	}


	public function genera_cuentas_corrientes(){


			/*


truncate cartola_cuenta_corriente;
truncate cuenta_corriente;
truncate detalle_cuenta_corriente;
truncate detalle_mov_cuenta_corriente;
truncate movimiento_cuenta_corriente;

##SUMAR FACTURAS SEGÚN PREVENTAS
##SUMAR NOTAS DE DEBITO
#DESCONTAR SEGÚN RECAUDACIONES
#DESCONTAR SEGÚN NOTAS DE CRÉDITO



				NECESITO:

				$idcliente
				$ftotal: totalfactura
				$fechafactura: fecha
				$tipodocumento : 
				$numfactura
				$fechavenc: fecha_venc


			*/


	}	


}









