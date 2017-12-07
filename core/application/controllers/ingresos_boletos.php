<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ingresos_boletos extends CI_Controller {



	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function update(){
		
		$resp = array();
		$id = $this->input->post('id');
		$boleto = $this->input->post('boleto');
		$marca = $this->input->post('marca');
		$dientes = $this->input->post('dientes');
		$control = $this->input->post('control');
				


		$data = array(
	        'boleto' => $boleto,
	        'marca' => $marca,
	        'dientes' => $dientes,
	        'control_interno' => $control
	     
	    );
		$this->db->where('id', $id);
		
		$this->db->update('ingreso_feria', $data);


        $resp['success'] = true;

        echo json_encode($resp);

	}

	
	public function getAll(){
		
		$resp = array();
		$nombre = $this->input->get('nombre');
		$marca = $this->input->get('marca');
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $fecha = date('Y-m-d');

        $countAll = $this->db->count_all_results("ingreso_feria");
		
        if($nombre){


		  $query = $this->db->query('SELECT * FROM ingreso_feria WHERE control_interno like "'.$nombre.'" AND fecha like "%'.$fecha.'%" order by id desc');

		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;


			
		}else if($marca){

		  $query = $this->db->query('SELECT * FROM ingreso_feria WHERE marca like "%'.$marca.'%" AND fecha like "%'.$fecha.'%" order by id desc');

		  $total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
			
		} else {

			$query = $this->db->query('SELECT * FROM ingreso_feria WHERE fecha like "'.$fecha.'" order by id desc');

			$total = 0;

			foreach ($query->result() as $row)

			{
				$total = $total +1;
			
			}

			$countAll = $total;

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

	public function valida(){
		
		$resp = array();

		$boleto = $this->input->post('boleto');
		$marca = $this->input->post('marca');
		$control = $this->input->post('control');
		$fecha = date('Y-m-d');

		if ($control>0){
			
			$marca="A";
		}

		if ($boleto == $marca) {

		$query = $this->db->query('SELECT * FROM ingreso_feria WHERE boleto="'.$boleto.'" AND marca="'.$marca.'" AND fecha="'.$fecha.'"');

		if ($query->num_rows()>0){
				$resp['success'] = true;
		}else{
			
			 $resp['success'] = false;
		}
		}else{

			 $resp['success'] = false;
			
		}

        echo json_encode($resp);
	}

	public function save(){
		
		$resp = array();

		$items = json_decode($this->input->post('items'));
		$boleto = $this->input->post('boleto');
		$marca = $this->input->post('marca');
		$dientes = $this->input->post('dientes');
		$control = $this->input->post('control');
						
		foreach($items as $v){
			$detalle_ingreso_item = array(
		    'boleto' => $boleto,
            'diio' => $v->RFID,
            'control_interno' => $control,
            'marca' => $marca,
            'dientes' => $dientes,
            'fecha' => date('Y-m-d')
		);

		$this->db->insert('ingreso_feria', $detalle_ingreso_item); 

		}

       $query = $this->db->query('DELETE FROM rfid_lectura');
		
        $resp['success'] = true;




        echo json_encode($resp);
	}

	public function savemanual(){
		
		$resp = array();
		//$control = $this->input->post('control');
		$items = json_decode($this->input->post('items'));
						
		foreach($items as $v){
			$detalle_ingresomanual_item = array(
		    'boleto' => $v->boleto,
            'diio' => $v->diio,
            'control_interno' => $v->control,
            'marca' => $v->marca,
            'dientes' => $v->dientes,
            'fecha' => date('Y-m-d')
		);

		$this->db->insert('ingreso_feria', $detalle_ingresomanual_item); 

		}

		

        $resp['success'] = true;

        echo json_encode($resp);
	}

	

  }
  ?>