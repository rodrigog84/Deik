<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Tipo_animales extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function save(){
		$resp = array();

		$data = json_decode($this->input->post('data'));

		$data = array(
			'nombre' => strtoupper($data->nombre)
	    );

		$resp['success'] = true;
        $this->db->insert('tipo_animales', $data); 
        
	     echo json_encode($resp);

	}
	
	public function update(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
			'nombre' => strtoupper($data->nombre)
	    );
		$this->db->where('id', $id);
		
		$this->db->update('tipo_animales', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}

	public function getAll(){
		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
		$tipo = $this->input->get('fTipo');

		$countAll = $this->db->count_all_results("tipo_animales");

		if($nombre){
			$query = $this->db->query('SELECT * FROM tipo_animales WHERE nombre like "%'.$nombre.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else if($tipo) {
			$query = $this->db->query('SELECT * FROM tipo_animales WHERE nombre like "%'.$tipo.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
				
		} 
		else
		{
			$query = $this->db->query('SELECT * FROM tipo_animales limit '.$start.', '.$limit.'');

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
