<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Guias extends CI_Controller {



	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function procesomarca(){

		$resp = array();
		$query = $this->db->query('SELECT * FROM detalle_factura_glosa ');

		if($query->num_rows()>0){

			foreach ($query->result() as $row){
					
					$idguia = $row->id_guia;

			   		$data3 = array(
			         'id_despacho' => $row->id_factura
				    );
					$this->db->where('id_factura', $idguia);		  
		    		$this->db->update('detalle_factura_cliente', $data3);
		    		$data[] = $row;
		    			

	    	};

	    	$resp['success'] = true;
	    	$resp['data'] = $data;

		}else{
			
			$resp['success'] = false;

		};
		 
		
	    echo json_encode($resp);

	}

	public function marcarguias(){

		$resp = array();
		$idfactura = $this->input->post('factura');
		$tipo = 3;

		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
		left join clientes c on (acc.id_cliente = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		WHERE acc.tipo_documento in ( '.$tipo.') and acc.id = '.$idfactura.''			
		);

		if($query->num_rows()>0){
	   		$row = $query->first_row();
	   		$id = ($row->id);

	   		$data3 = array(
	         'id_factura' => 1,
		    );

		    $this->db->where('id', $id);
		  
		    $this->db->update('factura_clientes', $data3);

		    $this->Bitacora->logger("M", 'factura_clientes', $id); 
			
			

	     };

	     $resp['success'] = true;
	     echo json_encode($resp);

		
	}

	public function numerofactura(){

		$resp = array();
		$factura = $this->input->get('factura');
       		
		$query = $this->db->query('SELECT * FROM correlativos WHERE id like "'.$factura.'"');

		$id = $data->id;
		$data = array(
	        'nombre' => strtoupper($data->nombre),
	        'correlativo' => $data->correlativo
	    );
		$this->db->where('id', $id);
		
		$this->db->update('correlativos', $data); 

        $resp['success'] = true;

		if($query->num_rows()>0){
	   			$row = $query->first_row();
	   			$resp['cliente'] = $row;
	   

	        $resp['success'] = true;
	        echo json_encode($resp);

	   }else{
	   	    $resp['success'] = false;
	   	    echo json_encode($resp);
	        return false;
	   }

	
	 }

	
	public function getAll(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $tipo = 3;
        $countAll = $this->db->count_all_results("factura_clientes");
		$data = array();
		$total = 0;
	

        if($opcion == "Rut"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.') and c.rut = '.$nombres.'
			order by acc.id desc		
			limit '.$start.', '.$limit.''		 

		);

		$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

	    }else if($opcion == "Nombre"){

	    	
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "and c.nombres like '%".$nombre."%' ";
	        }
	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.') ' . $sql_nombre . '
			order by acc.id desc		
			limit '.$start.', '.$limit.''
						
			);

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	 
		}else if($opcion == "Todos"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.')
			order by acc.id desc'	
			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		}else{

			
		$data = array();
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.')
			order by acc.id desc		
			limit '.$start.', '.$limit.''	

			);


		}		
		
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
		    $total = $total +1;
			
		 
			$data[] = $row;
		}

		//$countAll = $total;
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function pendientes(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $idcliente = $this->input->get('idcliente');
        $tipo = 3;
        $tipo2 = 105;        

        $countAll = $this->db->count_all_results("factura_clientes");
		$data = array();
		$total = 0;
		
		if ((!$opcion) && (!$nombres) && (!$idcliente)){

			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') and acc.id_factura = 0
			order by acc.id desc'	
			
			);
			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;			

		}	

        if($opcion == "Rut"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ('.$tipo.','.$tipo2.') and c.rut = '.$nombres.'
			and acc.id_factura = 0
			order by acc.id desc		
			limit '.$start.', '.$limit.''		 

		);

		$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

	    };

	    if($opcion == "Numero"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ('.$tipo.','.$tipo2.') and acc.num_factura = '.$nombres.'
			and acc.id_factura = 0'		 

		);

		$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

	    };

	    if($opcion == "Nombre"){

	    	
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "and c.nombres like '%".$nombre."%' ";
	        }
	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') ' . $sql_nombre . '
			and acc.id_factura = 0
			order by acc.id desc		
			limit '.$start.', '.$limit.''
						
			);

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	 
		};

		if($opcion == "Id"){
			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') and acc.id_cliente = '.$nombres.'
			and acc.id_factura = 0
			order by acc.id desc		
			limit '.$start.', '.$limit.''		 

			);

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		};

		if($opcion == "Todos"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') and acc.id_factura = 0
			order by acc.id desc'	
			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		};		
		
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
		    $total = $total +1;
			
		 
			$data[] = $row;
		}

		//$countAll = $total;
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function save(){
		
		$resp = array();

		$idcliente = $this->input->post('idcliente');
		$numfactura = $this->input->post('numfactura');
		$fechafactura = $this->input->post('fechafactura');
		$sucursal = $this->input->post('idsucursal');
		$observacion = $this->input->post('observacion');
		$ordencompra = $this->input->post('ordencompra');
		$idobserva = $this->input->post('idobserva');
		$fechavenc = $this->input->post('fechavenc');
		$vendedor = $this->input->post('idvendedor');
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('netofactura');
		$fiva = $this->input->post('ivafactura');
		$fafecto = $this->input->post('afectofactura');
		$ftotal = $this->input->post('totalfacturas');
		$descuento = $this->input->post('descuentofactuta');
		$tipodocumento = $this->input->post('tipodocumento');
		//$tipodocumento = 1;

		$data3 = array(
	         'correlativo' => $numfactura
	    );
	    $this->db->where('id', $tipodocumento);
	  
	    $this->db->update('correlativos', $data3);
			
		$factura_cliente = array(
			'tipo_documento' => $tipodocumento,
	        'id_cliente' => $idcliente,
	        'num_factura' => $numfactura,
	        'id_vendedor' => $vendedor,
	        'id_sucursal' => $sucursal,
	        'sub_total' => $neto,
	        'observacion' => $observacion,
	        'id_observa' => $idobserva,
	        'descuento' => $descuento,
	        'neto' => $fafecto,
	        'iva' => $fiva,
	        'totalfactura' => $ftotal,
	        'fecha_factura' => $fechafactura,
	        'fecha_venc' => $fechavenc,
	        'forma' => 1,
	        'orden_compra' => $ordencompra
		);

		$this->db->insert('factura_clientes', $factura_cliente); 
		$idfactura = $this->db->insert_id();

		foreach($items as $v){
			$factura_clientes_item = array(
		        'id_guia' => $v->id_guia,
		        'id_factura' => $idfactura,
		        'num_guia' => $v->num_guia,
		        'neto' => $v->neto,
		        'iva' => $v->iva,
		        'total' => $v->total
			);


		
		$this->db->insert('detalle_factura_glosa', $factura_clientes_item);

			$data3 = array(
	         'id_factura' => $idfactura,
		    );

		    $data4 = array(
	         'id_despacho' => $idfactura,
		    );

		    $this->db->where('id', $v->id_guia);
		  
		    $this->db->update('factura_clientes', $data3);

		    $this->db->where('num_factura', $v->num_guia);
		  
		    $this->db->update('detalle_factura_cliente', $data4);

		}

		/******* CUENTAS CORRIENTES ****/

		 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR COBRAR'");
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
	        'glosa' => 'Registro de Factura en Cuenta Corriente',
	        'fecvencimiento' => $fechavenc,
	        'valor' => $ftotal,
	        'origen' => 'VENTA',
	        'fecha' => $fechafactura
		);

		$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 			

		/*****************************************/


		if($tipodocumento == 101 || $tipodocumento == 103){  // SI ES FACTURA ELECTRONICA O FACTURA EXENTA ELECTRONICA

			$tipo_caf = $tipodocumento == 101 ? 33 : 34;

			header('Content-type: text/plain; charset=ISO-8859-1');
			$this->load->model('facturaelectronica');
			$config = $this->facturaelectronica->genera_config();
			include $this->facturaelectronica->ruta_libredte();


			$empresa = $this->facturaelectronica->get_empresa();
			$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);

			$detalle_factura = $this->facturaelectronica->get_detalle_factura_glosa($idfactura);
			$datos_factura = $this->facturaelectronica->get_factura($idfactura);

			$lista_detalle = array();
			$i = 0;
			foreach ($detalle_factura as $detalle) {
				//$lista_detalle[$i]['NmbItem'] = $detalle->glosa;
				//$lista_detalle[$i]['NmbItem'] = substr($detalle->glosa,0,70);
				$lista_detalle[$i]['NmbItem'] = "SEGUN GUIA NRO ". $detalle->num_guia;
				$lista_detalle[$i]['QtyItem'] = 1;
				//$lista_detalle[$i]['PrcItem'] = $detalle->precio;
				//$lista_detalle[$i]['PrcItem'] = round((($detalle->precio*$detalle->cantidad)/1.19)/$detalle->cantidad,0);
				//$total = $detalle->precio*$detalle->cantidad;
				//$neto = round($total/1.19,2);

				//$lista_detalle[$i]['PrcItem'] = round($neto/$detalle->cantidad,2);
				$lista_detalle[$i]['PrcItem'] = $tipo_caf == 33 || $tipo_caf == 52 ? floor($detalle->neto) : floor($detalle->total);

				/*if($detalle->descuento != 0){
					$porc_descto = round(($detalle->descuento/($detalle->cantidad*$lista_detalle[$i]['PrcItem'])*100),0);
					$lista_detalle[$i]['DescuentoPct'] = $porc_descto;		
					//$lista_detalle[$i]['PrcItem'] =- $lista_detalle[$i]['PrcItem']*$porc_descto;

				}*/

				$i++;
			}


			// datos
			$factura = [
			    'Encabezado' => [
			        'IdDoc' => [
			            'TipoDTE' => $tipo_caf,
			            'Folio' => $numfactura,
			            'FchEmis' => substr($fechafactura,0,10)
			        ],
			        'Emisor' => [
			            'RUTEmisor' => $empresa->rut.'-'.$empresa->dv,
			            'RznSoc' => substr($empresa->razon_social,0,100), //LARGO DE RAZON SOCIAL NO PUEDE SER SUPERIOR A 100 CARACTERES,
			            'GiroEmis' => substr($empresa->giro,0,80), //LARGO DE GIRO DEL EMISOR NO PUEDE SER SUPERIOR A 80 CARACTERES
			            'Acteco' => $empresa->cod_actividad,
			            'DirOrigen' => substr($empresa->dir_origen,0,70), //LARGO DE DIRECCION DE ORIGEN NO PUEDE SER SUPERIOR A 70 CARACTERES
			            'CmnaOrigen' => substr($empresa->comuna_origen,0,20), //LARGO DE COMUNA DE ORIGEN NO PUEDE SER SUPERIOR A 20 CARACTERES
			        ],
			        'Receptor' => [
			            'RUTRecep' => substr($datos_empresa_factura->rut_cliente,0,strlen($datos_empresa_factura->rut_cliente) - 1)."-".substr($datos_empresa_factura->rut_cliente,-1),
			            'RznSocRecep' => substr($datos_empresa_factura->nombre_cliente,0,100), //LARGO DE RAZON SOCIAL NO PUEDE SER SUPERIOR A 100 CARACTERES
			            'GiroRecep' => substr($datos_empresa_factura->giro,0,40),  //LARGO DEL GIRO NO PUEDE SER SUPERIOR A 40 CARACTERES
			            'DirRecep' => substr($datos_empresa_factura->direccion,0,70), //LARGO DE DIRECCION NO PUEDE SER SUPERIOR A 70 CARACTERES
			            'CmnaRecep' => substr($datos_empresa_factura->nombre_comuna,0,20), //LARGO DE COMUNA NO PUEDE SER SUPERIOR A 20 CARACTERES
			        ],
		            'Totales' => [
		                // estos valores serán calculados automáticamente
		                'MntNeto' => isset($datos_factura->neto) ? $datos_factura->neto : 0,
		                'TasaIVA' => \sasco\LibreDTE\Sii::getIVA(),
		                'IVA' => isset($datos_factura->iva) ? $datos_factura->iva : 0,
		                'MntTotal' => isset($datos_factura->totalfactura) ? $datos_factura->totalfactura : 0,
		            ],			        
			    ],
				'Detalle' => $lista_detalle
			];

			//FchResol y NroResol deben cambiar con los datos reales de producción
			$caratula = [
			    //'RutEnvia' => '11222333-4', // se obtiene de la firma
			    'RutReceptor' => '60803000-K',
			    'FchResol' => $empresa->fec_resolucion,
			    'NroResol' => $empresa->nro_resolucion
			];

			
			//exit;
			// Objetos de Firma y Folios
			$Firma = new sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital		

			$caf = $this->facturaelectronica->get_content_caf_folio($numfactura,$tipo_caf);
			$Folios = new sasco\LibreDTE\Sii\Folios($caf->caf_content);

			$DTE = new \sasco\LibreDTE\Sii\Dte($factura);

			$DTE->timbrar($Folios);
			$DTE->firmar($Firma);		


			// generar sobre con el envío del DTE y enviar al SII
			$EnvioDTE = new \sasco\LibreDTE\Sii\EnvioDte();
			$EnvioDTE->agregar($DTE);
			$EnvioDTE->setFirma($Firma);
			$EnvioDTE->setCaratula($caratula);
			$xml_dte = $EnvioDTE->generar();
			
			if ($EnvioDTE->schemaValidate()) { // REVISAR PORQUÉ SE CAE CON ESTA VALIDACION
				
				$track_id = 0;
			    $xml_dte = $EnvioDTE->generar();
			    //$track_id = $EnvioDTE->enviar();
			    $tipo_envio = $this->facturaelectronica->busca_parametro_fe('envio_sii'); //ver si está configurado para envío manual o automático


				$nombre_dte = $numfactura."_". $tipo_caf ."_".$idfactura."_".date("His").".xml"; // nombre archivo
				$path = date('Ym').'/'; // ruta guardado
				if(!file_exists('./facturacion_electronica/dte/'.$path)){
					mkdir('./facturacion_electronica/dte/'.$path,0777,true);
				}				
				$f_archivo = fopen('./facturacion_electronica/dte/'.$path.$nombre_dte,'w');
				fwrite($f_archivo,$xml_dte);
				fclose($f_archivo);

			    if($tipo_envio == 'automatico'){
				    $track_id = $EnvioDTE->enviar();
			    }



			    $this->db->where('f.folio', $numfactura);
			    $this->db->where('c.tipo_caf', $tipo_caf);
				$this->db->update('folios_caf f inner join caf c on f.idcaf = c.id',array('dte' => $xml_dte,
																						  'estado' => 'O',
																						  'idfactura' => $idfactura,
																						  'path_dte' => $path,
																						  'archivo_dte' => $nombre_dte,
																						  'trackid' => $track_id
																						  )); 
				if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
					$this->facturaelectronica->envio_mail_dte($idfactura);
				}




			}

		}



        $resp['success'] = true;
		$resp['idfactura'] = $idfactura;

		$this->Bitacora->logger("I", 'factura_clientes', $idfactura);

		
        

        echo json_encode($resp);
	}

	

}









