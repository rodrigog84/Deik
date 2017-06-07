<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* Name:  Ion Auth Model
*
* Version: 2.5.2
*
* Author:  Ben Edmunds
* 		   ben.edmunds@gmail.com
*	  	   @benedmunds
*
* Added Awesomeness: Phil Sturgeon
*
* Location: http://github.com/benedmunds/CodeIgniter-Ion-Auth
*
* Created:  10.01.2009
*
* Last Change: 3.22.13
*
* Changelog:
* * 3-22-13 - Additional entropy added - 52aa456eef8b60ad6754b31fbdcc77bb
*
* Description:  Modified auth system based on redux_auth with extensive customization.  This is basically what Redux Auth 2 should be.
* Original Author name has been kept but that does not mean that the method has not been modified.
*
* Requirements: PHP5 or above
*
*/

class Facturaelectronica extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('cookie');
		$this->load->helper('date');
	}



	public function ruta_libredte(){
		$base_path = __DIR__;
		$base_path = str_replace("\\", "/", $base_path);
		$path = $base_path . "/../libraries/inc.php";		
		return $path;
	}

	public function genera_config(){
		$config = [
		    'firma' => [
		        'file' => $this->ruta_certificado(),
		        'pass' => $this->busca_parametro_fe('cert_password'),
		    ],
		];

		return $config;
	}


	public function ruta_certificado(){
		$base_path = __DIR__;
		$base_path = str_replace("\\", "/", $base_path);
		$path = $base_path . "/../../facturacion_electronica/certificado/certificado.p12";		
		return $path;
	}

	 public function busca_parametro_fe($parametro){
		$this->db->select('valor ')
		  ->from('param_fe')
		  ->where('nombre',$parametro);
		$query = $this->db->get();
		$parametro = $query->row();	
		return $parametro->valor;
	 }	


	 public function set_parametro_fe($parametro,$valor){
		  $this->db->where('nombre',$parametro);
		  $this->db->update('param_fe',array('valor' => $valor));
		return 1;
	 }		 


	 public function put_trackid($idfactura,$trackid){
		  $this->db->where('idfactura',$idfactura);
		  $this->db->update('folios_caf',array('trackid' => $trackid));
		return 1;
	 }		 

	  public function put_trackid_libro($idlibro,$trackid){
		  $this->db->where('id',$idlibro);
		  $this->db->update('log_libros',array('trackid' => $trackid));
		return 1;
	 }	 

	 public function contribuyentes_autorizados($start = null,$limit = null){

	 	$tabla_contribuyentes = $this->busca_parametro_fe('tabla_contribuyentes');

	 	$countAll = $this->db->count_all_results($tabla_contribuyentes);

		$data = $this->db->select('rut, dv, concat(rut,"-",dv) as rut_contribuyente, razon_social, nro_resolucion, date_format(fec_resolucion,"%d/%m/%Y") as fec_resolucion, mail, url',false)
		  ->from($tabla_contribuyentes)
		  ->order_by('razon_social');

		$data = is_null($start) || is_null($limit) ? $data : $data->limit($limit,$start);
		$query = $this->db->get();
		return array('total' => $countAll, 'data' => $query->result());

	 }

	 public function log_libros($start = null,$limit = null,$estado = null){

	 	$countAll = $this->db->count_all_results('log_libros');
		$data = $this->db->select('id, mes, anno, tipo_libro, archivo, date_format(fecha_solicita,"%d/%m/%Y %H:%i:%s") as fecha_solicita, date_format(fecha_procesa,"%d/%m/%Y %H:%i:%s") as fecha_creacion, estado',false)
		  ->from('log_libros')
		  ->order_by('anno','desc')
		  ->order_by('mes','desc');

		$data = is_null($start) || is_null($limit) ? $data : $data->limit($limit,$start);
		$data = is_null($estado) ? $data : $data->where('estado',$estado);		
		$query = $this->db->get();
		return array('total' => $countAll, 'data' => $query->result());

	 }

	public function get_empresa(){
		$this->db->select('rut, dv, razon_social, giro, cod_actividad, dir_origen, comuna_origen, fec_resolucion, nro_resolucion, logo ')
		  ->from('empresa')
		  ->limit(1);
		$query = $this->db->get();
		return $query->row();
	 }


	public function datos_dte_periodo($mes,$anno){
		$this->db->select("f.folio, f.path_dte, f.archivo_dte, f.dte, f.pdf, f.pdf_cedible, f.trackid, c.tipo_caf, tc.nombre as tipo_doc, fc.fecha_factura, concat(left(cl.rut,length(cl.rut)-1),'-',right(cl.rut,1)) as rut, cl.nombres, fc.neto, fc.iva, fc.totalfactura ",false)
		  ->from('folios_caf f')
		  ->join('caf c','f.idcaf = c.id')
		  ->join('tipo_caf tc','c.tipo_caf = tc.id')
		  ->join('factura_clientes fc','f.idfactura = fc.id')
		  ->join('clientes cl','fc.id_cliente = cl.id')
		  ->where('left(fc.fecha_factura,7)',$anno."-".$mes)
		  //->where('left(f.updated_at,7)',$anno."-".$mes) //AUN TENEMOS FACTURAS QUE NO SE EMITEN POR EL SISTEMA
		  ->where('f.estado','O');
		$query = $this->db->get();
		return $query->result();
	}



	public function datos_dte_proveedores_periodo($mes,$anno){
		$this->db->select('d.id, d.idproveedor, d.dte, d.envios_recibos, d.recepcion_dte, d.resultado_dte ')
		  ->from('dte_proveedores d')
		  ->where('left(d.fecha_documento,7)',$anno."-".$mes);
		$query = $this->db->get();
		return $query->result();
	}


	public function valida_existe_libro($mes,$anno,$tipo){
		$this->db->select('id, mes, anno, tipo_libro ')
		  ->from('log_libros')
		  ->where('mes',$mes)
		  ->where('anno',$anno)
		  ->where('tipo_libro',$tipo);
		$query = $this->db->get();
		return count($query->result()) > 0 ? true : false;
	}


	public function genera_libro($id_libro,$tipo,$archivo,$xml_libro){
		$array_update = array(
					'estado' => 'G',
					'fecha_procesa' => date("Y-m-d H:i:s"),
					'archivo' => $archivo,
					'xml_libro' => $xml_libro
					);

	    $this->db->where('id', $id_libro);
		$this->db->update('log_libros',$array_update); 




		//$this->db->insert('log_libros',$array_insert); 
		return true;
	}


	public function put_log_libros($mes,$anno,$tipo,$archivo){

			$array_insert = array(
						'mes' => $mes,
						'anno' => $anno,
						'tipo_libro' => $tipo,
						'trackid' => 0,
						'fecha_solicita' => date("Y-m-d H:i:s"),
						'archivo' => $archivo
						);

		$this->db->insert('log_libros',$array_insert); 
		return $this->db->insert_id();
	}



	public function get_empresa_factura($id_factura){

		$tabla_contribuyentes = $this->busca_parametro_fe('tabla_contribuyentes');

		$this->db->select('c.nombres as nombre_cliente, c.rut as rut_cliente, c.direccion, m.nombre as nombre_comuna, s.nombre as nombre_ciudad, c.fono, e.nombre as giro, ifnull(ca.mail,c.e_mail) as e_mail, cs.direccion as dir_sucursal',false)
		  ->from('factura_clientes acc')
		  ->join('clientes c','acc.id_cliente = c.id','left')
		  ->join('cod_activ_econ e','c.id_giro = e.id','left')
		  ->join('clientes_sucursales cs','acc.id_sucursal = cs.id','left')
		  ->join('comuna m','c.id_comuna = m.id','left')		  
		  ->join('ciudad s','c.id_ciudad = s.id','left')	
		  ->join($tabla_contribuyentes . ' ca','c.rut = concat(ca.rut,ca.dv)','left')
		  ->where('acc.id',$id_factura)
		  ->limit(1);
		$query = $this->db->get();
		return $query->row();
	 }	 


	public function get_detalle_factura($id_factura){
		$this->db->select('p.nombre, f.precio, f.cantidad, f.descuento , f.neto, f.iva, f.totalproducto')
		  ->from('detalle_factura_cliente f')
		  ->join('productos p','f.id_producto = p.id')
		  ->where('f.id_factura',$id_factura);
		$query = $this->db->get();
		return $query->result();
	 }

	public function get_detalle_factura_glosa($id_factura){
		$this->db->select('f.glosa, f.neto, f.iva, f.total, f.num_guia ')
		  ->from('detalle_factura_glosa f')
		  ->where('f.id_factura',$id_factura);
		$query = $this->db->get();
		return $query->result();
	 }	 


	public function get_factura_no_enviada(){
		$this->db->select('c.idfactura')
		  ->from('folios_caf c ')
		  ->join('factura_clientes fc','c.idfactura = fc.id')
		  ->where('c.trackid','0')
		  ->where('c.idfactura <> 0')
		  ->where('c.estado','O');
		$query = $this->db->get();
		return $query->result();
	 }

	public function get_content_caf_folio($folio,$tipo_documento){
		$this->db->select('f.estado, c.archivo, c.caf_content ')
		  ->from('caf c')
		  ->join('folios_caf f','f.idcaf = c.id')
		  ->where('f.folio',$folio)
		  ->where('c.tipo_caf',$tipo_documento)
		  ->limit(1);
		  $query = $this->db->get();
		  $caf = $query->row();					  
		  return $caf;
	 }	 

	public function datos_dte($idfactura){

		$this->db->select('f.id, f.folio, f.path_dte, f.archivo_dte,  f.archivo_dte_cliente, f.dte, f.dte_cliente, f.pdf, f.pdf_cedible, f.trackid, c.tipo_caf, tc.nombre as tipo_doc, cae.nombre as giro, cp.nombre as cond_pago, v.nombre as vendedor ')
		  ->from('folios_caf f')
		  ->join('caf c','f.idcaf = c.id')
		  ->join('tipo_caf tc','c.tipo_caf = tc.id')
		  ->join('factura_clientes fc','f.idfactura = fc.id','left')
		  ->join('clientes cl','fc.id_cliente = cl.id','left')
		  ->join('cod_activ_econ cae','cl.id_giro = cae.id','left')
		  ->join('cond_pago cp','fc.id_cond_venta = cp.id','left')
		  ->join('vendedores v','fc.id_vendedor = v.id','left')

		  ->where('f.idfactura',$idfactura)
		  ->limit(1);
		$query = $this->db->get();
		return $query->row();
	}




	public function get_libro_by_id($idlibro){
		$this->db->select('id, mes, anno, tipo_libro, archivo, date_format(fecha_solicita,"%d/%m/%Y %H:%i:%s") as fecha_solicita, date_format(fecha_procesa,"%d/%m/%Y %H:%i:%s") as fecha_creacion, estado, trackid, xml_libro, created_at',false)
		  ->from('log_libros')
		  ->where('id',$idlibro);
		$query = $this->db->get();
		return $query->row();
	}	

