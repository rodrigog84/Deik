<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Despacho_diios extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

  public function getAlllircay(){
    
    $resp = array();
    $start = $this->input->get('start');
    $limit = $this->input->get('limit');
    $nombre = $this->input->get('nombre');
    $opcion = $this->input->get('opcion');
    $rup= "07.1.01.0080";

    if (!$opcion){
      
      $opcion = "TODOS";
    }


    $countAll = $this->db->count_all_results("despachofma");
    $data = array();

    if($opcion == "F.M.A"){

      $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
      left join rup_oficiales c on (acc.id_rupdestino = c.id)
      left join transportistas t on (acc.id_transportista = t.id)
      left join rup_origen r on (acc.id_ruporigen = r.id) WHERE acc.num_fma='.$nombre.' and c.rup = "'.$rup.'"');
      

    }else if($opcion == "GUIA"){

      $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
      left join rup_oficiales c on (acc.id_rupdestino = c.id)
      left join transportistas t on (acc.id_transportista = t.id)
      left join rup_origen r on (acc.id_ruporigen = r.id) WHERE acc.num_guia='.$nombre.' and c.rup = "'.$rup.'"');

    
    }else if($opcion == "TODOS"){
      $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
      left join rup_oficiales c on (acc.id_rupdestino = c.id)
      left join transportistas t on (acc.id_transportista = t.id)
      left join rup_origen r on (acc.id_ruporigen = r.id) 
      WHERE c.rup = "'.$rup.'"
      order by acc.id desc
      limit '.$start.', '.$limit.' ');
    };

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

  public function elimina(){

    $resp = array();
    $idfma = $this->input->post('idfma');
    
    $query = $this->db->query('DELETE FROM despachofma WHERE id = "'.$idfma.'"');

    $query = $this->db->query('DELETE FROM detalle_despachofma WHERE id_fma = "'.$idfma.'"');

    $query = $this->db->query('DELETE FROM detalle_ingresofma WHERE id_fmadespacho = "'.$idfma.'"');
   
    $resp['success'] = true;
    echo json_encode($resp);

  }


  public function getAll(){
    
    $resp = array();
    $start = $this->input->get('start');
    $limit = $this->input->get('limit');
    $nombre = $this->input->get('nombre');
    $opcion = $this->input->get('opcion');

    if (!$opcion){
      
      $opcion = "TODOS";
    }


    $countAll = $this->db->count_all_results("despachofma");
    $data = array();

    if($opcion == "F.M.A"){

      $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
      left join rup_oficiales c on (acc.id_rupdestino = c.id)
      left join transportistas t on (acc.id_transportista = t.id)
      left join rup_origen r on (acc.id_ruporigen = r.id) WHERE acc.num_fma='.$nombre.'');
      

    }else if($opcion == "GUIA"){

      $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
      left join rup_oficiales c on (acc.id_rupdestino = c.id)
      left join transportistas t on (acc.id_transportista = t.id)
      left join rup_origen r on (acc.id_ruporigen = r.id) WHERE acc.num_guia='.$nombre.'');

    
    }else if($opcion == "TODOS"){
      $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen FROM despachofma acc 
      left join rup_oficiales c on (acc.id_rupdestino = c.id)
      left join transportistas t on (acc.id_transportista = t.id)
      left join rup_origen r on (acc.id_ruporigen = r.id) order by acc.id desc
      limit '.$start.', '.$limit.' ');
    };

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

		$idruporigen = $this->input->post('idruporigen');
		$idrupdestino = $this->input->post('idrupdestino');
		$numfma = $this->input->post('numfma');
		$numguia = $this->input->post('numguia');
		$transportista = $this->input->post('transportista');
		$camion = $this->input->post('camion');
		$carro = $this->input->post('carro');
		$fechafma = $this->input->post('fechafma');
    $horafma = $this->input->post('horafma');
		$datacliente = json_decode($this->input->post('datacliente'));
		$items = json_decode($this->input->post('items'));
		$novillo = $this->input->post('novillo');
		$vaca = $this->input->post('vaca');
		$vaquilla = $this->input->post('vaquilla');
		$toro = $this->input->post('toro');
		$terneroa = $this->input->post('terneroa');
    $buey = $this->input->post('buey');
    $caballares = $this->input->post('caballares');
    $porcinos = $this->input->post('porcinos');
    $lanares = $this->input->post('lanares');
    $caprinos = $this->input->post('caprinos');
    $total = $caballares+$porcinos+$lanares+$caprinos;

    if ($total == 0){

        $total = $novillo+$vaca+$vaquilla+$toro+$terneroa+$buey;
      
    };

    $despacho_fma = array(

      'num_fma' => $numfma,

    );
		
		$despacho_fma = array(
	        'id_ruporigen' => $idruporigen,
	        'id_rupdestino' => $idrupdestino,
	        'num_fma' => $numfma,
	        'num_guia' => $numguia,
	        'tipo_vaca' => $vaca,
	        'tipo_vaquilla' => $vaquilla,
	        'tipo_terneroa' => $terneroa,
	        'tipo_toro' => $toro,
	        'tipo_novillo' => $novillo,
          'tipo_caballares' => $caballares,
          'tipo_porcinos' => $porcinos,
          'tipo_lanares' => $lanares,
          'tipo_caprinos' => $caprinos,
          'cantidad' => $total,
	        'camion' => $camion,
	        'carro' => $carro,
	        'id_transportista' => $transportista,
	        'fecha_despacho' => $fechafma,
          'hora_despacho' => $horafma
		);

    $this->db->insert('despachofma', $despacho_fma); 
		$idfma = $this->db->insert_id();

		foreach($items as $v){
			$detalle_fma_item = array(
		        'num_fma' => $numfma,
		        'id_fma' => $idfma,
		        'diio' => $v->RFID,
		        'ruporigen' => $idruporigen,
		        'rupdestino' => $idrupdestino,
            'fecha_despacho' => $fechafma
		);

		$this->db->insert('detalle_despachofma', $detalle_fma_item);    
   
		};

    $data = array(
         'correlativo' => $numfma
    );
    $this->db->where('id', $idruporigen);
  
    $this->db->update('rup_origen', $data);

    //ELIMINAR TODO DE LA TABLA rfid_lectura
    $query = $this->db->query('DELETE FROM rfid_lectura');
   
    $resp['success'] = true;



    echo json_encode($resp);
	}

  public function saveguias(){
    
    $resp = array();
    $idruporigen = $this->input->post('idruporigen');
    $idrupdestino = $this->input->post('idrupdestino');
    $numfma = $this->input->post('numfma');
    $rupdestino = $this->input->post('rup');
    $numguia = $this->input->post('numguia');
    $transportista = $this->input->post('transportista');
    $camion = $this->input->post('camion');
    $cantidad = $this->input->post('total');
    $carro = $this->input->post('carro');
    $fechafma = $this->input->post('fechafma');
    $horafma = $this->input->post('horafma');
    $novillo = $this->input->post('novillo');
    $vaca = $this->input->post('vaca');
    $vaquilla = $this->input->post('vaquilla');
    $toro = $this->input->post('toro');
    $terneroa = $this->input->post('terneroa');
    $buey = $this->input->post('buey');
    $caballares = $this->input->post('caballares');
    $lanares = $this->input->post('lanares');
    $caprinos = $this->input->post('caprinos');
    $porcinos = $this->input->post('porcinos');
    
    $diio = "";
    $valida = "SI";
    $cant = 1;
    $cantidad = $novillo+$vaca+$vaquilla+$toro+$terneroa+$buey+$caballares+$lanares+$caprinos+$porcinos;
    $despacho_fma = array(
          'id_ruporigen' => $idruporigen,
          'id_rupdestino' => $idrupdestino,
          'num_fma' => $numfma,
          'num_guia' => $numguia,
          'tipo_vaca' => $vaca,
          'tipo_vaquilla' => $vaquilla,
          'tipo_terneroa' => $terneroa,
          'tipo_toro' => $toro,
          'tipo_novillo' => $novillo,
          'tipo_buey' => $buey,
          'tipo_caballares' => $caballares,
          'tipo_lanares' => $lanares,
          'tipo_porcinos' => $porcinos,
          'tipo_caprinos' => $caprinos,
          'camion' => $camion,
          'cantidad' => $cantidad,
          'carro' => $carro,
          'id_transportista' => $transportista,
          'fecha_despacho' => $fechafma,
          'hora_despacho' => $horafma
    );

    $this->db->insert('despachofma', $despacho_fma); 
    $idfma = $this->db->insert_id();

    $query = $this->db->query('SELECT * FROM ingreso_feria WHERE num_guia="'.$numguia.'"');

    $items = $query->result();
    
    foreach($items as $v){
      $animal = $v->animal;
      $control = $v->control_interno;
      $rutorigen = $v->rutorigen;
      $fechaproc = $v->fecha;
      if ($animal==10001) {
          $idanimal=1;
      };
      if ($animal==10002) {
          $idanimal=1;
      };
      if ($animal==10003) {
          $idanimal=5;
      };
      if ($animal==10018) {
          $idanimal=5;
      };
      if ($animal==10004) {
          $idanimal=5;
      };
      if ($animal==10015) {
          $idanimal=5;
      };
      
      if ($animal==10005) {
          $idanimal=2;
      };
      if ($animal==10006) {
          $idanimal=7;
      };
       if ($animal==10007) {
          $idanimal=4;
      };
      if ($animal==10024) {
          $idanimal=4;
      };
      if ($animal==10016) {
          $idanimal=2;
      };
      if ($animal==10116) {
          $idanimal=2;
      };
      if ($animal==10022) {
          $idanimal=2;
      };
      if ($animal==10008) {
          $idanimal=3;
      };
      if ($animal==10119) {
          $idanimal=1;
      };
      if ($animal==10009) {
          $idanimal=4;
      };
      if ($animal==10010) {
          $idanimal=5;
      };
      if ($animal==10028) {
          $idanimal=5;
      };
      if ($animal==10011) {
          $idanimal=3;
      };
      if ($animal==10012) {
          $idanimal=5;
      };
      if ($animal==10013) {
          $idanimal=5;
      };
      if ($animal==10014) {
          $idanimal=7;
      };      
      if ($animal==10021) {
          $idanimal=5;
      };
      if ($animal==10029) {
          $idanimal=1;
      };
      if ($animal==10017) {
          $idanimal=4;
      };
      if ($animal==10019) {
          $idanimal=4;
      };
      if ($animal==11004 && $control < 501){
            $idanimal=5;
      };
      if ($animal==12004 && $control < 500){
            $idanimal=5;
   
      };
      if ($animal==11004 && $control > 500){
            $idanimal=4;
   
      };
      if ($animal==12004 && $control > 500){
            $idanimal=4;
   
      };
      $detalle_fma_item = array(
            'num_fma' => $numfma,
            'id_fma' => $idfma,
            'diio' => $v->diio,
            'dientes' => $v->dientes,
            'ruporigen' => $idruporigen,
            'rupdestino' => $idrupdestino,
            'fecha_despacho' => date('Y-m-d'),
            'id_animal' => $idanimal
      );

    $this->db->insert('detalle_despachofma', $detalle_fma_item);

    $query = $this->db->query('SELECT * FROM ingresofma WHERE rut_titular="'.$rutorigen.'"
    and fecha_proceso="'.$fechaproc.'"');

    if($query->num_rows()>0){
        $items2 = $query->result();        
        foreach($items2 as $in){
          $idfmaingreso = $in->id;
          $numfmaingreso = $in->num_fma;
          $fechallegada = $in->fecha_llegada;
          $ruporigen = $in->id_ruporigen;
          $horallegada = $in->hora_llegada;             
        };
        $detalle_ingresofma = array(
          'num_fma' => $numfmaingreso,
          'id_fma' => $idfmaingreso,
          'id_fmadespacho' => $idfma,
          'diio' => $v->diio,
          'dientes' => $v->dientes,
          'especie' => $idanimal,
          'ruporigen' => $ruporigen,
          'fecha_ingreso' => $fechaproc,
          'cantidad_lote' => 1,
          'hora_ingreso' => $horallegada
        );
        $this->db->insert('detalle_ingresofma', $detalle_ingresofma);
    };

    $data1 = array(
         'valida' => $valida,
         'rupdestino' => $rupdestino,
         'cantidad' => $cant,
         'id_animal' => $idanimal
    );
    $this->db->where('id', $v->id);
  
    $this->db->update('ingreso_feria', $data1);
   
    }

    $data = array(
         'correlativo' => $numfma
    );
    $this->db->where('id', $idruporigen);
  
    $this->db->update('rup_origen', $data);    
   
    $resp['success'] = true;
    $resp['idfma'] = $idfma;    
    
    echo json_encode($resp);
  }

	public function exportPDF(){

		$idfma = $this->input->get('idfma');
		$numero = $this->input->get('numfma');
    $fecha = $this->input->get('fecha');

    if ($idfma){
		    $query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen, t.rut as
        rut_transportista, r.rut as rut_autoriza, r.nombre as nom_autoriza FROM despachofma acc
			  left join rup_oficiales c on (acc.id_rupdestino = c.id)
			  left join transportistas t on (acc.id_transportista = t.id)
			  left join rup_origen r on (acc.id_ruporigen = r.id)
			  WHERE acc.id = '.$idfma.'');
		}else { if ($numero){
		  	$query = $this->db->query('SELECT acc.*, c.ciudad as ciudad, c.rut_titular as rut_titular, 
        c.nombre_productor as nombre_productor, c.rup as rupdestino, c.nom_titular as nom_titular, c.direccion_predio as direccion_predio, t.nombre as nom_transportista, r.rup as ruporigen, t.rut as
        rut_transportista, r.rut as rut_autoriza, r.nombre as nom_autoriza FROM despachofma acc
			  left join rup_oficiales c on (acc.id_rupdestino = c.id)
			  left join transportistas t on (acc.id_transportista = t.id)
			  left join rup_origen r on (acc.id_ruporigen = r.id)
			  WHERE acc.num_fma = '.$numero.' ');
    }
    }
		$row = $query->result();
		$row = $row[0];
    $caballares = $row->tipo_caballares;
    $porcinos = $row->tipo_porcinos;
    $horafma = $row->hora_despacho;
    $lanares = $row->tipo_lanares;
    $caprinos = $row->tipo_caprinos;
    $items = $this->db->get_where('detalle_despachofma', array('id_fma' => $row->id));
    $fma = $row->num_fma;
    $numguia = $row->num_guia;
		$ruporigen = $row->ruporigen;
    $rupdestino = $row->rupdestino;
		$fecha = $row->fecha_despacho;
    list($anio, $mes, $dia) = explode("-",$fecha); 
    $rutautoriza = $row->rut_autoriza;
    if (strlen($rutautoriza) == 8){
      $ruta1 = substr($rutautoriza, -1);
      $ruta2 = substr($rutautoriza, -4, 3);
      $ruta3 = substr($rutautoriza, -7, 3);
      $ruta4 = substr($rutautoriza, -8, 1);
    };
    if (strlen($rutautoriza) == 9){
      $ruta1 = substr($rutautoriza, -1);
      $ruta2 = substr($rutautoriza, -4, 3);
      $ruta3 = substr($rutautoriza, -7, 3);
      $ruta4 = substr($rutautoriza, -9, 2);
   
    };
    $nombreautoriza = $row->nom_autoriza;
		$direccion = $row->direccion_predio;
		$nombredestino = $row->direccion_predio;
		$ciudad = $row->ciudad;
		$transportista = $row->nom_transportista;
		$rut_trans = $row->rut_transportista;
    if (strlen($rut_trans) == 8){
      $rut1 = substr($rut_trans, -1);
      $rut2 = substr($rut_trans, -4, 3);
      $rut3 = substr($rut_trans, -7, 3);
      $rut4 = substr($rut_trans, -8, 1);
    };
    if (strlen($rut_trans) == 9){
      $rut1 = substr($rut_trans, -1);
      $rut2 = substr($rut_trans, -4, 3);
      $rut3 = substr($rut_trans, -7, 3);
      $rut4 = substr($rut_trans, -9, 2);
   
    };
		$camion = $row->camion;
		$carro = $row->carro;
    $vaca = $row->tipo_vaca;
		$novillo = $row->tipo_novillo;
		$vaquilla = $row->tipo_vaquilla;
		$terneroa = $row->tipo_terneroa;
    $buey = $row->tipo_buey;
    
		$toro = $row->tipo_toro;
    $total = 1;
    $total3 = $row->cantidad;
    $total2 = $row->cantidad;
    /*if ($caballares > 0) {
      
      $total3 = 0;
     
    }

    if ($lanares > 0) {
      
      $total3 = 0;
     
    }

    if ($porcinos > 0) {
      
      $total3 = 0;
     
    }

    if ($caprinos > 0) {
      
      $total3 = 0;
     
    }*/

    $data = array();

    $diio1 = 0;
    $diio2 = 0;
    $diio3 = 0;
    $diio4 = 0;
    $diio5 = 0;
    $diio6 = 0;
    $diio7 = 0;
    $diio8 = 0;
    $diio9 = 0;
    $diio10 = 0;
    $diio11 = 0;
    $diio12 = 0;
    $diio13 = 0;
    $diio14 = 0;
    $diio15 = 0;
    $diio16 = 0;
    $diio17 = 0;
    $diio18 = 0;
    $diio19 = 0;
    $diio20 = 0;
    $diio21 = 0;
    $diio22 = 0;
    $diio23 = 0;
    $diio24 = 0;
    $diio25 = 0;
    $diio26 = 0;

    $diio27 = 0;
    $diio28 = 0;
    $diio29 = 0;
    $diio30 = 0;
    $diio31 = 0;
    $diio32 = 0;
    $diio33 = 0;
    $diio34 = 0;
    $diio35 = 0;
    $diio36 = 0;
    $diio37 = 0;
    $diio38 = 0;
    $diio39 = 0;
    $diio40 = 0;
    $diio41 = 0;
    $diio42 = 0;
    $diio43 = 0;
    $diio44 = 0;
    $diio45 = 0;
    $diio46 = 0;
    $diio47 = 0;
    $diio48 = 0;
    $diio49 = 0;
    $diio50 = 0;
    $diio51 = 0;
    $diio52 = 0;
    $diio53 = 0;
    $diio54 = 0;
    $diio55 = 0;
    $diio56 = 0;
    $diio57 = 0;
    $diio58 = 0;
    $diio59 = 0;
    $diio60 = 0;
    $diio61 = 0;
    $diio62 = 0;
    $diio63 = 0;
    $diio64 = 0;
    $diio65 = 0;
    $diio66 = 0;
    $diio67 = 0;
    $diio68 = 0;
    $diio69 = 0;
    $diio70 = 0;

    /*if ($caballares > 0) {
      
      $total = 0;
     
    }

    /*if ($lanares > 0) {
      
      $total = 0;
   
     
    }

    if ($porcinos > 0) {
      
      $total = 0;
   
     
    }

    if ($caprinos > 0) {
      
      $total = 0;
   
     
    }*/

    if ($total > 0){

    foreach($items->result() as $v){
        $data[] = $v;
        $total = $total + 1;
      };

    }

    if ($total > 0) {
      
     $total2 = 0;
   
     
    }

    
    if ($total == 1) {
      
      $diio1 = $data[0]->diio;
     
    }
     if ($total == 2) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
     
    }
     if ($total == 3) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      
    }
     if ($total == 4) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
     
    }

    if ($total == 5) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
    }

    if ($total == 6) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
        
    }

    if ($total == 7) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
    
    }

    if ($total == 8) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
    
    }

    if ($total == 9) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
    
    }

    if ($total == 10) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
    
    }

    if ($total == 11) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
   
    }

    if ($total == 12) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
     
    }

    if ($total == 13) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
    }

    if ($total == 14) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
    }

    if ($total == 15) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
    }

    if ($total == 16) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
    }

    if ($total == 17) {
      
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;

    }

    if ($total == 18) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
    }

    if ($total == 19) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
    }

    if ($total == 20) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
    }

    if ($total == 21) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
    }

    if ($total == 22) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
    }

    if ($total == 23) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
    }

    if ($total == 24) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
    }

    if ($total == 25) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
    }

    if ($total == 26) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
    }

    if ($total == 27) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
    }

    if ($total == 28) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
    }

    if ($total == 29) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
    }

    if ($total == 30) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
    }

    if ($total == 31) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
    }

    if ($total == 32) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
    }

    if ($total == 33) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
    }

    if ($total == 34) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
    }

    if ($total == 35) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
    }

    if ($total == 36) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
    }

    if ($total == 37) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
    }

    if ($total == 38) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
    }

    if ($total == 39) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
    }

    if ($total == 40) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
    }

    if ($total == 41) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
    }

    if ($total == 42) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
    }

    if ($total == 43) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
    }

    if ($total == 44) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
    }

    if ($total == 45) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
    }

    if ($total == 46) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
    }

    if ($total == 47) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
    }

    if ($total == 48) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
    }

    if ($total == 49) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
    }

    if ($total == 50) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
    }

    if ($total == 51) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
    }

    if ($total == 52) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
    }

    if ($total == 53) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
    }

    if ($total == 54) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
    }

    if ($total == 55) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
    }

    if ($total == 56) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
              
    }

    if ($total == 57) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
         
    }

    if ($total == 58) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
    
    }

    if ($total == 59) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
      $diio59 = $data[58]->diio;
    }

    if ($total == 60) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
      $diio59 = $data[58]->diio;
      $diio60 = $data[59]->diio;
    }

    if ($total == 61) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
      $diio59 = $data[58]->diio;
      $diio60 = $data[59]->diio;
      $diio61 = $data[60]->diio;
    }

    if ($total == 62) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
      $diio59 = $data[58]->diio;
      $diio60 = $data[59]->diio;
      $diio61 = $data[60]->diio;
      $diio62 = $data[61]->diio;
    }

    if ($total == 63) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
      $diio59 = $data[58]->diio;
      $diio60 = $data[59]->diio;
      $diio61 = $data[60]->diio;
      $diio62 = $data[61]->diio;
      $diio63 = $data[62]->diio;
    }


    if ($total == 64) {
      $diio1 = $data[0]->diio;
      $diio2 = $data[1]->diio;
      $diio3 = $data[2]->diio;
      $diio4 = $data[3]->diio;
      $diio5 = $data[4]->diio;
      $diio6 = $data[5]->diio;
      $diio7 = $data[6]->diio;
      $diio8 = $data[7]->diio;
      $diio9 = $data[8]->diio;
      $diio10 = $data[9]->diio;
      $diio11 = $data[10]->diio;
      $diio12 = $data[11]->diio;
      $diio13 = $data[12]->diio;
      $diio14 = $data[13]->diio;
      $diio15 = $data[14]->diio;
      $diio16 = $data[15]->diio;
      $diio17 = $data[16]->diio;
      $diio18 = $data[17]->diio;
      $diio19 = $data[18]->diio;
      $diio20 = $data[19]->diio;
      $diio21 = $data[20]->diio;
      $diio22 = $data[21]->diio;
      $diio23 = $data[22]->diio;
      $diio24 = $data[23]->diio;
      $diio25 = $data[24]->diio;
      $diio26 = $data[25]->diio;
      $diio27 = $data[26]->diio;
      $diio28 = $data[27]->diio;
      $diio29 = $data[28]->diio;
      $diio30 = $data[29]->diio;
      $diio31 = $data[30]->diio;
      $diio32 = $data[31]->diio;
      $diio33 = $data[32]->diio;
      $diio34 = $data[33]->diio;
      $diio35 = $data[34]->diio;
      $diio36 = $data[35]->diio;
      $diio37 = $data[36]->diio;
      $diio38 = $data[37]->diio;
      $diio39 = $data[38]->diio;
      $diio40 = $data[39]->diio;
      $diio41 = $data[40]->diio;
      $diio42 = $data[41]->diio;
      $diio43 = $data[42]->diio;
      $diio44 = $data[43]->diio;
      $diio45 = $data[44]->diio;
      $diio46 = $data[45]->diio;
      $diio47 = $data[46]->diio;
      $diio48 = $data[47]->diio;
      $diio49 = $data[48]->diio;
      $diio50 = $data[49]->diio;
      $diio51 = $data[50]->diio;
      $diio52 = $data[51]->diio;
      $diio53 = $data[52]->diio;
      $diio54 = $data[53]->diio;
      $diio55 = $data[54]->diio;
      $diio56 = $data[55]->diio;
      $diio57 = $data[56]->diio;
      $diio58 = $data[57]->diio;
      $diio59 = $data[58]->diio;
      $diio60 = $data[59]->diio;
      $diio61 = $data[60]->diio;
      $diio62 = $data[61]->diio;
      $diio63 = $data[62]->diio;
      $diio64 = $data[63]->diio;
    }

    $html = ' 	
	    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Formulario F.M.A.</title>
      <link href="estilo_formulario.css" rel="stylesheet" type="text/css" />
      </head>

      <body>
      <table border="0" align="center" cellpadding="0" cellspacing="0">
      <tr>
      <td valign="top"><table border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td class="negro10"><H2>Programa Oficial de Trazabilidad Animal</H2></td>
      </tr>
      <tr>
      <td class="negro10"><H3>FORMULARIO DE MOVIMIENTO ANIMAL (FMA) '.$ruporigen.' - '.$fma.'</H3></td>
      </tr>
      <tr>           
      </tr>
      </table></td>
      </tr>
      </table></td>

      <td>&nbsp;</td>
      </tr>
      <tr>
      <td><table border="0" cellspacing="0" cellpadding="1">
      <tr>
      <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
      <tr>
      <td align="center" bgcolor="#FFFFFF" class="negro18"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="67%" height="20"><strong>ORIGEN DE ANIMALES</strong></td>
      </tr>
      </table></td>
      </tr>
      <tr>
      <td height="20" bgcolor="#FFFFFF"><table border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="67%" height="10"><H5>Nombre de quien Autoriza la Salida</td>
      </H5></tr>
      </table></td>
      </tr>
      <tr>
      <td bgcolor="#ffffff" ><H5>'.$nombreautoriza.'&nbsp;-- R.U.P ORIGEN : '.$ruporigen.' &nbsp;-- GUIA DESPACHO  :  '.$numguia.'</H5></td>
      </tr>
      <tr>
      <td width="100%" bgcolor="#FFFFFF" height="40">RUT :'.$ruta4.'.'.$ruta3.'.'.$ruta2.'-'.$ruta1.' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ____________________________________&nbsp;&nbsp;&nbsp;&nbsp; FECHA DE SALIDA : <b>&nbsp;&nbsp; '.$dia.'/'.$mes.'/'.$anio.'</td>
      </tr>
      <tr>
      <td width="100%" bgcolor="#FFFFFF" height="20"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Firma &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HORA DE SALIDA : <b>&nbsp;&nbsp; '.$horafma.'</td>
      </tr>
      </table>
      </tr>
      </table></td>
      </tr>
      </table></td>
      
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="1">
      <tr>
      <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
      <tr>
      <td align="center" bgcolor="#FFFFFF" class="negro14"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="67%" height="20"><strong>ANTECEDENTES DE TRANSPORTE</strong></td>
      </tr>
      </table></td>
      </tr>
      <tr>
      <td height="20" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="67%" height="10"><H5>Nombre del Trnasportista</td>
      </H5></tr>
      </table></td>
      </tr>
      <tr>
      <td height="40" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td height="25" bgcolor="#FFFFFF">'.$transportista.'</td>
      </tr>

      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="26%" border="0" cellpadding="0" cellspacing="0"><b>RUT   :</b>'.$rut4.'.'.$rut3.'.'.$rut2.'-'.$rut1.' &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; PATENTE   :</b> '.$camion.'  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ACOPLADO  :</b> '.$carro.'</td>
      <tr>
      </table></td>
      </tr>
      </table></td>
      </tr>
      </table></td>
      
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
      <tr>
      <td align="center" bgcolor="#FFFFFF" class="negro14"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td height="10" width="67%"align="center" bgcolor="#FFFFFF" class="negro14"><strong>DESTINO DE ANIMALES</strong></td>
      </tr>
      </table></td>
      </tr>
      <tr>
      <td height="30" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td height="20" bgcolor="#FFFFFF" class="negro12"><b>Nombre O Direcciòn del Establecimiento de Destino<b></td>
      </tr>
      </table></td>
      </tr>
      <tr>
      <td height="20" bgcolor="#FFFFFF">'.$nombredestino.'</td>
      </tr>
      <tr>
      <td width="26%" bgcolor="#FFFFFF">RUP DESTINO : &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '.$rupdestino.'  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; COMUNA '.$ciudad.'</td>
      </tr>
      <tr>
      <td height="20" border="0" bgcolor="#FFFFFF" class="negro12">Nombre de quien recibe</td>
      <tr>
      <td height="40" bgcolor="#FFFFFF" class="negro12">&nbsp;</td>
      </tr>
       <tr>
      <td width="100%" bgcolor="#FFFFFF" height="30">RUT :______________  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;  ____________________________ &nbsp;&nbsp;&nbsp; FECHA DE SALIDA : <b>&nbsp;&nbsp; _____/_____/________</td>
      </tr>
      <tr>
      <td width="100%" bgcolor="#FFFFFF" height="30"> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Firma &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; HORA DE SALIDA : ___________</td>
      </tr>
      </table>
      </tr>
      </table></td>
      </tr>
      </table></td>
      <td>&nbsp;</td>
      </tr>
      <tr>
      <td><table width="100%" border="0" cellspacing="0" cellpadding="1">
      <tr>
      <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
      <tr>
      <td align="center" bgcolor="#FFFFFF" class="negro14"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="100%" height="20"><strong>ESPECIE ANIMAL TRANSPORTADA</strong></td>
      </tr>
      </table></td>
      </tr>
      <tr>
      <td height="20" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="100">VACA &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;['.$vaca.'] </td>
      <td width="100">VAQUILLA&nbsp;&nbsp;['.$vaquilla.']</td>
      <td width="100">NOVILLO&nbsp;&nbsp;&nbsp;['.$novillo.']</td>
      <td width="100">TORO&nbsp;['.$toro.']</td>
      <td width="120">TERNERO/A&nbsp;['.$terneroa.']</td>
      <td width="100">BUEY&nbsp; ['.$buey.']</b></td>
      </table></td>
      </tr>
      <tr>
      <td height="20" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr>
      <td width="100">EQUINO ['.$caballares.']</td>
      <td width="100">PORCINO ['.$porcinos.']</td>
      <td width="100">OVINOS ['.$lanares.']</td>
      <td width="100">CAPRINOS ['.$caprinos.']</td>
      <td width="100">&nbsp;</td>
      <td width="100">&nbsp;</td>
      >/tr>
      </table></td>
      </tr>
      <tr>
      <td height="20" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
      <tr class="negro12">      
      </tr>
      <tr>
      <td width="100" class="negro12">LLAMAS  []</td>
      <td width="100" class="negro12">ALPACAS []</td>
      <td width="100" class="negro12">JABALIES []</td>
      <td width="100" class="negro12">BUBALINOS []</td>
      <td width="100">&nbsp;</td>
      <td width="100">&nbsp;</td>
      </tr>
      </table>
      <table width="100%" border="0" cellspacing="0" cellpadding="0">      
      </table></td>
      </tr>
      </table></td>
      </tr>
      </table></td>
      <tr>
      <td>&nbsp;</td>
      </tr>
      <tr>
        <td><table border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td height="60" bgcolor="#000000"><table border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
        <tr>
        <td align="center" bgcolor="#FFFFFF" class="negro14"><table width="150%" border="0" cellspacing="0" cellpadding="0">
        <tr>
        <td width="100%" height="10"><strong>DETALLE DIIOS</strong></td>
        </tr>
        </table></td>
        </tr>
        <tr>
        <td bgcolor="#FFFFFF" class="negro12"><table border="0" cellspacing="0" cellpadding="0">
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio1.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio2.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio3.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio4.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio5.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio6.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio7.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio8.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio9.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio10.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio11.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio12.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio13.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio14.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio15.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio16.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio17.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio18.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio19.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio20.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio21.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio22.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio23.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio24.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio25.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio26.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio27.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio28.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio29.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio30.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio31.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio32.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio33.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio34.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio35.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio36.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio37.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio38.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio39.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio40.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio41.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio42.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio43.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio44.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio45.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio46.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio47.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio48.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio49.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio50.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio51.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio52.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio53.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio54.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio55.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio56.']&nbsp;<b></td>
        </tr>
        </tr>
        <tr> 
        <tr>
        <td width="50" class="negro12"><b>['.$diio57.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio58.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio59.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio60.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio61.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio62.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio63.']&nbsp;<b></td>
        <td width="50" class="negro12"><b>['.$diio64.']&nbsp;<b></td>
        </tr>
        </tr>
        </table></td>
        </tr>
        </tr>
        </table></td>
        </tr>
        <!-- OBSER -->
        <tr>
        <td width="150" class="negro20" ><p>Observaciones &nbsp;: ____________________________________________________________</p>
        </td>
        </tr>
        <tr>
        <td width="150" class="negro16" ><p>Marca Señal o Tatuaje : ____________________________________________________Fecha entrega oficina SAG: ___ / _____ / ______ &nbsp;</p>
        </td>
        </tr>      
        </table>
        </body>
        </html>
  ============================';

     include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");
     //$this->load->library("mpdf");

     $mpdf= new mPDF(
            '',    // mode - default ''
            '',    // format - A4, for example, default ''
            0,     // font size - default 0
            '',    // default font family
            15,    // margin_left
            15,    // margin right
            16,    // margin top
            16,    // margin bottom
            9,     // margin header
            9,     // margin footer
            'L'    // L - landscape, P - portrait
            );  

    $mpdf->WriteHTML($html);
    $mpdf->Output("CF_{$codigo}.pdf", "I");
          
          exit;
  }
}









