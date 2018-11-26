<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Facturasproveedores extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}

	public function save(){

		$resp = array();
		$idproveedor = $this->input->post('idproveedor');
		//$dataproveedor = $this->input->get('dataproveedor');
		$exento = $this->input->post('exento');
		$neto = $this->input->post('neto');
		$iva = $this->input->post('iva');
		$total = $this->input->post('total');
		$numfactura = $this->input->post('numero');
		$fechafactura = $this->input->post('fecha');
		$fechavenc = $this->input->post('fechavenc');
		$tipodocumento=120;
		if(!$exento){
			$exento=0;
		}

		$factura_cliente = array(
			'tipo_documento' => $tipodocumento,
	        'id_cliente' => $idproveedor,
	        'num_factura' => $numfactura,
	        'sub_total' => $neto,
	        'neto' => $neto,
	        'iva' => $iva,
	        'totalfactura' => $total,
	        'fecha_factura' => $fechafactura,
	        'fecha_venc' => $fechavenc
	          
		);

		$this->db->insert('factura_clientes', $factura_cliente); 
		$idfactura = $this->db->insert_id();


		/******* CUENTAS CORRIENTES ****/

		 $query = $this->db->query("SELECT cc.id as idcuentacontable FROM cuenta_contable cc WHERE cc.nombre = 'FACTURAS POR PAGAR'");
		 $row = $query->result();
		 $row = $row[0];
		 $idcuentacontable = $row->idcuentacontable;	


			// VERIFICAR SI CLIENTE YA TIENE CUENTA CORRIENTE
		 $ftotal=$total;
		 $query = $this->db->query("SELECT co.idcliente, co.id as idcuentacorriente  FROM cuenta_corriente co
		 							WHERE co.idcuentacontable = '$idcuentacontable' and co.idcliente = '" . $idproveedor . "'");
    	 $row = $query->result();
	
		if ($query->num_rows()==0){	
			$cuenta_corriente = array(
		        'idcliente' => $idproveedor,
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
	        'glosa' => 'Registro de Factura Proveedores en Cuenta Corriente',
	        'fecvencimiento' => $fechavenc,
	        'valor' => $ftotal,
	        'origen' => 'COMPRA',
	        'fecha' => $fechafactura
		);

		$this->db->insert('cartola_cuenta_corriente', $cartola_cuenta_corriente); 			


	

		/*****************************************/

		 echo json_encode($resp);	
		
               
	}
	
	public function getAll(){
		
		$resp = array();
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $opcion = $this->input->get('opcion');
        $nombres = $this->input->get('nombre');
        $tipo = $this->input->get('documento');
        if(!$opcion){
        	 $opcion = "Todos";        	
        }
       
        if (!$tipo){
	       $sql_tipo_documento = "120";
	    }else{
	       $sql_tipo_documento = "acc.tipo_documento = " . $tipo . " and ";
	    }

        //$countAll = $this->db->count_all_results("factura_clientes");

        $data = array();

	
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
			WHERE acc.estado="" AND acc.tipo_documento="120"
			order by acc.id desc
			limit '.$start.', '.$limit.''
			
			);	

				$total = 0;	



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

		    $countAll = $total;
			
		 
			$data[] = $row;
		}

		//$countAll = $total;
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
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
            $tipo = 120;
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
                WHERE acc.tipo_documento in ( '.$tipo.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.tipo_documento and acc.fecha_factura' 
                
                );
            

              };

        list($anioA, $mesA, $diaA) = explode("-",$fecha3);
        list($anioB, $mesB, $diaB) = explode("-",$fecha4);


		$header = '
		<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
		<html xmlns="http://www.w3.org/1999/xhtml">
		<head>
		<meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
		<title>Libro de Compras</title>
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
		          <p>FECHA EMISION : '.date('d/m/Y').'</p>
			</td>
		  </tr>';              
              
		  $header2 = '<tr>
			<td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>LIBRO DE COMPRAS</h2></td>
			</tr>
			<tr>
			<td style="border-bottom:0pt solid black;border-top:0pt solid black;text-align:center;" colspan="3"><h>DESDE : '.$diaA.'/'.$mesA.'/'.$anioA.' HASTA : '.$diaB.'/'.$mesB.'/'.$anioB.'</h></td>
		  </tr>
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
		      </tr>
		      </table>';
		      $sub_total = 0;
		      $descuento = 0;
		      $neto = 0;
		      $iva = 0;
		      $ivand = 0;
		      $cantfact = 0;
		      $cantnc =0;
		      $cantnd =0;
		      $totalfactura = 0;
		      $totalafecto = 0;
			  $totalivafin = 0;
			  $totalfinala = 0;
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
					$netof += $v['neto'];
					$ivaf += $v['iva'];
					$totalfacturaf += $v['totalfactura'];
					$cantfact++;
					$tipo="Fact";
					};

					if ($v['tipo_documento'] == 120){
					$sub_total += $v['sub_total'];
					$descuento += $v['descuento'];
					$netof += $v['neto'];
					$ivaf += $v['iva'];
					$totalfacturaf += $v['totalfactura'];
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



					$totalafecto += $v['neto'];
					$totalivafin += $v['iva'];
					$totalfinala += $v['totalfactura'];
				    	      	    

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
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalafecto, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalivafin, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfinala, 0, ',', '.').'</b></td>
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
				        <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>Facturas </b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>'.number_format($cantfactex, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($netof, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($ivaf, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfacturf, 0, ',', '.').'</b></td>
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
				       <tr>
				        <td width="477px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;font-size: 14px;" ><b>Totales</b></td>
				        <td width="70px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
				        <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b></b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalafecto, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalivafin, 0, ',', '.').'</b></td>
				        <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;font-size: 14px;" ><b>$ '.number_format($totalfinala, 0, ',', '.').'</b></td>
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
			$this->mpdf->Output("LibroCompras.pdf", "I");
            exit;		          

        }

         public function exportarExcellibroFacturas()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=LibroCompras.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 120;
            $totalnc = 0;
            $totalafnc = 0;
            $totalnetonc = 0;
            $totalnd = 0;
            $totalafnd = 0;
            $totalnetond = 0;
            $totalivand = 0;
            $totalfa = 0;
            $totalaffa = 0;
            $totalnetofa = 0;
            $totalivafa = 0;
            $totaliva = 0;
            $cantfac = 0;
            $cantnc = 0;
            $cantnd = 0;
            $otros = 0;

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){            
                          
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.' ) and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.fecha_factura, acc.tipo_documento, acc.num_factura' 
                
                );           

              };
              
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE COMPRAS</td>";
            echo "<td>DOCUMENTOS ELECTRONICOS</td>";
            echo "<tr>";
                echo "<td>NUMERO</td>";
                echo "<td>TIPO</td>";
                echo "<td>FECHA</td>";
                echo "<td>VENCIMIENTO</td>";
                echo "<td>RUT</td>";
                echo "<td>NOMBRE</td>";
                echo "<td>AFECTO</td>";
                echo "<td>DESCUENTO</td>";
                echo "<td>NETO</td>";
                echo "<td>IVA</td>";
                echo "<td>TOTAL</td>";
                echo "<tr>";
              
              foreach($users as $v){
                 $total = $v['totalfactura'];
                 $afecto = $v['sub_total'];
                 $neto = $v['neto'];
                 $iva = $v['iva'];
                 if ($v['tipo_documento']==102){
                  $total = ($v['totalfactura']/-1);
                  $afecto = ($v['sub_total']/-1);
                  $neto = ($v['neto']/-1);
                  $iva = $v['iva']/-1;
                  $cantnc = $cantnc + 1;
                  $totalnc = $totalnc + $total;
                  $totalafnc = $totalafnc + $afecto;
                  $totalnetonc = $totalnetonc + $neto;
                  $totaliva = $totaliva + $iva;
                  $tip="N/C";
                 }
                  if ($v['tipo_documento']==104){
                    $tip="N/DEB";
                    $totalnd = $totalnd + $total;
                    $totalafnd = $totalafnd + $afecto;
                    $totalnetond = $totalnetond + $neto;
                    $totalivand = $totalivand + $iva;
                    $cantnd = $cantnd +1;                      
                  };
                  if ($v['tipo_documento']==101){
                    $tip="FACT";
                    $totalfa = $totalfa + $total;
                    $totalaffa = $totalaffa + $afecto;
                    $totalnetofa = $totalnetofa + $neto;
                    $totalivafa = $totalivafa + $iva;
                    $cantfac = $cantfac +1;                   
                  };  
                  if ($v['tipo_documento']==120){
                    $tip="FACT";
                    $totalfa = $totalfa + $total;
                    $totalaffa = $totalaffa + $afecto;
                    $totalnetofa = $totalnetofa + $neto;
                    $totalivafa = $totalivafa + $iva;
                    $cantfac = $cantfac +1;                   
                  };                  
                                    
                 
                echo "<tr>";
                   echo "<td>".$v['num_factura']."</td>";
                   echo "<td>".$tip."</td>";
                   echo "<td>".$v['fecha_factura']."</td>";
                   echo "<td>".$v['fecha_venc']."</td>";
                   echo "<td>".$v['rut_cliente']."</td>";
                   echo "<td>".$v['nombre_cliente']."</td>";
                   echo "<td>".$afecto."</td>";
                   echo "<td>".$v['descuento']."</td>";
                   echo "<td>".$neto."</td>";
                   echo "<td>".$iva."</td>";
                   echo "<td>".$total."</td>";
                echo "</tr>";
            }
            echo "<tr>";
                echo "<td>TIPO</td>";
                echo "<td>VIGENTES</td>";
                echo "<td>NULOS</td>";
                echo "<td>AFECTO</td>";
                echo "<td>EXENTO</td>";
                echo "<td>IMPUESTO IVA</td>";
                echo "<td>OTROS IMP.</td>";
                echo "<td>TOTAL FACTURAS</td>";
            echo "<tr>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
            echo "<tr>";
                   echo "<td>FACTURAS ELECTRONICA</td>";
                   echo "<td>".$cantfac."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalaffa."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalivafa."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalfa."</td>";
            echo "</tr>";
            echo "<tr>";
                   echo "<td>NOTAS CREDITO ELECTRONICA</td>";                
                   echo "<td>".$cantnc."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalafnc."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totaliva."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalnc."</td>";
            echo "</tr>";
            echo "<tr>";
                   echo "<td>NOTAS DEBITO ELECTRONICA</td>";                
                   echo "<td>".$cantnd."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalafnd."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalivand."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalnd."</td>";
            echo "</tr>";
             $totalafecto = $totalaffa + $totalafnc + $totalafnd;
             $totalivafin = $totalivafa + $totaliva + $totalivand;
             $totalfinala = $totalfa + $totalnc + $totalnd;
             
            echo "<tr>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
            echo "<tr>";                
                   echo "<td>TOTALES</td>";                
                   echo "<td></td>";
                   echo "<td></td>";
                   echo "<td>".$totalafecto."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalivafin."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalfinala."</td>";                  
            echo "</tr>";
            echo '</table>';
        }

	
}









