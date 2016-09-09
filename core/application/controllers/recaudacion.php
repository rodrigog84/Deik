<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Recaudacion extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function averigua(){

		$resp = array();
		$idticket = json_decode($this->input->post('ticketid'));

		$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, c.direccion as direccion,
		c.id_pago as id_pago, suc.direccion as direccion_sucursal, ciu.nombre as ciudad, com.nombre as comuna, cor.nombre as nom_documento, cod.nombre as nom_giro FROM preventa acc
		left join correlativos cor on (acc.id_tip_docu = cor.id)
		left join clientes c on (acc.id_cliente = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
		left join comuna com on (suc.id_comuna = com.id)
		left join ciudad ciu on (suc.id_ciudad = ciu.id)
		left join cod_activ_econ cod on (c.id_giro = cod.id)		
		WHERE acc.id = "'.$idticket.'"
		');

        if($query->num_rows()>0){
		$row1 = $query->result();
		$row = $row1[0];
		$id_documento = $row->id_documento;
	    }else{

	    	$id_documento=11;

		};

		$resp['success'] = true;
        $resp['iddocumento'] = $id_documento;

        echo json_encode($resp);



	}

	public function actualizar(){

		 $query = $this->db->query('SELECT acc.*, t.nombre as desc_pago,
            r.id_caja as idcaja, r.id_cajero as idcajero, n.nombre as nom_caja,
            e.nombre as nom_cajero, r.num_comp as num_comp, b.nombre as nom_banco,
            r.num_doc as num_doc, cor.nombre as nom_documento, cli.nombres as nom_cliente FROM recaudacion_detalle acc
            left join cond_pago t on (acc.id_forma = t.id)
            left join recaudacion r on (acc.id_recaudacion = r.id)
            left join preventa pr on (r.id_ticket = pr.id)
            left join correlativos cor on (pr.id_tip_docu = cor.id)
            left join cajas n on (r.id_caja = n.id)
            left join cajeros e on (r.id_cajero = e.id)
            left join banco b on (acc.id_banco = b.id)
            left join clientes cli on (r.id_cliente = cli.id)
            ');

		foreach ($query->result() as $v)
		{
			$recauda = $v->id_recaudacion;

			$query5 = $this->db->query('SELECT * FROM recaudacion_general 
			WHERE id_recaudacion = '.$recauda.'');
			
			if($query5->num_rows()>0){

				$row = $query5->first_row();
	   			$id = $row->id;
				if ($v->id_forma == 1){
					$update_general = array(				        
				        'contado' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 2){
					$update_general = array(				        
				        'chequealdia' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 8){
					$update_general = array(				        
				        'chequeafecha' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 11){
					$update_general = array(				        
				        'credito' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 7){
					$update_general = array(				        
				        'tarjetadebito' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 4){
					$update_general = array(				        
				        'tarjetacredito' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 6){
					$update_general = array(				        
				        'transferencia' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 3){
					$update_general = array(				        
				        'credito30dias' => $v->valor_pago				        
					);
				};
				if ($v->id_forma == 5){
					$update_general = array(				        
				        'credito60dias' => $v->valor_pago				        
					);
				};

				$this->db->where('id', $id);		  
	    		$this->db->update('recaudacion_general', $update_general);				
					
			}else{

				if ($v->id_forma == 1){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'contado' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma			        
					);
				};
				if ($v->id_forma == 2){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'chequealdia' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma				        
					);
				};
				if ($v->id_forma == 8){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'chequeafecha' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma				        
					);
				};
				if ($v->id_forma == 11){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'credito' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma				        
					);
				};
				if ($v->id_forma == 7){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'tarjetadebito' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma			        
					);
				};
				if ($v->id_forma == 4){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'tarjetacredito' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma			        
					);
				};
				if ($v->id_forma == 6){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'transferencia' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma			        
					);
				};
				if ($v->id_forma == 3){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'credito30dias' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma			        
					);
				};
				if ($v->id_forma == 5){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'credito60dias' => $v->valor_pago,
				        'id_caja' => $v->idcaja,
						'num_documento' => $v->num_doc,
					    'id_cajero' => $v->idcajero,
					    'fecha' => $v->fecha_transac,
					    'id_forma' => $v->id_forma			        
					);
				};
				
				$this->db->insert('recaudacion_general', $update_general);

		    };	

		}

		$resp['success'] = true;
        
        echo json_encode($resp);

	}

	public function save(){

		$resp = array();
		$numcomp = json_decode($this->input->post('num_comprobante'));
		$fechacomp = json_decode($this->input->post('fecha'));
		$numdocum = json_decode($this->input->post('num_documento'));
        $idfactura = json_decode($this->input->post('idfactura'));
		$documento = json_decode($this->input->post('documento'));
		$tipodocumento = json_decode($this->input->post('documento'));
		$idcliente = json_decode($this->input->post('id_cliente'));
		$idcaja = json_decode($this->input->post('id_caja'));
		$idcajero = json_decode($this->input->post('id_cajero'));
		$items = json_decode($this->input->post('items'));
		$recitems = json_decode($this->input->post('items'));
		$idticket = json_decode($this->input->post('idticket'));
		$idrecauda = json_decode($this->input->post('idrecauda'));
		$contado = json_decode($this->input->post('contado'));
		$cheques = json_decode($this->input->post('cheques'));
		$otros = json_decode($this->input->post('otros'));		
		$estado = "SI";

		if($idrecauda){
			$cajas = array(
		         'efectivo' => $contado,
		         'cheques' => $cheques,
		         'otros' => $otros
		    );
		    $this->db->where('id', $idrecauda);		  
		    $this->db->update('control_caja', $cajas);
	    }else{
	    	$cajas2 = array(
	    	 'id_caja' => $idcaja,
	    	 'id_cajero' => $idcajero,
	         'efectivo' => $contado,
	         'cheques' => $cheques,
	         'otros' => $otros
	    	);

	    	$this->db->insert('control_caja', $cajas2);
	    };

		$data2 = array(
	         'estado' => $estado
	    );
	    $this->db->where('id', $idticket);	  
	    $this->db->update('preventa', $data2);


		$data3 = array(
	         'correlativo' => $numcomp
	    );

	    $this->db->where('id', $idcaja);	  
	    $this->db->update('cajas', $data3);

		$recaudacion = array(
	        'num_comp' => $numcomp,
	        'fecha' => date('Y-m-d'),
	        'id_cliente' => $idcliente,
			'num_doc' => $numdocum,
			'id_caja' => $idcaja,
			'id_ticket' => $idticket,
		    'id_cajero' => $idcajero
		);

		$this->db->insert('recaudacion', $recaudacion); 
		$recauda = $this->db->insert_id();
        $ftotal = 0;
		foreach($items as $v){
					
			$recaudacion_detalle = array(				
		        'id_recaudacion' => $recauda,
		        'id_forma' => $v->id_forma,
		        'detalle' => $v->detalle,
		        'num_cheque' => $v->num_cheque,
		        'id_banco' => $v->id_banco,
		        'valor_pago' => ($v->valor_cancelado-$v->valor_vuelto),
		        'valor_cancelado' => $v->valor_cancelado,
		        'valor_vuelto' => $v->valor_vuelto,
		        'fecha_transac' => $v->fecha_comp,
		        'fecha_comp' => date('Y-m-d')
			);

			$idforma = ($v->id_forma);
			if ($documento == 2){
			if($v->id_forma==7 or $v->id_forma==4 ){
			$numdocum = ($v->num_cheque);			
			$ftotal = ($ftotal + ($v->valor_cancelado-$v->valor_vuelto));

			};
		    };
				
			$this->db->insert('recaudacion_detalle', $recaudacion_detalle);

			$query5 = $this->db->query('SELECT * FROM recaudacion_general 
			WHERE id_recaudacion = '.$recauda.'');
			
			if($query5->num_rows()>0){

				$row = $query5->first_row();
	   			$id = $row->id;
	   			$contado = $row->contado;
	   			$chequealdia = $row->chequealdia;
	   			$chequeafecha = $row->chequeafecha;
	   			$credito = $row->credito;
	   			$tarjetadebito = $row->tarjetadebito;
	   			$tarjetacredito = $row->tarjetacredito;
	   			$credito30dias = $row->credito30dias;
	   			$credito60dias = $row->credito60dias;
	   			$transferencia = $row->transferencia;
				if ($v->id_forma == 1){
					$update_general = array(				        
				        'contado' => (($v->valor_cancelado-$v->valor_vuelto)+$contado)			        
					);
				};
				if ($v->id_forma == 2){
					$update_general = array(				        
				        'chequealdia' => ($v->valor_cancelado+$chequealdia)			        
					);
				};
				if ($v->id_forma == 8){
					$update_general = array(				        
				        'chequeafecha' => ($v->valor_cancelado+$chequeafecha)			        
					);
				};
				if ($v->id_forma == 11){
					$update_general = array(				        
				        'credito' => ($v->valor_cancelado+$credito)			        
					);
				};
				if ($v->id_forma == 7){
					$update_general = array(				        
				        'tarjetadebito' => ($v->valor_cancelado+$tarjetadebito)			        
					);
				};
				if ($v->id_forma == 4){
					$update_general = array(				        
				        'tarjetacredito' => ($v->valor_cancelado+$tarjetacredito)				        
					);
				};
				if ($v->id_forma == 6){
					$update_general = array(				        
				        'transferencia' => ($v->valor_cancelado+$transferencia)				        
					);
				};
				if ($v->id_forma == 3){
					$update_general = array(				        
				        'credito30dias' => ($v->valor_cancelado+$credito30dias)			        
					);
				};
				if ($v->id_forma == 5){
					$update_general = array(				        
				        'credito60dias' => ($v->valor_cancelado+$credito60dias)			        
					);
				};

				$this->db->where('id', $id);		  
	    		$this->db->update('recaudacion_general', $update_general);				
					
			}else{

				if ($v->id_forma == 1){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'contado' => ($v->valor_cancelado-$v->valor_vuelto),
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 2){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'chequealdia' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 8){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'chequeafecha' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 11){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'credito' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 7){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'tarjetadebito' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 4){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'tarjetacredito' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 6){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'transferencia' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 3){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'credito30dias' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				if ($v->id_forma == 5){
					$update_general = array(
					    'id_recaudacion' =>	$recauda,		        
				        'credito60dias' => $v->valor_cancelado,
				        'id_caja' => $idcaja,
						'num_documento' => $numdocum,
					    'id_cajero' => $idcajero,
					    'fecha' => date('Y-m-d')			        
					);
				};
				
				$this->db->insert('recaudacion_general', $update_general);

		    };
		}

		if ($documento == 2){

			if ($idforma == 4){

			$docu = array(
		         'num_comp' => $numdocum
		    );

		    $docu2 = array(
		         'num_factura' => $numdocum
		    );

		    $docu3 = array(
		         'num_movimiento' => $numdocum
		    );

			$this->db->where('id', $recauda);
		  
		    $this->db->update('recaudacion', $docu);

		    $doc = 20;

			$docu = array(
		         'correlativo' => $numdocum
		    );

		    $this->db->where('id', $doc);
		  
		    $this->db->update('correlativos', $docu);
		    
			$query = $this->db->query('SELECT * FROM factura_clientes 
			WHERE tipo_documento = 2 and num_factura = '.$numdocum.'');
			
			if($query->num_rows()>0){
	   			$row = $query->first_row();
	   			$factura = $row->id;
			    $this->db->where('id', $factura);			  
			    $this->db->update('factura_clientes', $docu2);
	        };	        
	        
	        $query = $this->db->query('SELECT * FROM existencia_detalle 
		    WHERE id_tipo_movimiento = 2 and num_movimiento = '.$numdocum.'');

		    if($query->num_rows()>0){
	   			
	   			foreach($query->result() as $item){
	   			$factura = $item->id;
	   			$this->db->where('id', $factura);		  
		    	$this->db->update('existencia_detalle', $docu3);

			};

	        };
			};
		    if ($idforma == 7){
			$docu = array(
		         'num_comp' => $numdocum
		    );

 			$docu2 = array(
		         'num_factura' => $numdocum
		    );
		    $docu3 = array(
		         'num_movimiento' => $numdocum
		    );
			$this->db->where('id', $recauda);		  
		    $this->db->update('recaudacion', $docu);

		    $doc = 20;

			$docu = array(
		         'correlativo' => $numdocum
		    );

		    $this->db->where('id', $doc);
		  
		    $this->db->update('correlativos', $docu);

		    
		    $query = $this->db->query('SELECT * FROM factura_clientes 
		    WHERE tipo_documento = 2 and num_factura = '.$numdocum.'');
			
			if($query->num_rows()>0){
	   			$row = $query->first_row();
	   			$factura = $row->id;
	   			$this->db->where('id', $factura);		  
		    	$this->db->update('factura_clientes', $docu2);
	        };

	        $query = $this->db->query('SELECT * FROM existencia_detalle 
		    WHERE id_tipo_movimiento = 2 and num_movimiento = '.$numdocum.'');

		    if($query->num_rows()>0){
	   			
	   			foreach($query->result() as $item){
	   			$factura = $item->id;
	   			$this->db->where('id', $factura);
		  
		    	$this->db->update('existencia_detalle', $docu3);

			    };

	        };
			};

		};

		if ($tipodocumento != 3 && $tipodocumento != 105){
		/******* CUENTAS CORRIENTES ****/

		## DESDE

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
			 
			 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
			 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
	    	 $row = $query->row();	
	    	 $idcuentacorriente =  $row->idcuentacorriente;

			

			$correlativo_cta_cte = null;
			$array_cuentas = array();

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
				        'fecvencimiento' => $fechacomp,
				        'glosa' => 'Cancelación de Documento por Caja',		        
				        'valor' => $ri->valor_pago,
				        'origen' => 'CTACTE',
				        'fecha' => date("Y-m-d")
					);

					$this->db->insert('cartola_cuenta_corriente', $data);
										
					// REBAJA SALDO
					
					$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo - " . $ri->valor_pago . " where id = " .  $idcuentacorriente );
					$query = $this->db->query("UPDATE detalle_cuenta_corriente SET saldo = saldo - " . $ri->valor_pago . " where idctacte = " .  $idcuentacorriente . " and tipodocumento = " . $tipodocumento . " and numdocumento = " . $numdocum);

					$resp['ctacte'] = $idcuentacorriente; 
				}


			} // end foreach		
			
		}

	}


	
		## HASTA

		/*****************************************/
      
				
        $resp['success'] = true;
        $resp['idrecauda'] = $recauda;
		$resp['documento'] = $tipodocumento;
		$resp['numrecauda'] = $numcomp;
		
		//$resp['ctacte'] = $idcuentacorriente;       
        
		
        $this->Bitacora->logger("I", 'recaudacion', $numcomp);


        echo json_encode($resp);

	}

	public function update(){
		
		
	}

	public function buscar(){

		
	}

	public function exportRecaudacionPDF(){

		//$idfactura = $this->input->get('idfactura');
		
		$numero = $this->input->get('idrecaudacion');
        
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, p.num_ticket as num_ticket, t.descripcion as nom_docu, p.total as total, n.nombre as nom_caja, e.nombre as nom_cajero FROM recaudacion acc
			left join preventa p on (acc.id_ticket = p.id)
			left join clientes c on (acc.id_cliente = c.id)
			left join cajas n on (acc.id_caja = n.id)
			left join cajeros e on (acc.id_cajero = e.id)
			left join tipo_documento t on (p.id_tip_docu = t.id)			
			left join vendedores v on (p.id_vendedor = v.id)
			WHERE acc.id = '.$numero.'

		');
		
		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		//items

		$items = $this->db->query('SELECT acc.*, t.nombre as desc_pago FROM recaudacion_detalle acc
			left join cond_pago t on (acc.id_forma = t.id)
			WHERE acc.id_recaudacion = '.$row->id.'

		');

		$datas_detalle = $items->result_array();


		//$items = $this->db->get_where('recaudacion_detalle', array('id_recaudacion' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_comp;
		$nombre_contacto = $row->nom_cliente;
		$nom_caja = $row->nom_caja;
		$nom_cajero = $row->nom_cajero;		
		$rut_cliente = $row->rut_cliente;
		$numdocu = $row->num_doc;
		$nomdocu = $row->nom_docu;
		$montoNeto = 0;
		$ivaTotal = 0;
		$totalFactura = 0;
		
				
		$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 

		
            $header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Untitled Document</title>
		<style type="text/css">
		td {
			font-size: 16px;
		}
		p {
		}
		</style>
		</head>

		<body>
		<table width="987px" height="602" border="0">
		  <tr>
		  <td width="197px"><img src="http://localhost/Deik/Infosys_web/resources/images/logo.jpg" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>SOCIEDAD COMERCIAL DEIK Y CIA. LIMITADA</p>
		    <p>RUT:76.019.353-4</p>
		    <p>8 ORIENTE 1378 - Talca - Chile</p>
		    <p>Fonos: (71)2 233369</p>
		    <p>http://</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top"	>
		          <p>COMPROBANTE N°: '.$codigo.'</p>
		          <!--p>&nbsp;</p-->
		          <p>FECHA EMISION : '.date('d/m/Y').'</p>
			</td>
		  </tr>';


		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>COMPROBANTE DE PAGO</h2></td>
		  </tr>
		  <tr>
		    <td colspan="3" width="987px" >
		    	<table width="987px" border="0">
		    		<tr>
		    			<td width="197px">Razon Social:</td>
		    			<td width="395px">'.$row->nom_cliente.'</td>
		    			<td width="197px">Rut:</td>
		    			<td width="395px">'.$row->rut_cliente.'</td>
		    		</tr>
		    		<tr>
		    			<td width="197px">Fecha Comprobante:</td>
		    			<td width="395px">'.$row->fecha.'</td>
		    		</tr>
		    		<tr>
		    			<td width="197px">Caja:</td>
		    			<td width="395px">'.$nom_caja.'</td>
		    			<td width="197px">Cajero:</td>
		    			<td width="395px">'.$nom_cajero.'</td>
		    		</tr>		    		
		    				    				    		
		    	</table>
			</td>
		  </tr>';

			$body_header = '<tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" >
		      <tr>
		        <td width="126px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Forma de Pago</td>
		        <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Documento</td>
		        <td width="250px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Tipo</td>
		        <td width="250px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Numero</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Detalle</td>
		        <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Valor</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Cancelado</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Vuelto</td>
		      </tr>';
              $debe = 0;
              $haber = 0;
              $vuelto = 0;
              $i = 0;
              $body_detail = '';
      foreach($datas_detalle as $detalle){


     $body_detail .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				</tr>
				<tr>
				<table width="997" cellspacing="0" cellpadding="0" >
				<tr>				
				<td style="text-align:left;font-size: 14px;">'.$detalle['desc_pago'].'</td>		
				<td style="text-align:left;font-size: 14px;">'.$detalle['num_cheque'].'</td>
				<td style="text-align:right;font-size: 14px;">'.$nomdocu.'</td>
				<td style="text-align:center;font-size: 14px;">'.$numdocu.'</td>
				<td style="text-align:center;font-size: 14px;">'.$detalle['detalle'].'</td>
				<td style="text-align:right;font-size: 14px;">'.number_format($detalle['valor_pago'], 0, ',', '.').'</td>
				<td align="right" style="font-size: 14px;">$ '.number_format($detalle['valor_cancelado'], 0, ',', '.').'</td>
				<td align="right" style="font-size: 14px;">$ '.number_format($detalle['valor_vuelto'], 0, ',', '.').'</td>
				</tr>
				</table>
				</tr>';			
            $debe += ($detalle['valor_pago']);
            $haber += $detalle['valor_cancelado'];
            $vuelto += $detalle['valor_vuelto'];
            
            $i++;
         }       

         //$body_detail .= '</table><td></tr></table></body></html>';
		// RELLENA ESPACIO
		while($i < 30){
			$spaces .= '<tr><td colspan="7">&nbsp;</td></tr>';
			$i++;
		}     

		$footer .= '<tr><td colspan="7">&nbsp;</td></tr></table></td>
		  </tr>
		  <tr>
		  	<td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" >
		      <tr>
		        <td width="827px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
		        <td width="30x"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($haber, 0, ',', '.').'</b></td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$  '.number_format($vuelto, 0, ',', '.').'</b></td>
		      </tr>
		      	</table>
		  	</td>
		  </tr></table>
		</body>
		</html>';


	   /* $html .=  "<tr>";
	      $html .=  '<td bgcolor="#002221" style="color: #FFF" scope="col" colspan="5"><b>TOTALES</b></td>';
	      $html .=  '<td bgcolor="#002221" style="color: #FFF;text-align: right;" scope="col" ><b>'.number_format($debe, 0, ',', '.').'</b></td>';
	      $html .=  '<td bgcolor="#002221" style="color: #FFF;text-align: right;" scope="col"><b>'.number_format($haber, 0, ',', '.').'</b></td>';
	      $html .=  '</tr>';
	    $html .= '</table></td>';
        $html .= "</tr></table>";
		*/

        $html = $header.$header2.$body_header.$body_detail.$footer;
        //echo $html; exit;
        //$html = $header.$header2.$body_header.$body_detail.$spaces;
			$this->load->library("mpdf");
			//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
			//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

			$this->mpdf->mPDF(
				'',    // mode - default ''
				'',    // format - A4, for example, default ''
				8,     // font size - default 0
				'',    // default font family
				10,    // margin_left
				5,    // margin right
				16,    // margin top
				16,    // margin bottom
				9,     // margin header
				9,     // margin footer
				'L'    // L - landscape, P - portrait
				);  
			//echo $html; exit;
			$this->mpdf->WriteHTML($html);
			$this->mpdf->Output("Comprobante".$codigo."pdf", "I");

			exit;     
	}



		

	public function getAll(){

		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');


        //filtro por nombre
        $nombre = $this->input->get('nombre');
        $estado = "";

		$countAll = $this->db->count_all_results("recaudacion");

		if($nombre){
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, p.num_ticket as num_ticket, p.total as total, n.nombre as nom_caja, e.nombre as nom_cajero FROM recaudacion acc
			left join preventa p on (acc.id_ticket = p.id)
			left join clientes c on (acc.id_cliente = c.id)
			left join cajas n on (acc.id_caja = n.id)
			left join cajeros e on (acc.id_cajero = e.id)
			WHERE nom_caja like "%'.$nombre.'%"
			limit '.$start.', '.$limit.'');
		}else{
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, p.num_ticket as num_ticket, p.total as total, n.nombre as nom_caja, e.nombre as nom_cajero FROM recaudacion acc
			left join preventa p on (acc.id_ticket = p.id)
			left join clientes c on (acc.id_cliente = c.id)
			left join cajas n on (acc.id_caja = n.id)
			left join cajeros e on (acc.id_cajero = e.id)
			left join vendedores v on (p.id_vendedor = v.id) order by acc.id desc
			
			limit '.$start.', '.$limit.' ' 

		);
		}

		$data = array();
		foreach ($query->result() as $row)
		{
			$rutautoriza = $row->rut_cliente;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };

		    
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);	
	}

	public function editarecauda(){

		$resp = array();

        $nombre = $this->input->get('ticketid');
        
		if($nombre){
			$query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, c.rut as rut, v.nombre as nom_vendedor, v.id as id_vendedor, p.num_ticket as num_ticket, p.total as total, n.nombre as nom_caja, e.nombre as nom_cajero FROM recaudacion acc
			left join preventa p on (acc.id_ticket = p.id)
			left join clientes c on (acc.id_cliente = c.id)
			left join cajas n on (acc.id_caja = n.id)
			left join cajeros e on (acc.id_cajero = e.id)
			WHERE id like "'.$nombre.'"');
		}
		
		$data = array();
		foreach ($query->result() as $row)
		{
			$rutautoriza = $row->rut_cliente;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut_cliente = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		   
		    };

		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut_cliente = ($ruta2."-".$ruta1);
		     
		    };

		    
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['cliente'] = $data;

        echo json_encode($resp);	
	}

	public function exportarPdflibroRecauda()
         {
            
          $columnas = json_decode($this->input->get('cols'));
          $idcaja = $this->input->get('idcaja');
          $idcajero = $this->input->get('idcajero');
          $nomcaja = $this->input->get('nomcaja');
          $nomcajero = $this->input->get('nomcajero');
          $fecha = $this->input->get('fecha2');
          list($dia, $mes, $anio) = explode("-",$fecha);
          $fecha2 = $anio ."-". $mes ."-". $dia;
          $tipo = $this->input->get('tipo');
          $doc1="";
          $cancelado1=0;
          $doc2="";
          $cancelado2=0;
          $doc3="";
          $cancelado3=0;
          $doc4="";
          $cancelado4=0;
          $doc5="";
          $cancelado5=0;
          $doc6="";
          $cancelado6=0;
          $doc7="";
          $cancelado7=0;
          $doc8="";
          $cancelado8=0;
          $doc9="";
          $cancelado9=0;
          $doc10="";
          $cancelado10=0;
          $doc11="";
          $cancelado11=0;
          $b=0;

          if ($tipo == "DETALLE"){

            $this->load->database();

            $query = $this->db->query('SELECT acc.*, t.nombre as desc_pago,
            r.id_caja as id_caja, r.id_cajero as id_cajero, n.nombre as nom_caja,
            e.nombre as nom_cajero, r.num_comp as num_comp, b.nombre as nom_banco,
            r.num_doc as num_doc, cor.nombre as nom_documento, cli.nombres as nom_cliente FROM recaudacion_detalle acc
            left join cond_pago t on (acc.id_forma = t.id)
            left join recaudacion r on (acc.id_recaudacion = r.id)
            left join preventa pr on (r.id_ticket = pr.id)
            left join correlativos cor on (pr.id_tip_docu = cor.id)
            left join cajas n on (r.id_caja = n.id)
            left join cajeros e on (r.id_cajero = e.id)
            left join banco b on (acc.id_banco = b.id)
            left join clientes cli on (r.id_cliente = cli.id)
            WHERE acc.fecha_comp = "'.$fecha.'" 
            order by num_doc asc');

            
            $header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Libro de Recaudacion</title>
		<style type="text/css">
		td {
			font-size: 16px;
		}
		p {
		}
		</style>
		</head>

		<body>
		<table width="987px" height="602" border="0">
		  <tr>
		 <td width="197px"><img src="http://localhost/Deik/Infosys_web/resources/images/logo.jpg" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>SOCIEDAD COMERCIAL DEIK Y CIA. LIMITADA</p>
		    <p>RUT:76.019.353-4</p>
		    <p>8 ORIENTE 1378 - Talca - Chile</p>
		    <p>Fonos: (71)2 233369</p>
		    <p>http://</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top">
		    <p>FECHA EMISION : '.$fecha2.'</p>
			</td>
		  </tr>';              
              
		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE RECAUDACION</h2></td>
		  </tr>
		  <tr>
			<td>CAJA : '.$nomcaja.'</td>
			<td>CAJERO : '.$nomcajero.'</td>
			<td>FECHA : '.$fecha2.'</td>
		  </tr>
		  <tr>
			
		  </tr>
			<tr><td colspan="3">&nbsp;</td></tr>		  
			';     
		      $cancelado = 0;		     
		      $i = 0;
              //$body_detail = '';
              $users = $query->result_array();
              $despago = " ";
              $boleta = 0;
			  $chequealdia = 0;
			  $chequeafecha = 0;
			  $credito = 0;
			  $tarjetadebito = 0;
			  $tarjetacredito = 0;
			  $transferencia = 0;
			  $valevista = 0;
			  $credito30dias = 0;
			  $credito60dias = 0;
			  $body_header = '<tr>
	    <td colspan="10" >
	    	<table width="987px" cellspacing="0" cellpadding="0" >
	      <tr>
	        <td width="67"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Num.Docum.</td>
	        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Tip Doc.</td>
	        <td width="150px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Cliente</td>
	         <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >&nbsp;</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Total</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Compte</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Efectivo</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Cheque al Dia</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Cheque a fecha</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Credito</td>
	        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Cred 30d</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Tarjeta Debito.</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Tarjeta Credito</td>
	        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Transfer.</td>
	        	             
	       </tr>';	
	       
	          $a="ok";
			
		      foreach($users as $v){	      		      		     	

		      	list($dia, $mes, $anio) = explode("-",$v['fecha_transac']);
				$fecha3 = $anio ."-". $mes ."-". $dia;
	            
	            if ($v['nom_documento']=="BOLETAS"){
            	$tip = "BOL";
            	
            	if ($v['desc_pago']=="CONTADO"){				
					$boleta = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="CHEQUE AL DIA"){				
					$chequealdia = $v['valor_pago'];
					$boleta = 0;
					$chequeafecha = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;				
				};
				if ($v['desc_pago']=="CHEQUE A FECHA"){				
					$chequeafecha = $v['valor_pago'];
					$chequealdia = 0;
					$boleta = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;				
				};
				if ($v['desc_pago']=="CREDITO 30 DIAS"){				
					$credito30dias = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito = 0;				
				};
				if ($v['desc_pago']=="CREDITO"){				
					$credito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
				};
				if ($v['desc_pago']=="CREDITO 60 DIAS"){				
					$credito60dias = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito = 0;
				};
				if ($v['desc_pago']=="TARJETA DEBITO"){				
					$tarjetadebito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$credito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="TARJETA CREDITO"){				
					$tarjetacredito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$credito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="TRANSFERENCIA BANCARIA"){				
					$transferencia = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$credito = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="VALE VISTA"){				
					$valevista = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$credito = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
			};
			if ($v['nom_documento']=="FACTURA ELECTRONICA"){
				$tip = "FACT.";
				if ($v['desc_pago']=="CONTADO"){				
					$boleta = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="CHEQUE AL DIA"){				
					$chequealdia = $v['valor_pago'];
					$boleta = 0;
					$chequeafecha = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;			
				};
				if ($v['desc_pago']=="CHEQUE A FECHA"){				
					$chequeafecha = $v['valor_pago'];
					$chequealdia = 0;
					$boleta = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;				
				};
				if ($v['desc_pago']=="CREDITO 30 DIAS"){				
					$credito30dias = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito = 0;
					$credito60dias = 0;				
				};
				if ($v['desc_pago']=="CREDITO"){				
					$credito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				
				if ($v['desc_pago']=="TARJETA DEBITO"){				
					$tarjetadebito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$credito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="TARJETA CREDITO"){				
					$tarjetacredito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$credito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="TRANSFERENCIA BANCARIA"){				
					$transferencia = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$credito = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				
			};

			if ($v['nom_documento']=="GUIA DE DESPACHO ELECTRONICA"){
				$tip = "G/D";
				if ($v['desc_pago']=="CONTADO"){				
					$boleta = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$credito = 0;
					$credito = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="CHEQUE AL DIA"){				
					$chequealdia = $v['valor_pago'];
					$boleta = 0;
					$chequeafecha = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				
				};
				if ($v['desc_pago']=="CHEQUE A FECHA"){				
					$chequeafecha = $v['valor_pago'];
					$chequealdia = 0;
					$boleta = 0;
					$credito = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				
				};
				if ($v['desc_pago']=="CREDITO 30 DIAS"){				
					$credito30dias = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito = 0;
					$credito60dias = 0;
				
				};
				if ($v['desc_pago']=="CREDITO"){				
					$credito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				
				if ($v['desc_pago']=="TARJETA DEBITO"){				
					$tarjetadebito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$credito = 0;
					$tarjetacredito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="TARJETA CREDITO"){				
					$tarjetacredito = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$credito = 0;
					$transferencia = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				if ($v['desc_pago']=="TRANSFERENCIA BANCARIA"){				
					$transferencia = $v['valor_pago'];
					$chequealdia = 0;
					$chequeafecha = 0;
					$boleta = 0;
					$tarjetadebito = 0;
					$tarjetacredito = 0;
					$credito = 0;
					$valevista = 0;
					$credito30dias = 0;
					$credito60dias = 0;
				};
				
			};

			if ($v['estado']=="NUL"){

				  $boleta = 0;
				  $chequealdia = 0;
				  $chequeafecha = 0;
				  $credito = 0;
				  $tarjetadebito = 0;
				  $tarjetacredito = 0;
				  $transferencia = 0;
				  $valevista = 0;
				  $credito30dias = 0;
				  $credito60dias = 0;
				  $v['valor_pago'] = 0;
				  $v['nom_cliente'] = "DOCUMENTO NULO";				

			};

			if ($a=="ok"){

				$a="no";

				$body_detail .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				</tr>
				<tr>
				<table width="1087" cellspacing="0" cellpadding="0" >
				<tr>				
				<td width="50px" style="text-align:center;">'.$v['num_doc'].'</td>	
				<td width="50px" style="text-align:center;">'.$tip.'</td>
				<td width="120px" style="text-align:left;">'.$v['nom_cliente'].'</td>
				<td width="80px" style="text-align:right;">'.number_format($v['valor_pago'], 0, '.', ',').'</td>
				<td width="80px" style="text-align:right;">'.$v['num_comp'].'</td>
				<td width="80px" style="text-align:right;">'.number_format($boleta, 0, '.', ',').'</td>
				<td width="80px" style="text-align:right;">'.number_format($chequealdia, 0, '.', ',').'</td>
				<td width="80px" style="text-align:right;">'.number_format($chequeafecha, 0, '.', ',').'</td>
				<td width="60px" align="right">'.number_format($credito, 0, '.', ',').'</td>
				<td width="80px" align="right">'.number_format($credito30dias, 0, '.', ',').'</td>
				<td width="80px" align="right">'.number_format($tarjetadebito, 0, '.', ',').'</td>
				<td width="80px" align="right">'.number_format($tarjetacredito, 0, '.', ',').'</td>
				<td width="60px" align="right">'.number_format($transferencia, 0, '.', ',').'</td>
				</tr>
				</table>
				</tr>';				

			}

		    $body_detail .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				</tr>
				<tr>
				<table width="1087" cellspacing="0" cellpadding="0" border="0" >
				<tr>				
				<td width="50px" style="text-align:center;">'.$v['num_doc'].'</td>	
				<td width="50px" style="text-align:center;">'.$tip.'</td>
				<td width="120px" style="text-align:left;">'.$v['nom_cliente'].'</td>
				<td width="80px" style="text-align:right;">'.number_format($v['valor_pago'], 0, '.', ',').'</td>
				<td width="80px" style="text-align:right;">'.$v['num_comp'].'</td>
				<td width="80px" style="text-align:right;">'.number_format($boleta, 0, '.', ',').'</td>
				<td width="80px" style="text-align:right;">'.number_format($chequealdia, 0, '.', ',').'</td>
				<td width="80px" style="text-align:right;">'.number_format($chequeafecha, 0, '.', ',').'</td>
				<td width="60px" align="right">'.number_format($credito, 0, '.', ',').'</td>
				<td width="80px" align="right">'.number_format($credito30dias, 0, '.', ',').'</td>
				<td width="80px" align="right">'.number_format($tarjetadebito, 0, '.', ',').'</td>
				<td width="80px" align="right">'.number_format($tarjetacredito, 0, '.', ',').'</td>
				<td width="60px" align="right">'.number_format($transferencia, 0, '.', ',').'</td>
				</tr>
				</table>
				</tr>';

				if ($v['desc_pago'] == "CHEQUE A FECHA"){
				$doc1 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado1 +=$chequeafecha;
			    };
				};
				if ($v['desc_pago'] == "CONTADO"){
				$doc2 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado2 +=$boleta;
			    };
				};
				if ($v['desc_pago'] == "CREDITO 30 DIAS"){
				$doc3 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado3 +=$credito30dias;
			    };
				};
				if ($v['desc_pago'] == "TARJETA CREDITO"){
				$doc4 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado4 +=$tarjetacredito;
				};
				};
				if ($v['desc_pago'] == "TARJETA DEBITO"){
				$doc5 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado5 +=$tarjetadebito;
			    };
				};
				if ($v['desc_pago'] == "TRANSFERENCIA BANCARIA"){
				$doc6 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado6 +=$transferencia;
			    };
				};
				if ($v['desc_pago'] == "VALE VISTA"){
				$doc7 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado7 +=$valevista;
			    };
				};
				if ($v['desc_pago'] == "CREDITO"){
				$doc9 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado9 += $credito;
			    };
				};
				if ($v['desc_pago'] == "CHEQUE AL DIA"){
				$doc8 = $v['desc_pago'];
				if ($v['estado']!="NUL"){
				$cancelado8 += $chequealdia;
			    };
				};	
				

					  			
          			
	  /*$body_detail .= '<tr>
					
	  </tr>';*/
		//$cancelado += $v['valor_pago'];	        

        //$i=$i+1;

              
     }


     $body_detail .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>TOTALES</b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
        

		</tr></table>
		</tr>';

		if($doc1 != ""){
		
		$footer .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr><tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>

		<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc1.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado1, 0, ',', '.').'</b></td>
		</tr></table>
		</tr>

		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';

	    };

	    if($doc2 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc2.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado2, 0, ',', '.').'</b></td>
		</tr></table>
		</tr>

		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';
	    };
         
        if($doc3 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc3.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado3, 0, ',', '.').'</b></td>
		</tr></table>
		</tr>
		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';
	    };

	    if($doc4 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc4.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado4, 0, ',', '.').'</b></td></tr></table>
		</tr>
		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';
	    };

	    if($doc5 != ""){

		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc5.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado5, 0, ',', '.').'</b></td></tr></table>
		</tr>

		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';
	    };

	    if($doc6 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc6.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado6, 0, ',', '.').'</b></td>
		</tr></table>
		</tr>

		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';

	    };

	    if($doc7 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc7.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado7, 0, ',', '.').'</b></td></tr></table>
		</tr>
		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';

	    };

	    if($doc8 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc8.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado8, 0, ',', '.').'</b></td></tr></table>
		</tr>
		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr>';
	    };

	    if($doc9 != ""){
		$footer .= '<tr>
		<td colspan="3" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="67px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
		<td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc9.'</b></td>
		<td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado9, 0, ',', '.').'</b></td></tr></table>
		</tr>

		<tr><td colspan="10">&nbsp;</td></tr></table></td>
	    </tr></td>
		</tr></table>
		</body>
		</html>';
	    };   
	   	              
             
        $html = $header.$header2;
        $html .=$body_header.$body_detail.$footer;
        //echo $html; exit;
        //$html = $header.$header2.$body_header.$body_detail.$spaces;
		$this->load->library("mpdf");
			//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
			//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

			$this->mpdf->mPDF(
				'',    // mode - default ''
				'',    // format - A4, for example, default ''
				8,     // font size - default 0
				'',    // default font family
				10,    // margin_left
				5,    // margin right
				16,    // margin top
				16,    // margin bottom
				9,     // margin header
				9,     // margin footer
				'L'    // L - landscape, P - portrait
				);  
			//echo $html; exit;
			$this->mpdf->WriteHTML($html);
			//$this->mpdf->AddPage();
			//$this->mpdf->WriteHTML($html2);
			$this->mpdf->Output("LibroRecauda.pdf", "I");

			exit;            
               

            
          }else{

          	$this->load->database();

            $query = $this->db->query('SELECT acc.*, t.nombre as desc_pago, n.nombre as nom_caja, e.nombre as nom_cajero, r.num_comp as num_comp, cor.nombre as nom_documento, cli.nombres as nom_cliente FROM recaudacion_general acc
            left join cond_pago t on (acc.id_forma = t.id)
            left join recaudacion r on (acc.id_recaudacion = r.id)
            left join preventa pr on (r.id_ticket = pr.id)
            left join correlativos cor on (pr.id_tip_docu = cor.id)
            left join cajas n on (acc.id_caja = n.id)
            left join cajeros e on (acc.id_cajero = e.id)
            left join clientes cli on (r.id_cliente = cli.id)
            WHERE acc.fecha = "'.$fecha.'"
            order by num_documento asc');

                $header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Libro de Recaudacion</title>
		<style type="text/css">
		td {
			font-size: 16px;
		}
		p {
		}
		</style>
		</head>

		<body>
		<table width="987px" height="602" border="0">
		  <tr>
		  <td width="197px"><img src="http://localhost/Deik/Infosys_web/resources/images/logo.jpg" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>SOCIEDAD COMERCIAL DEIK Y CIA. LIMITADA</p>
		    <p>RUT:76.019.353-4</p>
		    <p>8 ORIENTE 1378 - Talca - Chile</p>
		    <p>Fonos: (71)2 233369</p>
		    <p>http://</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top">
		    <p>FECHA EMISION : '.$fecha2.'</p>
			</td>
		  </tr>';              
              
		  $header .= '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE RECAUDACION</h2></td>
		  </tr>
		  <tr>
			<td>CAJA : '.$nomcaja.'</td>
			<td>CAJERO : '.$nomcajero.'</td>
			<td>FECHA : '.$fecha2.'</td>
		  </tr>
		  <tr>
			
		  </tr>
			<tr><td colspan="3">&nbsp;</td></tr>		  
			</table>';     
		      $cancelado = 0;		     
		      $i = 0;
              //$body_detail = '';
              $users = $query->result_array();
              $despago = " ";
              $boleta = 0;
			  $chequealdia = 0;
			  $chequeafecha = 0;
			  $credito = 0;
			  $tarjetadebito = 0;
			  $tarjetacredito = 0;
			  $transferencia = 0;
			  $valevista = 0;
			  $credito30dias = 0;
			  $credito60dias = 0;

			  $header .= '
	    	<table width="987px" cellspacing="0" cellpadding="0" border="0">
	      <tr>
	        <td width="60"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;font-size:12px" >Num.Doc.</td>
	        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;font-size:12px" >Tip Doc.</td>
	        <td width="247px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;font-size:12px" >Cliente</td>
	         <!--td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >&nbsp;</td-->
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Total</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Compte</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Efectivo</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Cheque al Dia</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Cheque a fecha</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Credito</td>
	        <td width="80px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Cred 30d</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Tarjeta Debito</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Tarjeta Credito</td>
	        <td width="60px"  style="text-align:right;border-bottom:1pt solid black;border-top:1pt solid black;font-size:12px" >Transfer.</td>
	        	             
	       </tr>';	
	       
	          $a="ok";

			  $array_detail = array();
		      foreach($users as $v){
		      	$body_detail = "";	      		      		     	

		      	list($dia, $mes, $anio) = explode("-",$v['fecha']);
				$fecha3 = $anio ."-". $mes ."-". $dia;
	            
	            if ($v['nom_documento']=="BOLETAS"){
            	$tip = "BOL";            	
				};
				if ($v['nom_documento']=="FACTURA ELECTRONICA"){
				$tip = "FACT.";				
				};
				if ($v['nom_documento']=="GUIA DE DESPACHO ELECTRONICA"){
				$tip = "G/D";
				};

				$boleta = $v['contado'];
				$chequealdia = $v['chequealdia'];
				$chequeafecha = $v['chequeafecha'];
				$credito = $v['credito'];
				$tarjetadebito = $v['tarjetadebito'];
				$tarjetacredito = $v['tarjetacredito'];
				$transferencia = $v['transferencia'];
				$credito30dias = $v['credito30dias'];
				$credito60dias = $v['credito60dias'];
				$valor_pago = ($boleta+$chequealdia+$chequeafecha+$credito+$tarjetadebito+$tarjetacredito+$transferencia+$credito30dias+$credito60dias);

				if ($v['estado']=="NUL"){

				  $boleta = 0;
				  $chequealdia = 0;
				  $chequeafecha = 0;
				  $credito = 0;
				  $tarjetadebito = 0;
				  $tarjetacredito = 0;
				  $transferencia = 0;
				  $valevista = 0;
				  $credito30dias = 0;
				  $credito60dias = 0;
				  $valor_pago=0;
				  $v['nom_cliente'] = "DOCUMENTO NULO";				

				}
				
				
			if ($a=="ok"){

				$a="no";

				$body_detail .= '
				<tr>				
				<td width="60px" style="text-align:center;font-size:12px">'.$v['num_documento'].'</td>	
				<td width="60px" style="text-align:center;font-size:12px">'.$tip.'</td>
				<td width="247px" style="text-align:left;font-size:12px">'.$v['nom_cliente'].'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($valor_pago, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.$v['num_comp'].'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($boleta, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($chequealdia, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($chequeafecha, 0, ',', ',').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($credito, 0, ',', '.').'</td>
				<td width="80px" style="text-align:right;font-size:12px">'.number_format($credito30dias, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($tarjetadebito, 0, ',', ',').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($tarjetacredito, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($transferencia, 0, ',', '.').'</td>
				</tr>
				';				

			};

		    $body_detail .= '
				<tr>				
				<td width="60px" style="text-align:center;font-size:12px">'.$v['num_documento'].'</td>	
				<td width="60px" style="text-align:center;font-size:12px">'.$tip.'</td>
				<td width="247px" style="text-align:left;font-size:12px">'.$v['nom_cliente'].'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($valor_pago, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.$v['num_comp'].'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($boleta, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($chequealdia, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($chequeafecha, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($credito, 0, ',', '.').'</td>
				<td width="80px" style="text-align:right;font-size:12px">'.number_format($credito30dias, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($tarjetadebito, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($tarjetacredito, 0, ',', '.').'</td>
				<td width="60px" style="text-align:right;font-size:12px">'.number_format($transferencia, 0, ',', '.').'</td>
				</tr>
				';


				$array_detail[] = $body_detail;
				if ($chequeafecha>0){
				$doc1 = "CHEQUE A FECHA";
				if ($v['estado']!="NUL"){
				$cancelado1 +=$chequeafecha;
			    };
				};
				if ($boleta>0){
				$doc2 = "CONTADO";
				if ($v['estado']!="NUL"){
				$cancelado2 +=$boleta;
			    };
				};
				if ($credito30dias>0){
				$doc3 = "CREDITO 30 DIAS";
				if ($v['estado']!="NUL"){
				$cancelado3 +=$credito30dias;
			    };
				};
				if ($tarjetacredito>0){
				$doc4 = "TARJETA CREDITO";
				if ($v['estado']!="NUL"){
				$cancelado4 +=$tarjetacredito;
				};
				};
				if ($tarjetadebito>0){
				$doc5 = "TARJETA DEBITO";
				if ($v['estado']!="NUL"){
				$cancelado5 +=$tarjetadebito;
			    };
				};
				if ($transferencia>0){
				$doc6 = "TRANSFERENCIA BANCARIA";
				if ($v['estado']!="NUL"){
				$cancelado6 +=$transferencia;
			    };
				};
				if ($credito>0){
				$doc9 = "CREDITO";
				if ($v['estado']!="NUL"){
				$cancelado9 += $credito;
			    };
				};
				if ($chequealdia>0){
				$doc8 = "CHEQUE AL DIA";
				if ($v['estado']!="NUL"){
				$cancelado8 += $chequealdia;
			    };
				};
				
				$i++;
					  			
          			
	  /*$body_detail .= '<tr>
					
	  </tr>';*/
		//$cancelado += $v['valor_pago'];	        

        //$i=$i+1;

             
     };


     $body_totales = '<table width="987px" cellspacing="0" cellpadding="0" border="0"><tr><td colspan="2">&nbsp;</td></tr><tr>
		<td  colspan="13" style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>TOTALES</b></td>
		</tr>';
		$footer = "";

		if($doc1 != ""){
		
		$footer .= '
		<tr>
		<td width="867px"  style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc1.'</b></td>
		<td width="120px"  style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado1, 0, ',', '.').'</b></td>
		</tr>
		';

	    };

	    if($doc2 != ""){

		$footer .= '<tr>
		<tr>
		<td width="867px"  style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc2.'</b></td>
		<td width="120px"  style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado2, 0, ',', '.').'</b></td>
	    </tr>';

	    };
	    	         
        if($doc3 != ""){

		$footer .= '
		<tr>
		<td width="867px"   style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc3.'</b></td>
		<td width="120px"  style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado3, 0, ',', '.').'</b></td>
	    </tr>';

	    };

	    if($doc4 != ""){

		$footer .= '
		<tr>
		<td width="867px"    style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc4.'</b></td>
		<td width="120px"  style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado4, 0, ',', '.').'</b></td>
	    </tr>';

	    };

	    if($doc5 != ""){

		$footer .= '
		<tr>
		<td width="867px"     style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc5.'</b></td>
		<td width="120px"   style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado5, 0, ',', '.').'</b></td>
	    </tr>';

	    };

	    /*if($doc5 != ""){

		$footer .= '<tr>
		<td colspan="13" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="867px" colspan="11"  style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc5.'</b></td>
		<td width="120px" colspan="2" style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado5, 0, ',', '.').'</b></td>
		</tr></table>
		</tr>

		</table></td>
	    </tr>';

	    };*/


	    if($doc6 != ""){

		$footer .= '
		<tr>
		<td width="867px"     style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc6.'</b></td>
		<td width="120px"   style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado6, 0, ',', '.').'</b></td>
	    </tr>';

	    };	   

	    /*if($doc6 != ""){

		$footer .= '
		<tr>
		<td width="867px" colspan="11" style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc6.'</b></td>
		<td width="120px" colspan="2" style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado6, 0, ',', '.').'</b></td>
		</tr>';

	    };*/
	    
	    if($doc8 != ""){

		$footer .= '
		<tr>
		<td width="867px"     style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc8.'</b></td>
		<td width="120px"   style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado8, 0, ',', '.').'</b></td>
	    </tr>';

	    };	   


	    /*if($doc8 != ""){

		$footer .= '<tr>
		<td colspan="13" >
		<table width="987px" cellspacing="0" cellpadding="0" border="0">
		<tr>
		<td width="867px" colspan="11" style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc8.'</b></td>
		<td width="120px" colspan="2" style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado8, 0, ',', '.').'</b></td>
		</tr></table>
		</tr>

		</table></td>
	    </tr>';

	    };*/

	    //echo $doc9;
	    if($doc9 != ""){
		$footer .= '<tr>
		<td width="867px"  style="border-bottom:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc9.'</b></td>
		<td width="120px"  style="border-bottom:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado9, 0, ',', '.').'</b></td>
		</tr>

		';
	    }; 


	    $fin_tabla = "</table>
		</body>
		</html>";
	    /*if($doc9 != ""){

		$footer .= '
		<tr>
		<td width="867px" colspan="11" style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>'.$doc9.'</b></td>
		<td width="120px" colspan="2" style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($cancelado9, 0, ',', '.').'</b></td>
		</tr></table>
		</body>
		</html>';
	    };   */
	   	              
             
        //$html = $header.$header2;
        //$html .=$body_header.$body_detail.$footer;
       // echo $html; exit;
        //$html = $header.$header2.$body_header.$body_detail.$spaces;
		$this->load->library("mpdf");
			//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
			//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

			$this->mpdf->mPDF(
				'',    // mode - default ''
				'',    // format - A4, for example, default ''
				6,     // font size - default 0
				'',    // default font family
				5,    // margin_left
				5,    // margin right
				16,    // margin top
				16,    // margin bottom
				9,     // margin header
				9,     // margin footer
				'L'    // L - landscape, P - portrait
				);  

			$cantidad_hoja = 40;
			$fila = 1;
			foreach ($array_detail as $detail) {
				if($fila == 1){
					$this->mpdf->WriteHTML($header);		
					//echo $header.$header2.$body_header;
				}

				$this->mpdf->WriteHTML($detail);
				//echo $detail;

				if(($fila % $cantidad_hoja) == 0 ){  #LLEVA 30 LINEAS EN LA HOJA
						$this->mpdf->WriteHTML($fin_tabla);					
					//echo $fin_tabla;
						$fila = 0;
						$this->mpdf->AddPage();
				}		
				//echo $fila."<br>";
				$fila++;
			}
			$this->mpdf->WriteHTML($fin_tabla);
			//echo $body_totales.$footer.$fin_tabla; exit;
			$this->mpdf->WriteHTML($body_totales.$footer.$fin_tabla);
			//echo $html; exit;
			//exit;
			//$this->mpdf->AddPage();
			//$this->mpdf->WriteHTML($html2);
			$this->mpdf->Output("LibroRecauda.pdf", "I");

			exit;            

          	
          }          

		
        }


}
