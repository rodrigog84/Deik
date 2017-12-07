<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Rupoficiales extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

	public function validaRup(){

		
		$resp = array();
		$rup = $this->input->get('valida');
		$rup2 = substr($rup, 0, 3);

		if ($rup == "09.1.01.1503"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.2.01.0920"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.1.12.1044"){
			
			$rup2 = "07.";
		};

		if ($rup == "10.3.01.0006"){
			
			$rup2 = "07.";
		};

		if ($rup == "10.3.01.0453"){
			
			$rup2 = "07.";
		};

		if ($rup == "10.3.01.0912"){
			
			$rup2 = "07.";
		};

		if ($rup == "10.5.01.1031"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.2.06.0811"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.2.06.0032"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.2.09.0166"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.1.11.0398"){					
			$rup2 = "07.";
		};

		if ($rup == "09.1.12.1435"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.1.12.1575"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.1.01.0999"){
			
			$rup2 = "07.";
		};

		if ($rup == "09.1.21.0397"){
			
			$rup2 = "07.";
		};

		if ($rup2 == 10. or $rup2== 09. or $rup == 11. or $rup == 12.){

	   		$resp['escepcion'] = true;
	   		echo json_encode($resp);
	   		return false;

	   	}else{

	   		$resp['escepcion'] = false;


       		
		$query = $this->db->query('SELECT * FROM rup_oficiales WHERE rup like "%'.$rup.'%"');

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

	
	 }

	public function validaRupguias(){

		
		$resp = array();
		$guia = $this->input->get('valida');
		$cantdiio=0;

		$query3 = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
		left join rup_oficiales c on (acc.id_rupdestino = c.id)
		left join transportistas t on (acc.id_transportista = t.id)
		left join rup_origen r on (acc.id_ruporigen = r.id) 
		WHERE acc.num_guia='.$guia.'');

		if($query3->num_rows()>0){

			$resp['respu'] = false;

	   	    echo json_encode($resp);
	        return false;	
			
		}else{

		$query2 = $this->db->query('SELECT * FROM ingreso_feria WHERE num_guia='.$guia.'');
		$items2 = $query2->result();

		if($query2->num_rows()>0){
			
		    foreach($items2 as $v){

		    	$cantdiio = $cantdiio +1;  	


		    }
		};

		$query = $this->db->query('SELECT * FROM ingreso_guia WHERE num_guia='.$guia.'');
		$items = $query->result();

		$data = array();
        $cantidadnov = 0;
        $cantidadvac = 0;
        $cantidadvaq = 0;
        $cantidadbue = 0;
        $cantidadter = 0;
        $cantidadtor = 0;
        $cantidadcab = 0;
        $cantidadpor = 0;
        $cantidadcap = 0;
        $cantidadovi = 0;
        $canti = 0;

        
		if($query->num_rows()>0){
			
		    foreach($items as $v){
		      $animal = $v->animal;
		      $cantid = $v->cantidad;
		      $canti = $canti + $v->cantidad;
		      if ($animal==10001) {
		          $cantidadnov=$cantidadnov+$cantid;
		      };

		      if ($animal==10002) {
		          $cantidadnov=$cantidadnov+$cantid;
		      };
		      if ($animal==10010) {
		          $cantidadnov=$cantidadnov+$cantid;
		      };
		      if ($animal==10029) {
		          $cantidadnov=$cantidadnov+$cantid;
		      };
		      if ($animal==10003) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		      if ($animal==10012) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		      if ($animal==10015) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		      
		      if ($animal==10019) {
		         $cantidadnov=$cantidadnov+$cantid;
		      };
		      if ($animal==10017) {
		          $cantidadnov=$cantidadnov+$cantid;
		      };
		      if ($animal==10004) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		      if ($animal==10021) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		       if ($animal==10027) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		       if ($animal==10028) {
		          $cantidadvac=$cantidadvac+$cantid;
		      };
		       if ($animal==10005) {
		          $cantidadvaq=$cantidadvaq+$cantid;
		      };
		       if ($animal==10022) {
		          $cantidadvaq=$cantidadvaq+$cantid;
		      };
		      if ($animal==10116) {
		          $cantidadvaq=$cantidadvaq+$cantid;
		      };
		       if ($animal==10030) {
		          $cantidadvaq=$cantidadvaq+$cantid;
		      };
		      if ($animal==10031) {
		          $cantidadvaq=$cantidadvaq+$cantid;
		      };
		       if ($animal==10016) {
		          $cantidadvaq=$cantidadvaq+$cantid;
		      };
		       if ($animal==10014) {
		          $cantidadbue=$cantidadbue+$cantid;
		      }; 
		      if ($animal==10006) {
		          $cantidadbue=$cantidadbue+$cantid;
		      }; 
		       if ($animal==11004) {
		          $cantidadvac=$cantidadvac+$cantid;
		          $cantidadter=$cantidadter+$cantid;
		          $cantid = (($cantid * 2) - $cantid) ;
		          $canti = $canti + $cantid;

		       };
		       if ($animal==12004) {
		          $cantidadvac=$cantidadvac+$cantid;
		          $cantidadter=$cantidadter+$cantid + 1;
		          $cantid = (($cantid * 2) - $cantid) ;
		          $canti = $canti + $cantid + 1;

		       };
		       if ($animal==11005) {
		          $cantidadvac=$cantidadvac+$cantid;
		          $cantidadter=$cantidadter+$cantid;
		          $cantid = (($cantid * 2) - $cantid) ;
		          $canti = $canti + $cantid;
		       };
		        
		       if ($animal==13004) {
		          $cantidadvac=$cantidadvac+$cantid;
		          $cantidadter=$cantidadter+($cantid*3);
		          $canti = $canti + 4;
		       };
		        if ($animal==10007) {
		          $cantidadter=$cantidadter+$cantid;
		      };
		      if ($animal==10013) {
		          $cantidadter=$cantidadter+$cantid;
		      };
		       if ($animal==10025) {
		          $cantidadter=$cantidadter+$cantid;
		      };
		      if ($animal==10026) {
		          $cantidadter=$cantidadter+$cantid;
		      };
		      if ($animal==10009) {
		          $cantidadter=$cantidadter+$cantid;
		      };
		       if ($animal==10024) {
		          $cantidadter=$cantidadter+$cantid;
		      };
		       if ($animal==10008) {
		          $cantidadtor=$cantidadtor+$cantid;
		      }; 
		      if ($animal==10119) {
		          $cantidadtor=$cantidadtor+$cantid;
		      }; 
		      if ($animal==10018) {
		          $cantidadtor=$cantidadtor+$cantid;
		      };
		      if ($animal==10020) {
		          $cantidadtor=$cantidadtor+$cantid;
		      };
		       if ($animal==10023) {
		          $cantidadtor=$cantidadtor+$cantid;
		      };
		      if ($animal==10032) {
		          $cantidadtor=$cantidadtor+$cantid;
		      };
		       if ($animal==10033) {
		          $cantidadtor=$cantidadtor+$cantid;
		      };
		      if ($animal==10011) {
		          $cantidadtor=$cantidadtor+$cantid;
		      };
		      if (substr($animal, -5, 2)==40){
		        $cantidadcab=$cantidadcab+$cantid;
		        $cantdiio = $cantidadcab;
		        $canti = $cantidadcab;
		        $canti= $cantdiio;
		      };
		      if (substr($animal, -5, 2)==60){
		        $cantidadovi=$cantidadovi+$cantid;
		        $cantdiio = $cantidadovi;
		        $canti = $cantidadcab;
		        $canti= $cantdiio;
		      };
		      if ($animal==41045) {
		          $cantidadcab=$cantidadcab+($cantid*2);
		          $cantdiio = $cantdiio + $cantidadcab;
		          $canti= $cantdiio;
		      };
		      if ($animal==42045) {
		          $cantidadcab=$cantidadcab+($cantid*3);
		          $cantdiio = $cantdiio + ($cantid*3);
		          $canti= $cantdiio;
		      };
		      if (substr($animal, -5, 2)==30){
		        $cantidadpor=$cantidadpor+$cantid;
		        $cantdiio= $cantdiio + $cantid;
		      };
		      if ($animal==31035) {
		          $cantidadpor=$cantidadpor+($cantid*2);
		          $cantdiio = $cantdiio + ($cantid*2);
		          $canti= $cantdiio;
		      };
		      if ($animal==32035) {
		          $cantidadpor=$cantidadpor+($cantid*3);
		          $cantdiio = $cantdiio + ($cantid*3);
		          $canti= $cantdiio;
		      };
		      if ($animal==33035) {
		          $cantidadpor=$cantidadpor+($cantid*4);
		          $cantdiio = $cantdiio + ($cantid*4);
		          $canti= $cantdiio;
		      };
		      if ($animal==34035) {
		          $cantidadpor=$cantid+($cantid*5);
		          $cantdiio = $cantdiio + ($cantid*5);
		          $canti = $canti + ($cantid*5);
		          $canti= $cantdiio;
		      };
		      if ($animal==35035) {
		          $cantidadpor=$cantid+($cantid*6);
		          $cantdiio = $cantid + ($cantid*6);
		          $canti = $canti + ($cantid*6);
		          $canti= $cantdiio;
		      };
		      if ($animal==36035) {
		          $cantidadpor=$cantid+($cantid*7);
		          $cantdiio = $cantid + ($cantid*7);
		          $canti = $canti + ($cantid*7);
		          $canti= $cantdiio;
		      };
		      if ($animal==37035) {
		          $cantidadpor=$cantid+($cantid*7);
		          $cantdiio = $cantid + ($cantid*7);
		          $canti = $canti + ($cantid*7);
		          $canti= $cantdiio;
		      };
		      if ($animal==38035) {
		          $cantidadpor=$cantid + ($cantid*8);
		          $cantdiio = $cantid + ($cantid*8);
		          $canti = $canti + ($cantid*8);
		          $canti= $cantdiio;
		      };		      
		      if ($animal==39035) {
		          $cantidadpor=$cantid+($cantid*10);
		          $cantdiio = $cantid + ($cantid*10);
		          $canti = $cantid + ($cantid*10);
		          $canti= $cantdiio;
		      };		      
		      if (substr($animal, -5, 2)==50){
		        $cantidadcap=$cantidadcap+$cantid;
		        $cantdiio = $cantdiio + $cantid;
		        //$canti= $canti + $cantid;
		      };
		       if ($animal==51064) {
		          $cantidadcap=$cantidadcap +($cantid*2);
		          $cantdiio = $cantid + ($cantid*2);
		          $canti = $cantdiio;

		      };
		       if ($animal==52064) {
		          $cantidadcap=$cantidadcap + $cantid + ($cantid*2);
		          $cantdiio = $cantdiio + $cantid + ($cantid*2);
		          $canti = $cantdiio;
		      };
		       if ($animal==53064) {
		          $cantidadcap=$cantidadcap+($cantid*4);
		          $cantdiio = $cantdiio + ($cantid*4);
		          $canti= $cantdiio;
		      };
		      if (substr($animal, -5, 2)==20){
		        $cantidadovi=$cantidadovi+$cantid;
		        $cantdiio = $cantdiio + $cantid;
		        //$canti= $canti + $cantid;
		      };

		      if ($animal==21025) {
		          $cantidadovi=$cantidadovi+($cantid*2);
		          $cantdiio = $cantdiio + 2;
		          $canti = $cantdiio ;
		      };
		      if ($animal==22025) {
		          $cantidadcap=$cantidadcap+ $cantid + ($cantid*2);
		          $cantdiio = $cantid + ($cantid*2);
		          $canti= $cantdiio;
		      };
		      if ($animal==23025) {
		          $cantidadcap=$cantidadcap+($cantid*4);
		          $cantdiio = $cantdiio + ($cantid*4);
		          $canti= $cantdiio;
		      };
		      if ($animal==24025) {
		          $cantidadcap=$cantidadcap+($cantid*5);
		          $cantdiio = $cantdiio + ($cantid*5);
		          $canti= $cantdiio;
		      };

		    $data = array(
			'cantidadnov' => $cantidadnov,
			'cantidadvac' => $cantidadvac,
			'cantidadvaq' => $cantidadvaq,
			'cantidadbue' => $cantidadbue,
			'cantidadter' => $cantidadter,
			'cantidadtor' => $cantidadtor,
			'cantidadcab' => $cantidadcab,
			'cantidadpor' => $cantidadpor,
			'cantidadcap' => $cantidadcap,
			'cantidadovi' => $cantidadovi,
			);
		}

	   			$row = $query->first_row();
	   			$resp['guias'] = $row;
	   			$resp['cantidad'] = $data;
	   			$resp['success'] = true;
	   			$resp['valida'] = true;
	   			$resp['canrdiio'] = $cantdiio;
	   			$resp['cant'] = $canti;
	   				   			
	   			if ($canti < $cantdiio){

	   				$resp['valida'] = false	;				

	   			};
	   			if ($canti > $cantdiio){

		   			$resp['valida'] = false	;				

		   		};
	   			
	        echo json_encode($resp);

	   }else{
	   	    $resp['success'] = false;
	   	    echo json_encode($resp);
	        return false;
	    }
	};
	}
       		
		
	public function validaFma(){

		
		$resp = array();
		$fma = $this->input->get('valida');
       		
		$query = $this->db->query('SELECT * FROM ingresofma WHERE num_fma like "'.$fma.'"');

		if($query->num_rows()>0){
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

        $resp['success'] = true;
        $this->db->insert('rup_oficiales', $data); 
        echo json_encode($resp);

	}

	public function modifica(){

		$resp = array();

		$id = $this->input->post('id');
		$rut = $this->input->post('rut');
		$nombre = $this->input->post('nombre');
		$nombrepro = $this->input->post('nombrepro');
		$region = $this->input->post('region');
		$ciudad = $this->input->post('ciudad');
		$comuna = $this->input->post('comuna');
		$rup = $this->input->post('rup');
		$direccion = $this->input->post('direccion');

		$data = array(
			'region' => $region,
			'comuna' => strtoupper($comuna),
	       	'ciudad' => strtoupper($ciudad),
	        'rup' => $rup,
	        'nombre_productor' => strtoupper($nombrepro),
			'direccion_predio' => strtoupper($direccion),
			'nom_titular' => strtoupper($nombre),			
	        'rut_titular' => $rut,
           
		);

        $this->db->where('id', $id);
		
		$this->db->update('rup_oficiales', $data); 

        $resp['success'] = true;

        echo json_encode($resp);

	}	
	
	public function saverup(){
		
		$resp = array();

		$rut = $this->input->post('rut_titular');
		$nombre = $this->input->post('nom_titular');
		$nombrepro = $this->input->post('nombre_productor');
		$region = $this->input->post('region');
		$ciudad = $this->input->post('ciudad');
		$comuna = $this->input->post('comuna');
		$rup = $this->input->post('rup');
		$direccion = $this->input->post('direccion_predio');

		$data = array(
			'region' => $region,
			'comuna' => strtoupper($comuna),
	       	'ciudad' => strtoupper($ciudad),
	        'rup' => $rup,
	        'nombre_productor' => strtoupper($nombrepro),
			'direccion_predio' => strtoupper($direccion),
			'nom_titular' => strtoupper($nombre),			
	        'rut_titular' => $rut,
           
		);

        $resp['success'] = true;
        $this->db->insert('rup_oficiales', $data); 
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
			$query = $this->db->query('SELECT * FROM rup_oficiales WHERE  rup like "%'.$nombre.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;

		}else if($tipo) {
			$query = $this->db->query('SELECT * FROM rup_oficiales WHERE nombre_productor like "%'.$tipo.'%"');

			$total = 0;

		  foreach ($query->result() as $row)
			{
				$total = $total +1;
			
			}

			$countAll = $total;
				
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
