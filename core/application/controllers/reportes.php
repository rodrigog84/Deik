<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Reportes extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->helper('format');
		$this->load->database();
	}

	public function reporte_mensual_ventas(){

		$mes = $this->input->post('mes');
		$anno = $this->input->post('anno');

		$this->load->model('reporte');
		$neto_productos = $this->reporte->mensual_ventas($mes,$anno);
 
		foreach ($neto_productos as $producto) {
			
			 #Facturacion, Boletas, NCredito, (Facturacion+Boletas-NCredito) as totales 
			$producto->Facturacion = "<b>(" . str_pad($producto->Facturacion_doctos,5," ",STR_PAD_LEFT).")&nbsp;&nbsp;</b>" .  number_format($producto->Facturacion,0,".",".");
			$producto->Boletas = "<b>(" . str_pad($producto->Boletas_doctos,5," ",STR_PAD_LEFT).")&nbsp;&nbsp;</b>" .number_format($producto->Boletas,0,".",".");
			$producto->NDebito = "<b>(" . str_pad($producto->NDebito_doctos,5," ",STR_PAD_LEFT).")&nbsp;&nbsp;</b>" .number_format($producto->NDebito,0,".",".");
			$producto->NCredito = "<b>(" . str_pad($producto->NCredito_doctos,5," ",STR_PAD_LEFT).")&nbsp;&nbsp;</b>" .number_format($producto->NCredito,0,".",".");
			$producto->totales = number_format($producto->totales,0,".",".");

			if($producto->concepto == '<b>Totales</b>'){
				$producto->Facturacion = "<b>".$producto->Facturacion."</b>";
				$producto->Boletas = "<b>".$producto->Boletas."</b>";
				$producto->NDebito = "<b>".$producto->NDebito."</b>";
				$producto->NCredito = "<b>".$producto->NCredito."</b>";
				$producto->totales = "<b>".$producto->totales."</b>";
			}
		}

	 	$resp['success'] = true;
	 	$resp['data'] = $neto_productos;
	 	$resp['periodo'] = "Detalle Resumen de Ventas Mensuales - " .month2string((int)$mes)." de " . $anno;
	 	$resp['mes'] = $mes;
	 	$resp['anno'] = $anno;
        echo json_encode($resp);
	 	
	 	 
		

	}


	public function reporte_stock(){


		#$mes = $this->input->post('mes');
		#$anno = $this->input->post('anno');
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $familia = $this->input->get('familia');
        $subfamilia = $this->input->get('subfamilia');
        $agrupacion = $this->input->get('agrupacion');
        $marca = $this->input->get('marca');
        $producto = $this->input->get('producto');


        //print_r($this->input->post(NULL,true)); exit;


		$this->load->model('reporte');
		$datos_stock = $this->reporte->reporte_stock($start,$limit,$familia,$subfamilia,$agrupacion,$marca,$producto);
 		//var_dump($datos_stock);
 		$i = $start + 1;
		foreach ($datos_stock['data'] as $stock) {
			$stock->num = $i;
			$i++;
		}

	 	$resp['success'] = true;
	 	$resp['data'] = $datos_stock['data'];
	 	$resp['total'] = $datos_stock['cantidad'];
	 	/*$resp['periodo'] = "Detalle Resumen de Ventas Mensuales - " .month2string((int)$mes)." de " . $anno;
	 	$resp['mes'] = $mes;
	 	$resp['anno'] = $anno;*/
        echo json_encode($resp);
	 	
	 	 
		

	}	


	public function get_familias(){

		$this->load->model('reporte');
		$familias = $this->reporte->get_familias();

		$array_familias = array();
		$array_familias[] = array('id' => '','nombre' => 'Todos');
		#$array_familias[]['nombre'] = 'Todos';

		foreach ($familias as $familia) {
			$array_familias[] = array('id' => $familia->id,'nombre' => $familia->nombre);
		}
       echo json_encode($array_familias);
	}	


	public function get_subfamilias(){

		$this->load->model('reporte');
		$id_familia = $this->input->get('id_familia');


		$subfamilias = $this->reporte->get_subfamilias($id_familia);

		$array_subfamilias = array();
		$array_subfamilias[] = array('id' => '','nombre' => 'Todos');
		#$array_familias[]['nombre'] = 'Todos';

		foreach ($subfamilias as $subfamilia) {
			$array_subfamilias[] = array('id' => $subfamilia->id,'nombre' => $subfamilia->nombre);
		}
       echo json_encode($array_subfamilias);
	}	


	public function get_agrupaciones(){

		$this->load->model('reporte');
		$id_familia = $this->input->get('id_familia');
		$id_subfamilia = $this->input->get('id_subfamilia');


		$agrupaciones = $this->reporte->get_agrupaciones($id_familia,$id_subfamilia);

		$array_agrupaciones = array();
		$array_agrupaciones[] = array('id' => '','nombre' => 'Todos');
		#$array_familias[]['nombre'] = 'Todos';

		foreach ($agrupaciones as $agrupacion) {
			$array_agrupaciones[] = array('id' => $agrupacion->id,'nombre' => $agrupacion->nombre);
		}
       echo json_encode($array_agrupaciones);
	}	


	public function get_marcas(){

		$this->load->model('reporte');
		$marcas = $this->reporte->get_marcas();

		$array_marcas = array();
		$array_marcas[] = array('id' => '','nombre' => 'Todos');
		#$array_familias[]['nombre'] = 'Todos';

		foreach ($marcas as $marca) {
			$array_marcas[] = array('id' => $marca->id,'nombre' => $marca->nombre);
		}		

       echo json_encode($array_marcas);
	}		




	public function reporte_detalle_productos_stock(){

		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $mes = $this->input->get('mes');
        $anno = $this->input->get('anno');
        $idproducto = $this->input->get('idproducto');


        if($mes != '' && $anno != '' && $idproducto != ''){
			$this->load->model('reporte');
			$detalle_productos_stock = $this->reporte->reporte_detalle_productos_stock($start,$limit,$mes,$anno,$idproducto);
			//$stock = $this->reporte->get_existencia($idproducto);
			//1print_r($stock->stock);
	 		$i = $start + 1;

			foreach ($detalle_productos_stock['data'] as $detalle_producto) {
				
				$detalle_producto->num = $i;
				$i++;
			}

		 	$resp['success'] = true;
		 	$resp['periodo'] = "Detalle Productos  - " .month2string((int)$mes)." de " . $anno;
		 	$resp['mes'] = $mes;
		 	$resp['anno'] = $anno;
		 	$resp['data'] = $detalle_productos_stock['data'];
		 	$resp['total'] = $detalle_productos_stock['cantidad'];
	        echo json_encode($resp);

        }else{


		 	$resp['success'] = true;
		 	$resp['periodo'] = "Detalle Productos  - " .month2string((int)$mes)." de " . $anno;
		 	$resp['data'] = array();
		 	$resp['total'] = 0;
	        echo json_encode($resp);        	
        }



	 	
	 	 
		

	}



	public function reporte_estadisticas_ventas(){

		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $mes = $this->input->get('mes');
        $anno = $this->input->get('anno');


        if($mes != '' && $anno != ''){
			$this->load->model('reporte');
			$detalle_estadistica_venta = $this->reporte->reporte_estadisticas_ventas($start,$limit,$mes,$anno);
			//$stock = $this->reporte->get_existencia($idproducto);
			//1print_r($stock->stock);
	 		$i = $start + 1;

			foreach ($detalle_estadistica_venta['data'] as $detalle_estadistica) {
				
				$detalle_estadistica->num = $i;

				$detalle_estadistica->ventaneta = number_format($detalle_estadistica->ventaneta,0,".",".");
				$detalle_estadistica->costo = number_format($detalle_estadistica->costo,0,".",".");


				$i++;
			}

		 	$resp['success'] = true;
		 	$resp['periodo'] = "Estad&iacute;sticas Ventas  - " .month2string((int)$mes)." de " . $anno;
		 	$resp['mes'] = $mes;
		 	$resp['anno'] = $anno;
		 	$resp['data'] = $detalle_estadistica_venta['data'];
		 	$resp['total'] = $detalle_estadistica_venta['cantidad'];
	        echo json_encode($resp);

        }else{


		 	$resp['success'] = true;
		 	$resp['periodo'] = "Estad&iacute;sticas Ventas  - " .month2string((int)$mes)." de " . $anno;
		 	$resp['data'] = array();
		 	$resp['total'] = 0;
	        echo json_encode($resp);        	
        }



	 	
	 	 
		

	}

}










