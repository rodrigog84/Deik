<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Detalleclientes extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}
	
	public function getAll(){
		
		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
        $nombres = $this->input->get('nombre');
        $idcliente = $this->input->get('idcliente');
		$tipo = $this->input->get('fTipo');
		$opcion = $this->input->get('opcion');
		$cantidad=0;
		$numguia2=0;

		$countAll = $this->db->count_all_results("clientes");

		$query = $this->db->query('SELECT * FROM ingreso_guia WHERE rutdestino = '.$tipo4.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"');

		$data = array();
		
		foreach ($query->result() as $row)
		{
			$numguia = ($row->num_guia);
			if ($numguia != $numguia2){
			$query2 = $this->db->query('SELECT acc.*, r.rup as rupdestino FROM despachofma acc
			left join rupoficiales r on (acc.id_rupdestino = r.id)
			WHERE num_guia = '.$numguia.'');
			
            $numguia2 = $numguia;
			foreach ($query2->result() as $row){

				$rupdestino = $row->rupdestino;
				if ($rupdestino != $rupdestino2){
					$row->cantidadfin = $cantidad;
                    $row->rupdestino = $row->rupdestino;
                    $rupdestino2 = $row->rupdestino;
					$resp['rupdestino'] = $row;
					$cantidad = 0;
				}else{
					$cantidad = $cantidad + ($row->cantidad);				

				}								
			}
			}
		
		};
        $resp['success'] = true;
        echo json_encode($resp);
	}
	
	public function getAllc(){
		$resp = array();

        $start = $this->input->get('start');
        $limit = $this->input->get('limit');
       
        $idcliente = $this->input->get('idcliente');
		
		$countAll = $this->db->count_all_results("clientes");
        
		if($idcliente){
			$query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
			ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
			left join ciudad c on (acc.id_ciudad = c.id)
			left join cod_activ_econ g on (acc.id_giro = g.id)
			left join comuna com on (acc.id_comuna = com.id)
			left join vendedores ven on (acc.id_vendedor = ven.id)
			left join cond_pago con on (acc.id_pago = con.id)
			WHERE acc.id = '.$idcliente.'');
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
		      $row->rut = ($ruta2."-".$ruta1);
		     
		    };
			$data[] = $row;
			$resp['cliente'] = $row;
	
		}
        $resp['success'] = true;
        //$resp['cliente'] = $row;
        $resp['total'] = $countAll;
        $resp['data'] = $data;

        echo json_encode($resp);
	}
}
