<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ingresos extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function validaRup(){

		
		$resp = array();
		$rup = $this->input->get('valida');
       		
		$query = $this->db->query('SELECT * FROM rup_oficiales WHERE nombre like "%'.$rup.'%"');

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


	public function save(){
		$resp = array();

		$data = json_decode($this->input->post('data'));

		$data = array(
			'region' => $data->region,
			'comuna' => strtoupper($data->comuna),
	       	'ciudad' => strtoupper($data->ciudad),
	        'rup' => $data->rup,
	        'nombre_productor' => strtoupper($data->nombre_productor),
			'direccion_predio' => strtoupper($data->direccion_predio),
			'nom_titular' => strtoupper($data->nom_titular),			
	        'rut_titular' => $data->rut_titular,
           
		);

		if($this->ifExisteRutAccionistas($rut)){
                    $resp['success'] = true;
                    $resp["errors"] = "Ya existe el RUT"; 

                }else{
                    $resp['success'] = true;
                    $this->db->insert('clientes', $data); 
                }

	     echo json_encode($resp);

	}
	
	public function update(){
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
			'region' => $data->region,
			'comuna' => strtoupper($data->comuna),
	       	'ciudad' => strtoupper($data->ciudad),
	        'rup' => $data->rup,
	        'nombre_productor' => strtoupper($data->nombre_productor),
			'direccion_predio' => strtoupper($data->direccion_predio),
			'nom_titular' => strtoupper($data->nom_titular),			
	        'rut_titular' => $data->rut_titular,
	    );
		$this->db->where('id', $id);
		
		$this->db->update('clientes', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}

	public function getAll(){
		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
		$tipo = $this->input->get('fTipo');

		$countAll = $this->db->count_all_results("rup_oficiales");

		if($nombre){
			$query = $this->db->query('SELECT * FROM rup_oficiales WHERE nombre like "%'.$nombre.'%"');

		}else if($tipo) {
			$query = $this->db->query('SELECT * FROM rup_oficiales WHERE nombre like "%'.$tipo.'%"');
				
		} 
		else
		{
			$query = $this->db->query('SELECT * FROM rup_oficiales limit '.$start.', '.$limit.'');

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
