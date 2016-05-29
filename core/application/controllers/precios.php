<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Precios extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function actualiza(){

		$resp = array();
		$motivo ="PRECIO EMPRESA";

		$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto FROM precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.estado = " " '
			);
			
			
		if($query->num_rows()>0){
	   		foreach ($query->result() as $row)
			{
            $producto = $row->id_producto;
            $id = $row->id;
            $valor = $row->nuevalor;
            $valor_lista = $row->nuevovalor_lista;

            $datos3 = array( 
             'nombre' => $motivo,             	
			 'valor' => $valor_lista,
			);

			$datos4 = array(			
			 'id_producto' => $producto,
			 'nombre' => $motivo,            	
			 'valor' => $valor_lista,
			);

			$datos = array(
			 'p_venta' => $valor,
			);

	    	$this->db->where('id', $producto);

	    	$this->db->update('productos', $datos);

	    	$query2 = $this->db->query('SELECT acc.*, c.codigo as cod_producto
			FROM listaprecios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.id_producto = "'.$producto.'" '
			);

			if($query2->num_rows()>0){

				$this->db->where('id', $producto);
				$this->db->update('listaprecios', $datos3);
				

			}else{

				$this->db->insert('listaprecios', $datos4);
				

			};

	    	$datos2 = array(
			 'estado' => "SI",
			);

	    	$this->db->where('id', $id);

	    	$this->db->update('precios', $datos2);
		    							
			};

	        $resp['success'] = true;
	        
	   }else{
	   	    $resp['success'] = false;
	   	    
	   };

	   echo json_encode($resp);
	   return false;

	}

	public function borrar(){

		$resp = array();

		$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto FROM precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.estado = " " '
			);
			
			
		if($query->num_rows()>0){

	   		foreach ($query->result() as $row)
			{
            $producto = $row->id_producto;
            $id = $row->id;
            $query = $this->db->query('DELETE FROM precios WHERE id = "'.$id.'"');
		    							
			};

	        $resp['success'] = true;
	        
	   }else{
	   	    $resp['success'] = false;
	   	    
	   };

	   echo json_encode($resp);
	   return false;

	}



	
	public function save(){

		$resp = array();

		$fecha = $this->input->post('fecha');
		$numero = $this->input->post('numero');
		$items = json_decode($this->input->post('items'));
		
		foreach($items as $v){
		$precios = array(
			'numero' => $numero,
	        'fecha' => $fecha,
	        'id_producto' => $v->idproducto,
	        'valor_original' => $v->p_venta,
	        'nuevalor' => $v->precionuevo,
	        'stock' => $v->stock
		);

		$this->db->insert('precios', $precios); 
		};

		$resp['success'] = true;
		
        echo json_encode($resp);
	}
	
	
	public function rescatar(){

		$resp = array();

        $config['upload_path'] = "./cargas/"	;
        $config['file_name'] = 'archivo_precios';
        $config['allowed_types'] = "*";
        $config['max_size'] = "10240";
        $config['overwrite'] = TRUE;

        $fecha = $this->input->post('fecha_subida');
          //list($dia, $mes, $anio) = explode("-",$fecha);
          //$fecha2 = $anio ."-". $mes ."-". $dia;
		$numero = $this->input->post('numero');
        $this->load->library('upload', $config);

        if (!$this->upload->do_upload("archivo")) {
            print_r($this->upload->data()); 
            print_r($this->upload->display_errors());
            $error = true;
            $message = "Error en subir archivo.  Intente nuevamente";
        };

        $data_file_upload = $this->upload->data();

		$nombre_archivo = $config['upload_path'].$config['file_name'].$data_file_upload['file_ext'];

		$this->load->library('PHPExcel');	       		
				//read file from path
		$objPHPExcel = PHPExcel_IOFactory::load($nombre_archivo);
		 //get only the Cell Collection
		$cell_collection = $objPHPExcel->getActiveSheet()->getCellCollection();

		//extract to a PHP readable array format
		foreach ($cell_collection as $cell) {
			    $column = $objPHPExcel->getActiveSheet()->getCell($cell)->getColumn();
			    $row = $objPHPExcel->getActiveSheet()->getCell($cell)->getRow();

			    $data_value = $objPHPExcel->getActiveSheet()->getCell($cell)->getValue();
			   //header will/should be in row 1 only. of course this can be modified to suit your need.
			    if ($row < 4) {
				$header[$row][$column] = $data_value;
			    } else {
				$arr_data[$row][$column] = $data_value;
			    };
		};

	foreach ($arr_data as $precio) {
		
		$id = $precio['A'];
		$codigo = $precio['B'];
		$nombre = $precio['C'];
		$precio_venta = $precio['D'];
		$precio_lista = $precio['E'];
		$stock = $precio['F'];
		
		if ($id > 0){

		$query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre  as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia, li.valor as valor_lista  FROM productos acc
              left join mae_ubica c on (acc.id_ubi_prod = c.id)
              left join marcas m on (acc.id_marca = m.id)
              left join mae_medida ca on (acc.id_uni_medida = ca.id)
              left join familias fa on (acc.id_familia = fa.id)
              left join agrupacion ag on (acc.id_agrupacion = ag.id)
              left join subfamilias sb on (acc.id_subfamilia = sb.id)
              left join listaprecios li on (acc.id = li.id)
              left join bodegas bo on (acc.id_bodega = bo.id)
              WHERE acc.id like "'.$id.'"');		
		
		foreach ($query->result() as $row)
		{
			$p_venta = $row->p_venta;
			$p_lista = $row->valor_lista;
			if (!$p_lista){
				
				$p_lista = 0;
			}
		}

		$precios = array(
			'numero' => $numero,
	        'fecha' => date('Y-m-d'),
	        'id_producto' => $id,
	        'valor_original' => $p_venta,
	        'valor_originallista' => $p_lista,
	        'nuevalor' => $precio_venta,
	        'nuevovalor_lista' => $precio_lista,
	        'stock' => $stock
		);

		$this->db->insert('precios', $precios);

	    };
		};

		 $resp['success'] = true;
         echo json_encode($resp);

	}
	

	public function getAll(){
		
		$resp = array();
        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombres = $this->input->get('nombre');
        $opcion =  $this->input->get('opcion');
        
        if (!$opcion){        	
        	$opcion = "Todos";
        };

        $countAll = $this->db->count_all_results("precios");
        
		
		if($opcion == "Nombre"){

			if($nombres) {	        
		
			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombres);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "acc.nombre like '%".$nombre."%' and ";
	        }

			$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto FROM precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE ' . $sql_nombre . ' 1 = 1 and acc.estado = " "');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

		}

		};

		if($opcion == "Codigo"){

			if($nombres) {	        
		
			$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto FROM precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.codigo like "%'.$nombres.'%" and acc.estado = " "');

			$total= 0;
				
			foreach ($query->result() as $row)
			{
				$total = $total+1;
				$countAll = $total;
			}

		}

		};

		if($opcion == "Todos"){				   
		
			$query = $this->db->query('SELECT acc.*, c.codigo as cod_producto,
			c.nombre as nom_producto FROM precios acc
			left join productos c on (acc.id_producto = c.id)
			WHERE acc.stock > 0 and acc.estado != "SI"
			limit '.$start.', '.$limit.' '
			);
			
		}
	
		
		$data = array();
						
		foreach ($query->result() as $row)
		{
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}
}
