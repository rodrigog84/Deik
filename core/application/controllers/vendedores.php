<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Vendedores extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function changePass(){
		
        $resp = array();
		$id = $this->input->post('id');
		$oldpass = $this->input->post('oldpass');
		$newpass = $this->input->post('newpass');
		$newpass2 = $this->input->post('id');


		$query = $this->db->query('SELECT * FROM vendedores 
	   	WHERE id = "'.$id.'"');

		
		if ($query->num_rows() > 0)

		{

			$row = $query->first_row();

			if ($oldpass == ($row->password)){

			$this->db->where('id', $id);
			$this->db->update('vendedores', array(
			   'password' => $newpass
			)); 
			$resp['success'] = true;
			}else{

				$resp['success'] = false;
				

			}
	        
		}else{
			$resp['success'] = false;
	       
		}

        echo json_encode($resp);
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

	   	    $query = $this->db->query('SELECT * FROM vendedores 
	   	    WHERE rut like "'.$rut.'"');

	   	    if($query->num_rows()>0){
	   			 $resp['existe'] = true;
	        };
		  
			
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
		$id = ($data->rut);

		$query = $this->db->query('SELECT * FROM vendedores 
	   	    WHERE rut like "'.$id.'"');

	   	    if($query->num_rows()>0){
	   	    	  $resp['success'] = true;
	        }else{

	        	$data = array(
			        'nombre' => strtoupper($data->nombre),
			      	'rut' => ($data->rut),
			        'direccion' => strtoupper($data->direccion),
			        'fono' => ($data->fono),
			        'password' => $data->password,
			        'comision' => ($data->comision),
			        'estado' => $data->estado
			          
				);

				$this->db->insert('vendedores', $data); 

		        $resp['success'] = true;

		        $this->Bitacora->logger("I", 'vendedores', $id);
		        

		        echo json_encode($resp);


	        };
	}

	public function update(){

		$resp = array();

		$nombre = $this->input->post('nombre');
		$rut = $this->input->post('rut');
		$direccion = $this->input->post('direccion');
		$id = $this->input->post('id');
		$estado = $this->input->post('estado');
		$password = $this->input->post('password');
		$comision = $this->input->post('comision');
		$fono = $this->input->post('fono');
		
		$data = array(
			'nombre' => strtoupper($nombre),
	      	'direccion' => strtoupper($direccion),
	        'fono' => $fono,
	        'comision' => $comision,
	        'estado' => $estado
	    );

		$this->db->where('id', $id);
		
		$this->db->update('vendedores', $data); 

        $resp['success'] = true;

        $this->Bitacora->logger("M", 'vendedores', $id);

        echo json_encode($resp);

	}

	public function busca(){
		$resp = array();

        //filtro por nombre
        $nombre = $this->input->post('nombre');

		if($nombre){
			$query = $this->db->query('SELECT * FROM vendedores WHERE id like "'.$nombre.'"');
		}else{
			
			$query = $this->db->query('SELECT * FROM vendedores');
			
		}

		$data = array();
		foreach ($query->result() as $row)
		{
			$paswwor = $row->password;
			$estado = $row->estado;
		}
        $resp['success'] = true;
        $resp['cliente'] = $paswwor;
        $resp['estado'] = $estado;
                

        echo json_encode($resp);
	}

	public function getAll(){
		$resp = array();

        $start = $this->input->post('start');
        $limit = $this->input->post('limit');


        //filtro por nombre
        $nombre = $this->input->get('nombre');

		$countAll = $this->db->count_all_results("vendedores");

		if($nombre){
			$query = $this->db->query('SELECT * FROM vendedores WHERE nombre like "%'.$nombre.'%"
			limit '.$start.', '.$limit.'');
		}else{
			
			$query = $this->db->query('SELECT * FROM vendedores limit '.$start.', '.$limit.'');
			
		}

		$data = array();
		foreach ($query->result() as $row)
		{
			$rutautoriza = $row->rut;
		   	if (strlen($rutautoriza) == 8){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -8, 1);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
		    };
		    if (strlen($rutautoriza) == 9){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 3);
		      $ruta3 = substr($rutautoriza, -7, 3);
		      $ruta4 = substr($rutautoriza, -9, 2);
		      $row->rut = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);		   
		    };
		     if (strlen($rutautoriza) == 2){
		      $ruta1 = substr($rutautoriza, -1);
		      $ruta2 = substr($rutautoriza, -4, 1);
		      $row->rut_cliente = ($ruta2."-".$ruta1);		     
		    };


		   
			$data[] = $row;
		}
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}
}
