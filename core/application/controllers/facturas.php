<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Facturas extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}

	public function anulacion(){

		$resp = array();		
        $idfactura = $this->input->get('idfactura');
        $idbodega=1;
        $tipodocumento=24;
        
        $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
		left join clientes c on (acc.id_cliente = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		WHERE acc.id = '.$idfactura.'');
		if($query->num_rows()>0){
	 		$row = $query->first_row();
	 	    $forma = ($row->forma);
	 	    $numfactura= $row->num_factura;
	 	    $idcliente = $row->id_cliente;

	 	    $recauda = $this->db->query('SELECT * FROM recaudacion 
			WHERE num_doc = '.$numfactura.' and id_cliente = '.$idcliente.' ');
			
			if($recauda->num_rows()>0){
				$row = $recauda->first_row();
	   			$id = $row->id;

	   			$nulos = array(
				'estado' => "NUL"	        
				);
				$this->db->where('id_recaudacion', $id);	  
			    $this->db->update('recaudacion_detalle', $nulos);

			    $this->db->where('id_recaudacion', $id);	  
			    $this->db->update('recaudacion_general', $nulos);
	   		};

	 	    $factura_cliente = array(
			'estado' => "NO"	        
			);
			$this->db->where('id', $idfactura);	  
		    $this->db->update('factura_clientes', $factura_cliente);

		    $items = $this->db->get_where('detalle_factura_cliente', array('id_factura' => $idfactura));

		    foreach($items->result() as $v){

	    	$producto=$v->id_producto;
	    	$query = $this->db->query('SELECT * FROM existencia 
	    	WHERE id_producto='.$producto.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)+($v->cantidad);
				$idexiste = ($row->id);
		        if ($producto==($row->id_producto) and $idbodega==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }else{

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' => $v->cantidad,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
		    	 	}
				}else{					

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' =>  $v->cantidad,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
			    	
				};

				$datos2 = array(
						'num_movimiento' => $numfactura,
				        'id_producto' => $v->id_producto,
				        'id_tipo_movimiento' => $tipodocumento,
				        'valor_producto' =>  $v->precio,
				        'cantidad_entrada' => $v->cantidad,
				        'id_bodega' => $idbodega,
				        'fecha_movimiento' => date('Y-m-d H:i:s')
				);

				$this->db->insert('existencia_detalle', $datos2);
		    }
	 	    
	 	};

	 	$resp['success'] = true;
        echo json_encode($resp);
	 	
	 	 
		

	}

	public function getAlldespachaproductos(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $codigo = $this->input->get('codigo');        
        $tipo = "1";
        $tipo2 = "101";
        $tipo3 = "103";
		$countAll = $this->db->count_all_results("detalle_factura_cliente");
		$data = array();
		if($nombre){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
		left join clientes c on (acc.id_cliente = c.id)
		left join vendedores v on (acc.id_vendedor = v.id)
		WHERE acc.id = '.$nombre.' AND acc.tipo_documento in ("'.$tipo.'","'.$tipo2.'","'.$tipo3.'")');
		if($query->num_rows()>0){
	 		$row = $query->first_row();
	 	    $forma = ($row->forma);
	 	    if ($forma==1 or $forma==2){
	 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
	 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
	   		  	FROM detalle_factura_cliente acc    
	   		  	left join productos p on (acc.id_producto = p.id)
				WHERE acc.id_despacho = "'.$nombre.'"');
			}else{
	 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
	 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
	   		  	FROM detalle_factura_cliente acc    
	   		  	left join productos p on (acc.id_producto = p.id)
				WHERE acc.id_factura = "'.$nombre.'"'
			    );		 	        
	 	    }	 	

		 };
		    
		    $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{			
			$data[] = $row;
		}

	    }else{
	    	$sql_nombre = "";
	        $arrayNombre =  explode(" ",$codigo);
	        foreach ($arrayNombre as $codigo) {
	        	$sql_nombre .= "acc.nombre like '%".$codigo."%' and ";
	        }
			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia,
			acc.id as id_producto FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1');		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{
			
			$data[] = $row;
		}

	    	

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}


	public function unlink_fe($dir,$file){
		unlink("./facturacion_electronica/".$dir."/".$file);
	}

	public function dteproveegetAll(){
	$this->db->select('d.id, p.nombres as proveedor, p.e_mail, d.path_dte, d.arch_rec_dte, d.arch_res_dte, d.arch_env_rec, date_format(d.fecha_documento,"%d/%m/%Y") as fecha_documento , date_format(d.created_at,"%d/%m/%Y") as fecha_creacion ',false)
  	  ->from('dte_proveedores d')
	  ->join('proveedores p','d.idproveedor = p.id')
	  ->order_by('d.id','desc');
		$query = $this->db->get();
		$dte_provee = $query->result();
		echo json_encode($dte_provee);
	}

	public function contribautorizadosgetAll(){
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');

		$this->load->model('facturaelectronica');
		$datos_contribuyentes = $this->facturaelectronica->contribuyentes_autorizados($start,$limit);

        $resp['success'] = true;
        $resp['total'] = $datos_contribuyentes['total'];
        $resp['data'] = $datos_contribuyentes['data'];

        echo json_encode($resp);
	}


	public function librosgetAll(){
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');

		$this->load->model('facturaelectronica');
		$datos_contribuyentes = $this->facturaelectronica->log_libros($start,$limit);

		$data = array();
		foreach($datos_contribuyentes['data'] as $data_contribuyentes){
			$data_contribuyentes->mes = month2string($data_contribuyentes->mes);
			$data[] = $data_contribuyentes;

		};

        $resp['success'] = true;
        $resp['total'] = $datos_contribuyentes['total'];
        $resp['data'] = $data;
        echo json_encode($resp);
	}	

	public function get_proveedores_mail(){
		$this->db->select('p.id, p.nombres as proveedor')
		  ->from('proveedores p')
		  ->where("e_mail <> ''  and e_mail like '%@%'")
		  ->order_by('p.nombres asc');
		$query = $this->db->get();
		$provee = $query->result();
		echo json_encode($provee);	

	}	


	public function put_trackid(){
		$trackid = $this->input->post('trackid');
		$idfactura = $this->input->post('idfactura');
		$this->load->model('facturaelectronica');
		$this->facturaelectronica->put_trackid($idfactura,$trackid);
		$result['success'] = true;
		$result['message'] = "Identificador de Envío actualizado correctamente";
		echo json_encode($result);		

	}	


	public function envio_mail_dte(){
		$idfactura = $this->input->post('idfactura');
		$this->load->model('facturaelectronica');
		$result_envio = $this->facturaelectronica->envio_mail_dte($idfactura);

		if($result_envio){
			$result['success'] = true;
			$result['message'] = "DTE enviado correctamente";
		}else{
			$result['error'] = true;
			$result['message'] = "Error al enviar DTE";
		}
		echo json_encode($result);		
	}



	public function get_annos(){
		$anno = date("Y");
		$array_annos = array();
		$anno_inic = $anno - 15;
		while($anno_inic <= $anno){
			array_push($array_annos,array('anno' => $anno));
			//$array_annos[$anno_inic] = $anno_inic;
			$anno--;
		}
		echo json_encode($array_annos);
	}	


	public function get_proveedor($idproveedor = null){
		$proveedor_data = $this->db->select('p.id, p.rut, p.nombres, p.direccion, p.fono, p.e_mail')
						  ->from('proveedores as p');

		$proveedor_data = is_null($idproveedor) ? $proveedor_data : $proveedor_data->where('p.id',$idproveedor);  		                  
		$query = $this->db->get();
		$datos = is_null($idproveedor) ? $query->result() : $query->row();		
		return $datos;

	}


	public function show_dte($idfactura){
		$this->db->select('path_dte, archivo_dte ')
		  ->from('folios_caf')
		  ->where('idfactura',$idfactura)
		  ->limit(1);
		$query = $this->db->get();
		$factura = $query->row();
		echo json_encode($factura);	

	}



	public function genera_libro(){
		// respuesta en texto plano
		header('Content-type: text/plain; charset=ISO-8859-1');
		$tipo_libro = $this->input->post('tipo_libro') == 'compras' ? 'COMPRA' : 'VENTA';
		$mes = $this->input->post('mes');
		$anno = $this->input->post('anno');

		$this->load->model('facturaelectronica');

		$existe = $this->facturaelectronica->valida_existe_libro($mes,$anno,$tipo_libro);

		// LIBRO YA FUE EMITIDO
		if($existe){

			$result['success'] = true;
			$result['valido'] = false;
			$result['message'] = $tipo_libro == "COMPRA" ? "Libro de Compras ya existe" : "Libro de Ventas ya existe";
			echo json_encode($result);
			exit;
		}


		if($tipo_libro == 'VENTA'){
			$lista_facturas = $this->facturaelectronica->datos_dte_periodo($mes,$anno);
		}else{ // COMPRAS
			$lista_facturas = $this->facturaelectronica->datos_dte_proveedores_periodo($mes,$anno);
		}

		//NO TIENE MOVIMIENTOS
		if(count($lista_facturas) == 0){

			$result['success'] = true;
			$result['valido'] = false;
			$result['message'] = "No existen movimientos";
			echo json_encode($result);
			exit;
		}

		//$datos_dte = $this->datos_dte($idfactura);
		$config = $this->facturaelectronica->genera_config();
		include $this->facturaelectronica->ruta_libredte();		
		//$config = $this->genera_config();
		//include $this->ruta_libredte();
		// Objetos de Firma y LibroCompraVenta
		$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital
		$LibroCompraVenta = new \sasco\LibreDTE\Sii\LibroCompraVenta();

		
		$empresa = $this->facturaelectronica->get_empresa();

		$rut = $Firma->getId(); 
		$rut_consultante = explode("-",$rut);

		// caratula del libro
		$caratula = [
		    'RutEmisorLibro' => $empresa->rut."-".$empresa->dv,
		    'RutEnvia' => $rut_consultante[0]."-".$rut_consultante[1],
		    'PeriodoTributario' => $anno."-".$mes,
		    'FchResol' => $empresa->fec_resolucion,
		    'NroResol' => $empresa->nro_resolucion,
		    'TipoOperacion' => $tipo_libro,
		    'TipoLibro' => 'MENSUAL',
		    'TipoEnvio' => 'TOTAL',
		    //'FolioNotificacion' => 102006,
		];

		// datos del emisor
		$Emisor = [
		    'RUTEmisor' => $empresa->rut.'-'.$empresa->dv,
		    'RznSoc' => $empresa->razon_social,
		    'GiroEmis' => $empresa->giro,
		    'Acteco' => $empresa->cod_actividad,
		    'DirOrigen' => $empresa->dir_origen,
		    'CmnaOrigen' => $empresa->comuna_origen,
		];


		// generar cada DTE y agregar su resumen al detalle del libro
		foreach ($lista_facturas as $factura) {
			$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
			$EnvioDte->loadXML($factura->dte);
			$Documentos = $EnvioDte->getDocumentos();
			$Documento = $Documentos[0];
		    $LibroCompraVenta->agregar($Documento->getResumen(), false); // agregar detalle sin normalizar
		}

		// enviar libro de ventas y mostrar resultado del envío: track id o bien =false si hubo error
		$LibroCompraVenta->setCaratula($caratula);
		$LibroCompraVenta->setFirma($Firma);
		$xml_libro = $LibroCompraVenta->generar(); 


		if(!file_exists('./facturacion_electronica/tmp/')){
			mkdir('./facturacion_electronica/tmp/',0777,true);
		}		
		
		$nombre_archivo = "LIBRO_".$tipo_libro."_".$anno.$mes.".xml";
		$f_nombre_archivo = fopen('./facturacion_electronica/libros/'.$nombre_archivo,'w');
		fwrite($f_nombre_archivo,$xml_libro);
		fclose($f_nombre_archivo);

		$existe = $this->facturaelectronica->put_log_libros($mes,$anno,$tipo_libro,$nombre_archivo);

		$result['success'] = true;
		$result['valido'] = true;
		$result['message'] = $tipo_libro == "COMPRA" ? "Libro de Compras Generado Correctamente" : "Libro de Ventas Generado Correctamente";
		$result['nombre_archivo'] = $nombre_archivo;

		echo json_encode($result);

	}	


	public function prueba_email($tipo_email){

		$this->load->model('facturaelectronica');
		$email_data = $this->facturaelectronica->get_email();

		if(count($email_data) > 0){
			if($tipo_email == 'intercambio'){
				$email = $email_data->email_intercambio;
				$pass = $email_data->pass_intercambio;
				$tserver = $email_data->tserver_intercambio;
				$port = $email_data->port_intercambio;
				$host = $email_data->host_intercambio;
			}else if($tipo_email == 'contacto'){
				$email = $email_data->email_contacto;
				$pass = $email_data->pass_contacto;
				$tserver = $email_data->tserver_contacto;
				$port = $email_data->port_contacto;
				$host = $email_data->host_contacto;

			}
			$this->load->library('email');
			$config['protocol']    = $tserver;
			$config['smtp_host']    = $host;
			$config['smtp_port']    = $port;
			$config['smtp_timeout'] = '7';
			$config['smtp_user']    = $email;
			$config['smtp_pass']    = $pass;
			$config['charset']    = 'utf-8';
			$config['newline']    = "\r\n";
			$config['mailtype'] = 'html'; // or html
			$config['validation'] = TRUE; 

			$this->email->initialize($config);		  		

		    $this->email->from($email, 'Prueba');
		    $this->email->to($email);

		    $this->email->subject('Prueba de Envío');
		    $this->email->message("Este es un mensaje de prueba");	
		    try {
		      $this->email->send();
			  $result['success'] = true;
			  $result['message'] = "Email enviado correctamente. Favor verificar casilla de correos";


		    } catch (Exception $e) {
		      echo $e->getMessage() . '<br />';
		      echo $e->getCode() . '<br />';
		      echo $e->getFile() . '<br />';
		      echo $e->getTraceAsString() . '<br />';		    	
			  $result['success'] = false;
			  $result['message'] = "Error en envío de email. ". $e->getMessage();		    	
		    }		
					        
		 }else{

			$result['success'] = false;
			$result['message'] = "Error en envío de email. No existe cuenta de correo configurada";
		 }	


		 echo json_encode($result);
	}


	public function envio_sii(){
		$idfactura = $this->input->post('idfactura');
		$this->load->model('facturaelectronica');
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

		$xml = $factura->dte;

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


		$result['success'] = true;
		$result['message'] = $track_id != 0 ? "DTE enviado correctamente" : "Error en env&iacute;o de DTE";
		$result['trackid'] = $track_id;
		echo json_encode($result);
	}	



	public function estado_envio_dte($idfactura){
		$this->load->model('facturaelectronica');
		$datos_dte = $this->facturaelectronica->datos_dte($idfactura);
		$config = $this->facturaelectronica->genera_config();
		include $this->facturaelectronica->ruta_libredte();
		$empresa = $this->facturaelectronica->get_empresa();

		$result = array();
		$result['error'] = false;
		$result['codigo'] = "";
		$result['glosa'] = "";

		$token = \sasco\LibreDTE\Sii\Autenticacion::getToken($config['firma']);
		if (!$token) {
		    foreach (\sasco\LibreDTE\Log::readAll() as $error){
		    	$result['error'] = true;

		    }
		    $result['message'] = "Error de conexión con SII";		   
		   	echo json_encode($result);
		    exit;
		}

		// consultar estado enviado
		$rut = $empresa->rut;
		$dv = $empresa->dv;
		$trackID = $datos_dte->trackid; // se obtiene al enviar un dte  $track_id = $EnvioDTE->enviar();
		$estado = \sasco\LibreDTE\Sii::request('QueryEstUp', 'getEstUp', [$rut, $dv, $trackID, $token]);
		// si el estado se pudo recuperar se muestra estado y glosa
		if ($estado!==false) {
	    	$result['error'] = false;
	    	$result['codigo'] = (string)$estado->xpath('/SII:RESPUESTA/SII:RESP_HDR/ESTADO')[0];			
	    	$result['glosa'] = (string)$estado->xpath('/SII:RESPUESTA/SII:RESP_HDR/ESTADO')[0] != -11 ? (string)$estado->xpath('/SII:RESPUESTA/SII:RESP_HDR/GLOSA')[0] : "Trackid Err&oacute;neo";			
	    	echo json_encode($result);
	    	exit;
		}

		// mostrar error si hubo
		foreach (\sasco\LibreDTE\Log::readAll() as $error){
	    	$result['error'] = true;
	    	$result['message'] = "Error de conexión con SII";
		}
		echo json_encode($result);
		exit;
	}	


	public function estado_dte($idfactura){
		$this->load->model('facturaelectronica');
		$datos_dte = $this->facturaelectronica->datos_dte($idfactura);
		$config = $this->facturaelectronica->genera_config();
		include $this->facturaelectronica->ruta_libredte();

		$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital
		$rut = $Firma->getId(); 
		$rut_consultante = explode("-",$rut);

		$empresa = $this->facturaelectronica->get_empresa();
		$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);

		$result = array();
		$result['error'] = false;
		$result['glosa_estado'] = "";
		$result['glosa_err'] = "";

		$token = \sasco\LibreDTE\Sii\Autenticacion::getToken($config['firma']);
		if (!$token) {
		    foreach (\sasco\LibreDTE\Log::readAll() as $error){
		    	$result['error'] = true;

		    }
		    $result['message'] = "Error de conexión con SII";		   
		   	echo json_encode($result);
		    exit;
		}

		$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
		$EnvioDte->loadXML($datos_dte->dte);
		$Documentos = $EnvioDte->getDocumentos();
		//print_r($Documentos); exit;
		foreach ($Documentos as $DTE) {
		
		    if ($DTE->getDatos()){
		    	$fecemision = $DTE->getFechaEmision();
		    	$monto_dte = $DTE->getMontoTotal();
		    }
		    break; // siempre será sólo 1 documento
		}		

		// consultar estado dte
		$xml = \sasco\LibreDTE\Sii::request('QueryEstDte', 'getEstDte', [
		    'RutConsultante'    => $rut_consultante[0],
		    'DvConsultante'     => $rut_consultante[1],
		    'RutCompania'       => $empresa->rut,
		    'DvCompania'        => $empresa->dv,
		    'RutReceptor'       => substr($datos_empresa_factura->rut_cliente,0,strlen($datos_empresa_factura->rut_cliente) - 1),
		    'DvReceptor'        => substr($datos_empresa_factura->rut_cliente,-1),
		    'TipoDte'           => $datos_dte->tipo_caf,
		    'FolioDte'          => $datos_dte->folio,
		    'FechaEmisionDte'   => substr($fecemision,8,2).substr($fecemision,5,2).substr($fecemision,0,4),
		    'MontoDte'          => $monto_dte,
		    'token'             => $token,
		]);

		// si el estado se pudo recuperar se muestra
		if ($xml!==false) {
		    $array_result = (array)$xml->xpath('/SII:RESPUESTA/SII:RESP_HDR')[0];
		    $result['error'] = false;
		    $result['glosa_estado'] = $array_result['GLOSA_ESTADO'];
		    $result['glosa_err'] = $array_result['GLOSA_ERR'];
	    	echo json_encode($result);
	    	exit;		    
		}

		// mostrar error si hubo
		foreach (\sasco\LibreDTE\Log::readAll() as $error){
	    	$result['error'] = true;
	    	$result['message'] = "Error de conexión con SII";
		}
		echo json_encode($result);
		exit;
	}	


	public function datos_dte_json($idfactura){
		$this->load->model('facturaelectronica');
		$datos = $this->facturaelectronica->datos_dte($idfactura);
		$empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);
		$datos->e_mail = $empresa_factura->e_mail;
		echo json_encode($datos);
	}		


	public function busca_parametro_fe($parametro){

		$this->load->model('facturaelectronica');
		$datos = $this->facturaelectronica->busca_parametro_fe($parametro);
		echo json_encode($datos);		
	}

	public function set_parametro_fe(){

		$this->load->model('facturaelectronica');
		$datos = $this->facturaelectronica->set_parametro_fe('envio_sii',$this->input->post('envio_sii'));
		$error = false;
   		$resp['success'] = true;
   		$resp['message'] = $error ? $message : "Datos actualizados correctamente";
   		echo json_encode($resp);		
	}

	public function ruta_caf(){
		$base_path = __DIR__;
		$base_path = str_replace("\\", "/", $base_path);
		$path = $base_path . "/../../facturacion_electronica/caf/";		
		return $path;
	}

	public function existe_certificado(){
		$this->load->model('facturaelectronica');
       	$resp['existe'] = file_exists($this->facturaelectronica->ruta_certificado()) ? true: false;
   		echo json_encode($resp);
	}

	public function get_empresa_json(){
		$this->load->model('facturaelectronica');
		$empresa = $this->facturaelectronica->get_empresa();
   		echo json_encode($empresa);		
	}


	public function estado_tipo_documento($tipo_documento){
		$this->db->select('f.id ')
						  ->from('folios_caf f')
						  ->join('caf c','f.idcaf = c.id')
						  ->where('c.tipo_caf',$tipo_documento)
						  ->where("f.estado = 'P'");
		$query = $this->db->get();
		$folios_existentes = $query->result();				

       	$resp['cantidad'] = count($folios_existentes);
   		echo json_encode($resp);
	 }


	public function existe_empresa(){
		$this->load->model('facturaelectronica');
		$empresa = $this->facturaelectronica->get_empresa();
		$resp['existe'] = count($empresa) > 0 ? true : false;
   		echo json_encode($resp);
	 }


	public function get_email(){
		$this->load->model('facturaelectronica');
		$email = $this->facturaelectronica->get_email();
		$resp['data'] = count($email) > 0 ? json_encode($email) : false;
   		echo json_encode($resp);
	 }



	public function ver_dte($idfactura){
		$this->load->model('facturaelectronica');
		$dte = $this->facturaelectronica->datos_dte($idfactura);

		if(empty($dte)){
		//if($dte->path_dte == ''){

			$dte = $this->facturaelectronica->crea_dte($idfactura);
		}


		$path_archivo = "./facturacion_electronica/dte/".$dte->path_dte;
		$data_archivo = basename($path_archivo.$dte->archivo_dte);
		header('Content-Type: text/plain');
		header('Content-Disposition: attachment; filename=' . $data_archivo);
		header('Content-Length: ' . filesize($path_archivo.$dte->archivo_dte));
		readfile($path_archivo.$dte->archivo_dte);			
	 }


	public function ver_libro($idlibro){
		$this->load->model('facturaelectronica');
		$libro = $this->facturaelectronica->get_libro_by_id($idlibro);
		$path_archivo = "./facturacion_electronica/libros/";
		$data_archivo = basename($path_archivo.$libro->archivo);
		header('Content-Type: text/plain');
		header('Content-Disposition: attachment; filename=' . $data_archivo);
		header('Content-Length: ' . filesize($path_archivo.$libro->archivo));
		readfile($path_archivo.$libro->archivo);			
	 }


	public function ver_dte_proveedor($tipodte,$iddte){
		$this->load->model('facturaelectronica');
		$dte = $this->facturaelectronica->datos_dte_provee($iddte);
		if($tipodte == 1){
			$nombre_archivo = $dte->arch_rec_dte;
		}else if($tipodte == 2){
			$nombre_archivo = $dte->arch_res_dte;
		}else if($tipodte == 3){
			$nombre_archivo = $dte->arch_env_rec;
		}
		$path_archivo = "./facturacion_electronica/acuse_recibo/".$dte->path_dte;

		$data_archivo = basename($path_archivo.$nombre_archivo);
		header('Content-Type: text/plain');
		header('Content-Disposition: attachment; filename=' . $data_archivo);
		header('Content-Length: ' . filesize($path_archivo.$nombre_archivo));
		readfile($path_archivo.$nombre_archivo);			
	 }

	public function cargacertificado(){
		$password = $this->input->post('password');

        $password_encrypt = md5($password.SALT);
        $config['upload_path'] = "./facturacion_electronica/certificado/"	;

        $config['file_name'] = "certificado";
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;
        //$config['max_width'] = "2000";
        //$config['max_height'] = "2000";

        $this->load->library('upload', $config);
       // $this->upload->do_upload("certificado");


        if (!$this->upload->do_upload("certificado")) {
            //*** ocurrio un error
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            //redirect('accounts/add_cuenta/2');
            //return;
        }else{
			$this->db->where('nombre', 'cert_password');
			$this->db->update('param_fe',array('valor' => $password)); 

			$this->db->where('nombre', 'cert_password_encrypt'); //veremos si se puede usar la password encriptada
			$this->db->update('param_fe',array('valor' => $password_encrypt)); 

        }
   		$dataupload = $this->upload->data();

   		$resp['success'] = true;
   		echo json_encode($resp);
	 }


	public function put_empresa(){
		//print_r($this->input->post(NULL,true)); exit;
		$this->load->model('facturaelectronica');
		$empresa = $this->facturaelectronica->get_empresa();
		$tipo_caf = $this->input->post('tipoCaf');
        $config['upload_path'] = "./facturacion_electronica/images/"	;
        $config['file_name'] = 'logo_empresa';
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;


        $this->load->library('upload', $config);

        $error = false;
        $carga = false;
        if (!$this->upload->do_upload("logo") && is_null($empresa->logo)) { // si no hay descarga y no tiene archivo cargado
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            $error = true;
            $message = "Error en subir archivo.  Intente nuevamente";
        }else{
        	
        	//$empresa = $this->facturaelectronica->get_empresa();
    		$rut = $this->input->post('rut');
    		$array_rut = explode("-",$rut);
    		$fecha_resolucion = $this->input->post('fec_resolucion');
    		$fec_resolucion = substr($fecha_resolucion,6,4)."-".substr($fecha_resolucion,3,2)."-".substr($fecha_resolucion,0,2);
    		$data_empresa = array(
    					'rut' => $array_rut[0],
    					'dv' => $array_rut[1],
    					'razon_social' => $this->input->post('razon_social'),
    					'giro' => $this->input->post('giro'),
    					'cod_actividad' => $this->input->post('cod_actividad'),
    					'dir_origen' => $this->input->post('direccion'),
    					'comuna_origen' => $this->input->post('comuna'),
    					'fec_resolucion' => $fec_resolucion,
    					'nro_resolucion' => $this->input->post('nro_resolucion'),
    					'logo' => 'logo_empresa.png'
    			);
        	if(count($empresa) > 0){ //actualizar
        		$this->db->where('id',1);
        		$this->db->update('empresa',$data_empresa);

        	}else{ //insertar


	        	$carga = true;
				$this->db->insert('empresa',$data_empresa);

        	}






        }



		if($error && $carga){
			unlink($config['upload_path'].$config['file_name'].$data_file_upload['file_ext']);
		}


   		$resp['success'] = true;
   		$resp['message'] = $error ? $message : "Carga realizada correctamente";
   		echo json_encode($resp);
	 }


	public function registro_email(){
    	$this->load->model('facturaelectronica');
		$data = array(
					'email_contacto' => $this->input->post('email_contacto'),
					'pass_contacto' => $this->input->post('pass_contacto'),
					'tserver_contacto' => $this->input->post('tipoServer_contacto'),
					'port_contacto' => $this->input->post('port_contacto'),
					'host_contacto' => $this->input->post('host_contacto'),
					'email_intercambio' => $this->input->post('email_intercambio'),
					'pass_intercambio' => $this->input->post('pass_intercambio'),
					'tserver_intercambio' => $this->input->post('tipoServer_intercambio'),
					'port_intercambio' => $this->input->post('port_intercambio'),
					'host_intercambio' => $this->input->post('host_intercambio'),
			);
		$this->facturaelectronica->registro_email($data);
   		$resp['success'] = true;
   		$resp['message'] = "Datos actualizados correctamente";
   		echo json_encode($resp);
	 }	 


	 public function recepciondte($xml_content,$RutEmisor_esperado,$RutReceptor_esperado,$archivo_recibido){

		header('Content-type: text/plain; charset=ISO-8859-1');
	 	

		//generación de 
		$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
		$EnvioDte->loadXML($xml_content);
		$Caratula = $EnvioDte->getCaratula();
		$Documentos = $EnvioDte->getDocumentos();	


		// caratula
		$caratula = [
		    'RutResponde' => $RutReceptor_esperado,
		    'RutRecibe' => $Caratula['RutEmisor'],
		    'IdRespuesta' => 1,
		    //'NmbContacto' => '',
		    //'MailContacto' => '',
		];


		// procesar cada DTE
		$RecepcionDTE = [];
		foreach ($Documentos as $DTE) {
		    $estado = $DTE->getEstadoValidacion(['RUTEmisor'=>$RutEmisor_esperado, 'RUTRecep'=>$RutReceptor_esperado]);

		    $RecepcionDTE[] = [
		        'TipoDTE' => $DTE->getTipo(),
		        'Folio' => $DTE->getFolio(),
		        'FchEmis' => $DTE->getFechaEmision(),
		        'RUTEmisor' => $DTE->getEmisor(),
		        'RUTRecep' => $DTE->getReceptor(),
		        'MntTotal' => $DTE->getMontoTotal(),
		        'EstadoRecepDTE' => $estado,
		        'RecepDTEGlosa' => \sasco\LibreDTE\Sii\RespuestaEnvio::$estados['documento'][$estado],
		    ];
		}


		// armar respuesta de envío
		$estado = $EnvioDte->getEstadoValidacion(['RutReceptor'=>$RutReceptor_esperado]);
		$RespuestaEnvio = new \sasco\LibreDTE\Sii\RespuestaEnvio();
		$RespuestaEnvio->agregarRespuestaEnvio([
		    'NmbEnvio' => basename($archivo_recibido),
		    'CodEnvio' => 1,
		    'EnvioDTEID' => $EnvioDte->getID(),
		    'Digest' => $EnvioDte->getDigest(),
		    'RutEmisor' => $EnvioDte->getEmisor(),
		    'RutReceptor' => $EnvioDte->getReceptor(),
		    'EstadoRecepEnv' => $estado,
		    'RecepEnvGlosa' => \sasco\LibreDTE\Sii\RespuestaEnvio::$estados['envio'][$estado],
		    'NroDTE' => count($RecepcionDTE),
		    'RecepcionDTE' => $RecepcionDTE,
		]);		

		$this->load->model('facturaelectronica');
		$config = $this->facturaelectronica->genera_config();
		//$config = $this->genera_config();

		// asignar carátula y Firma
		$RespuestaEnvio->setCaratula($caratula);
		$RespuestaEnvio->setFirma(new \sasco\LibreDTE\FirmaElectronica($config['firma']));

		// generar XML
		$xml = $RespuestaEnvio->generar();
		// validar schema del XML que se generó
		if ($RespuestaEnvio->schemaValidate()) {
		    // mostrar XML al usuario, deberá ser guardado y subido al SII en:
		    // https://www4.sii.cl/pfeInternet
		    return $xml;
		}else{
			return false;
		}

		
	 }


	 public function resultadodte($xml_content,$RutEmisor_esperado,$RutReceptor_esperado,$archivo_recibido){

		header('Content-type: text/plain; charset=ISO-8859-1');
	 	//include $this->ruta_libredte();

		// Cargar EnvioDTE y extraer arreglo con datos de carátula y DTEs
		$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
		$EnvioDte->loadXML($xml_content);
		$Caratula = $EnvioDte->getCaratula();
		$Documentos = $EnvioDte->getDocumentos();


		// caratula
		$caratula = [
		    'RutResponde' => $RutReceptor_esperado,
		    'RutRecibe' => $Caratula['RutEmisor'],
		    'IdRespuesta' => 1,
		    //'NmbContacto' => '',
		    //'MailContacto' => '',
		];


		// objeto para la respuesta
		$RespuestaEnvio = new \sasco\LibreDTE\Sii\RespuestaEnvio();



		// procesar cada DTE
		$i = 1;
		foreach ($Documentos as $DTE) {
		    $estado = !$DTE->getEstadoValidacion(['RUTEmisor'=>$RutEmisor_esperado, 'RUTRecep'=>$RutReceptor_esperado]) ? 0 : 2;
		    $RespuestaEnvio->agregarRespuestaDocumento([
		        'TipoDTE' => $DTE->getTipo(),
		        'Folio' => $DTE->getFolio(),
		        'FchEmis' => $DTE->getFechaEmision(),
		        'RUTEmisor' => $DTE->getEmisor(),
		        'RUTRecep' => $DTE->getReceptor(),
		        'MntTotal' => $DTE->getMontoTotal(),
		        'CodEnvio' => $i++,
		        'EstadoDTE' => $estado,
		        'EstadoDTEGlosa' => \sasco\LibreDTE\Sii\RespuestaEnvio::$estados['respuesta_documento'][$estado],
		    ]);
		}

		$this->load->model('facturaelectronica');
		$config = $this->facturaelectronica->genera_config();

		//$config = $this->genera_config();

		// asignar carátula y Firma
		$RespuestaEnvio->setCaratula($caratula);
		$RespuestaEnvio->setFirma(new \sasco\LibreDTE\FirmaElectronica($config['firma']));		

		// generar XML
		$xml = $RespuestaEnvio->generar();

		// validar schema del XML que se generó
		if ($RespuestaEnvio->schemaValidate()) {
		    // mostrar XML al usuario, deberá ser guardado y subido al SII en:
		    // https://www4.sii.cl/pfeInternet
		    return $xml;
		}else{
			return false;
		}		
	
	 }


	 public function envio_recibosdte($xml_content,$RutEmisor_esperado,$RutReceptor_esperado,$archivo_recibido){

	 	$RutResponde = $RutReceptor_esperado;
		header('Content-type: text/plain; charset=ISO-8859-1');
	 	//include $this->ruta_libredte();


		// Cargar EnvioDTE y extraer arreglo con datos de carátula y DTEs
		$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
		$EnvioDte->loadXML($xml_content);
		$Caratula = $EnvioDte->getCaratula();
		$Documentos = $EnvioDte->getDocumentos();


		// caratula
		$caratula = [
		    'RutResponde' => $RutResponde,
		    'RutRecibe' => $Caratula['RutEmisor'],
		    //'NmbContacto' => '',
		    //'MailContacto' => '',
		];

		$this->load->model('facturaelectronica');
		$config = $this->facturaelectronica->genera_config();
		//$config = $this->genera_config();
		// objeto EnvioRecibo, asignar carátula y Firma
		$EnvioRecibos = new \sasco\LibreDTE\Sii\EnvioRecibos();
		$EnvioRecibos->setCaratula($caratula);
		$EnvioRecibos->setFirma(new \sasco\LibreDTE\FirmaElectronica($config['firma']));
		$Firma = new \sasco\LibreDTE\FirmaElectronica($config['firma']);
		$RutFirma = $Firma->getId();

		// procesar cada DTE
		foreach ($Documentos as $DTE) {
		    $EnvioRecibos->agregar([
		        'TipoDoc' => $DTE->getTipo(),
		        'Folio' => $DTE->getFolio(),
		        'FchEmis' => $DTE->getFechaEmision(),
		        'RUTEmisor' => $DTE->getEmisor(),
		        'RUTRecep' => $DTE->getReceptor(),
		        'MntTotal' => $DTE->getMontoTotal(),
		        'Recinto' => 'Oficina central',
		        'RutFirma' => $RutFirma,
		    ]);
		}

		// generar XML
		$xml = $EnvioRecibos->generar();


		// validar schema del XML que se generó
		if ($EnvioRecibos->schemaValidate()) {
		    // mostrar XML al usuario, deberá ser guardado y subido al SII en:
		    // https://www4.sii.cl/pfeInternet
		    return $xml;
		}else{
			return false;
		}		
	
	 }

	public function cargadteprovee(){

		$idproveedor = $this->input->post('proveedores');

		$path_recepcion = date('Ym').'/'; // ruta guardado
		if(!file_exists('./facturacion_electronica/dte_recepcion/'.$path_recepcion)){
			mkdir('./facturacion_electronica/dte_recepcion/'.$path_recepcion,0777,true);
		}			

        $config['upload_path'] = "./facturacion_electronica/dte_recepcion/". $path_recepcion;
        $config['file_name'] = "DTE_".$idproveedor."_".date("Ymdhis");
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        //$config['max_width'] = "2000";
        //$config['max_height'] = "2000";
        $this->load->library('upload', $config);
       // $this->upload->do_upload("certificado");

        $error = false;
        $carga = false;

        if (!$this->upload->do_upload("dte")) {
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            $error = true;
            $message = "Error en subir archivo.  Intente nuevamente";
        }else{
        	$data_file_upload = $this->upload->data();
        	$carga = true;
			try {
	        	$xml_content = file_get_contents($config['upload_path'].$config['file_name'].$data_file_upload['file_ext']);
	        	//$xml = new SimpleXMLElement($xml_content);
			} catch (Exception $e) {
				$error = true;
				$message = "Error al cargar XML.  Verifique formato y cargue nuevamente";
			}


			if(!$error){ //Ya cargó.  Leemos si el archivo es del tipo que elegimos anteriormente

				header('Content-type: text/plain; charset=ISO-8859-1');
				$this->load->model('facturaelectronica');				
				include $this->facturaelectronica->ruta_libredte();

				//include $this->ruta_libredte();
				$archivo_recibido = $config['file_name'].$data_file_upload['file_ext'];
				$proveedor = $this->get_proveedor($idproveedor);
				$empresa = $this->facturaelectronica->get_empresa();
				$RutReceptor_esperado = $empresa->rut.'-'.$empresa->dv;
				$RutEmisor_esperado = substr($proveedor->rut,0,strlen($proveedor->rut)-1)."-".substr($proveedor->rut,-1);

				$result_recepcion = $this->recepciondte($xml_content,$RutEmisor_esperado,$RutReceptor_esperado,$archivo_recibido);


				if(!$result_recepcion){
					$error = true;
					$message = "Error en creación de Recepcion DTE.  Verifique formato y cargue nuevamente";

				}else{
					$xml_recepcion_dte = $result_recepcion;

					if(!$error){
						$result_resultado = $this->resultadodte($xml_content,$RutEmisor_esperado,$RutReceptor_esperado,$archivo_recibido);
						if(!$result_resultado){
							$error = true;
							$message = "Error en creación de Resultado DTE.  Verifique formato y cargue nuevamente";

						}else{
							$xml_resultado_dte = $result_resultado;

							if(!$error){
								$result_envio_recibos = $this->envio_recibosdte($xml_content,$RutEmisor_esperado,$RutReceptor_esperado,$archivo_recibido);

								if(!$result_envio_recibos){
									$error = true;
									$message = "Error en creación de Envio de Recibo.  Verifique formato y cargue nuevamente";

								}else{
									$xml_envio_recibosdte = $result_envio_recibos;
								}

							}


						}

					}


				}

			}


			// COMENZAR A ALMACENAR
			if(!$error){

				$nombre_recepcion_dte = "RecepcionDTE_".$idproveedor."_".date("His").".xml"; // nombre archivo
				$nombre_resultado_dte = "ResultadoDTE_".$idproveedor."_".date("His").".xml"; // nombre archivo
				$nombre_envio_recibo = "EnvioRecibo_".$idproveedor."_".date("His").".xml"; // nombre archivo
				$path_acuse = date('Ym').'/'; // ruta guardado
				if(!file_exists('./facturacion_electronica/acuse_recibo/'.$path_acuse)){
					mkdir('./facturacion_electronica/acuse_recibo/'.$path_acuse,0777,true);
				}		

				//archivo recepcion		
				$f_archivo_recepcion_dte = fopen('./facturacion_electronica/acuse_recibo/'.$path_acuse.$nombre_recepcion_dte,'w');
				fwrite($f_archivo_recepcion_dte,$xml_recepcion_dte);
				fclose($f_archivo_recepcion_dte);


				//archivo resultado		
				$f_archivo_resultado_dte = fopen('./facturacion_electronica/acuse_recibo/'.$path_acuse.$nombre_resultado_dte,'w');
				fwrite($f_archivo_resultado_dte,$xml_resultado_dte);
				fclose($f_archivo_resultado_dte);

				//archivo envio recibo	
				$f_archivo_envio_recibo = fopen('./facturacion_electronica/acuse_recibo/'.$path_acuse.$nombre_envio_recibo,'w');
				fwrite($f_archivo_envio_recibo,$xml_envio_recibosdte);
				fclose($f_archivo_envio_recibo);

				// Obtiene fecha de emisión de documento
				$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
				$EnvioDte->loadXML($xml_content);
				$Documentos = $EnvioDte->getDocumentos();
				$Documento = $Documentos[0];
				$fec_documento = $Documento->getFechaEmision();

				$array_insert = array(
								'idproveedor' => $idproveedor,
								'dte' => $xml_content,
								'path_dte' =>$path_recepcion,
								'archivo_dte' => $archivo_recibido,
								'envios_recibos' => $xml_envio_recibosdte,
								'recepcion_dte' => $xml_recepcion_dte,
								'resultado_dte' => $xml_resultado_dte,
								'arch_env_rec' => $nombre_envio_recibo,
								'arch_rec_dte' => $nombre_recepcion_dte,
								'arch_res_dte' => $nombre_resultado_dte,
								'fecha_documento' => $fec_documento,
								'created_at' => date("Y-m-d H:i:s")
								);

				$this->db->insert('dte_proveedores',$array_insert); 
			}

        }


		if($error && $carga){
			unlink($config['upload_path'].$config['file_name'].$data_file_upload['file_ext']);
		}


   		$resp['success'] = true;
   		$resp['message'] = $error ? $message : "Carga realizada correctamente";
   		echo json_encode($resp);
	 }





