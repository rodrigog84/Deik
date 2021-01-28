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

			set_time_limit(0);
			/*


truncate cartola_cuenta_corriente;
truncate cuenta_corriente;
truncate detalle_cuenta_corriente;
truncate detalle_mov_cuenta_corriente;
truncate movimiento_cuenta_corriente;




#DESCONTAR SEGÚN RECAUDACIONES




				NECESITO:

				$idcliente
				$ftotal: totalfactura
				$fechafactura: fecha
				$tipodocumento : 
				$numfactura
				$fechavenc: fecha_venc


			*/


		##SUMAR FACTURAS SEGÚN PREVENTAS
		$this->db->select('fc.id, fc.id_cliente, fc.totalfactura, fc.fecha_factura, fc.tipo_documento, fc.num_factura, fc.fecha_venc, c.id as idcaf')
		  ->from('factura_clientes fc')
		  ->join('folios_caf c','fc.id = c.idfactura','left')
		  ->where('fc.tipo_documento = 2 or (fc.tipo_documento = 101 and c.id is not null)');
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


			#DESCONTAR SEGÚN NOTAS DE DEBITO
		$this->db->select('fc.id, fc.id_cliente, fc.totalfactura, fc.fecha_factura, fc.tipo_documento, fc.num_factura, fc.fecha_venc, fc.id_factura, fc2.num_factura as numfactura_asoc')
		  ->from('factura_clientes fc')
		  ->join('factura_clientes fc2','fc.id_factura = fc2.id')
		  ->join('folios_caf c','fc.id = c.idfactura')
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
					echo "UPDATE detalle_cuenta_corriente SET saldo = saldo + " . $ftotal . " where idctacte = " .  $row->idcuentacorriente . " and numdocumento = " . $numfactura_asoc."<br>";
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


		#DESCONTAR SEGÚN NOTAS DE CRÉDITO
	$this->db->select('fc.id, fc.id_cliente, fc.totalfactura, fc.fecha_factura, fc.tipo_documento, fc.num_factura, fc.fecha_venc, fc.id_factura as numfactura_asoc')
		  ->from('factura_clientes fc')
		  ->join('folios_caf c','fc.id = c.idfactura')
		  ->where('fc.tipo_documento','102');
		$query = $this->db->get();
		$facturas = $query->result();
		foreach ($facturas as $factura) {

				 $tipodocumento = $factura->tipo_documento;
				 $idcliente = $factura->id_cliente;
				 $fechafactura = $factura->fecha_factura;
				 $numdocuemnto = $factura->num_factura;
				 $fechavenc = $factura->fecha_venc;
				 $ftotal = $factura->totalfactura;
				 $numfactura_asoc = $factura->numfactura_asoc;



				 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR COBRAR'");
				 $row = $query->result();
				 $row = $row[0];
				 $idcuentacontable = $row->idcuentacontable;	


					// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
				 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
				 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
		    	 $row = $query->row();
		    	 $idcuentacorriente =  $row->idcuentacorriente;

				if($query->num_rows() > 0){ //
					//se rebaja cuenta corriente 
					$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo - " . $ftotal . " where id = " .  $row->idcuentacorriente );
					//$idcuentacorriente =  $row->idcuentacorriente;
				
					// se rebaja detalle
					echo "UPDATE detalle_cuenta_corriente SET saldo = saldo - " . $ftotal . " where idctacte = " .  $row->idcuentacorriente . " and numdocumento = " . $numfactura_asoc."<br>"; 
					$query = $this->db->query("UPDATE detalle_cuenta_corriente SET saldo = saldo - " . $ftotal . " where idctacte = " .  $row->idcuentacorriente . " and numdocumento = " . $numfactura_asoc);
					//$idcuentacorriente =  $row->idcuentacorriente;
					echo $numfactura_asoc." - ".$idcliente."<br>";
					 $query_factura = $this->db->query("SELECT tipo_documento  FROM factura_clientes 
					 							WHERE num_factura = " . $numfactura_asoc . " and id_cliente = " . $idcliente . " limit 1");
					 $tipodocumento_asoc = $query_factura->row()->tipo_documento;

					$cartola_cuenta_corriente = array(
				        'idctacte' => $idcuentacorriente,
				        'idcuenta' => $idcuentacontable,
				        'tipodocumento' => $tipodocumento,
				        'numdocumento' => $numdocuemnto,
				        'tipodocumento_asoc' => $tipodocumento_asoc,
				        'numdocumento_asoc' => $numfactura_asoc,
				        'glosa' => 'Registro de Nota de Crédito en Cuenta Corriente',
				        'fecvencimiento' => $fechavenc,
				        'valor' => $ftotal,
				        'origen' => 'VENTA',
				        'fecha' => date('Y-m-d H:i:s')
					);

					$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 
				}	  

		}
		#FIN TERCER PROCESO



		#DESCONTAR RECAUDACION

		$this->db->select('r.id, p.id_tip_docu as tipo_documento, r.num_doc, r.id_cliente')
		  ->from('preventa p')
		  ->join('recaudacion r','p.id = r.id_ticket')
		  ->where('p.id_tip_docu in (2,101)');
		$query = $this->db->get();
		$facturas = $query->result();
		foreach ($facturas as $factura) {

				$tipodocumento = $factura->tipo_documento;
				$idcliente = $factura->id_cliente;
				$numdocum = $factura->num_doc;


				$this->db->select('id_forma, num_cheque, id_banco, valor_pago, valor_cancelado, valor_vuelto, fecha_transac, fecha_comp, detalle, estado')
				  ->from('recaudacion_detalle')
				  ->where('id_recaudacion',$factura->id);
				  $query_recaudacion = $this->db->get();
				  $recitems = $query_recaudacion->result();

				$total_cancelacion = 0;
				$total_factura_cta_cte = 0;
				foreach($recitems as $ri){ // SUMAR MONTOS PARA VER TOTAL CANCELACION
					$total_factura_cta_cte += $ri->valor_pago;
					if($ri->id_forma != 3 && $ri->id_forma != 5 ){ // NO CONSIDERA PAGOS A CREDITO
						$total_cancelacion += $ri->valor_pago;
					}
				}

				if($tipodocumento == 1 || $tipodocumento == 2 || $tipodocumento == 19 || $tipodocumento == 101 || $tipodocumento == 103){
				 	 $nombre_cuenta = $tipodocumento == 2 ? "BOLETAS POR COBRAR" : "FACTURAS POR COBRAR";
				 	 //$nombre_cuenta = "FACTURAS POR COBRAR";
					 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = '$nombre_cuenta'");
					 $row = $query->result();
					 $row = $row[0];
					 $idcuentacontable = $row->idcuentacontable;
					 echo $numdocum." - ".$idcliente."<br>";
					 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
					 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
			    	 $row = $query->row();	
			    	 $idcuentacorriente =  isset($row->idcuentacorriente) ? $row->idcuentacorriente : null;

					

					$correlativo_cta_cte = null;
					$array_cuentas = array();

					if(!is_null($idcuentacorriente)){
						foreach($recitems as $ri){
							$formapago = $ri->id_forma;
							if($formapago == 1 || $formapago == 6 || $formapago == 7){
								$cuenta_cuadratura = 3;
							}else if($formapago == 2){	
								$cuenta_cuadratura = 18;
							}else if($formapago == 4){
								$cuenta_cuadratura = 19;
							}elseif($formapago == 8){
								$cuenta_cuadratura = 3;
							}

							
							if($formapago != 3 && $formapago != 5 ){ 
								if(is_null($correlativo_cta_cte)){ // si son varias formas de pago, entonces sólo en la primera genera el movimiento
									 $query = $this->db->query("SELECT correlativo FROM correlativos WHERE nombre = 'CANCELACIONES CTA CTE'");
									 $row = $query->row();
									 $correlativo_cta_cte = $row->correlativo;
									// guarda movimiento cuenta corriente (comprobante de ingreso ??? )
									$data = array(
								      	'numcomprobante' => $correlativo_cta_cte,
								        'tipo' => 'INGRESO',
								        'proceso' => 'CANCELACION',
								        'glosa' => 'Cancelación de Documento por Caja',
								        'fecha' => date("Y-m-d H:i:s")
									);

									$this->db->insert('movimiento_cuenta_corriente', $data); 
									$idMovimiento = $this->db->insert_id();

									// actualiza correlativo
									$query = $this->db->query("UPDATE correlativos SET correlativo = correlativo + 1 where nombre = 'CANCELACIONES CTA CTE'");

									//Detalle movimiento CARGO

									$data = array(
								      	'idmovimiento' => $idMovimiento,
								        'tipo' => 'CTACTE',
								        'idctacte' => $idcuentacorriente,
								        'idcuenta' => $idcuentacontable,
								        'tipodocumento' => $tipodocumento,
								        'numdocumento' => $numdocum,		
								        'glosa' => 'Cancelación de Documento por Caja',		        
								        'fecvencimiento' => null,		        
								        'debe' => 0,
								        'haber' => $total_cancelacion
									);

									$this->db->insert('detalle_mov_cuenta_corriente', $data); 								
								}
								// DETALLE MOVIMIENTO CUADRATURA
								$docpago = $formapago == 2 ? $ri->num_cheque : 0;
								if(!in_array($cuenta_cuadratura, $array_cuentas)){ 
									$data = array(
								      	'idmovimiento' => $idMovimiento,
								        'tipo' => 'CUADRATURA',
								        'idctacte' => null,
								        'idcuenta' => $cuenta_cuadratura,
								        'docpago' => $docpago,
								        'tipodocumento' => null,
								        'numdocumento' => null,		
								        'glosa' => 'Cancelación de Documento por Caja',		        
								        'fecvencimiento' => null,		        
								        'debe' => $ri->valor_pago,
								        'haber' => 0
									);			
									$this->db->insert('detalle_mov_cuenta_corriente', $data); 	
									array_push($array_cuentas,$cuenta_cuadratura);
								}else{ // se actualiza la cuenta cuadratura (debería suceder sólo con caja)
									$query = $this->db->query("UPDATE detalle_mov_cuenta_corriente SET debe = debe + " . $ri->valor_pago . " where idmovimiento = " .  $idMovimiento . " and idcuenta  = " . $cuenta_cuadratura );

								}							

								// genera cartola de cancelacion
								$data = array(
							      	'idctacte' => $idcuentacorriente,
							        'idcuenta' => $idcuentacontable,
							        'idmovimiento' => $idMovimiento,
							        'tipodocumento' => $tipodocumento,
							        'numdocumento' => $numdocum,
							        'fecvencimiento' => $ri->fecha_comp,
							        'glosa' => 'Cancelación de Documento por Caja',		        
							        'valor' => $ri->valor_pago,
							        'origen' => 'CTACTE',
							        'fecha' => date("Y-m-d")
								);

								$this->db->insert('cartola_cuenta_corriente', $data);
													
								// REBAJA SALDO
								
								$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo - " . $ri->valor_pago . " where id = " .  $idcuentacorriente );
								echo "UPDATE detalle_cuenta_corriente SET saldo = saldo - " . $ri->valor_pago . " where idctacte = " .  $idcuentacorriente . " and tipodocumento = " . $tipodocumento . " and numdocumento = " . $numdocum."<br>";
								$query = $this->db->query("UPDATE detalle_cuenta_corriente SET saldo = saldo - " . $ri->valor_pago . " where idctacte = " .  $idcuentacorriente . " and tipodocumento = " . $tipodocumento . " and numdocumento = " . $numdocum);

								$resp['ctacte'] = $idcuentacorriente; 
							}


						} // end foreach	
					}	
					
				}	

		}	

	}	



	public function envio_programado_sii(){
		set_time_limit(0);
		$this->load->model('facturaelectronica');
		$facturas = $this->facturaelectronica->get_factura_no_enviada();

		

		foreach ($facturas as $factura) {
			$idfactura = $factura->idfactura;
			$factura = $this->facturaelectronica->datos_dte($idfactura);
			$config = $this->facturaelectronica->genera_config();
			include $this->facturaelectronica->ruta_libredte();


			$token = \sasco\LibreDTE\Sii\Autenticacion::getToken($config['firma']);
			if (!$token) {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
			    	$result['error'] = true;

			    }
			    $result['message'] = "Error de conexión con SII";		   
			   	echo json_encode($result);
			    exit;
			}

			$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital
			$rut = $Firma->getId(); 
			$rut_consultante = explode("-",$rut);
			$RutEnvia = $rut_consultante[0]."-".$rut_consultante[1];

			//$xml = $factura->dte;
			$archivo = "./facturacion_electronica/dte/".$factura->path_dte.$factura->archivo_dte;
		 	if(file_exists($archivo)){
		 		$xml = file_get_contents($archivo);
		 	}else{
		 		$xml = $factura->dte;
		 	}


			$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
			$EnvioDte->loadXML($xml);
			$Documentos = $EnvioDte->getDocumentos();	

			$DTE = $Documentos[0];
			$RutEmisor = $DTE->getEmisor(); 

			// enviar DTE
			$result_envio = \sasco\LibreDTE\Sii::enviar($RutEnvia, $RutEmisor, $xml, $token);

			// si hubo algún error al enviar al servidor mostrar
			if ($result_envio===false) {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
			        $result['error'] = true;
			    }
			    $result['message'] = "Error de envío de DTE";		   
			   	echo json_encode($result);
			    exit;
			}

			// Mostrar resultado del envío
			if ($result_envio->STATUS!='0') {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
					$result['error'] = true;
			    }
			    $result['message'] = "Error de envío de DTE";		   
			   	echo json_encode($result);
			    exit;
			}


			$track_id = 0;
			$track_id = (int)$result_envio->TRACKID;
		    $this->db->where('id', $factura->id);
			$this->db->update('folios_caf',array('trackid' => $track_id)); 
			echo "idfactura: " .$factura->id." -- folio : ".$factura->folio." -- trackid : ". $track_id . "<br>";
			ob_flush(); 

			$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);
			if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
				$this->facturaelectronica->envio_mail_dte($idfactura);
			}


			$result['success'] = true;
			$result['message'] = $track_id != 0 ? "DTE enviado correctamente" : "Error en env&iacute;o de DTE";
			$result['trackid'] = $track_id;
			echo json_encode($result);
			
		}

	}	


	public function envio_programado_consumo_folios(){
		set_time_limit(0);
		$this->load->model('facturaelectronica');
		$consumo_folios = $this->facturaelectronica->consumo_folios_no_enviada();
		$empresa = $this->facturaelectronica->get_empresa();
		$RutEmisor = $empresa->rut.'-'.$empresa->dv;
		$config = $this->facturaelectronica->genera_config();
		include $this->facturaelectronica->ruta_libredte();

		foreach ($consumo_folios as $consumo_folio) {
			//$idfactura = $factura->idfactura;
			//$factura = $this->facturaelectronica->datos_dte($idfactura);
			

			$token = \sasco\LibreDTE\Sii\Autenticacion::getToken($config['firma']);
			if (!$token) {
				var_dump(\sasco\LibreDTE\Log::readAll());
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
			    	$result['error'] = true;

			    }
			    $result['message'] = "Error de conexión con SII";		   
			   	echo json_encode($result);
			    exit;
			}

			$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital
			$rut = $Firma->getId(); 
			$rut_consultante = explode("-",$rut);
			$RutEnvia = $rut_consultante[0]."-".$rut_consultante[1];

			//$xml = $factura->dte;
			$archivo = "./facturacion_electronica/Consumo_Folios/".$consumo_folio->path_consumo_folios.$consumo_folio->archivo_consumo_folios;
		 	if(file_exists($archivo)){
		 		$xml = file_get_contents($archivo);
		 	}else{
		 		$xml = $consumo_folio->xml;
		 	}

			// enviar DTE
			$result_envio = \sasco\LibreDTE\Sii::enviar($RutEnvia, $RutEmisor, $xml, $token);

			// si hubo algún error al enviar al servidor mostrar
			if ($result_envio===false) {
					var_dump(\sasco\LibreDTE\Log::readAll());
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
			        $result['error'] = true;
			    }
			    $result['message'] = "Error de envío de DTE";		   
			   	echo json_encode($result);
			    exit;
			}

			// Mostrar resultado del envío
			if ($result_envio->STATUS!='0') {
			    foreach (\sasco\LibreDTE\Log::readAll() as $error){
					$result['error'] = true;
			    }
			    $result['message'] = "Error de envío de DTE";		   
			   	echo json_encode($result);
			    exit;
			}


			$track_id = 0;
			$track_id = $result_envio->TRACKID;
		    $this->db->where('id', $consumo_folio->id);
			$this->db->update('consumo_folios',array('trackid' => $track_id)); 

			/*$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);
			
			if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
				$this->facturaelectronica->envio_mail_dte($idfactura);
			}*/

			echo "idconsumofolios: " .$consumo_folio->id." -- consumo folios : ".$consumo_folio->archivo_consumo_folios." -- trackid : ". $track_id . "<br>";
			ob_flush(); 

			$result['success'] = true;
			$result['message'] = $track_id != 0 ? "DTE enviado correctamente" : "Error en env&iacute;o de DTE";
			$result['trackid'] = $track_id;
			echo json_encode($result);
			
		}

	}	


	public function proceso_consumo_folios(){
		set_time_limit(0);
		//https://palena.sii.cl/cgi_dte/UPL/DTEauth?1   -subir
		//https://palena.sii.cl/cgi_dte/UPL/DTEauth?3 --consultar
			//header('Content-type: text/plain; charset=ISO-8859-1');

/*

ilefort@itelecom.cl
dte.cl_sii@einvoicing.signature-cloud.com
dte.cl@einvoicing.signature-cloud.com
*/



			$this->load->model('facturaelectronica');
			include $this->facturaelectronica->ruta_libredte();
			$empresa = $this->facturaelectronica->get_empresa();
			$fec_inicio = $empresa->fec_inicio_boleta;
			$fecha_hoy = date('Y-m-d');
			$dias_evalua = 10;

			while($dias_evalua >= 0){
				$fecha_consumo= strtotime("- $dias_evalua days", strtotime ($fecha_hoy));
				$fecha = date('Y-m-d',$fecha_consumo);
				//echo $fecha."<br>";
				
				if(strtotime($fecha) >= strtotime($fec_inicio)){
					$consumo_folios = $this->facturaelectronica->get_consumo_folios($fecha);
					if(count($consumo_folios) == 0){
						$this->genera_consumo_folios($fecha);	
					}
					
				}

				$dias_evalua--;
			}

	}		


	public function genera_consumo_folios($fecha){
		

		//echo $fecha; exit;
		header('Content-type: text/plain; charset=ISO-8859-1');
		$this->load->model('facturaelectronica');
      	$config = $this->facturaelectronica->genera_config();
      	


		$empresa = $this->facturaelectronica->get_empresa();
		$facturas = $this->facturaelectronica->get_boletas_dia($fecha);
		$Firma = new sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital            
		$ConsumoFolio = new sasco\LibreDTE\Sii\ConsumoFolio();
		$ConsumoFolio->setFirma($Firma);
		//print_r($facturas);  exit;
		$lista_folios = array();
		if(count($facturas) > 0){
			foreach ($facturas as $factura) {
				$idfactura = $factura->idfactura;
				$factura = $this->facturaelectronica->datos_dte($idfactura);
				$archivo = "./facturacion_electronica/dte/".$factura->path_dte.$factura->archivo_dte;
				//echo $archivo; exit;
			 	if(file_exists($archivo)){
			 		$xml = file_get_contents($archivo);
			 	}else{
			 		$xml = $factura->dte;
			 	}
				//echo $xml;


				$rut = $Firma->getId(); 
				$rut_consultante = explode("-",$rut);
				$RutEnvia = $rut_consultante[0]."-".$rut_consultante[1];

				//$xml = $factura->dte;
				


				$EnvioBOLETA = new \sasco\LibreDTE\Sii\EnvioDte();
				$EnvioBOLETA->loadXML($xml);
				// agregar detalle de boletas
				foreach ($EnvioBOLETA->getDocumentos() as $Dte) {
				    $ConsumoFolio->agregar($Dte->getResumen());
				}


				// crear carátula para el envío (se hace después de agregar los detalles ya que
				// así se obtiene automáticamente la fecha inicial y final de los documentos)
				$CaratulaEnvioBOLETA = $EnvioBOLETA->getCaratula();
				$lista_folios[] = $factura->folio;
				
			}


			/**** definir folio min, folio max, cant folios, lista folios ****/
			$folio_min = min($lista_folios);
			$folio_max = max($lista_folios);
			$cant_folios = count($lista_folios);

		}else{

			$ConsumoFolio->setDocumentos([39,61,41]);
			$folio_min = 0;
			$folio_max = 0;
			$cant_folios = 0;

		}

		


		// crear carátula para el envío (se hace después de agregar los detalles ya que
		// así se obtiene automáticamente la fecha inicial y final de los documentos)
		$ConsumoFolio->setCaratula([
		    'RutEmisor' => $empresa->rut.'-'.$empresa->dv,
		    'FchResol' => $empresa->fec_resolucion,
		    'NroResol' =>  $empresa->nro_resolucion,
			'FchInicio' => $fecha,
			'FchFinal' => $fecha,
			'SecEnvio' => 1

		]);
		//echo $ConsumoFolio->generar()."<br>";

		$ConsumoFolio->generar();
		if ($ConsumoFolio->schemaValidate()) {
		    $xml_consumo_folios = $ConsumoFolio->generar();
		    $nombre_archivo =  "Consumo_Folios_" . str_replace("-","",$fecha) . ".xml";
		    $path = date('Ym').'/';
			if(!file_exists('./facturacion_electronica/Consumo_Folios/'.$path)){
				mkdir('./facturacion_electronica/Consumo_Folios/'.$path,0777,true);
			}			    
			$f_archivo = fopen('./facturacion_electronica/Consumo_Folios/'.$path.$nombre_archivo,'w');
			fwrite($f_archivo,$xml_consumo_folios);
			fclose($f_archivo);


			$array_consumo_folios = array (
											'fecha' => $fecha,
											'cant_folios' => $cant_folios,
											'folio_desde' => $folio_min,
											'folio_hasta' => $folio_max,
											'path_consumo_folios' => $path,
											'archivo_consumo_folios' => $nombre_archivo,
											'xml' => $xml_consumo_folios,
											'trackid' => '0',
											'created_at' => date('Y-m-d H:i:s')

										);
			$this->db->insert('consumo_folios',$array_consumo_folios);
			$id_consumo_folios = $this->db->insert_id();



			if(count($lista_folios) > 0){
				$this->db->where_in('f.folio', $lista_folios);
	            $this->db->where('c.tipo_caf', 39);
	            $this->db->update('folios_caf f inner join caf c on f.idcaf = c.id',array('id_consumo_folios' => $id_consumo_folios)); 
			}

  			




		  //  $track_id = $ConsumoFolio->enviar();
		  //  var_dump($track_id);
		}

// si hubo errores mostrar
			///foreach (\sasco\LibreDTE\Log::readAll() as $error)
    			//echo $error,"\n";



	}	

	public function envio_mail_manual(){

		set_time_limit(0);
		$this->db->select('f.id, f.num_factura')
		  ->from('factura_clientes f ')
		  ->where('f.id_cliente',1653)
		  ->where('f.num_factura >= 7000');
		$query = $this->db->get();
		$facturas = $query->result();

		$this->load->model('facturaelectronica');
		foreach ($facturas as $factura) {
			$idfactura = $factura->id;
			$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);
			if($datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
				$this->facturaelectronica->envio_mail_dte($idfactura);
				echo "envio de factura :" . $factura->num_factura;
				ob_flush();
			}
		}
	}


	public function libera_folios(){

			$this->db->where('estado', 'T');
			$this->db->update('folios_caf',array(
											'estado' => 'P')); 

	}	



	public function get_contribuyentes(){

		set_time_limit(0);
		$this->load->model('facturaelectronica');
		$this->facturaelectronica->get_contribuyentes();
	}		

}









