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


		##SUMAR FACTURAS SEGÚN PREVENTAS
		$this->db->select('fc.id, fc.id_cliente, fc.totalfactura, fc.fecha_factura, fc.tipo_documento, fc.num_factura, fc.fecha_venc')
		  ->from('factura_clientes fc')
		  ->where('fc.tipo_documento in (2,101)');
		$query = $this->db->get();
		$facturas = $query->result();
		foreach ($facturas as $factura) {

			 $tipodocumento = $factura->tipo_documento;
			 $idcliente = $factura->id_cliente;
			 $fechafactura = $factura->fecha_factura;
			 $numfactura = $factura->num_factura;
			 $fechavenc = $factura->fecha_venc;
			 $ftotal = $factura->totalfactura;

			 $nombre_cuenta = $tipodocumento == 2 ? "BOLETAS POR COBRAR" : "FACTURAS POR COBRAR";
			 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = '" . $nombre_cuenta . "'");
			 $row = $query->result();
			 $row = $row[0];
			 $idcuentacontable = $row->idcuentacontable;	


				// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
			 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
			 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
	    	 $row = $query->result();
		
			if ($query->num_rows()==0){	
				$cuenta_corriente = array(
			        'idcliente' => $idcliente,
			        'idcuentacontable' => $idcuentacontable,
			        'saldo' => $ftotal,
			        'fechaactualiza' => $fechafactura
				);
				$this->db->insert('cuenta_corriente', $cuenta_corriente); 
				$idcuentacorriente = $this->db->insert_id();


			}else{
				$row = $row[0];
				$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo + " . $ftotal . " where id = " .  $row->idcuentacorriente );
				$idcuentacorriente =  $row->idcuentacorriente;
			}

			$detalle_cuenta_corriente = array(
		        'idctacte' => $idcuentacorriente,
		        'tipodocumento' => $tipodocumento,
		        'numdocumento' => $numfactura,
		        'saldoinicial' => $ftotal,
		        'saldo' => $ftotal,
		        'fechavencimiento' => $fechavenc,
		        'fecha' => $fechafactura
			);

			$this->db->insert('detalle_cuenta_corriente', $detalle_cuenta_corriente); 	


			$cartola_cuenta_corriente = array(
		        'idctacte' => $idcuentacorriente,
		        'idcuenta' => $idcuentacontable,
		        'tipodocumento' => $tipodocumento,
		        'numdocumento' => $numfactura,
		        'glosa' => 'Registro de Documento en Cuenta Corriente',
		        'fecvencimiento' => $fechavenc,
		        'valor' => $ftotal,
		        'origen' => 'VENTA',
		        'fecha' => $fechafactura
			);

			$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 	
		}

		## FIN PRIMER PROCESO



		$this->db->select('fc.id, fc.id_cliente, fc.totalfactura, fc.fecha_factura, fc.tipo_documento, fc.num_factura, fc.fecha_venc, fc.id_factura, fc2.num_factura as numfactura_asoc')
		  ->from('factura_clientes fc')
		  ->join('factura_clientes fc2','fc.id_factura = fc2.id')
		  ->where('fc.tipo_documento','104');
		$query = $this->db->get();
		$facturas = $query->result();
		foreach ($facturas as $factura) {

				 $tipodocumento = $factura->tipo_documento;
				 $idcliente = $factura->id_cliente;
				 $fechafactura = $factura->fecha_factura;
				 $numfactura = $factura->num_factura;
				 $fechavenc = $factura->fecha_venc;
				 $ftotal = $factura->totalfactura;
				 $numfactura_asoc = $factura->numfactura_asoc;




				/******* CUENTAS CORRIENTES ****/

				 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR COBRAR'");
				 $row = $query->result();
				 $row = $row[0];
				 $idcuentacontable = $row->idcuentacontable;	


					// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
				 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
				 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "' limit 1");
		    	 $row = $query->row();
				 $idcuentacorriente =  $row->idcuentacorriente;	

				if($query->num_rows() > 0){ //sólo se realiza el aumento de cuenta corriente, en caso que exista la cuenta corriente

					// se rebaja detalle
					$query = $this->db->query("UPDATE detalle_cuenta_corriente SET saldo = saldo + " . $ftotal . " where idctacte = " .  $row->idcuentacorriente . " and numdocumento = " . $numfactura_asoc);

					$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo + " . $ftotal . " where id = " .  $row->idcuentacorriente );
					$idcuentacorriente =  $row->idcuentacorriente;


					 $query_factura = $this->db->query("SELECT tipo_documento  FROM factura_clientes 
					 							WHERE num_factura = " . $numfactura_asoc . " and id_cliente = " . $idcliente . " limit 1");
					 $tipodocumento_asoc = $query_factura->row()->tipo_documento;

				
					/*$detalle_cuenta_corriente = array(
				        'idctacte' => $idcuentacorriente,
				        'tipodocumento' => $tipodocumento,
				        'numdocumento' => $numdocuemnto,
				        'saldoinicial' => $ftotal,
				        'saldo' => $ftotal,
				        'fechavencimiento' => $fechavenc,
				        'fecha' => date('Y-m-d H:i:s')
					);

					$this->db->insert('detalle_cuenta_corriente', $detalle_cuenta_corriente); 	*/

					$cartola_cuenta_corriente = array(
				        'idctacte' => $idcuentacorriente,
				        'idcuenta' => $idcuentacontable,
				        'tipodocumento' => $tipodocumento,
				        'numdocumento' => $numfactura,
				        'tipodocumento_asoc' => $tipodocumento_asoc,
				        'numdocumento_asoc' => $numfactura_asoc,
				        'glosa' => 'Registro de Nota de Débito en Cuenta Corriente',
				        'fecvencimiento' => $fechavenc,
				        'valor' => $ftotal,
				        'origen' => 'VENTA',
				        'fecha' => date('Y-m-d H:i:s')
					);

					$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 
				}


		}

		## FIN SEGUNDO PROCESO


	}	


}