public function cargacontribuyentes(){

		ini_set('max_execution_time', 0);
		$path_base = date('Ym').'/'; // ruta guardado
		if(!file_exists('./facturacion_electronica/base_contribuyentes/'.$path_base)){
			mkdir('./facturacion_electronica/base_contribuyentes/'.$path_base,0777,true);
		}			

        $config['upload_path'] = "./facturacion_electronica/base_contribuyentes/". $path_base;
        $config['file_name'] = "Lista_Contribuyentes_".date("Ymdhis");
        $config['allowed_types'] = "*";
        $config['max_size'] = 0;
        $config['overwrite'] = TRUE;

        //$config['max_width'] = "2000";
        //$config['max_height'] = "2000";
        $this->load->library('upload', $config);
       // $this->upload->do_upload("certificado");

        $error = false;
        $carga = false;

        if (!$this->upload->do_upload("csv")) {
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            $error = true;
            $message = "Error en subir archivo.  Intente nuevamente";
        }else{
        	$data_file_upload = $this->upload->data();
        	$carga = true;
			try {
	        	$csv_content = file_get_contents($config['upload_path'].$config['file_name'].$data_file_upload['file_ext']);
			} catch (Exception $e) {
				$error = true;
				$message = "Error al cargar Archivo.  Verifique formato y cargue nuevamente";
			}

			// COMENZAR A ALMACENAR
			if(!$error){

				$this->load->model('facturaelectronica');
				//LOAD DATA LOW_PRIORITY LOCAL INFILE 'C:\\Users\\Rodrigo\\Downloads\\ce_empresas_dwnld_20160428.csv' REPLACE INTO TABLE `erp_info`.`contribuyentes_autorizados` FIELDS TERMINATED BY ';' LINES TERMINATED BY '\n' IGNORE 1 LINES (`rut`, `razon_social`, `nro_resolucion`, `fec_resolucion`, `mail`, `url`);
				$tabla_contribuyentes = $this->facturaelectronica->carga_contribuyentes($path_base,$config['file_name'].$data_file_upload['file_ext']);
				/*$tabla_contribuyentes = $this->facturaelectronica->busca_parametro_fe('tabla_contribuyentes');

				$tabla_inserta = $tabla_contribuyentes == 'contribuyentes_autorizados_1' ? 'contribuyentes_autorizados_2' : 'contribuyentes_autorizados_1';

				if (($gestor = fopen($config['upload_path'].$config['file_name'].$data_file_upload['file_ext'], "r")) !== FALSE) {
					$fila = 1;
				    while (($datos = fgetcsv($gestor, 1000, ";")) !== FALSE) {
				        //$numero = count($datos);
				        if($fila > 1){
				        	$rut = $datos[0];
				        	$array_rut = explode("-",$rut);
				        	$rut = $array_rut[0];
				        	$dv = $array_rut[1];
				        	$razon_social = $datos[1];
				        	$nro_resolucion = $datos[2];
				        	$fec_resolucion = substr($datos[3],6,4)."-".substr($datos[3],3,2)."-".substr($datos[3],0,2);
				        	$mail = $datos[4];
				        	$url = $datos[5];



							$array_insert = array(
											'rut' => $rut,
											'dv' => $dv,
											'razon_social' =>$razon_social,
											'nro_resolucion' => $nro_resolucion,
											'fec_resolucion' => $fec_resolucion,
											'mail' => $mail,
											'url' => $url
											);

							$this->db->insert($tabla_inserta,$array_insert); 

				        }


				    }
				    fclose($gestor);
				}				


				$array_insert = array(
								'nombre_archivo' => $config['file_name'].$data_file_upload['file_ext'],
								'ruta' => $path_base,
								);

				$this->db->insert('log_cargas_bases_contribuyentes',$array_insert); 


				$this->facturaelectronica->set_parametro_fe('tabla_contribuyentes',$tabla_inserta);

				$this->db->query('truncate '. $tabla_contribuyentes); */
				


			}

        }

   		$resp['success'] = true;
   		$resp['message'] = $error ? $message : "Carga realizada correctamente";
   		echo json_encode($resp);
	 }



	public function cargacaf(){
		$tipo_caf = $this->input->post('tipoCaf');
        $config['upload_path'] = "./facturacion_electronica/caf/"	;
        $config['file_name'] = $tipo_caf."_".date("Ymdhis");
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        //$config['max_width'] = "2000";
        //$config['max_height'] = "2000";
        $this->load->library('upload', $config);
       // $this->upload->do_upload("certificado");

        $error = false;
        $carga = false;
        if (!$this->upload->do_upload("caf")) {
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            $error = true;
            $message = "Error en subir archivo.  Intente nuevamente";
        }else{
        	$data_file_upload = $this->upload->data();
        	$carga = true;
			try {
	        	$xml_content = file_get_contents($config['upload_path'].$config['file_name'].$data_file_upload['file_ext']);
	        	$xml = new SimpleXMLElement($xml_content);
			} catch (Exception $e) {
				$error = true;
				$message = "Error al cargar XML.  Verifique formato y cargue nuevamente";
			}


			if(!$error){ //Ya cargó.  Leemos si el archivo es del tipo que elegimos anteriormente
				
				$tipo_caf_subido = $xml->CAF->DA->TD; 
				if($tipo_caf_subido != $tipo_caf){
					$error = true;
					$message = "CAF cargado no corresponde al seleccionado previamente.  Verifique archivo y cargue nuevamente";
				}
			}



			// VALIDAR EL RUT DE EMPRESA DEL CAF
			if(!$error){

				$this->db->select('valor ')
				  ->from('param_fe')
				  ->where('nombre','rut_empresa');
				$query = $this->db->get();
				$parametro = $query->row();	

				$rut_parametro = $parametro->valor;

				$rut_caf = $xml->CAF->DA->RE; 
				if($rut_parametro != $rut_caf){
					$error = true;
					$message = "CAF cargado no corresponde a empresa registrada.  Verifique archivo y cargue nuevamente";
				}						
			}


			if(!$error){ //Ya cargó y el archivo es correcto
				$folio_desde = $xml->CAF->DA->RNG->D; 
				$folio_hasta = $xml->CAF->DA->RNG->H; 

				//VALIDAMOS SI LOS FOLIOS YA ESTÁN CARGADOS.  SI YA ESTÁN CARGADOS, DAREMOS ERROR INDICANDO QUE CAF YA EXISTE
				$this->db->select('f.id ')
								  ->from('folios_caf f')
								  ->join('caf c','f.idcaf = c.id')
								  ->where('c.tipo_caf',$tipo_caf)
								  ->where('f.folio between ' . $folio_desde . ' and ' . $folio_hasta);

				$query = $this->db->get();
				$folios_existentes = $query->result();				

				if(count($folios_existentes) > 0){
					$error = true;
					$message = "CAF cargado contiene folios ya existentes.  Verifique archivo y cargue nuevamente";
				}else{

					// SE CREA LOG DE CARGA DE FOLIOS
					$data_array = array(
						'tipo_caf' => $tipo_caf,
						'fd' => $folio_desde,
						'fh' => $folio_hasta,					
						'archivo' => $config['file_name'].".xml",
						'caf_content' => $xml_content,
						);
					$this->db->insert('caf',$data_array); 
					$idcaf = $this->db->insert_id();

					// SE CREA DETALLE DE FOLIOS

					for($folio_carga = (int)$folio_desde; $folio_carga <= (int)$folio_hasta; $folio_carga++){
						$data_folio = array(
							'folio' => $folio_carga,
							'idcaf' => $idcaf,
							'created_at' => date("Y-m-d H:i:s")
							);
						$this->db->insert('folios_caf',$data_folio);
					}
				}





			}


        }



		if($error && $carga){
			unlink($config['upload_path'].$config['file_name'].$data_file_upload['file_ext']);
		}


   		$resp['success'] = true;
   		$resp['message'] = $error ? $message : "Carga realizada correctamente";
   		echo json_encode($resp);
	 }



	public function folio_documento_electronico($tipo_doc){

		$tipo_caf = 0;
		if($tipo_doc == 101){
			$tipo_caf = 33;
		}else if($tipo_doc == 102){
			$tipo_caf = 61;
		}else if($tipo_doc == 103){
			$tipo_caf = 34;
		}else if($tipo_doc == 104){
			$tipo_caf = 56;
		}else if($tipo_doc == 105){
			$tipo_caf = 52;
		}

		$nuevo_folio = 0;
		//buscar primero si existe algún folio ocupado hace más de 4 horas.
		$this->db->select('fc.id, fc.folio ')
		  ->from('folios_caf fc')
		  ->join('caf c','fc.idcaf = c.id')
		  ->where('c.tipo_caf',$tipo_caf)
		  ->where('fc.estado','T')
		  ->where('fc.updated_at <= (now() - interval 4 hour)')
		  ->order_by('fc.folio')
		  ->limit(1);
		$query = $this->db->get();
		$folios_caf = $query->row();	
		if(count($folios_caf) > 0){
			$nuevo_folio = $folios_caf->folio;
			$id_folio = $folios_caf->id;
		}else{ // buscar folios pendientes
			$this->db->select('fc.id, fc.folio ')
			  ->from('folios_caf fc')
			  ->join('caf c','fc.idcaf = c.id')
			  ->where('c.tipo_caf',$tipo_caf)
			  ->where('fc.estado','P')
			  ->order_by('fc.folio')
			  ->limit(1);
			$query = $this->db->get();
			$folios_caf = $query->row();	
			if(count($folios_caf) > 0){
				$nuevo_folio = $folios_caf->folio;
				$id_folio = $folios_caf->id;
			}
		}


		if($nuevo_folio != 0){
			$this->db->where('id', $id_folio);
			$this->db->update('folios_caf',array(
											'estado' => 'T',
											'updated_at' => date('Y-m-d H:i:s'))); 
		}

       	$resp['folio'] = $nuevo_folio;
   		echo json_encode($resp);
	 }

	 public function exportFePDF($idfactura,$cedible = null){

		$this->load->model('facturaelectronica');
		$this->facturaelectronica->exportFePDF($idfactura,'id',$cedible);	 	

	}


	 public function exportFePDF_mail($trackid,$cedible = null){
		$this->load->model('facturaelectronica');
		$this->facturaelectronica->exportFePDF($trackid,'trackid',$cedible);	 	

	}	


	public function update(){

		$resp = array();

		$idcliente = $this->input->post('idcliente');
		$numfactura = $this->input->post('numfactura');
		$idfactura = $this->input->post('idfactura');
		$fechafactura = $this->input->post('fechafactura');
		$fechavenc = $this->input->post('fechavenc');
		$vendedor = $this->input->post('vendedor');
		$sucursal = $this->input->post('sucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('netofactura');
		$iva = $this->input->post('ivafactura');
		$afecto = $this->input->post('afectofactura');
		$total = $this->input->post('totalfacturas');
		$totalant = $this->input->post('totalant');
		$tipodocumento = $this->input->post('tipodocumento');
						
		$factura_cliente = array(

			'sub_total' => $neto,
	        'neto' => $neto,
	        'iva' => $iva,
	        'totalfactura' => $total,
	        
		);

		$this->db->where('id', $idfactura);	  
	    $this->db->update('factura_clientes', $factura_cliente);

	    $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR COBRAR'");
		 $row = $query->result();
		 $row = $row[0];
		 $idcuentacontable = $row->idcuentacontable;	


			// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
		 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
		 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idcliente . "'");
    	 $row = $query->result();
	
		if ($query->num_rows()>0){	
			
			$row = $row[0];
			$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo - " . $totalant . " where id = " .  $row->idcuentacorriente );
			$idcuentacorriente =  $row->idcuentacorriente;

			$query = $this->db->query("UPDATE cuenta_corriente SET saldo = saldo + " . $total . " where id = " .  $row->idcuentacorriente );
			$idcuentacorriente =  $row->idcuentacorriente;
		}

		$query = $this->db->query("UPDATE detalle_cuenta_corriente SET saldo = ".$total." where numdocumento = '".$numfactura."'");
        
        //if ($query->num_rows()>0){

        //	$resp['idctacte'] = $idcuentacorriente;

        //}


		$query = $this->db->query("UPDATE cartola_cuenta_corriente SET valor = ".$total." where numdocumento = '".$numfactura."'");

		//if ($query->num_rows()>0){

        //	$resp['numfactura'] = $numfactura;

        //}
		
			
		/*****************************************/
      

		$this->Bitacora->logger("I", 'factura_clientes', $idfactura);


	    $resp['success'] = true;
		$resp['idfactura'] = $idfactura;
		
		
        echo json_encode($resp);

	}

	public function numerofactura(){

		$resp = array();
		$factura = $this->input->get('factura');
       		
		$query = $this->db->query('SELECT * FROM correlativos WHERE id like "'.$factura.'"');

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

	public function calculofechas(){

		$resp = array();
		$factura = $this->input->post('dias');
		$fechafactura = $this->input->post('fechafactura');

		$fechafactura = substr($fechafactura,0,10);
		$fecha= strtotime("+ $factura days", strtotime ($fechafactura));
		
		$fecha = date('Y-m-d',$fecha);
		
	    $resp['success'] = true;
        $resp['fecha_final'] = $fecha;
        
        echo json_encode($resp);   
	
	}
	
	public function getAll(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $tipo = $this->input->get('documento');
        if (!$tipo){
	       $sql_tipo_documento = "";
	    }else{
	       $sql_tipo_documento = "acc.tipo_documento = " . $tipo . " and ";
	    }

        //$countAll = $this->db->count_all_results("factura_clientes");

        $data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' 1 = 1'			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	
	       if($opcion == "Rut"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' c.rut = "'.$nombres.'"');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' c.rut = "'.$nombres.'"
			order by acc.id desc
			limit '.$start.', '.$limit.''		 
		);


	    }else if($opcion == "Nombre"){

	    	
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "c.nombres like '%".$nombre."%' and ";
	        }
	        	    	
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . '  ' . $sql_nombre . ' 1 = 1'
			);

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . '  ' . $sql_nombre . ' 1 = 1
			order by acc.id desc
			limit '.$start.', '.$limit.''		 
						
			);
	 
		}else if($opcion == "Todos"){

			
			$data = array();
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' 1 = 1
			order by acc.id desc
			limit '.$start.', '.$limit.''	
			
			);	

		}else if($opcion == "Numero"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' acc.num_factura = "'.$nombres.'" ');

			$total = 0;

		  	foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			WHERE acc.estado="" AND ' . $sql_tipo_documento . ' acc.num_factura = "'.$nombres.'" order by acc.id desc
			limit '.$start.', '.$limit.''		 
		);

	    }else{

			
		$data = array();
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu, td.descripcion as tipo_doc	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join tipo_documento td on (acc.tipo_documento = td.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE  acc.estado="" AND ' . $sql_tipo_documento . '  1 = 1 
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

	public function getAll2(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $tipo = 1;
        $tipo2 = 2;
        $tipo3 = 19;
        $estado = "";

        $countAll = $this->db->count_all_results("factura_clientes");
		$data = array();
		$total = 0;
	

        if($opcion == "Rut"){
		
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') and c.rut = '.$nombres.'
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
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') ' . $sql_nombre . '
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
			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') and acc.estado = "'.$estado.'" order by acc.id desc'	
			
			);


			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
	

		}else{

			
		$data = array();
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, co.nombre as nombre_docu, v.nombre as nom_vendedor, acc.tipo_documento as id_tip_docu	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join correlativos co on (acc.tipo_documento = co.id)
			WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.') and acc.estado = "'.$estado.'" order by acc.id desc		
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

	public function getAllnotap(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $codigo = $this->input->get('codigo');        
        $tipo = "1";
        $tipo4 = "2";
        $tipo2 = "101";
        $tipo3 = "103";        


		$countAll = $this->db->count_all_results("detalle_factura_cliente");
		$data = array();

		if($nombre){

			$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id = '.$nombre.' AND acc.tipo_documento in ("'.$tipo.'","'.$tipo2.'","'.$tipo3.'","'.$tipo4.'")');

			if($query->num_rows()>0){

		 		$row = $query->first_row();

		 	    $forma = ($row->forma);

		 	    if ($forma==1 or $forma==2){

		 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
		 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
		   		  	FROM detalle_factura_cliente acc    
		   		  	left join productos p on (acc.id_producto = p.id)
					WHERE acc.id_despacho = "'.$nombre.'"');

		 	    	

		 	    }else{

		 	    	$query = $this->db->query('SELECT acc.*, p.nombre as nombre, p.codigo 
		 	        as codigo, acc.precio as p_venta, acc.cantidad as stock 
		   		  	FROM detalle_factura_cliente acc    
		   		  	left join productos p on (acc.id_producto = p.id)
					WHERE acc.id_factura = "'.$nombre.'"'
				    );

		 	        
		 	    }
		 	

		    };
		    
		    $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{
			
			$data[] = $row;
		}

	    }else{

	    	$sql_nombre = "";
	        $arrayNombre =  explode(" ",$codigo);

	        foreach ($arrayNombre as $codigo) {
	        	$sql_nombre .= "acc.nombre like '%".$codigo."%' and ";
	        }

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia,
			acc.id as id_producto FROM productos acc
			left join mae_ubica c on (acc.id_ubi_prod = c.id)
			left join marcas m on (acc.id_marca = m.id)
			left join mae_medida ca on (acc.id_uni_medida = ca.id)
			left join familias fa on (acc.id_familia = fa.id)
			left join agrupacion ag on (acc.id_agrupacion = ag.id)
			left join subfamilias sb on (acc.id_subfamilia = sb.id)
			left join bodegas bo on (acc.id_bodega = bo.id)
			WHERE ' . $sql_nombre . ' 1 = 1');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
		
		foreach ($query->result() as $row)
		{
			
			$data[] = $row;
		}

	    	

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAllfacturasdirectas(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $opcion = $this->input->get('opcion');        
            
        $tipo = "1";
        $tipo2 = "101";


		$countAll = $this->db->count_all_results("factura_clientes");
		$data = array();

		if($opcion=="Nombre"){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_cliente = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.')
			limit '.$start.', '.$limit.' ');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


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

	    }else if($opcion=="Numero"){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.')
			limit '.$start.', '.$limit.' ');

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


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

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAlldespachafactura(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');        
        $tipo = "1";
        $tipo2 = "101";


		$countAll = $this->db->count_all_results("factura_clientes");
		$data = array();

		if($nombre){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_cliente = '.$nombre.' AND acc.tipo_documento = '.$tipo.'
			limit '.$start.', '.$limit.' ' 

		);

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


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

	    }
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}

	public function getAllfact(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
        $opcion = $this->input->get('opcion');
        
        /*if(!$opcion){
        	$opcion="Nombre";
        } */
             
        $tipo = "1";
        $tipo2 = "101";
        $tipo3 = "2";// FACTURA ELECTRONICA


		$countAll = $this->db->count_all_results("factura_clientes");
		$data = array();

		if($opcion=="Nombre"){
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_factura = '.$nombre.' and acc.tipo_documento in ('.$tipo.','.$tipo2.','.$tipo3.')');
		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


		$data = array();
	    }else if($opcion=="Numero"){
	
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.','.$tipo3.')
			limit '.$start.', '.$limit.' ' 	);

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


	    }if($opcion=="Cliente"){
	
		$query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor	FROM factura_clientes acc
			left join clientes c on (acc.id_cliente = c.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id_cliente = '.$nombre.' AND acc.tipo_documento in ('.$tipo.','.$tipo2.','.$tipo3.')
			limit '.$start.', '.$limit.' ' 	);

		
		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


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


		 
			$data[] = $row;
		}

	   
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}


	public function save(){
		
		$resp = array();
		$idcliente = $this->input->post('idcliente');
		$numfactura = $this->input->post('numfactura');
		$idticket = $this->input->post('idticket');
		$idfactura = $this->input->post('idfactura');
		$fechafactura = $this->input->post('fechafactura');
		$fechavenc = $this->input->post('fechavenc');
		$vendedor = $this->input->post('vendedor');
		$sucursal = $this->input->post('sucursal');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$neto = $this->input->post('netofactura');
		$formadepago = $this->input->post('formadepago');
		$fiva = $this->input->post('ivafactura');
		$fafecto = $this->input->post('afectofactura');
		$ftotal = $this->input->post('totalfacturas');
		$tipodocumento = $this->input->post('tipodocumento');
		$idbodega = 1;
		
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
	        'id_cond_venta' => $formadepago,
	        'sub_total' => $neto,
	        'descuento' => ($neto - $fafecto),
	        'neto' => $neto,
	        'iva' => $fiva,
	        'totalfactura' => $ftotal,
	        'fecha_factura' => $fechafactura,
	        'fecha_venc' => $fechavenc
	          
		);

		$this->db->insert('factura_clientes', $factura_cliente); 
		$idfactura = $this->db->insert_id();

		$preventa = array(
	        'num_ticket' => $idticket,
	        'fecha_venta' => $fechafactura,
	        'id_cliente' => $idcliente,
	        'id_sucursal' => $sucursal,
	        'id_vendedor' => $vendedor,
	        'neto' => $neto,
	        'id_tip_docu' => $tipodocumento,
	        'id_pago' => $formadepago,
	        'desc' => ($neto - $fafecto),
	        'total' => $ftotal,
	        'id_documento' => $numfactura
		);

		$this->db->insert('preventa', $preventa); 
		$idpreventa = $this->db->insert_id();

		$preventa = array(
			'id_documento' => $numfactura
		);

		$this->db->where('id', $idpreventa);	  
	    $this->db->update('preventa', $preventa);


	    $secuencia = 0;

	    $neto_total = 0;
		foreach($items as $v){

			$neto_producto = round((round($v->total,0) - round($v->iva,0)),0);
			$factura_clientes_item = array(
		        'id_producto' => $v->id,
		        'id_factura' => $idfactura,
		        'num_factura' => $numfactura,
		        'precio' => $v->precio,
		        'cantidad' => $v->cantidad,
		        'neto' => $neto_producto,
		        'descuento' => round($v->dcto,0),
		        'iva' => $v->iva,
		        'totalproducto' => $neto_producto + $v->iva,
		        'fecha' => $fechafactura
			);

		$neto_total += $neto_producto;
		$producto = $v->id;

		$this->db->insert('detalle_factura_cliente', $factura_clientes_item);

		$secuencia = $secuencia + 1;
		$preventa_detalle = array(
		        'id_producto' => $v->id,
		        'id_ticket' => $idpreventa,
		        'valor_unit' => $v->precio,
		        'neto' => $v->neto,
		        'cantidad' => $v->cantidad,
		        'neto' => $v->total,
		        'iva' => $v->iva,
		        'total' => $v->total,
		        'fecha' => $fechafactura,
		        'secuencia' => $secuencia
			);
        
        $this->db->insert('preventa_detalle', $preventa_detalle);
		
		$query = $this->db->query('SELECT * FROM productos WHERE id="'.$producto.'"');
		if($query->num_rows()>0){
		 	$row = $query->first_row();
		 	$saldo = ($row->stock)-($v->cantidad);
		};

		 $query = $this->db->query('SELECT * FROM existencia WHERE id_producto='.$producto.' and id_bodega='.$idbodega.'');
	    	 $row = $query->result();
			 if ($query->num_rows()>0){
				$row = $row[0];	
				$saldo = ($row->stock)-($v->cantidad);
				$idexiste = ($row->id);
		        if ($producto==($row->id_producto) and $idbodega==($row->id_bodega)){
				    $datos3 = array(
					'stock' => $saldo,
			        'fecha_ultimo_movimiento' => date('Y-m-d H:i:s')
					);
					$this->db->where('id', $idexiste);
		    	    $this->db->update('existencia', $datos3);
	    	    }else{

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' => $v->cantidad,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
		    	 	}
				}else{					

	    	    	$datos3 = array(
					'id_producto' => $producto,
			        'stock' =>  $v->cantidad,
			        'id_bodega' => $idbodega,
			        'fecha_ultimo_movimiento' =>date('Y-m-d H:i:s')				
					);
					$this->db->insert('existencia', $datos3);
			    	
				};

		$datos2 = array(
				'num_movimiento' => $numfactura,
		        'id_producto' => $v->id_producto,
		        'id_tipo_movimiento' => $tipodocumento,
		        'valor_producto' =>  $v->precio,
		        'cantidad_salida' => $v->cantidad,
		        'id_bodega' => $idbodega,
		        'fecha_movimiento' => $fechafactura
		);

		$this->db->insert('existencia_detalle', $datos2);
		
		}

		$iva_total = round($neto_total*(0.19),0);
		$total_factura = $neto_total + $iva_total;

		$data_factura = array(
						'neto' => $neto_total,
						'iva' => $iva_total,
						'totalfactura' => $total_factura
						);

    	$this->db->where('id', $idfactura);
    	$this->db->update('factura_clientes', $data_factura);    			
    	
        $resp['success'] = true;
		$resp['idfactura'] = $idfactura;

		$this->Bitacora->logger("I", 'factura_clientes', $idfactura);       	
	
		if ($tipodocumento != 3 && $tipodocumento != 105){


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


		}		

		/*****************************************/

		if($tipodocumento == 101 || $tipodocumento == 103 || $tipodocumento == 105){  // SI ES FACTURA ELECTRONICA O FACTURA EXENTA ELECTRONICA


			if($tipodocumento == 101){
				$tipo_caf = 33;
			}else if($tipodocumento == 103){
				$tipo_caf = 34;
			}else if($tipodocumento == 105){
				$tipo_caf = 52;
			}


			//$tipo_caf = $tipodocumento == 101 ? 33 : 34;

			header('Content-type: text/plain; charset=ISO-8859-1');
			$this->load->model('facturaelectronica');
			$config = $this->facturaelectronica->genera_config();
			include $this->facturaelectronica->ruta_libredte();


			$empresa = $this->facturaelectronica->get_empresa();
			$datos_empresa_factura = $this->facturaelectronica->get_empresa_factura($idfactura);

			$detalle_factura = $this->facturaelectronica->get_detalle_factura($idfactura);
			$datos_factura = $this->facturaelectronica->get_factura($idfactura);


			$lista_detalle = array();
			$i = 0;
			foreach ($detalle_factura as $detalle) {
				$lista_detalle[$i]['NmbItem'] = $detalle->nombre;
				$lista_detalle[$i]['QtyItem'] = $detalle->cantidad;
				//$lista_detalle[$i]['PrcItem'] = $detalle->precio;
				//$lista_detalle[$i]['PrcItem'] = round((($detalle->precio*$detalle->cantidad)/1.19)/$detalle->cantidad,0);
				//$total = $detalle->precio*$detalle->cantidad;
				//$neto = round($total/1.19,2);

				//$lista_detalle[$i]['PrcItem'] = round($neto/$detalle->cantidad,2);
				$lista_detalle[$i]['PrcItem'] = $tipo_caf == 33 || $tipo_caf == 52 ? round($detalle->precio/1.19,3) : round($detalle->precio,3);
				if($tipo_caf == 33){
					//$lista_detalle[$i]['MontoItem'] = ($detalle->totalproducto - $detalle->iva);
					$lista_detalle[$i]['MontoItem'] = $detalle->neto;
				}
				if($detalle->descuento != 0){
					//$porc_descto = round(($detalle->descuento/($detalle->cantidad*$lista_detalle[$i]['PrcItem'])*100),0);
					//$lista_detalle[$i]['DescuentoPct'] = $porc_descto;		
					$lista_detalle[$i]['DescuentoMonto'] = round($detalle->descuento,0); //DESCUENTO DEBE SER ENTERO
					//$lista_detalle[$i]['PrcItem'] =- $lista_detalle[$i]['PrcItem']*$porc_descto;

				}

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
			            'RznSoc' => substr($empresa->razon_social,0,100), //LARGO DE RAZON SOCIAL NO PUEDE SER SUPERIOR A 100 CARACTERES
			            'GiroEmis' => substr($empresa->giro,0,80), //LARGO DE GIRO DEL EMISOR NO PUEDE SER SUPERIOR A 80 CARACTERES
			            'Acteco' => $empresa->cod_actividad,
			            'DirOrigen' => substr($empresa->dir_origen,0,70), //LARGO DE DIRECCION DE ORIGEN NO PUEDE SER SUPERIOR A 70 CARACTERES
			            'CmnaOrigen' => substr($empresa->comuna_origen,0,20), //LARGO DE COMUNA DE ORIGEN NO PUEDE SER SUPERIOR A 20 CARACTERES
			        ],
			        'Receptor' => [
			            'RUTRecep' => substr($datos_empresa_factura->rut_cliente,0,strlen($datos_empresa_factura->rut_cliente) - 1)."-".substr($datos_empresa_factura->rut_cliente,-1),
			            'RznSocRecep' => substr($datos_empresa_factura->nombre_cliente,0,100), //LARGO DE RAZON SOCIAL NO PUEDE SER SUPERIOR A 100 CARACTERES
			            'GiroRecep' => substr($datos_empresa_factura->giro,0,35),  //LARGO DEL GIRO NO PUEDE SER SUPERIOR A 40 CARACTERES
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

			//var_dump($factura); exit;

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
			$EnvioDTE->generar();

			if ($EnvioDTE->schemaValidate()) { // REVISAR PORQUÉ SE CAE CON ESTA VALIDACION
				
				$track_id = 0;
			    $xml_dte = $EnvioDTE->generar();

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
      

        echo json_encode($resp);
	}


	public function exportPDF(){

		$idfactura = $this->input->get('idfactura');
		$numero = $this->input->get('numfactura');
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $idfactura));	
		$tipodocumento = 1;
		foreach($cabecera->result() as $v){  
				$tipodocumento = $v->tipo_documento; 
		}

		if($tipodocumento == 1){
				$this->exportFacturaPDF($idfactura,$numero);

		}else if($tipodocumento ==  101 || $tipodocumento == 103 || $tipodocumento == 105){ // FACTURA ELECTRONICA O FACTURA EXENTA ELECTRONCA O GUIA DE DESPACHO
				//$es_cedible = is_null($cedible) ? false : true;
				$this->load->model('facturaelectronica');
				$this->facturaelectronica->exportFePDF($idfactura,'id');

		}else{

				$this->exportBoletaPDF($idfactura,$numero);

		}

	}

	//$idfactura,$numero

	public function exportFacturaPDF($idfactura,$numero){

		//$idfactura = $this->input->get('idfactura');
		//$numero = $this->input->get('numfactura');

        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_clientes acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_cliente = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = ma.id)
			left join ciudad sa on (cs.id_ciudad = sa.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.id = '.$idfactura.'');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_clientes acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_cliente = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = ma.id)
			left join ciudad s on (c.id_ciudad = sa.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = m.id)
			left join ciudad sa on (cs.id_ciudad = s.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.num_factura = '.$numero.'

		');


		}

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);

		if ($row->forma == 0){		 
		//items
		$items = $this->db->get_where('detalle_factura_cliente', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$observacion = $row->observacion;
		$rut_cliente = $row->rut_cliente;
		$rut_obs = $row->rut_obs;
		$nom_obs = $row->nom_observ;
		if ($row->direc_sucursal){
			$direccion = $row->direc_sucursal;
			$comuna = $row->com_sucursal;
			$ciudad = $row->ciu_sucursal;	
		}else{
			$direccion = $row->direccion;
			$comuna = $row->nombre_comuna;
			$ciudad = $row->nombre_ciudad;
	    };
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$fono = $row->fono;
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale <br> ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $row->id));		
		$forma_pago = $row->cond_pago;
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoAfecto = $reg->sub_total;
			$montoDescuento = $reg->descuento;
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
		}
				
		$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}
-->
</style>
</head>

<body>
   <table width="987px" border="0">
   	 
      <tr>
      	<td width="250px"  height="110px">&nbsp;</td>
        <td width="408px"  height="110px" style="font-size: 20px;vertical-align:bottom;">&nbsp;'. $dia2 . '&nbsp;&nbsp;&nbsp;&nbsp;'.$mes2.'&nbsp;&nbsp;&nbsp;&nbsp;'.$anio2.'</td>
        <td width="329px"  height="110px" >
        <table width="329px" border="0">
        	<tr >
        		<td width="329px" height="100px" style="font-size: 20px;vertical-align:bottom;"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$codigo.'</b></td>
        	</tr>
        	<tr >
        		<td width="329px" height="10px">&nbsp;</td>
        	</tr>        	
        </table>
        </td>
      </tr> 
      <tr>
      <td colspan="3" height="110px">
      	<table width="987px" border="0">
      	<tr>
      		<td width="100px" height="30px">&nbsp;</td>
      		<td width="400px" height="30px">'. $nombre_contacto .'</td>
      		<td width="278px" height="30px">&nbsp;</td>
      		<td width="209px" height="30px">' . number_format(substr($rut_cliente,0,strlen($rut_cliente) - 1),0,".",".")."-".substr($rut_cliente,-1) . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">'. $direccion .'</td>
      		<td width="278px" height="15px">&nbsp;</td>
      		<td width="209px" height="15px">' . $comuna .'</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">' . $ciudad . '</td>
      		<td width="278px" height="15px">' . $fono . '</td>
      		<td width="209px" height="15px">' .  $giro . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="20px">&nbsp;</td>
      		<td width="400px" height="20px">&nbsp;</td>
      		<td width="278px" height="20px">&nbsp;</td>
      		<td width="209px" height="20px">&nbsp;</td>
      	</tr>      	
      	</table>
      </td>
      </tr>
      <tr>
		      	<td colspan="3" >
		      	<table width="987px" border="0">';
		 $tamano_maximo = 400;
		 $i = 1;
		foreach($items->result() as $v){      
			$this->db->where('id', $v->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];		

		      $html .= '
		      		
				      	<tr>
				      		<td width="100px" height="20px">' . $producto->codigo . '</td>
				      		<td width="420px" height="20px">' . $producto->nombre . '</td>
				      		<td width="100px" height="20px">' . $v->cantidad . '</td>
				      		<td width="78px" height="20px"></td>
				      		<td width="100px" height="20px">' . number_format($v->precio, 0, ',', '.') . '</td>
				      		<td width="70px" height="20px">' . number_format($v->descuento, 0, ',', '.') . '</td>
				      		<td width="119px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
				      	</tr>
				     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 20;
  	}

  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 20;	
  	}
  	
    $html .= ' </table>
		      	</td>
		      </tr>


		      <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="0">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">&nbsp;</td>
		      		<td width="420px" height="20px">' . $forma_pago . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td rowspan="3" width="119px" height="60px">&nbsp;</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">&nbsp;</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">Fecha Vencimiento: '. $dia.'/'.$mes.'/'.$anio.'</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>


		      <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="1">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">' . $ticket_text .'</td>
		      		<td rowspan="3" width="420px" height="60px">' . valorEnLetras($totalFactura) . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td width="119px" height="20px">' . number_format($montoNeto, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoAfecto, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($totalFactura, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>
		      <tr>
		      	<td  colspan="3" >
		      		<table width="987px" border="1">
		      			<tr>
		      				<td width="698px" height="40px">&nbsp;</td>
		      				<td width="289px" height="40px">'. $nom_obs .'</td>
		      			</tr>
		      			<tr>
		      				<td width="698px" height="20px">&nbsp;</td>
		      				<td width="289px" height="20px">'. number_format(substr($rut_obs,0,strlen($rut_obs) - 1),0,".",".")."-".substr($rut_obs,-1) .'</td>
		      			</tr>		      			
		      		</table>
		      	</td>
		      </tr>
		      </table>';
 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'letter',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");		
		exit;

		}else{

			$items = $this->db->get_where('detalle_factura_glosa', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$id = $row->id_factura;
		$nombre_contacto = $row->nombre_cliente;
		$observacion = $row->observacion;
		$rut_cliente = $row->rut_cliente;
		$rut_obs = $row->rut_obs;
		$nom_obs = $row->nom_observ;
		if ($row->direc_sucursal){
			$direccion = $row->direc_sucursal;
			$comuna = $row->com_sucursal;
			$ciudad = $row->ciu_sucursal;	
		}else{
			$direccion = $row->direccion;
			$comuna = $row->nombre_comuna;
			$ciudad = $row->nombre_ciudad;
	    };
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$fono = $row->fono;
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale <br> ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $row->id));		
		$forma_pago = $row->cond_pago;
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoAfecto = $reg->sub_total;
			$montoDescuento = $reg->descuento;
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
		}
				
		$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}
-->
</style>
</head>

<body>
   <table width="987px" border="0">
   	 
      <tr>
      	<td width="250px"  height="110px">&nbsp;</td>
        <td width="408px"  height="110px" style="font-size: 20px;vertical-align:bottom;">&nbsp;'. $dia2 . '&nbsp;&nbsp;&nbsp;&nbsp;'.$mes2.'&nbsp;&nbsp;&nbsp;&nbsp;'.$anio2.'</td>
        <td width="329px"  height="110px" >
        <table width="329px" border="0">
        	<tr >
        		<td width="329px" height="100px" style="font-size: 20px;vertical-align:bottom;"><b>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'.$codigo.'</b></td>
        	</tr>
        	<tr >
        		<td width="329px" height="10px">&nbsp;</td>
        	</tr>        	
        </table>
        </td>
      </tr> 
      <tr>
      <td colspan="3" height="110px">
      	<table width="987px" border="0">
      	<tr>
      		<td width="100px" height="30px">&nbsp;</td>
      		<td width="400px" height="30px">'. $nombre_contacto .'</td>
      		<td width="278px" height="30px">&nbsp;</td>
      		<td width="209px" height="30px">' . number_format(substr($rut_cliente,0,strlen($rut_cliente) - 1),0,".",".")."-".substr($rut_cliente,-1) . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">'. $direccion .'</td>
      		<td width="278px" height="15px">&nbsp;</td>
      		<td width="209px" height="15px">' . $comuna .'</td>
      	</tr>
      	<tr>
      		<td width="100px" height="15px">&nbsp;</td>
      		<td width="400px" height="15px">' . $ciudad . '</td>
      		<td width="278px" height="15px">' . $fono . '</td>
      		<td width="209px" height="15px">' .  $giro . '</td>
      	</tr>
      	<tr>
      		<td width="100px" height="20px">&nbsp;</td>
      		<td width="400px" height="20px">&nbsp;</td>
      		<td width="278px" height="20px">&nbsp;</td>
      		<td width="209px" height="20px">&nbsp;</td>
      	</tr>      	
      	</table>
      </td>
      </tr>
      <tr>
		      	<td colspan="3" >
		      	<table width="987px" border="0">';
		 $tamano_maximo = 400;
		 $i = 1;
		 $cantidad = 1;
		foreach($items->result() as $v){
		      
		      $guia=""; 
		      if (!$v->glosa){		      	
		      	$v->glosa="SEGUN GUIA";
		      	$guia = $v->num_guia;
		      	$cantidad="";
		      	$items2 = $this->db->get_where('detalle_factura_cliente', array('num_factura' => $v->num_guia));

		      	foreach($items2->result() as $v){

		      		$data3 = array(
	         			'id_despacho' => $id
				    );
				    $this->db->where('id', $v->id);
				  
				    $this->db->update('detalle_factura_cliente', $data3);
		      	    
					$this->db->where('id', $v->id_producto);
					$producto = $this->db->get("productos");	
					$producto = $producto->result();
					$producto = $producto[0];		

					      $html .= '
					      		
							      	<tr>
							      		<td width="100px" height="20px">' . $producto->codigo . '</td>
							      		<td width="420px" height="20px">' . $producto->nombre . '</td>
							      		<td width="100px" height="20px">' . $v->cantidad . '</td>
							      		<td width="78px" height="20px"></td>
							      		<td width="100px" height="20px">' . number_format($v->precio, 0, ',', '.') . '</td>
							      		<td width="70px" height="20px">' . number_format($v->descuento, 0, ',', '.') . '</td>
							      		<td width="119px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
							      	</tr>
							     ';
					      $i++;
					      $tamano_maximo = $tamano_maximo - 20;
			  		}		
		      			
		    
		      
		     }else{

		     	$html .= '
		      		
				      	<tr>
				      	    <td width="160px" height="20px"></td>
				      		<td width="540" height="20px">' . $v->glosa . '</td>
				      		<td width="50px" height="20px">' . $cantidad . '</td>
				      		<td width="58px" height="20px"></td>
				      		<td width="140px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
				      		<td width="70px" height="20px">' . number_format($v->iva, 0, ',', '.') . '</td>
				      		<td width="99px" height="20px">' . number_format($v->total, 0, ',', '.') . '</td>
				      	</tr>
				     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 20;
		     	

		     }
  	}

  	if (!$v->glosa){

  		$guia="";
  		foreach($items->result() as $v){
  			
		$html .= '
		      		
	     <tr>
	      		<td width="50px" height="20px"></td>
	      		<td width="10px" height="20px">Segun Guia : '. $v->num_guia .'</td>
	      		<td width="5px" height="20px"></td>
	      		<td width="278px" height="20px"></td>
	     ';

	     };



		};
  	


  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 20;	
  	}
  	
    $html .= ' </table>
		      	</td>
		      </tr>


		      <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="0">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">&nbsp;</td>
		      		<td width="420px" height="20px">' . $forma_pago . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td rowspan="3" width="119px" height="60px">&nbsp;</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">&nbsp;</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">Fecha Vencimiento: '. $dia.'/'.$mes.'/'.$anio.'</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>
		      <tr>
		     <tr>
		      <td  colspan="3" >
		      	<table width="987px" border="1">
		      	<tr >
		      		<td rowspan="3" width="100px" height="60px">' . $ticket_text .'</td>
		      		<td rowspan="3" width="420px" height="60px">' . valorEnLetras($totalFactura) . '</td>
		      		<td rowspan="3" width="348px" height="60px">&nbsp;</td>
		      		<td width="119px" height="20px">' . number_format($montoNeto, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      		<td width="119px" height="20px">' . number_format($montoAfecto, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($montoDescuento, 0, ',', '.') . '</td>
		      	</tr>
		      	<tr>
			      	<td width="119px" height="20px">' . number_format($totalFactura, 0, ',', '.') . '</td>
		      	</tr>		      	
		      	</table>
		      </td>

		      </tr>
		      <tr>
		      	<td  colspan="3" >
		      		<table width="987px" border="0">
		      			<tr>
		      				<td width="698px" height="40px">&nbsp;</td>
		      				<td width="289px" height="40px">'. $nom_obs .'</td>
		      			</tr>
		      			<tr>
		      				<td width="698px" height="20px">&nbsp;</td>
		      				<td width="289px" height="20px">'. number_format(substr($rut_obs,0,strlen($rut_obs) - 1),0,".",".")."-".substr($rut_obs,-1) .'</td>
		      			</tr>		      			
		      		</table>
		      	</td>
		      </tr>
		      </table>';
 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'letter',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");		
		exit;
		}
	}

	public function exportlotePDF(){

		$idfactura = $this->input->get('idfactura');
		$numero = $this->input->get('numfactura');
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $idfactura));	
		//$tipodocumento = 19;
		$tipodocumento2 = 19;
		foreach($cabecera->result() as $v){  
				$tipodocumento = $v->tipo_documento; 
		}

		if($tipodocumento == 19 or $tipodocumento == 1 ){
				$this->exportFacturalotePDF($idfactura,$numero);

		}else{

				$this->exportBoletaPDF($idfactura,$numero);

		};

	}

	//$idfactura,$numero

	public function exportFacturalotePDF($idfactura,$numero){

		//$idfactura = $this->input->get('idfactura');
		//$numero = $this->input->get('numfactura');

        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_clientes acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_cliente = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = ma.id)
			left join ciudad sa on (cs.id_ciudad = sa.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.id = '.$idfactura.'');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, ob.nombre as nom_observ, ob.rut as rut_obs, c.fono, p.num_ticket, cp.nombre as cond_pago, cs.direccion as direc_sucursal, sa.nombre as ciu_sucursal, ma.nombre as com_sucursal FROM factura_clientes acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_cliente = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			left join clientes_sucursales cs on (acc.id_sucursal = cs.id)
			left join comuna ma on (cs.id_comuna = ma.id)
			left join ciudad sa on (cs.id_ciudad = sa.id)
			left join observacion_facturas ob on (acc.id_observa = ob.id)
			left join cond_pago cp on (acc.id_cond_venta = cp.id)
			WHERE acc.num_factura = '.$numero.'

		');


		}

		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);
		 
		//items
		$items = $this->db->get_where('detalle_factura_glosa', array('id_factura' => $row->id));
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$observacion = $row->observacion;
		$rut_cliente = $row->rut_cliente;
		$rut_obs = $row->rut_obs;
		$nom_obs = $row->nom_observ;
		$direccion = $row->direccion;
		$comuna = $row->nombre_comuna;
		$ciudad = $row->nombre_ciudad;
		$fecha = $row->fecha_venc;
		$giro = $row->giro;
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $row->id));		
		$montoNeto = 0;
	    $ivaTotal = 0;
		$totalFactura = 0;
		if ($row->direc_sucursal){
			$direccion = $row->direc_sucursal;
			$comuna = $row->com_sucursal;
			$ciudad = $row->ciu_sucursal;	
		}else{
			$direccion = $row->direccion;
			$comuna = $row->nombre_comuna;
			$ciudad = $row->nombre_ciudad;
	    };
		foreach($cabecera->result() as $reg){
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
		}
				
		$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
		$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
		 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}
