<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Transportistas extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function validaRut(){

		
		$resp = array();
		$rut = $this->input->get('valida');
        $iddocu = 1;
		
		if(strpos($rut,"-")==false){
	        $RUT[0] = substr($rut, 0, -1);
	        $RUT[1] = substr($rut, -1);
	    }else{
	        $RUT = explode("-", trim($rut));
	    }
	    $elRut = str_replace(".", "", trim($RUT[0]));
	    $factor = 2;
	    $suma=0;
	    for($i = strlen($elRut)-1; $i >= 0; $i--):
	        $factor = $factor > 7 ? 2 : $factor;
	        $suma += $elRut{$i}*$factor++;
	    endfor;
	    $resto = $suma % 11;
	    $dv = 11 - $resto;
	    if($dv == 11){
	        $dv=0;
	    }else if($dv == 10){
	        $dv="k";
	    }else{
	        $dv=$dv;
	    }
	   if($dv == trim(strtolower($RUT[1]))){
		  
			$query = $this->db->query('SELECT * FROM transportistas WHERE rut like "%'.$rut.'%"');
			
	   		if($query->num_rows()>0){
	   			$row = $query->first_row();
	   			$resp['cliente'] = $row;
	   		}

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
			'rut' => $data->rut,
			'nombre' => strtoupper($data->nombre),
	       	'ciudad' => strtoupper($data->ciudad),
	        'camion' => $data->camion,
	        'carro' => $data->carro,
	        'fono' => $data->fono,
	        'fecha' => date('Y-m-d')           
		);

		$resp['success'] = true;
        $this->db->insert('transportistas', $data); 
        echo json_encode($resp);

	}
	
	public function update(){
		
		$resp = array();

		$data = json_decode($this->input->post('data'));
		$id = $data->id;
		$data = array(
			'rut' => $data->rut,
			'nombre' => strtoupper($data->nombre),
	       	'ciudad' => strtoupper($data->ciudad),
	        'camion' => $data->camion,
	        'carro' => $data->carro,
	        'fono' => $data->fono,
	        'fecha' => date('Y-m-d')     
	    );
		$this->db->where('id', $id);
		
		$this->db->update('transportistas', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}

	public function getAll(){
		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombre = $this->input->get('nombre');
		$tipo = $this->input->get('fTipo');
		$patente = $this->input->get('patente');
		


		$countAll = $this->db->count_all_results("transportistas");

		if($nombre){

			$sql_nombre = "";
	        $arrayNombre =  explode(" ",$nombre);

	        foreach ($arrayNombre as $nombre) {
	        	$sql_nombre .= "nombre like '%".$nombre."%' and ";
	        }
	        
			$query = $this->db->query('SELECT * FROM transportistas WHERE ' . $sql_nombre . ' 1 = 1');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else if($patente) {
			$query = $this->db->query('SELECT * FROM transportistas WHERE camion like "%'.$patente.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
				
		} 
		else
		{
			$query = $this->db->query('SELECT * FROM transportistas limit '.$start.', '.$limit.'');

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