public function datos_dte_by_trackid($trackid){
		$this->db->select('f.id, f.folio, f.path_dte, f.archivo_dte, f.dte, f.pdf, f.pdf_cedible, f.trackid, c.tipo_caf, tc.nombre as tipo_doc, cae.nombre as giro, cp.nombre as cond_pago, v.nombre as vendedor    ')
		  ->from('folios_caf f')
		  ->join('caf c','f.idcaf = c.id')
		  ->join('tipo_caf tc','c.tipo_caf = tc.id')
		  ->join('factura_clientes fc','f.idfactura = fc.id','left')
		  ->join('clientes cl','fc.id_cliente = cl.id','left')
		  ->join('cod_activ_econ cae','cl.id_giro = cae.id','left')	
		  ->join('cond_pago cp','fc.id_cond_venta = cp.id','left')	
		  ->join('vendedores v','fc.id_vendedor = v.id','left')  
		  ->where('f.trackid',$trackid)
		  ->limit(1);
		$query = $this->db->get();
		return $query->row();
	}



	public function datos_dte_provee($iddte){
		$this->db->select('d.id, p.nombres as proveedor, p.e_mail, d.path_dte, d.arch_rec_dte, d.arch_res_dte, d.arch_env_rec, date_format(d.fecha_documento,"%d/%m/%Y") as fecha_documento , date_format(d.created_at,"%d/%m/%Y") as fecha_creacion ',false)
		  ->from('dte_proveedores d')
		  ->join('proveedores p','d.idproveedor = p.id')
		  ->where('d.id',$iddte)
		  ->order_by('d.id','desc');
		$query = $this->db->get();
		return $query->row();
	}


	 public function exportFePDF($idfactura,$tipo_consulta,$cedible = null){

	 	include $this->ruta_libredte();
	 	if($tipo_consulta == 'id'){
	 		$factura = $this->datos_dte($idfactura);
	 	}else if($tipo_consulta == 'trackid'){
	 		$factura = $this->datos_dte_by_trackid($idfactura);
	 	}
	 	$nombre_pdf = is_null($cedible) ? $factura->pdf : $factura->pdf_cedible;

	 	//file_exists 
	 	$crea_archivo = true;
	 	if($nombre_pdf != ''){
			$base_path = __DIR__;
			$base_path = str_replace("\\", "/", $base_path);
			$file = $base_path . "/../../facturacion_electronica/pdf/".$factura->path_dte.$nombre_pdf;		 		
	 		if(file_exists($file)){
	 			$crea_archivo = false;
	 		}
	 	}

	 	if($crea_archivo){
			// sin límite de tiempo para generar documentos
			set_time_limit(0);
		 	// archivo XML de EnvioDTE que se generará
		 	$archivo = "./facturacion_electronica/dte/".$factura->path_dte.$factura->archivo_dte;
		 	if(file_exists($archivo)){
		 		$content_xml = file_get_contents($archivo);
		 	}else{
		 		$content_xml = $factura->dte;
		 	}

		 	// Cargar EnvioDTE y extraer arreglo con datos de carátula y DTEs
		 	$EnvioDte = new \sasco\LibreDTE\Sii\EnvioDte();
		 	$EnvioDte->loadXML($content_xml);
			$Caratula = $EnvioDte->getCaratula();
			$Documentos = $EnvioDte->getDocumentos();	 	

			if(!file_exists('./facturacion_electronica/pdf/'.$factura->path_dte)){
				mkdir('./facturacion_electronica/pdf/'.$factura->path_dte,0777,true);
			}		

			$base_path = __DIR__;
			$base_path = str_replace("\\", "/", $base_path);
			$path_pdf = $base_path . "/../../facturacion_electronica/pdf/".$factura->path_dte;				


			$empresa = $this->get_empresa();
			foreach ($Documentos as $DTE) {
			    if (!$DTE->getDatos())
			        die('No se pudieron obtener los datos del DTE');
			    $pdf = new \sasco\LibreDTE\Sii\PDF\Dte(false); // =false hoja carta, =true papel contínuo (false por defecto si no se pasa)
			    $pdf->setFooterText();
			    $pdf->setLogo($base_path . '/../../facturacion_electronica/images/logo_empresa.png'); // debe ser PNG!
			    if($factura->giro != ""){
			    	$pdf->setGiroCliente($factura->giro); 
			    }

			    $pdf->setCondPago($factura->cond_pago); 
			    $pdf->setVendedor($factura->vendedor); 			    			    
			    $pdf->setGiroEmisor($empresa->giro); 

			    
			    $pdf->setResolucion(['FchResol'=>$Caratula['FchResol'], 'NroResol'=>$Caratula['NroResol']]);
			    /*if(!is_null($cedible)){
			    	$pdf->setCedible(true);
			    }*/
			    $pdf->agregar($DTE->getDatos(), $DTE->getTED());
			    if($factura->tipo_caf == 33 || $factura->tipo_caf == 34 || $factura->tipo_caf == 52){
				    $pdf->setCedible(true);
				    $pdf->agregar($DTE->getDatos(), $DTE->getTED());			    	
			    }


			    //$pdf->Output('facturacion_electronica/pdf/'.$factura->path_dte.'dte_'.$Caratula['RutEmisor'].'_'.$DTE->getID().'.pdf', 'FI');
			    $archivo = 'dte_'.$Caratula['RutEmisor'].'_'.$DTE->getID();
			    $nombre_archivo = $archivo.".pdf";
			    //$tipo_generacion = is_null($cedible) ? 'FI' : 'F';
			    $tipo_generacion = 'FI';
			    $pdf->Output($path_pdf.$nombre_archivo, $tipo_generacion);
			    $nombre_campo = is_null($cedible) ? 'pdf' : 'pdf_cedible';

			    $this->db->where('idfactura', $idfactura);
				$this->db->update('folios_caf',array($nombre_campo => $nombre_archivo)); 		    

			}		

		}else{

			$filename = $nombre_pdf; /* Note: Always use .pdf at the end. */

			header('Content-type: application/pdf');
			header('Content-Disposition: inline; filename="' . $filename . '"');
			header('Content-Transfer-Encoding: binary');
			header('Content-Length: ' . filesize($file));
			header('Accept-Ranges: bytes');

			@readfile($file);


		}
	}
	 




	public function carga_contribuyentes($path_base,$archivo){

		$this->db->trans_start();
		$this->db->query('truncate contribuyentes_autorizados'); 

		$base_path = __DIR__;
		$base_path = str_replace("\\", "/", $base_path);
		
		$file = $base_path . "/../../facturacion_electronica/base_contribuyentes/".$path_base.$archivo;				



		$this->db->query('LOAD DATA LOW_PRIORITY LOCAL INFILE "' . $file . '" REPLACE INTO TABLE contribuyentes_autorizados FIELDS TERMINATED BY ";" LINES TERMINATED BY "\n" IGNORE 1 LINES (rut,razon_social,nro_resolucion,fec_resolucion,mail,url);'); 

		$tabla_contribuyentes = $this->busca_parametro_fe('tabla_contribuyentes');
		$tabla_inserta = $tabla_contribuyentes == 'contribuyentes_autorizados_1' ? 'contribuyentes_autorizados_2' : 'contribuyentes_autorizados_1';

		$this->db->query("insert into " . $tabla_inserta . " (rut,dv,razon_social,nro_resolucion,fec_resolucion,mail,url)
						select SUBSTRING_INDEX(rut, '-', 1) as rut, SUBSTRING_INDEX(rut, '-', -1) as dv, razon_social, nro_resolucion, concat(SUBSTRING(fec_resolucion,7,4),'-',SUBSTRING(fec_resolucion,4,2),'-',SUBSTRING(fec_resolucion,1,2)) as fec_resolucion, mail, url  from contribuyentes_autorizados");

		$array_insert = array(
						'nombre_archivo' => $archivo,
						'ruta' => $path_base,
						);

		$this->db->insert('log_cargas_bases_contribuyentes',$array_insert); 


		$this->set_parametro_fe('tabla_contribuyentes',$tabla_inserta);

		$this->db->query('truncate '. $tabla_contribuyentes);

		$this->db->trans_complete(); 		

	 }	 


	 public function registro_email($data){

		$this->db->select('id')
		  ->from('email_fe');
		$query = $this->db->get();
		$email = $query->row();	 		

        	if(count($email) > 0){ //actualizar
        		$this->db->where('id',1);
        		$this->db->update('email_fe',$data);
        	}else{ //insertar
        		$data['created_at'] = date("Y-m-d H:i:s");
				$this->db->insert('email_fe',$data);
        	}	 	
        return true;
	 }

	public function get_email(){
		$this->db->select('email_contacto, pass_contacto, tserver_contacto, port_contacto, host_contacto, email_intercambio, pass_intercambio, tserver_intercambio, port_intercambio, host_intercambio ')
		  ->from('email_fe')
		  ->limit(1);
		$query = $this->db->get();
		return $query->row();
	 }



	public function envio_mail_dte($idfactura){


			$factura = $this->datos_dte($idfactura);
			$track_id = $factura->trackid;
			$path = $factura->path_dte;
			//$nombre_dte = $factura->archivo_dte;
			$nombre_dte = $factura->archivo_dte_cliente != '' ? $factura->archivo_dte_cliente : $factura->archivo_dte;

			$empresa = $this->get_empresa();
			$datos_empresa_factura = $this->get_empresa_factura($idfactura);

			$messageBody  = 'Envío de DTE<br><br>';
	        $messageBody .= '<b>Datos Emisor:</b><br>';
	        $messageBody .= $empresa->razon_social.'<br>';
	        $messageBody .= 'RUT:'.$empresa->rut.'-'.$empresa->dv .'<br><br>';

	        $messageBody .= '<b>Datos Receptor:</b><br>';
	        $messageBody .= $datos_empresa_factura->nombre_cliente.'<br>';
	        $messageBody .= 'RUT:'.substr($datos_empresa_factura->rut_cliente,0,strlen($datos_empresa_factura->rut_cliente) - 1)."-".substr($datos_empresa_factura->rut_cliente,-1) .'<br><br>';			        

	        //$messageBody .= '<a href="'. base_url() .'facturas/exportFePDF_mail/'.$track_id.'" >Ver Factura</a><br><br>';

	        $messageBody .= 'Este correo adjunta Documentos Tributarios Electrónicos (DTE) para el receptor electrónico indicado. Por favor responda con un acuse de recibo (RespuestaDTE) conforme al modelo de intercambio de Factura Electrónica del SII.<br><br>';
	        $messageBody .= 'Facturación Electrónica Infosys SPA.';


	        $email_data = $this->facturaelectronica->get_email();
		    if(count($email_data) > 0 && !is_null($datos_empresa_factura->e_mail)){ //MAIL SE ENVÍA SÓLO EN CASO QUE TENGAMOS REGISTRADOS EMAIL DE ORIGEN Y DESTINO
		    	$this->load->library('email');
				$config['protocol']    = $email_data->tserver_intercambio;
				$config['smtp_host']    = $email_data->host_intercambio;
				$config['smtp_port']    = $email_data->port_intercambio;
				$config['smtp_timeout'] = '7';
				$config['smtp_user']    = $email_data->email_intercambio;
				$config['smtp_pass']    = $email_data->pass_intercambio;
				$config['charset']    = 'utf-8';
				$config['newline']    = "\r\n";
				$config['mailtype'] = 'html'; // or html
				$config['validation'] = TRUE; // bool whether to validate email or not      			


		        $this->email->initialize($config);		  		
				
			    $this->email->from($email_data->email_intercambio, 'Factura Electrónica '. NOMBRE_EMPRESA);
			    $this->email->to($datos_empresa_factura->e_mail);

			    #$this->email->bcc(array('rodrigo.gonzalez@info-sys.cl','cesar.moraga@info-sys.cl','sergio.arriagada@info-sys.cl','rene.gonzalez@info-sys.cl')); 
			    $this->email->subject('Envio de DTE ' .$track_id . '_'.$empresa->rut.'-'.$empresa->dv."_".substr($datos_empresa_factura->rut_cliente,0,strlen($datos_empresa_factura->rut_cliente) - 1)."-".substr($datos_empresa_factura->rut_cliente,-1));
			    $this->email->message($messageBody);

			    //$this->email->attach('./facturacion_electronica/dte/'.$path.$nombre_dte);

				$ruta =  $factura->archivo_dte_cliente != '' ? 'dte_cliente' : 'dte';
 			    $this->email->attach('./facturacion_electronica/' . $ruta .'/'.$path.$nombre_dte);		

			    try {
			      $this->email->send();
			      //var_dump($this->email->print_debugger());
			      	        //exit;
			    } catch (Exception $e) {
			      echo $e->getMessage() . '<br />';
			      echo $e->getCode() . '<br />';
			      echo $e->getFile() . '<br />';
			      echo $e->getTraceAsString() . '<br />';
			      echo "no";

			    }
			    return true;

			}else{

				return false;
			}

	}



	public function guarda_csv($archivo){

			//$this->db->query('truncate guarda_csv'); 
			$codproceso = randomstring_mm(10);
			$fila = 1;
			if (($gestor = fopen($archivo, "r")) !== FALSE) {
			    while (($datos = fgetcsv($gestor, 1000, ",")) !== FALSE) {
			        $numero = count($datos);
			        //echo "<p> $numero de campos en la línea $fila: <br /></p>\n";
			        $fila++;
			        $fechafactura = substr($datos[2],6,4)."-".substr($datos[2],3,2)."-".substr($datos[2],0,2);
			        $array_rut = explode("-",$datos[4]);
			        $array_data = array(
			        					'tipocaf' => $datos[0],
			        					'folio' => $datos[1],
			        					'fechafactura' => $fechafactura,
			        					'condicion' => $datos[3],
			        					'rut' => $array_rut[0],
			        					'dv' => $array_rut[1],
			        					'razonsocial' => $datos[5],
			        					'giro' => $datos[6],
			        					'direccion' => $datos[7],
			        					'comuna' => $datos[8],
			        					'ciudad' => $datos[9],
			        					'cuenta' => $datos[10],
			        					'neto' => $datos[11],
			        					'iva' => $datos[12],
			        					'total' => $datos[13],
			        					'codigo' => $datos[14],
			        					'cantidad' => $datos[15],
			        					'unidad' => $datos[16],
			        					'nombre' => $datos[17],
			        					'preciounit' => $datos[18],
			        					'totaldetalle' => $datos[19],
			        					'codigoproceso' => $codproceso
			        			);

			        $this->db->insert('guarda_csv',$array_data);
			        /*for ($c=0; $c < $numero; $c++) {
			            echo $datos[$c] . "<br />\n";
			        }*/
			    }
			    fclose($gestor);
			}

			return $codproceso;

	}



	public function crea_dte_csv($codproceso){

		$this->db->select('tipocaf, folio ')
			->from('guarda_csv')
			->where('codigoproceso',$codproceso)
			->group_by('tipocaf')
			->group_by('folio');

		$query = $this->db->get();
		$data_doctos = $query->result();


		$config = $this->genera_config();
		include $this->ruta_libredte();
		$empresa = $this->get_empresa();

		foreach ($data_doctos as $docto) {


			header('Content-type: text/plain; charset=ISO-8859-1');
			

			$this->db->select('tipocaf, folio, fechafactura, condicion, rut, dv, razonsocial, giro, direccion, comuna, ciudad, cuenta, neto, iva, total, codigo, cantidad, unidad, nombre, preciounit, totaldetalle ')
		  			->from('guarda_csv')
		  			->where('tipocaf',$docto->tipocaf)
		  			->where('folio',$docto->folio);
			$query = $this->db->get();
			$data_csv = $query->result();


			$datos_folio = $this->get_content_caf_folio($docto->folio,$docto->tipocaf);


			if(count($datos_folio) > 0){
				//SÓLO SE CARGA AQUELLOS FOLIOS QUE EXISTEN Y ESTÁN PENDIENTES O TOMADOS
				if($datos_folio->estado == 'P' || $datos_folio->estado == 'T'){

				$tipodocumento = caftotd($docto->tipocaf);

				$this->db->select('id')
			  			->from('clientes')
			  			->where('rut',$data_csv[0]->rut.$data_csv[0]->dv);
				$query = $this->db->get();
				$data_cliente = $query->row();

				if(count($data_cliente) > 0){
					$idcliente = $data_cliente->id;
				}else{ // SI NO EXISTE CLIENTE, SE CREA
						$array_data_cliente = array(
												'rut' => $data_csv[0]->rut.$data_csv[0]->dv,
												'nombres' => $data_csv[0]->razonsocial,
												'direccion' => $data_csv[0]->direccion,

											);

						$this->db->insert('clientes', $array_data_cliente);	
						$idcliente = $this->db->insert_id();											

				}



				$factura_cliente = array(
					'tipo_documento' => $tipodocumento,
			        'id_cliente' => $idcliente,
			        'num_factura' => $docto->folio,
			        'id_vendedor' => 1,
			        'sub_total' => $data_csv[0]->neto,
			        'neto' => $data_csv[0]->neto,
			        'iva' => $data_csv[0]->iva,
			        'totalfactura' => $data_csv[0]->total,
			        'fecha_factura' => $data_csv[0]->fechafactura,
			        'fecha_venc' => $data_csv[0]->fechafactura,
			        'forma' => 1	          
				);

				$this->db->insert('factura_clientes', $factura_cliente); 
				$idfactura = $this->db->insert_id();


				$datos_empresa_factura = $this->get_empresa_factura($idfactura);
				$detalle_factura = $this->get_detalle_factura_glosa($idfactura);

				$i = 0;
				$lista_detalle = array();			
				foreach ($data_csv as $regcsv) {
					$factura_clientes_item = array(
				        'id_factura' => $idfactura,
				        'glosa' => $regcsv->nombre,
				        'neto' => $regcsv->totaldetalle,
				        'iva' => $regcsv->totaldetalle*0.19,
				        'total' => $regcsv->totaldetalle*1.19
					);

					$this->db->insert('detalle_factura_glosa', $factura_clientes_item);

					$lista_detalle[$i]['NmbItem'] = $regcsv->nombre;
					$lista_detalle[$i]['QtyItem'] = $regcsv->cantidad;
					$lista_detalle[$i]['PrcItem'] = $regcsv->preciounit;
					$i++;
					// FIN								
				}// FIN REGCSV


				if($tipodocumento == 101 || $tipodocumento == 103){  // SI ES FACTURA ELECTRONICA O FACTURA EXENTA ELECTRONICA

							$tipo_caf = $docto->tipocaf;

							$factura = [
							    'Encabezado' => [
							        'IdDoc' => [
							            'TipoDTE' => $docto->tipocaf,
							            'Folio' => $docto->folio,
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
							            'RUTRecep' => $data_csv[0]->rut."-".$data_csv[0]->dv,
							            'RznSocRecep' => substr($data_csv[0]->razonsocial,0,100), //LARGO DE RAZON SOCIAL NO PUEDE SER SUPERIOR A 100 CARACTERES
							            'GiroRecep' => substr($data_csv[0]->giro,0,40),  //LARGO DEL GIRO NO PUEDE SER SUPERIOR A 40 CARACTERES
							            'DirRecep' => substr($data_csv[0]->direccion,0,70), //LARGO DE DIRECCION NO PUEDE SER SUPERIOR A 70 CARACTERES
							            'CmnaRecep' => substr($data_csv[0]->comuna,0,20), //LARGO DE COMUNA NO PUEDE SER SUPERIOR A 20 CARACTERES
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
										// Objetos de Firma y Folios
							$Firma = new sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital		
							$caf = $this->get_content_caf_folio($docto->folio,$tipo_caf);
							
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
							    $tipo_envio = $this->busca_parametro_fe('envio_sii'); //ver si está configurado para envío manual o automático


								$nombre_dte = $docto->folio."_". $tipo_caf ."_".$idfactura."_".date("His").".xml"; // nombre archivo
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



							    $this->db->where('f.folio', $docto->folio);
							    $this->db->where('c.tipo_caf', $tipo_caf);
								$this->db->update('folios_caf f inner join caf c on f.idcaf = c.id',array('dte' => $xml_dte,
																										  'estado' => 'O',
																										  'idfactura' => $idfactura,
																										  'path_dte' => $path,
																										  'archivo_dte' => $nombre_dte,
																										  'trackid' => $track_id
																										  )); 
								if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
									$this->envio_mail_dte($idfactura);
								}




							}

						} //FIN CREACION FACTURA

					} // FIN  if($datos_folio->estado == 'P' || $datos_folio->estado == 'T'){

				} // FIN if(count($datos_folio) > 0){
							

		}




	}


	public function get_factura($id_factura){

		$this->db->select('fc.tipo_documento, fc.num_factura, fc.fecha_factura, fc.sub_total, fc.descuento, fc.neto, fc.iva, fc.totalfactura, fc.forma, fc.id_factura')
		  ->from('factura_clientes fc')
		  ->where('fc.id',$id_factura)
		  ->limit(1);
		$query = $this->db->get();
		return $query->row();
	 }	 

	public function crea_dte($idfactura,$tipo = 'sii'){

		$data_factura = $this->get_factura($idfactura);

		$tipodocumento = $data_factura->tipo_documento;
		$numfactura = $data_factura->num_factura;
		$fecemision = $data_factura->fecha_factura;
		if($tipodocumento == 101){
			$tipo_caf = 33;
		}else if($tipodocumento == 103){
			$tipo_caf = 34;
		}else if($tipodocumento == 105){
			$tipo_caf = 52;
		}else if($tipodocumento == 102){
			$tipo_caf = 61;
		}		

		header('Content-type: text/plain; charset=ISO-8859-1');
		$this->load->model('facturaelectronica');
		$config = $this->genera_config();
		include $this->ruta_libredte();

		$empresa = $this->get_empresa();
		$datos_empresa_factura = $this->get_empresa_factura($idfactura);

		//$detalle_factura = $this->get_detalle_factura($idfactura);
		$detalle_factura = $data_factura->forma == 1 ? $this->get_detalle_factura_glosa($idfactura) : $this->get_detalle_factura($idfactura);


		$lista_detalle = array();
		$i = 0;
		foreach ($detalle_factura as $detalle) {
			$lista_detalle[$i]['NmbItem'] = $data_factura->forma == 1 ? $detalle->glosa : $detalle->nombre;
			$lista_detalle[$i]['QtyItem'] = $data_factura->forma == 1 ? 1 : $detalle->cantidad;
			//$lista_detalle[$i]['PrcItem'] = $detalle->precio;
			//$lista_detalle[$i]['PrcItem'] = round((($detalle->precio*$detalle->cantidad)/1.19)/$detalle->cantidad,0);
			//$total = $detalle->precio*$detalle->cantidad;
			//$neto = round($total/1.19,2);

			//$lista_detalle[$i]['PrcItem'] = round($neto/$detalle->cantidad,2);
			//$lista_detalle[$i]['PrcItem'] = $tipo_caf == 33 ? floor($detalle->precio/1.19) : floor($detalle->precio);


			if($data_factura->forma == 1){
				$lista_detalle[$i]['PrcItem'] = $tipo_caf == 33 || $tipo_caf == 52 ? floor($detalle->neto) : floor($detalle->total);
			}else{
				$lista_detalle[$i]['PrcItem'] = $tipo_caf == 33 ? floor(($detalle->totalproducto - $detalle->iva)/$detalle->cantidad) : round($detalle->precio);
			}


			if($tipo_caf == 33 && $data_factura->forma != 1){
				$lista_detalle[$i]['MontoItem'] = ($detalle->totalproducto - $detalle->iva);
			}				

			if(isset($detalle->descuento)){
				if($detalle->descuento != 0){
					$porc_descto = round(($detalle->descuento/($detalle->cantidad*$lista_detalle[$i]['PrcItem'])*100),0);
					$lista_detalle[$i]['DescuentoPct'] = $porc_descto;		
					//$lista_detalle[$i]['PrcItem'] =- $lista_detalle[$i]['PrcItem']*$porc_descto;

				}

			}



			$i++;
		}

		if($tipo_caf == 61){
			$tipo_nota_credito = 1;
			$numfactura_asoc = $data_factura->id_factura;
			$glosa = $tipo_nota_credito == 1 ? 'Anula factura '. $numfactura_asoc : 'Correccion factura '. $numfactura_asoc;
			// datos
			$factura = [
			    'Encabezado' => [
			        'IdDoc' => [
			            'TipoDTE' => $tipo_caf,
			            'Folio' => $numfactura,
			            'FchEmis' => $fecemision
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
			            'GiroRecep' => substr($datos_empresa_factura->giro,0,40),  //LARGO DEL GIRO NO PUEDE SER SUPERIOR A 40 CARACTERES
			            'DirRecep' => substr($datos_empresa_factura->direccion,0,70), //LARGO DE DIRECCION NO PUEDE SER SUPERIOR A 70 CARACTERES
			            'CmnaRecep' => substr($datos_empresa_factura->nombre_comuna,0,20), //LARGO DE COMUNA NO PUEDE SER SUPERIOR A 20 CARACTERES
			        ],
			    ],
				'Detalle' => $lista_detalle,
		        'Referencia' => [
		            'TpoDocRef' => 33,
		            'FolioRef' => $numfactura_asoc,
		            'CodRef' => $tipo_nota_credito,
		            'RazonRef' => $glosa,
		        ]				
			];


		}else{
			// datos
			$factura = [
			    'Encabezado' => [
			        'IdDoc' => [
			            'TipoDTE' => $tipo_caf,
			            'Folio' => $numfactura,
			            'FchEmis' => $fecemision
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
			    ],
				'Detalle' => $lista_detalle
			];

		}

		//FchResol y NroResol deben cambiar con los datos reales de producción
		$caratula = [
		    //'RutEnvia' => '11222333-4', // se obtiene de la firma
		    'RutReceptor' => '60803000-K',
		    'FchResol' => $empresa->fec_resolucion,
		    'NroResol' => $empresa->nro_resolucion
		];

		$Firma = new sasco\LibreDTE\FirmaElectronica($config['firma']); //lectura de certificado digital		
		$caf = $this->facturaelectronica->get_content_caf_folio($numfactura,$tipo_caf);
		$Folios = new sasco\LibreDTE\Sii\Folios($caf->caf_content);
		$DTE = new \sasco\LibreDTE\Sii\Dte($factura);

		$DTE->timbrar($Folios);
		#var_dump($Firma);
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

		    $dte = $this->crea_archivo_dte($xml_dte,$idfactura,$tipo_caf,$tipo);

		    $campos['dte'] = $tipo == 'cliente' ? 'dte_cliente' : 'dte';
		    $campos['archivo_dte'] = $tipo == 'cliente' ? 'archivo_dte_cliente' : 'archivo_dte';

		    $this->db->where('f.folio', $numfactura);
		    $this->db->where('c.tipo_caf', $tipo_caf);
			$this->db->update('folios_caf f inner join caf c on f.idcaf = c.id',array($campos['dte'] => $dte['xml_dte'],
																					  'estado' => 'O',
																					  'idfactura' => $idfactura,
																					  'path_dte' => $dte['path'],
																					  $campos['archivo_dte'] => $dte['nombre_dte'],
																					  'trackid' => $track_id
																					  )); 	

			/*if($track_id != 0 && $datos_empresa_factura->e_mail != ''){ //existe track id, se envía correo
				$this->envio_mail_dte($idfactura);
			}*/

		}

		return $this->datos_dte($idfactura);

	}


	public function crea_archivo_dte($xml,$idfactura,$tipo_caf,$tipo_dte){

				$datos_factura = $this->get_factura($idfactura);
				$datos_empresa_factura = $this->get_empresa_factura($idfactura);
				$rutCliente = substr($datos_empresa_factura->rut_cliente,0,strlen($datos_empresa_factura->rut_cliente) - 1)."-".substr($datos_empresa_factura->rut_cliente,-1);

			    $xml_dte = $tipo_dte == 'sii' ? $xml : str_replace("60803000-K",$rutCliente,$xml);

				$file_name = $tipo_dte == 'sii' ? "SII_" : "CLI_";
				$nombre_dte = $datos_factura->num_factura."_". $tipo_caf ."_".$idfactura."_".$file_name.date("His").".xml"; // nombre archivo
				$ruta = $tipo_dte == 'sii' ? 'dte' : 'dte_cliente';
				$path = date('Ym').'/'; // ruta guardado
				if(!file_exists('./facturacion_electronica/' . $ruta . '/'.$path)){
					mkdir('./facturacion_electronica/' . $ruta . '/'.$path,0777,true);
				}				
				$f_archivo = fopen('./facturacion_electronica/' . $ruta .'/'.$path.$nombre_dte,'w');
				fwrite($f_archivo,$xml_dte);
				fclose($f_archivo);

				return array('xml_dte' => $xml_dte,
							 'nombre_dte' => $nombre_dte,
							 'path' => $path);

	 }	



	public function get_contribuyentes(){

		
		$this->db->trans_start();
		header('Content-type: text/plain; charset=ISO-8859-1');

		$config = $this->genera_config();
		include $this->ruta_libredte();

		// solicitar datos
		$datos = \sasco\LibreDTE\Sii::getContribuyentes(
		    new \sasco\LibreDTE\FirmaElectronica($config['firma']),
		    \sasco\LibreDTE\Sii::PRODUCCION
		);

		
		$tabla_contribuyentes = $this->busca_parametro_fe('tabla_contribuyentes');
		$tabla_inserta = $tabla_contribuyentes == 'contribuyentes_autorizados_1' ? 'contribuyentes_autorizados_2' : 'contribuyentes_autorizados_1';


		foreach ($datos as $dato) {

			$array_rut = explode("-",$dato[0]);
			$array_insert = array(
								'rut' => $array_rut[0],
								'dv' => $array_rut[1],
								'razon_social' => $dato[1],
								'nro_resolucion' => $dato[2],
								'fec_resolucion' => formato_fecha($dato[3],'d-m-Y','Y-m-d'),
								'mail' => $dato[4],
								'url' => $dato[5]
							);

			$this->db->insert($tabla_inserta,$array_insert); 


		}


		$array_insert = array(
						'nombre_archivo' => null,
						'ruta' => null,
						);

		$this->db->insert('log_cargas_bases_contribuyentes',$array_insert); 


		$this->set_parametro_fe('tabla_contribuyentes',$tabla_inserta);

		$this->db->query('truncate '. $tabla_contribuyentes);

		$this->db->trans_complete(); 		

	}	
	 

}