-->
</style>
</head>

<body>
   <table width="750" border="0" cellpadding="0" cellspacing="0">
   	 
      <tr>
        <td width="450"><span class="style6">&nbsp;</span><span class="colorTextoFijo"></span></td>
		<td class="style6"><center>'.$codigo.'</center></td>
      </tr>      
    </table>
    <p align="right"><b>'.$dia2.'/'.$mes2.'/'.$anio2.'</b></p>
    <p align="right"><b>'.$dia.'/'.$mes.'/'.$anio.'</b></p>
    <br><br>
   
    <br><br>
     
     <table width="650" border="0" cellpadding="0" cellspacing="0">
       <tr>
      
        <td colspan="6" class="style5">'.$nombre_contacto.'</td>
        <td colspan="6" class="style5">'.$direccion.'</td>
       </tr>
      <tr>
        <td colspan="6" class="style5">'.$rut_cliente.'</td>      
        <td colspan="6" class="style5">'.$comuna.'</td>
        </tr>
      <tr>
        <td colspan="6" class="style5">'.$giro.'</td>
        <td colspan="6" class="style5">'.$ciudad.'</td>
        </tr>
    </table>
  
  <table border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
         <tr>
        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
		        <td >&nbsp;</td>
         </tr>
      ';
      $i = 1;
	foreach($items->result() as $v){
	
	if ($v->num_guia == 0){
		
		$v->num_guia = " ";

	}else{

		$v->glosa = "Segun Guia";
		

	};
			

     $html .= '<tr>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td ><b>'.($v->glosa).' '.($v->num_guia).'</b></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align="right">'.number_format($v->neto, 0, ',', '.').'</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td align="right"></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>       
        <td align="right"></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>       
        <td><p align="right">'.number_format($v->iva, 0, ',', '.').'</b></td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        
        <td ><b align="right">'.number_format($v->total, 0, ',', '.').'</b></td>
        <td >&nbsp;</td>
        </tr>';
        $i++;

    }

    if($i < 15){
    	for($j=$i;$j<=15;$j++){
		        $html .= '<tr>
		        
		      	<td >&nbsp;</td>
		      	<td >&nbsp;</td>
		       
		        </tr>';
    	}
    }

    	$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';

      
      $html .='<tr>
      	
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td p align="right"><b>'.number_format($montoNeto, 0, ',', '.').'</b></td>
        </tr>
		<tr>
		<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td p align="right"><b>'.number_format($ivaTotal, 0, ',', '.').'</b></td>
        </tr>        
		<tr>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>        
        <td >&nbsp;</td>
        <td >&nbsp;</td>
        <td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td >&nbsp;</td>
      	<td p align="right"><b>'.number_format($totalFactura, 0, ',', '.').'</b></td>
        </tr>                
