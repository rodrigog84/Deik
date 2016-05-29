<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Preciosdescuentos extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function save(){

		$items = json_decode($this->input->post('items'));
		$resp = array();
		$id_producto = $this->input->post('id_producto');        
       

		$query = $this->db->query('DELETE  FROM listaprecios WHERE id_producto = '.$id_producto.'');	
		
		foreach($items as $v){

			$listados = array(
		        'id_producto' => $v->id_producto,
		        'nombre' => $v->nombre,
		        'valor' => $v->valor
			);

		$this->db->insert('listaprecios', $listados);

		};

		$resp['success'] = true;
        echo json_encode($resp);


		
	}

	public function getAll(){
		
		$resp = array();
		$nombre = $this->input->get('nombre');        
       
		$countAll = $this->db->count_all_results("listaprecios");
		$data = array();

		if($nombre){
		$query = $this->db->query('SELECT acc.*, p.nombre as nombre_producto FROM listaprecios acc
			left join productos p on (acc.id_producto = p.id)
			WHERE acc.id_producto = '.$nombre.'' 

		);
				
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
	    
	
}
