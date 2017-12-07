<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ingresos_feria extends CI_Controller {


	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function elimina(){

    $resp = array();
    $idfma = $this->input->post('idfma');

    $query = $this->db->query('DELETE FROM ingreso_feria WHERE id = "'.$idfma.'"');
    
    $resp['success'] = true;
    echo json_encode($resp);

    }

    public function eliminadiio(){

    $resp = array();
    $iddiio = $this->input->post('iddiio');

    $query = $this->db->query('DELETE FROM detalle_ingresofma WHERE id = "'.$iddiio.'"');
    
    $resp['success'] = true;
    echo json_encode($resp);

    }

	public function update(){
		
		$resp = array();
		$id = $this->input->post('id');
		$boleto = $this->input->post('boleto');
		$dientes = $this->input->post('dientes');
		$marca = $this->input->post('marca');


		$data = array(
	        'boleto' => $boleto,
	        'marca' => $marca,
	        'dientes' => $dientes
	        

	     
	    );
		$this->db->where('id', $id);
		
		$this->db->update('ingreso_feria', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}

	public function updaidfma(){
		
		$resp = array();
		$id = $this->input->post('id');
		$idfma = $this->input->post('idfma');
		$numfma = $this->input->post('numfma');
		$iddespacho = $this->input->post('iddespacho');
		$diio = $this->input->post('diio');
		$dientes = $this->input->post('dientes');
		$fecha = $this->input->post('fecha');

		$data = array(
	        'id_fma' => $idfma,
	        'num_fma' => $numfma,
	        'id_fmadespacho' => $iddespacho,
	        'diio' => $diio,
	        'dientes' => $dientes,
	        'fecha_ingreso' => $fecha
	    );
		$this->db->where('id', $id);
		
		$this->db->update('detalle_ingresofma', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}

	public function updatetotal(){
		
		$resp = array();
		$id = $this->input->post('id');
		$boleto = $this->input->post('boleto');
		$marca = $this->input->post('marca');
		$dientes = $this->input->post('dientes');
		$diio = $this->input->post('diio');
		$id_animal = $this->input->post('id_animal');
		$control_interno = $this->input->post('control');
		$fecha = $this->input->post('fecha');
		$num_guia = $this->input->post('num_guia');
		$cantidad = $this->input->post('cantidad');
		$ruporigen = $this->input->post('ruporigen');
		$rutorigen = $this->input->post('rutorigen');
		$rupdestino = $this->input->post('rupdestino');
		$rutdestino = $this->input->post('rutdestino');
		$kilos = $this->input->post('kilos');
		$precio = $this->input->post('precio');
		$valida = $this->input->post('valida');



		$data = array(
	        'boleto' => $boleto,
	        'marca' => $marca,
	        'diio' => $diio,
	        'dientes' => $dientes,
	        'id_animal' => $id_animal,
	        'control_interno' => $control_interno,
	        'fecha' => $fecha,
	        'num_guia' => $num_guia,
	        'cantidad' => $cantidad,
	        'ruporigen' => $ruporigen,
	        'rutorigen' => $rutorigen,
	        'rupdestino' => $rupdestino,
	        'rutdestino' => $rutdestino,
	        'kilos' => $kilos,
	        'precio' => $precio,
	        'valida' => $valida
	    );
		$this->db->where('id', $id);
		
		$this->db->update('ingreso_feria', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}

	public function getAllDiio(){
		
		$resp = array();
		$nombre = $this->input->get('nombre');
		$diio = $this->input->get('diio');
		$fecha = $this->input->get('fecha');
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');


		$countAll = $this->db->count_all_results("detalle_ingresofma");
		$data = array();
		
        if($nombre){
		   $query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM detalle_ingresofma acc 
			left join tipo_animales c on (acc.especie = c.id) 
			WHERE acc.id_fma like "'.$nombre.'" and acc.fecha_ingreso = "'.$fecha.'" order by acc.id desc');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else if($diio) {

			 $query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM detalle_ingresofma acc 
			left join tipo_animales c on (acc.especie = c.id) 
			WHERE acc.diio like "%'.$diio.'%" and acc.fecha_ingreso = "'.$fecha.'"
			order by acc.id desc');

			
		}else {

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM detalle_ingresofma acc 
			left join tipo_animales c on (acc.especie = c.id)
			WHERE acc.fecha_ingreso like "'.$fecha.'%"
			order by acc.id desc
			limit '.$start.', '.$limit.' ');
			
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


	public function getAll(){
		
		$resp = array();
		$nombre = $this->input->get('nombre');
		$diio = $this->input->get('diio');
		$start = $this->input->get('start');
        $limit = $this->input->get('limit');


		$countAll = $this->db->count_all_results("ingreso_feria");
		$data = array();
		
        if($nombre){
		   $query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM ingreso_feria acc 
			left join tipo_animales c on (acc.id_animal = c.id) 
			WHERE acc.boleto like "'.$nombre.'" order by acc.id desc');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else if($diio) {

			 $query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM ingreso_feria acc 
			left join tipo_animales c on (acc.id_animal = c.id) 
			WHERE acc.diio like "%'.$diio.'%" order by acc.id desc');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

			
		}else {

			$query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM ingreso_feria acc 
			left join tipo_animales c on (acc.id_animal = c.id) order by acc.id desc
			limit '.$start.', '.$limit.' ');
			
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

	public function save(){
		
		$resp = array();

		$items = json_decode($this->input->post('items'));
		$boleto = $this->input->post('boleto');
		$marca = $this->input->post('marca');
		$control = $this->input->post('control');
		$animal = $this->input->post('animal');
				
		foreach($items as $v){
			$detalle_ingreso_item = array(
		    'boleto' => $boleto,
            'id_animal' => $animal,
            'diio' => $v->RFID,
            'control_interno' => $control,
            'marca' => $marca,
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
		$control = $this->input->post('control');

		$items = json_decode($this->input->post('items'));
						
		foreach($items as $v){
			$detalle_ingresomanual_item = array(
		    'boleto' => $v->boleto,
            'diio' => $v->diio,
            'control_interno' => $control,
            'marca' => $v->marca,
            'fecha' => date('Y-m-d')
		);

		$this->db->insert('ingreso_feria', $detalle_ingresomanual_item); 

		}

        $resp['success'] = true;

        echo json_encode($resp);
	}

	

  }
  ?>