</table>
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");

		/*$mpdf= new mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'L'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;
	}



	public function exportBoletaPDF($idfactura,$numero){

		//$idfactura = $this->input->get('idfactura');
		//$numero = $this->input->get('numfactura');

        if ($idfactura){
		$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, p.num_ticket  FROM factura_clientes acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_cliente = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.id = '.$idfactura.'
		');
		}else{
			$query = $this->db->query('SELECT acc.*, c.direccion as direccion, e.nombre as giro, c.nombres as nombre_cliente, c.rut as rut_cliente, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, v.nombre as nom_vendedor, p.num_ticket  FROM factura_clientes acc
			left join preventa p on acc.id = p.id_documento
			left join clientes c on (acc.id_cliente = c.id)
			left join cod_activ_econ e on (c.id_giro = e.id)
			left join comuna m on (c.id_comuna = m.id)
			left join ciudad s on (c.id_ciudad = s.id)
			left join vendedores v on (acc.id_vendedor = v.id)
			WHERE acc.num_factura = '.$numero.'

		');
		}
		//cotizacion header
		$row = $query->result();
		$row = $row[0];
		//items

		if ($row->forma == 0){

		$items = $this->db->get_where('detalle_factura_cliente', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$rut_cliente = $row->rut_cliente;
		$direccion = $row->direccion;
		$comuna = $row->nombre_comuna;
		$ciudad = $row->nombre_ciudad;
		$giro = $row->giro;
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale: ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $row->id));		
		$nom_vendedor = $row->nom_vendedor;
		$montoNeto = 0;
		$ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
			$descuento = (($reg->descuento)*1.19);

		}
				
$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Boleta</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}

.page
{
page-break-after: always;
}

		
-->
</style>
</head>

<body>
   <table width="10px" height="8px" border="0">   	 
       <tr>
      	<td width="100px">
      		<table width="100px" border="0"> 		

      		<tr>
      		    <td width="400px" height="8px">&nbsp;</td>
	      		<td width="100px" height="8px">'.$nom_vendedor.'</td>
	      	</tr>
      			
      		</table>
      	</td>
      </tr>
       <tr>
      	<td width="987px">
      		<table width="987px" border="0">   		

      		<tr>
	      		<td width="50px" height="8px"></td>
	      		<td width="50px" height="8px"></td>
	      		<td width="80px" height="8px"></td>
	      		<td width="99px" height="8px"></td>
	      	</tr>
      			
      		</table>
      	</td>
      </tr>
       
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
	      		 <td width="410px" height="8px">&nbsp;</td>
	      		<td width="100px" height="8px">'.$dia2.'/'.$mes2.'/'.$anio2.'</td>
	       	</tr>
      		</table>
      	</td>
      </tr>  
      <tr>
      	<td width="987px" height="25px">
      	&nbsp;
      	</td>
      </tr>       
      <tr>
  	<td width="987px" >
  	<table width="987px" border="0">';
		 $tamano_maximo = 230;
		 $i = 1;
		foreach($items->result() as $v){      
			$this->db->where('id', $v->id_producto);
			$producto = $this->db->get("productos");	
			$producto = $producto->result();
			$producto = $producto[0];		

		      $html .= '
		      		
      	<tr>
      		<td width="110px" height="8px">' . $producto->codigo . '</td>
      		<td width="50px" height="8px">' . $v->cantidad . '</td>
      		<td width="300px" height="8px">' . $producto->nombre . '</td>
      		<td width="189px" height="8px">' . number_format($v->totalproducto, 0, ',', '.') . '</td>
      	</tr>
     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 15;
  	}

  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 15;	
  	}



	$html .= '</table></td></tr>

	
   <tr>
  	<td width="987">
  		<table width="987" border="0">
  		<tr>
  			<td width="350px" height="20px">&nbsp;</td>
  			<td width="110px" height="20px">Descuento</td>
			<td width="79px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . number_format($descuento, 0, ',', '.') .'</td>
			<p class=\"page\"></p>
  		</tr>
  		</table>
  	</td>
  </tr>   
  <tr>
  	<td width="987">
  		<table width="987" border="0">
  		<tr>
  			<td width="10px" height="20px">&nbsp;</td>
  			<td width="450px" height="20px">' . $ticket_text .'</td>
			<td width="59px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . number_format($totalFactura, 0, ',', '.') .'</td>
			<p class=\"page\"></p>
  		</tr>
  		</table>
  	</td>
  </tr>      
 


	

	</table>';

 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			2,    // margin_left
			15,    // margin right
			2,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'P'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");

		/*$mpdf= new mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'P'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;

		}else{


		$items = $this->db->get_where('detalle_factura_glosa', array('id_factura' => $row->id));
		//print_r($items->result());exit;
		//variables generales
		$codigo = $row->num_factura;
		$nombre_contacto = $row->nombre_cliente;
		$rut_cliente = $row->rut_cliente;
		$direccion = $row->direccion;
		$comuna = $row->nombre_comuna;
		$ciudad = $row->nombre_ciudad;
		$giro = $row->giro;
		$fecha = $row->fecha_venc;
		list($anio, $mes, $dia) = explode("-",$fecha);
		$fecha2 = $row->fecha_factura;
		list($anio2, $mes2, $dia2) = explode("-",$fecha2);
		$ticket_text = $row->num_ticket != '' ? "Nro. Vale: ". $row->num_ticket :  "&nbsp;";
		$cabecera = $this->db->get_where('factura_clientes', array('id' => $row->id));		
		$nom_vendedor = $row->nom_vendedor;
		$montoNeto = 0;
		$ivaTotal = 0;
		$totalFactura = 0;
		foreach($cabecera->result() as $reg){
			$montoNeto = $reg->neto;
			$ivaTotal = $reg->iva;
			$totalFactura = $reg->totalfactura;
		}
				
$dias = array("Domingo","Lunes","Martes","Miercoles","Jueves","Viernes","Sábado");
$meses = array("Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre");
 

		$html = '
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
<style type="text/css">
<!--
.cajaInput {
	border: 1px dotted #ED1B24;
}
.style5 {color: #FF0000; font-family: Arial, Helvetica, sans-serif; font-weight: bold; font-size: 12px; }
.style6 {	font-family: Arial, Helvetica, sans-serif;
	font-size: 12px;
	font-weight: bold;
}
.colorTextoFijo {	color:#008F9F;
	font-weight: bold;
	font:Arial, Helvetica, sans-serif;
}
.lineaDivisoria {
	border-bottom-style:dotted;
	border-bottom-color:#ED1B24;
	border-bottom-width:1px;
	height: 2px;
}
.cajaInputIzq {
	border-top-width: 1px;
	border-bottom-width: 1px;
	border-left-width: 1px;
	border-right-width: 1px;
	border-top-style: dotted;
	border-bottom-style: dotted;
	border-left-style: dotted;
	border-right-style: dotted;
	border-top-color: #ED1B24;
	border-bottom-color: #ED1B24;
	border-left-color: #ED1B24;
	border-right-color: #ED1B24;
}
.style9 {font-size: 8px;
font-family: Arial, Helvetica, sans-serif;
}
.style12 {color: #FFFFFF}
.style13 {font-size: 12px; font-family: Arial, Helvetica, sans-serif;}
.style14 {font-family: Arial, Helvetica, sans-serif; font-size: 12px; font-weight: bold; color: #FFFFFF; }
.style15 {
	font-family: Arial, Helvetica, sans-serif;
	font-size: 10px;
	font-weight: bold;
	color: #FFFFFF;
}
-->
</style>
</head>

<body>
   <table width="987px" border="0">
   	 
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
      			<td width="740px" height="25px">&nbsp;</td>
				<td width="247px" height="25px">'.$codigo.'</td>
      		</tr>
      		</table>
      	</td>
      </tr> 
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
      			<td width="800px" height="40px">&nbsp;</td>
				<td width="187px" height="40px" style="font-size: 15px;vertical-align:bottom;">'.$dia2.'/'.$mes2.'/'.$anio2.'</td>
      		</tr>
      		</table>
      	</td>
      </tr>  
      <tr>
      	<td width="987px">
      		<table width="987px" border="0">
      		<tr>
      			<td width="50px" height="20px">&nbsp;</td>
				<td width="937px" height="20px" style="font-size: 15px;vertical-align:bottom;">VENDEDOR: '.$nom_vendedor.'</td>
      		</tr>
      		</table>
      	</td>
      </tr>  
      <tr>
      	<td width="987px" height="25px">
      	&nbsp;
      	</td>
      </tr>       
      <tr>
		      	<td width="987px" >
		      	<table width="987px" border="0">';
		 $tamano_maximo = 240;
		 $i = 1;
		 $cantidad = 1;
		foreach($items->result() as $v){      
			
		      $html .= '
		      		
				      	<tr>
				      	    <td width="160px" height="20px"></td>
				      		<td width="540" height="20px">' . $v->glosa . '</td>
				      		<td width="50px" height="20px">' . $cantidad . '</td>
				      		<td width="58px" height="20px"></td>
				      		<td width="140px" height="20px">' . number_format($v->neto, 0, ',', '.') . '</td>
				      		<td width="70px" height="20px">' . number_format($v->iva, 0, ',', '.') . '</td>
				      		<td width="99px" height="20px">' . number_format($v->total, 0, ',', '.') . '</td>
				      	</tr>
				     ';
		      $i++;
		      $tamano_maximo = $tamano_maximo - 20;
  	}

  	while($tamano_maximo > 0){
  		$html .= '<tr><td colspan="7" height="20px">&nbsp;</td></tr>';
  		$tamano_maximo = $tamano_maximo - 20;	
  	}



	$html .= '</table></td></tr>

				<tr>
		      	<td width="987px">
		      		<table width="987px" border="0">
		      		<tr>
		      			<td width="160px" height="20px">&nbsp;</td>
						<td width="827px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . valorEnLetras($totalFactura) .'</td>
		      		</tr>
		      		</table>
		      	</td>
		      </tr>  
		      <tr>
		      	<td width="987px">
		      		<table width="987px" border="0">
		      		<tr>
		      			<td width="500px" height="20px">&nbsp;</td>
		      			<td width="388px" height="20px">' . $ticket_text .'</td>
						<td width="99px" height="20px" style="font-size: 15px;vertical-align:bottom;">' . number_format($totalFactura, 0, ',', '.') .'</td>
		      		</tr>
		      		</table>
		      	</td>
		      </tr>  
		      	

	</table>';
 

    	/*$html .= '<tr>		        
		      	<td >OBSERVACION : '.$observacion.'</td>
		      	</tr>
		      	<tr>
		      	<td >NOMBRE : '.$nom_obs.'</td>
		      	</tr>	
		      	<td >RUT : '.$rut_obs.'</td>
		      	<tr>		       
		        </tr>';
	*/
      
      $html .='
