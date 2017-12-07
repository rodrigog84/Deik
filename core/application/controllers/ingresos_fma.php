<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ingresos_fma extends CI_Controller {


	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function buscaranimales(){
		
		$resp = array();
		$fecha = $this->input->post('fechaproceso');	
        $data = array();
        $vacunos = 0;
        $caballares = 0;
        $porcinos = 0;
        $ovinos = 0;
        $caprinos = 0;
		
        if($fecha){

		    $query = $this->db->query('SELECT * FROM ingresofma WHERE fecha_proceso like "'.$fecha.'"');

			if($query->num_rows()>0){
        
			foreach ($query->result() as $row)
			{
				$vacunos = $vacunos + $row->vacunos;
				$caballares = $caballares + $row->caballares;
				$porcinos = $porcinos + $row->porcinos;
				$ovinos = $ovinos + $row->ovinos;
				$caprinos = $caprinos + $row->caprinos;

			 $idfma = $row->id;
	         $query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM detalle_ingresofma acc 
	         left join tipo_animales c on (acc.especie = c.id)
	         WHERE acc.id_fma = '.$idfma.'');

            $total = 0;
            if($query->num_rows()>0){        
            foreach ($query->result() as $v){
              $total = $total + 1;
            };
            };

            if ($total == $row->vacunos){
              $datael = array(
              'estado' => 1
              );
              $this->db->where('id', $idfma);
              
              $this->db->update('ingresofma', $datael);

            };
            if ($row->id_transportista==0){
              $datael = array(
              'estado' => 0
              );
              $this->db->where('id', $idfma);              
              $this->db->update('ingresofma', $datael);
            };
 
			}
					
		};		
		};
        $resp['vacunos'] = $vacunos;
        $resp['caballares'] = $caballares;
        $resp['porcinos'] = $porcinos;
        $resp['ovinos'] = $ovinos;
        $resp['caprinos'] = $caprinos;
        $resp['success'] = true;
       
        echo json_encode($resp);
	}

	public function elimina(){

    $resp = array();
    $idfma = $this->input->post('idfma');

    $query = $this->db->query('DELETE FROM ingreso_feria WHERE id = "'.$idfma.'"');
    
    $resp['success'] = true;
    echo json_encode($resp);

    }

    public function saveingreso(){
		
		$resp = array();
		$numfma = $this->input->post('numfma');
		$idfma = $this->input->post('idfma');
		$numguia = $this->input->post('numguia');
    	$ruttitular = $this->input->post('ruttitular');
    	$rutdestino = $this->input->post('rutdestino'); 
    	$rutfma = $this->input->post('rutfma');
		$items = json_decode($this->input->post('items'));
	    $fechaproceso = $this->input->post('fechaproceso');
    	$ruporigen = $this->input->post('ruporigen');
    	$rupdestino = $this->input->post('idrupdestino');
    	$fechasalida = $this->input->post('fechasalida');
    	$horasalida = $this->input->post('horasalida');
    	$fechallegada = $this->input->post('fechallegada');
    	$horallegada = $this->input->post('horallegada');
    	$idtransportista = $this->input->post('idtransportista');
    	$camion = $this->input->post('camion');
    	$carro = $this->input->post('carro');
    	$observaciones = $this->input->post('observaciones');
    	$vacunos = $this->input->post('vacunos');
    	$caballares = $this->input->post('caballares');
    	$porcinos = $this->input->post('porcinos');
    	$ovinos = $this->input->post('ovinos');
    	$caprinos = $this->input->post('caprinos');              
       		
		$ingreso_fma = array(
            'num_fma' => $numfma,
            'num_guia' => $numguia, 
            'rut_titular' => $rutfma,
            'rut_fma_origen' => $rutfma,
            'fecha_proceso' => $fechaproceso, 
            'id_ruporigen' => $ruporigen,
            'rut_titular' => $ruttitular,
            'fecha_salida' => $fechasalida, 
            //'hora_salida' => $horasalida,
            'id_rupdestino' => $rupdestino,
            'fecha_llegada' => $fechallegada,
            //'hora_llegada' => $horallegada, 
            'id_transportista' => $idtransportista, 
            'camion' => $camion,
            'carro' => $carro,
            'observaciones' => $observaciones,
            'vacunos' => $vacunos,
            'caballares' => $caballares,
            'porcinos' => $porcinos,
            'ovinos' => $ovinos,
            'caprinos' => $caprinos
		);

		$this->db->where('id', $idfma);
		
		$this->db->update('ingresofma', $ingreso_fma);

		$query = $this->db->query('SELECT * FROM rup_oficiales WHERE rup like "'.$ruporigen.'"');

		if($query->num_rows()>0){

			$ingreso_rut = array(
            'rut_titular' => $rutfma
			);

			$this->db->where('rup', $ruporigen);
			
			$this->db->update('rup_oficiales', $ingreso_rut);

		}else{			
			 $resp['success'] = false;
		};

		if ($items){
		foreach($items as $v){

			$query = $this->db->query('SELECT * FROM detalle_ingresofma WHERE diio = '.$v->diio.' and id_fma = '.$idfma.' ');
			
			if($query->num_rows()>0){

				foreach ($query->result() as $row)
				{
					$data[] = $row;
				}
				//if ($row->diio == $v->diio){
				$detalle_fma_item = array(
			        'id_fma' => $idfma,
			        'num_fma' => $numfma,
			        'diio' => $v->diio,
			        'ruporigen' => $ruporigen,
	            	'especie' => $v->especie,
	            	'cantidad_lote' => 1,
	            	'fecha_ingreso' => $fechallegada,
	            	'hora_ingreso' => $horallegada		       
				);

					//$this->db->update('detalle_ingresofma', $detalle_fma_item); 
	                //print_r($items);*/
			        
				//};				
				//}



			}else{

				$detalle_fma_item = array(
		        'id_fma' => $idfma,
		        'num_fma' => $numfma,
		        'diio' => $v->diio,
		        'ruporigen' => $ruporigen,
            	'especie' => $v->especie,
            	'cantidad_lote' => 1,
            	'fecha_ingreso' => $fechallegada,
            	'hora_ingreso' => $horallegada		       
				);

				$data[] = $detalle_fma_item;

				$this->db->insert('detalle_ingresofma', $detalle_fma_item);

			}
		};

		}; 
		
        
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

	
	public function getAll(){
		
		$resp = array();
		$idfma = $this->input->get('idfma');	
        $data = array();
		
        if($idfma){

        	 $query = $this->db->query('SELECT acc.*, c.nombre as nom_animal FROM detalle_ingresofma acc 
			left join tipo_animales c on (acc.especie = c.id)
			WHERE acc.id_fma = '.$idfma.'');

			if($query->num_rows()>0){
        
			foreach ($query->result() as $row)
			{
				$data[] = $row;
			}
			$resp['fma'] = $idfma;
		
		};
		
		};
        $resp['success'] = true;
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