</body>
</html>
		';
		//==============================================================
		//==============================================================
		//==============================================================
		$this->load->library("mpdf");
		//include(defined('BASEPATH')."/libraries/MPDF54/mpdf.php");
		//include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

		$this->mpdf->mPDF(
			'',    // mode - default ''
			'letter',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'P'    // L - landscape, P - portrait
			);  

		$this->mpdf->WriteHTML($html);
		$this->mpdf->Output("CF_{$codigo}.pdf", "I");

		/*$mpdf= new mPDF(
			'',    // mode - default ''
			'',    // format - A4, for example, default ''
			0,     // font size - default 0
			'',    // default font family
			15,    // margin_left
			15,    // margin right
			16,    // margin top
			16,    // margin bottom
			9,     // margin header
			9,     // margin footer
			'P'    // L - landscape, P - portrait
			);  

		$mpdf->WriteHTML($html);
		$mpdf->Output("CF_{$codigo}.pdf", "I");
		*/
		exit;
		}
	}


        public function exportarPdflibroFacturas()
         {            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 1;
            $tipo2 = 102;
            $tipo3 = 101;
            $tipo4 = 103;
            $this->load->library("mpdf");

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
			//echo $html; exit
            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
                          
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.tipo_documento and acc.fecha_factura' 
                
                );
            

              };


		$header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Libro de Ventas</title>
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
		   <td width="197px"><img src="http://localhost/vibrados_web/Infosys_web/resources/images/logo_empresa.png" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>VIBRADOS CHILE LTDA.</p>
		    <p>RUT:77.748.100-2</p>
		    <p>Cienfuegos # 1595 San Javier - Chile</p>
		    <p>Fonos: (73)2 321100</p>
		    <p>Correo Electronico : info@vibradoschile.cl</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top"	>
		          <p>FECHA EMISION : '.date('d/m/Y').'</p>
			</td>
		  </tr>';              
              
		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE VENTAS</h2></td>
		  </tr>
			<tr><td colspan="3">&nbsp;</td></tr>		  
			';              


		$body_header = '<tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" >
		      <tr>
		        <td width="57"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Dia</td>
		        <td width="40px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Num</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Tipo</td>
		        <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Rut</td>
		        <td width="350px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Nombre</td>
		        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ></td>
		        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Exento</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Neto</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >IVA</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Total</td>
		      </tr>';
		      $sub_total = 0;
		      $descuento = 0;
		      $neto = 0;
		      $iva = 0;
		      $cantfact = 0;
		      $cantnc =0;
		      $totalfactura = 0;
              $i = 0;
              $body_detail = '';
              $users = $query->result_array();
		      foreach($users as $v){

		      	    list($anio, $mes, $dia) = explode("-",$v['fecha_factura']);
                    $rutautoriza = $v['rut_cliente'];
				   	if (strlen($rutautoriza) == 8){
				      $ruta1 = substr($rutautoriza, -1);
				      $ruta2 = substr($rutautoriza, -4, 3);
				      $ruta3 = substr($rutautoriza, -7, 3);
				      $ruta4 = substr($rutautoriza, -8, 1);
				      $v['rut_cliente'] = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
				    };
				    if (strlen($rutautoriza) == 9){
				      $ruta1 = substr($rutautoriza, -1);
				      $ruta2 = substr($rutautoriza, -4, 3);
				      $ruta3 = substr($rutautoriza, -7, 3);
				      $ruta4 = substr($rutautoriza, -9, 2);
				      $v['rut_cliente'] = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);			   
				    };
				    if (strlen($rutautoriza) == 2){
				      $ruta1 = substr($rutautoriza, -1);
				      $ruta2 = substr($rutautoriza, -4, 1);
				      $v['rut_cliente'] = ($ruta2."-".$ruta1);
				      				     
				    };

				    if ($v['tipo_documento'] == 102){

				    	$v['neto'] = ($v['neto']/-1);
				    	$v['iva'] = ($v['iva']/-1);
				    	$v['totalfactura'] = ($v['totalfactura']/-1);
				    	$tipo="N/C";

				    };
				     if ($v['tipo_documento'] == 1 or $v['tipo_documento'] == 101){
				      $sub_total += $v['sub_total'];
				      $descuento += $v['descuento'];
				      $neto += $v['neto'];
				      $iva += $v['iva'];
				      $totalfactura += $v['totalfactura'];
				      $cantfact++;
				      $tipo="Fact";
				      };

				       
			      if ($v['tipo_documento'] == 103){
			      $netoex += $v['neto'];
			      $ivaex += $v['iva'];
			      $totalfacturaex += $v['totalfactura'];
			      $cantex++;
			      $tipo="F/Exe";
			      };
			      if ($v['tipo_documento'] == 104){
			      $netond += $v['neto'];
			      $ivand += $v['iva'];
			      $totalfacturand += $v['totalfactura'];
			      $cantnd++;
			      $tipo="N/D";
			      };
			      if ($v['tipo_documento'] == 102){
			      $netonc += $v['neto'];
			      $ivanc += $v['iva'];
			      $totalfacturanc += $v['totalfactura'];
			      $cantnc++;
			      };
				    	      	    

					$body_detail .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<table width="997" cellspacing="0" cellpadding="0" >
				    <tr>				
					<td width="47px" style="text-align:left">'.$dia.'</td>
					<td width="70px" style="text-align:left">'.$v['num_factura'].'</td>
					<td width="70px" style="text-align:left">'.$tipo.'</td>
					<td width="100px" style="text-align:right">'.$v['rut_cliente'].'</td>
					<td width="10px" style="text-align:left"></td>
					<td width="350px" style="text-align:left">'.$v['nombre_cliente'].'</td>
					<td width="50px" style="text-align:left"></td>
					<td width="100px" style="text-align:right">$ '.number_format($v['neto'], 0, '.', ',').'</td>
					<td width="100px" style="text-align:right">$ '.number_format($v['iva'], 0, '.', ',').'</td>
					<td width="100px" style="text-align:right">$ '.number_format($v['totalfactura'], 0, '.', ',').'</td>
				    </tr>
				    </table>
				  </tr>';
					
			      
                 


		            $i++;
		         }  

				$footer .= '<tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($neto, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($iva, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfactura, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Facturas</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantfact, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($neto, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($iva, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfactura, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Facturas Excentas</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netoex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivaex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturaex, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				        <td width="477px"  style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Notas Debito</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantnd, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netond, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivand, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturand, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				  <tr><td colspan="10">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" >
				      <tr>
				         <td width="477px"  style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:left;font-size: 14px;" ><b></b></td>
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Notas de Ctredito</b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantnc, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netonc, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivanc, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturanc, 0, ',', '.').'</b></td>
				      </tr>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				</body>
				</html>';		              
             
        			  
	        $html = $header.$header2;
	        $html2 =$body_header.$body_detail.$footer;
	      	$this->mpdf->WriteHTML($html);
			$this->mpdf->WriteHTML($html2);
			$this->mpdf->Output("LibroVentas.pdf", "I");
            exit;		          

        }


        public function exportarPdfFacturas()
         {

            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 1;
            $tipo2 = 19;
            $tipo3 = 101;
            $tipo4 = 103;
                        

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
            if($opcion == "Rut"){
    
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and c.rut = '.$nombres.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc'    

              );

                }else if($opcion == "Nombre"){

                  
                $sql_nombre = "";
                    $arrayNombre =  explode(" ",$nombres);

                    foreach ($arrayNombre as $nombre) {
                      $sql_nombre .= "and c.nombres like '%".$nombre."%' ";
                    }
                            
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') ' . $sql_nombre . ' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'" 
                order by acc.id desc' 
                
                );
             
              }else if($opcion == "Todos"){

                
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 
                
                );
            

              }else{

                
              $data = array();
              $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 

                );


              }

            };
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
		  <td width="197px"><img src="http://localhost/vibrados_web/Infosys_web/resources/images/logo_empresa.png" width="150" height="136" /></td>
		    <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top"	>
		    <p>VIBRADOS CHILE LTDA.</p>
		    <p>RUT:77.748.100-2</p>
		    <p>Cienfuegos # 1595 San Javier - Chile</p>
		    <p>Fonos: (73)2 321100</p>
		    <p>Correo Electronico : info@vibradoschile.cl</p>
		    </td>
		    <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top"	>
		          <p>FECHA EMISION : '.date('d/m/Y').'</p>
			</td>
		  </tr>';              
              
		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE VENTAS</h2></td>
		  </tr>
			<tr><td colspan="3">&nbsp;</td></tr>		  
			';              


		$body_header = '<tr>
		    <td colspan="3" >
		    	<table width="987px" cellspacing="0" cellpadding="0" border="0">
		      <tr>
		      	<td width="55px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Id</td>
		        <td width="62px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Numero</td>
		        <td width="65px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Fecha</td>
		        <td width="65px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Vencimiento</td>
		        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >Rut</td>
		        <td width="180px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Nombre</td>
		        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" >Vendedor</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Afecto</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Descuento</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Neto</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >IVA</td>
		        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" >Total</td>
		      </tr>';


		      $sub_total = 0;
		      $descuento = 0;
		      $neto = 0;
		      $iva = 0;
		      $totalfactura = 0;
              $i = 0;
              $body_detail = '';
              $users = $query->result_array();
		      foreach($users as $v){

					$body_detail .= '<tr>
					<td style="text-align:left;font-size: 14px;">'.$v['id'].'</td>		
					<td style="text-align:left;font-size: 14px;">'.$v['num_factura'].'</td>			
					<td style="text-align:left;font-size: 14px;">'.$v['fecha_factura'].'</td>
					<td style="text-align:right;font-size: 14px;">'.$v['fecha_venc'].'</td>
					<td style="text-align:center;font-size: 14px;">'.$v['rut_cliente'].'</td>
					<td style="text-align:left;font-size: 14px;">'.$v['nombre_cliente'].'</td>
					<td style="text-align:left;font-size: 14px;">'.$v['nom_vendedor'].'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['sub_total'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['descuento'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['neto'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['iva'], 0, '.', ',').'</td>
					<td align="right" style="font-size: 14px;">$ '.number_format($v['totalfactura'], 0, '.', ',').'</td>
					</tr>';
					
			      $sub_total += $v['sub_total'];
			      $descuento += $v['descuento'];
			      $neto += $v['neto'];
			      $iva += $v['iva'];
			      $totalfactura += $v['totalfactura'];

		            $i++;
		         }  

				$footer .= '<tr><td colspan="12">&nbsp;</td></tr></table></td>
				  </tr>
				  <tr>
				  	<td colspan="3" >
				    	<table width="987px" cellspacing="0" cellpadding="0" border="0">
				      <tr>
				        <td width="635px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($sub_total, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($descuento, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($neto, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($iva, 0, ',', '.').'</b></td>
				        <td width="80px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfactura, 0, ',', '.').'</b></td>
				      </tr>
				      	</table>
				  	</td>
				  </tr></table>
				</body>
				</html>';		              
             
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
			$this->mpdf->Output("Ventas.pdf", "I");

			exit;            

        }


}









