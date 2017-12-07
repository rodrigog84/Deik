<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Ingresos_diios extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		
		$this->load->database();
	}

  public function elimina(){

    $resp = array();
    $idfma = $this->input->post('idfma');
    

    $query = $this->db->query('DELETE FROM ingresofma WHERE id = "'.$idfma.'"');

    $query2 = $this->db->query('SELECT * FROM detalle_ingresofma WHERE id_fma like "'.$idfma.'"');

    if($query2->num_rows()>0){
        $query = $this->db->query('DELETE FROM detalle_ingresofma WHERE id_fma = "'.$idfma.'"');
    };
   
    $resp['success'] = true;
    echo json_encode($resp);

  }

	public function getAll(){
		
		$start = $this->input->get('start');
    $limit = $this->input->get('limit');
    $nombre = $this->input->get('nombre');
    $opcion = $this->input->get('opcion');
    $data = array();
    $CERO = 0;

    if(!$opcion){      
      $opcion = "TODOS";
    };

		$countAll = $this->db->count_all_results("ingresofma");
		$data = array();

    if($opcion == "F.M.A"){
		$query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente,
    ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    WHERE acc.num_fma='.$nombre.'
    order by acc.fecha_proceso desc');
    };

    if($opcion == "GUIA"){
    $query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente,
    ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    WHERE acc.num_guia='.$nombre.'
    order by acc.fecha_proceso desc');
    };

    if($opcion == "TODOS"){
    $query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente, ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    order by acc.fecha_proceso desc
    limit '.$start.', '.$limit.''); 
    };

    if($query->num_rows()>0){
  		foreach ($query->result() as $row){
        $data[] = $row;
  		}
    };
    $resp['success'] = true;
    $resp['total'] = $countAll;
    $resp['data'] = $data;

    echo json_encode($resp);
	}

  public function getAllpendientes(){
    
    $start = $this->input->get('start');
    $limit = $this->input->get('limit');
    $nombre = $this->input->get('nombre');
    $opcion = $this->input->get('opcion');
    $fecha = $this->input->get('fecha');
    $data = array();
    $CERO = 0;
    $estado = 0;

    if (!$opcion){
      
      $opcion = "TODOS";
    }

    $countAll = $this->db->count_all_results("ingresofma");
    $data = array();

    if($opcion == "F.M.A"){

    $query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente,
    ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    WHERE acc.num_fma='.$nombre.' and acc.estado = '.$estado.'
    order by acc.fecha_proceso desc');

    }else if($opcion == "GUIA"){

      $query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente,
    ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    WHERE acc.num_guia='.$nombre.' and acc.estado = '.$estado.'
    order by acc.fecha_proceso desc'); 

    }else if($opcion == "TODOS"){

     $query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente,
    ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    WHERE acc.estado = '.$estado.'
    order by acc.fecha_proceso desc
    limit '.$start.', '.$limit.' ' 

    );
    }else if($opcion == "FECHA"){

    $query = $this->db->query('SELECT acc.*, acc.rut_titular as rut_titular_origen, acc.id_ruporigen as rup_origen, acc.id_rupdestino as rup_destino, t.nombre as nom_transportista, t.rut as rut_transportista, cl.nombre as nom_cliente,
    ru.rut_titular as rut_titular_fma, ru.rut_titular as ruttitular, acc.vacunos as vacdiio FROM ingresofma acc
    left join transportistas t on (acc.id_transportista = t.id)
    left join clientes cl on (acc.rut_titular = cl.rut)
    left join rup_oficiales ru on (acc.id_ruporigen = ru.rup)
    WHERE acc.estado = "'.$estado.'" AND acc.fecha_proceso between "'.$fecha.'"  AND "'.$fecha.'"  order by acc.id desc
            ');

    

    

    };
   

    if($query->num_rows()>0){
    foreach ($query->result() as $row)        
    {

        $query2 = $this->db->query('SELECT * FROM detalle_ingresofma WHERE id_fma = '.$row->id.' ');

        $total = 0;
    
        if($query2->num_rows()>0){
        
        foreach ($query2->result() as $row2)
        {
          $total = $total +1;
        }      

        };
        $row->vacdiio = $total;
        
        $rutautoriza = $row->rut_titular_origen;
        if (strlen($rutautoriza) == 8){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -7, 3);
          $ruta4 = substr($rutautoriza, -8, 1);
          $row->rut_titular_origen = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
        };
        if (strlen($rutautoriza) == 9){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -7, 3);
          $ruta4 = substr($rutautoriza, -9, 2);
          $row->rut_titular_origen = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);       
        };
        if (strlen($rutautoriza) == 2){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 1);
          $row->rut_titular_origen = ($ruta2."-".$ruta1);         
        };
        if (strlen($rutautoriza) == 7){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -7, 3);
          $row->rut_titular_origen = ($ruta3.".".$ruta2."-".$ruta1);         
        };
        if (strlen($rutautoriza) == 4){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $row->rut_titular_origen = ($ruta2."-".$ruta1);         
        };
        if (strlen($rutautoriza) == 6){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -6, 2);
          $row->rut_titular_origen = ($ruta3.".".$ruta2."-".$ruta1);         
        };

        $rutautoriza = $row->rut_titular_fma;
        if (strlen($rutautoriza) == 8){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -7, 3);
          $ruta4 = substr($rutautoriza, -8, 1);
          $row->rut_titular_fma = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);
        };
        if (strlen($rutautoriza) == 9){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -7, 3);
          $ruta4 = substr($rutautoriza, -9, 2);
          $row->rut_titular_fma = ($ruta4.".".$ruta3.".".$ruta2."-".$ruta1);       
        };
        if (strlen($rutautoriza) == 2){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 1);
          $row->rut_titular_fma = ($ruta2."-".$ruta1);         
        };
        if (strlen($rutautoriza) == 7){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -7, 3);
          $row->rut_titular_fma = ($ruta3.".".$ruta2."-".$ruta1);         
        };
        if (strlen($rutautoriza) == 4){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $row->rut_titular_fma = ($ruta2."-".$ruta1);         
        };
        if (strlen($rutautoriza) == 6){
          $ruta1 = substr($rutautoriza, -1);
          $ruta2 = substr($rutautoriza, -4, 3);
          $ruta3 = substr($rutautoriza, -6, 2);
          $row->rut_titular_fma = ($ruta3.".".$ruta2."-".$ruta1);         
        };


      $data[] = $row;

    }
  };
        $resp['success'] = true;
        $resp['total'] = $countAll;
        $resp['fecha'] = $fecha;
        $resp['opcion'] = $opcion;
        $resp['data'] = $data;

        echo json_encode($resp);
  }

	public function save(){
		
		$resp = array();
		
    $numfma = $this->input->post('numfma');
    $idfma = $this->input->post('idfma');
    $numguia = $this->input->post('numguia');
    $ruttitular = $this->input->post('rutguia');
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
            'rut_titular' => $ruttitular,
            'fecha_proceso' => $fechaproceso, 
            'id_ruporigen' => $ruporigen,
            'fecha_salida' => $fechasalida, 
            'hora_salida' => $horasalida,
            'id_rupdestino' => $rupdestino,
            'fecha_llegada' => $fechallegada,
            'hora_llegada' => $horallegada, 
            'id_transportista' => $idtransportista, 
            'camion' => $camion,
            'carro' => $carro,
            'observaciones' => $observaciones,
            'vacunos' => $vacunos,
    );

		$this->db->insert('ingresofma', $ingreso_fma); 
		$idfma = $this->db->insert_id();
    
    if ($items){
		foreach($items as $v){

        $categoria = $v->id_categoria;

        if ($categoria == "1") {
                   
           $categ = "NOVILLO";

         }

         if ($categoria == 2) {
                   
            $categ = "VAQUILLA";

         }

         if ($categoria == 3) {
           
           $categ = "TORO";

         }

         if ($categoria == 4) {
           
           $categ = "TERNERO/A";

         }

         if ($categoria == 5) {
           
           $categ = "VACA";

         }

         if ($categoria == 7) {
           
           $categ = "BUEY";

         }

		$detalle_fma_item = array(
      'id_fma' => $idfma,
      'diio' => $v->diio,
      'dientes' => $v->dientes,
      'id_categoria' => $categ,
      'especie' => 'BOVINA'		       
		);
		$this->db->insert('detalle_ingresofma', $detalle_fma_item); 

		};
    };	
    $resp['success'] = true;
    echo json_encode($resp);
	}

  public function saveotros(){
    
    $resp = array();

    $numfma = $this->input->post('numfma');
    $numguia = $this->input->post('numguia');
    $ruttitular = $this->input->post('ruttilular');
    $fechaproceso = $this->input->post('fechaproceso');
    $ruporigen = $this->input->post('ruporigen');
    $fechasalida = $this->input->post('fechasalida');
    $horasalida = $this->input->post('horasalida');
    $idrupdestino = $this->input->post('idrupdestino');
    $fechallegada = $this->input->post('fechallegada');
    $horallegada = $this->input->post('horallegada');
    $idtransportista = $this->input->post('idtransportista');
    $camion = $this->input->post('camion');
    $carro = $this->input->post('carro');
    $observaciones = $this->input->post('observaciones');
    $caballares = $this->input->post('caballaresId');
    $porcinos = $this->input->post('porcinosId');
    $ovinos = $this->input->post('ovinosId');
    $caprinos = $this->input->post('caprinosId');

              
    $ingreso_fma = array(
            'num_fma' => $numfma,
            'num_guia' => $numguia, 
            'rut_titular' => $ruttitular,
            'fecha_proceso' => $fechaproceso, 
            'id_ruporigen' => $ruporigen,
            'fecha_salida' => $fechasalida, 
            'hora_salida' => $horasalida,
            'id_rupdestino' => $idrupdestino,
            'fecha_llegada' => $fechallegada,
            'hora_llegada' => $horallegada, 
            'id_transportista' => $idtransportista, 
            'camion' => $camion,
            'carro' => $carro,
            'caballares' => $caballares,
            'porcinos' => $porcinos,
            'ovinos' => $ovinos,
            'caprinos' => $caprinos,
            'observaciones' => $observaciones
    );

    $this->db->insert('ingresofma', $ingreso_fma); 
    $idfma = $this->db->insert_id();   
    $resp['success'] = true;
    echo json_encode($resp);
  }

	public function exportPDF(){

    $idfma = $this->input->get('idfma');
    $numero = $this->input->get('numfma');

    if ($idfma){
        $query = $this->db->query('SELECT acc.*, c.rut_titular as rut_titular_origen, c.rup as rup_origen, an.rup as rup_destino, an.rut as rut_titular_destino, c.nombre_productor as nombre_productor, c.direccion_predio as predio, an.predio as direccion_predio,t.nombre as nom_transportista, t.rut as
        rut_transportista, c.ciudad as ciudad FROM ingresofma acc
        left join rup_oficiales c on (acc.id_ruporigen = c.id)
        left join rup_origen an on (acc.id_rupdestino = an.id)
        left join transportistas t on (acc.id_transportista = t.id)
        WHERE acc.id = '.$idfma.'');
    }else { if ($numero){
        $query = $this->db->query('SELECT acc.*, c.rut_titular as rut_titular_origen, c.rup as rup_origen, an.rup as rup_destino, an.rut as rut_titular_destino, c.nombre_productor as nombre_productor, c.direccion_predio as predio, an.predio as direccion_predio,t.nombre as nom_transportista, t.rut as
        rut_transportista, c.ciudad as ciudad FROM ingresofma acc
        left join rup_oficiales c on (acc.id_ruporigen = c.id)
        left join rup_origen an on (acc.id_rupdestino = an.id)
        left join transportistas t on (acc.id_transportista = t.id)
        WHERE acc.num_fma = '.$numero.'');
    }
    }
    $row = $query->result();
    $row = $row[0];
    $items = $this->db->get_where('detalle_ingresofma', array('id_fma' => $row->id));
    $fma = $row->num_fma;
    $numguia = $row->num_guia;
    $ruporigen = $row->rup_origen;
    $rupdestino = $row->rup_destino;
    $fechasalida = $row->fecha_salida;
    $horasalida = $row->hora_salida;
    $fechallegada = $row->fecha_llegada;
    $horallegada = $row->hora_llegada;
    list($anio, $mes, $dia) = explode("-",$fechasalida);
    list($aniol, $mesl, $dial) = explode("-",$fechallegada);
    $rutautoriza = $row->rut_titular_origen;
    $rutautorizadestino = $row->rut_titular_destino;
    $camion = $row->camion;
    $carro = $row->carro;
    $caballares = 0;
    $porcinos = 0;
    $lanares = 0;
    $caprinos = 0;
    
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

    if (strlen($rutautorizadestino) == 8){
      $ruta1d = substr($rutautorizadestino, -1);
      $ruta2d = substr($rutautorizadestino, -4, 3);
      $ruta3d = substr($rutautorizadestino, -7, 3);
      $ruta4d = substr($rutautorizadestino, -8, 1);
    };

    if (strlen($rutautorizadestino) == 9){
      $ruta1d = substr($rutautorizadestino, -1);
      $ruta2d = substr($rutautorizadestino, -4, 3);
      $ruta3d = substr($rutautorizadestino, -7, 3);
      $ruta4d = substr($rutautorizadestino, -9, 2);
   
    };

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
    $nombreautoriza = $row->nombre_productor;
    $transportista = $row->nom_transportista;
    $direccion = $row->predio;
    $nombredestino = $row->direccion_predio;
    $ciudad = $row->ciudad;

    $vaca = 0;
    $novillo = 0;
    $vaquilla = 0;
    $terneroa = 0;
    $toro = 0;
    $buey = 0;

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


    $total= 2;

    foreach($items->result() as $v){
      $data[] = $v;
    };

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
      $diio28 = $data[27]->diio;
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
      $diio53 = $data[52]->diio;
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
      $diio58 = $data[57]->diio;
    
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

    if ($total == 65) {
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
      $diio65 = $data[64]->diio;
    }

    if ($total == 66) {
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
      $diio65 = $data[64]->diio;
      $diio66 = $data[65]->diio;
    }

    if ($total == 67) {
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
      $diio65 = $data[64]->diio;
      $diio66 = $data[65]->diio;
      $diio67 = $data[66]->diio;
    }

     if ($total == 68) {
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
      $diio65 = $data[64]->diio;
      $diio66 = $data[65]->diio;
      $diio67 = $data[66]->diio;
      $diio68 = $data[67]->diio;
      $diio69 = $data[68]->diio;
    }

     if ($total == 69) {
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
      $diio65 = $data[64]->diio;
      $diio66 = $data[65]->diio;
      $diio67 = $data[66]->diio;
      $diio68 = $data[67]->diio;
      $diio69 = $data[68]->diio;   
    }

    if ($total == 70) {
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
      $diio65 = $data[64]->diio;
      $diio66 = $data[65]->diio;
      $diio67 = $data[66]->diio;
      $diio68 = $data[67]->diio;
      $diio69 = $data[68]->diio;
      $diio70 = $data[69]->diio;      
    }
  
 $html = '
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <title>Documento sin título</title>
      <link href="estilo_formulario.css" rel="stylesheet" type="text/css" />
      </head>

      <body>
      <table width="750" border="0" align="center" cellpadding="0" cellspacing="0">
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="2">
            <tr>
              <td width="20%"><img src="http://angus.agricultorestalca.cl/Diio/Diio/resources/images/" width="150" height="136" /></td>
              <td width="74%" valign="top"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td class="negro16"><H2>   Programa Oficial de Trazabilidad Animal   </H2></td>
                </tr>
                <tr>
                  <td class="negro18"><H3>FORMULARIO DE MOVIMIENTO ANIMAL (FMA)_______ '.$ruporigen.' - '.$fma.'_______</H3></td>
                </tr>
                <tr>
                  <td class="negro18">&nbsp;</td>
                </tr>
                <tr>
               
                </tr>
              </table></td>
              <td width="20%">&nbsp;</td>
            </tr>
          </table></td>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="1">
            <tr>
              <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
                <tr>
                  <td align="center" bgcolor="#FFFFFF" class="negro14"><strong>ORIGEN DE ANIMALES</strong></td>
                </tr>
                <tr>
                  <td bgcolor="#FFFFFF" class="negro12"><b>Nombre de quien Autoriza la Salida<b></td>
                  </tr>
                <tr>
                 <td bgcolor="#FFFFFF" class="negro12"> '.$nombreautoriza.' --------------------------------  R.U.P ORIGEN : '.$ruporigen.' -------  GUIA DESPACHO  :  '.$numguia.'</td>     
                </tr>
                <tr>
                  <td bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="28%">RUT :'.$ruta4.'.'.$ruta3.'.'.$ruta2.'-'.$ruta1.'</td>
                      <td width="41%"><table width="38%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">______________________________________________</td>
                        </tr>
                        <tr>
                          <td align="center">Firma</td>
                        </tr>
                      </table></td>
                      <td width="150%"><table width="81%" border="0" cellspacing="2" cellpadding="2">
                        <tr>
                          <td>FECHA DE SALIDA :______<b>'.$dia.'/'.$mes.'/'.$anio.'</b></td>
                        </tr>
                        <tr>
                          <td>HORA DE SALIDA ___________________________</td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td height="20"></td>
        </tr>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="1">
            <tr>
              <td height="40" bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
                <tr>
                  <td align="center" bgcolor="#FFFFFF" class="negro14"><strong>ANTECEDENTES DE TRANSPORTE</strong></td>
                </tr>
                <tr>
                  <td height="20" bgcolor="#FFFFFF" class="negro12"><b>Nombre del Transportista<b> </td>
                </tr>
                 <tr>
                  <td height="40" bgcolor="#FFFFFF">'.$transportista.'</td>
                </tr>
                <tr>
                  <td bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="26%"><b>RUT   :</b>'.$rut4.'.'.$rut3.'.'.$rut2.'-'.$rut1.'</td>
                      <td width="38%"><table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="55%" align="center"><b>PATENTE   :</b> '.$camion.'</td>
                          <td width="45%" align="center"><table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#999999">
                            
                          </table></td>
                        </tr>
                        </table></td>
                      <td width="150%"><table width="98%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td width="65%" align="center"><b>ACOPLADO  :</b> '.$carro.'</td>
                          <td width="65%" align="center"><table width="100%" border="0" cellspacing="1" cellpadding="1" bgcolor="#999999">
                            
                          </table></td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
        <tr>
          <td>&nbsp;</td>
        </tr>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="1">
            <tr>
              <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
                <tr>
                  <td align="center" bgcolor="#FFFFFF" class="negro14"><strong>DESTINO DE ANIMALES</strong></td>
                </tr>
                <tr>
                  <td bgcolor="#FFFFFF" class="negro12"><b>Nombre O Direcciòn del Establecimiento de Destino<b></td>
                </tr>
                <tr>
                  <td height="40" bgcolor="#FFFFFF">'.$nombredestino.'</td>
                </tr>
                <tr>
                  <td height="30" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="3" cellpadding="3">
                    <tr>
                      <td width="65%">RUP DESTINO<td> 
                      <td width="45%">'.$rupdestino.'</td> 
                      <td>COMUNA </td>
                      <td>'.$ciudad.'</td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td height="20" bgcolor="#FFFFFF" class="negro12">Nombre de quien recibe</td>
                </tr>
                <tr>
                  <td height="40" bgcolor="#FFFFFF" class="negro12">&nbsp;</td>
                </tr>
                <tr>
                  <td height="80" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="68%">RUT __________________</td>
                      <td width="41%"><table width="38%" border="0" align="center" cellpadding="0" cellspacing="0">
                        <tr>
                          <td align="center">________________________________</td>
                        </tr>
                        <tr>
                          <td align="center">Firma</td>
                        </tr>
                      </table></td>
                      <td height="30" width="150%"><table width="81%" border="0" cellspacing="2" cellpadding="2">
                        <tr>
                          <td>FECHA DE LLEGADA ________________________</td>
                        </tr>
                        <tr>
                          <td>HORA  DE LLEGADA ________________________</td>
                        </tr>
                      </table></td>
                    </tr>
                  </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>
        </tr>
        <tr>
        <td>&nbsp;</td>
        </tr>
        <tr>
          <td><table width="100%" border="0" cellspacing="0" cellpadding="1">
            <tr>
              <td bgcolor="#000000"><table width="100%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
                <tr>
                  <td align="center" bgcolor="#FFFFFF" class="negro14"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                       <td width="67%" height="20"><strong>ESPECIE ANIMAL TRANSPORTADA</strong></td>
                      </tr>
                </table></td>
                </tr>
                <tr>
                <td height="40" bgcolor="#FFFFFF" class="negro12"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr>
                      <td width="150">VACA    ['.$vaca.'] </td>
                      <td width="150">VAQUILLA    ['.$vaquilla.']</td>
                      <td width="150">NOVILLO    ['.$novillo.']</td>
                      <td width="150">TORO    ['.$toro.']</td>
                      <td width="150">TERNERO/A    ['.$terneroa.']</td>
                      <td width="150">BUEY ['.$buey.']</b></td>
                    </tr>
                  </table></td>
                </tr>
                <tr>
                  <td height="40" bgcolor="#FFFFFF"><table width="100%" border="0" cellspacing="0" cellpadding="0">
                    <tr class="negro12">
                      <td width="150">EQUINO ['.$caballares.']</td>
                      <td width="150">PORCINO ['.$porcinos.']</td>
                      <td width="150">OVINOS ['.$lanares.']</td>
                      <td width="150">CAPRINOS ['.$caprinos.']</td>
                     
                    </tr>
                  </table>
                    <table width="100%" border="0" cellspacing="0" cellpadding="0">
                      <tr>
                        <td width="150" class="negro12">LLAMAS  []</td>
                        <td width="150" class="negro12">ALPACAS []</td>
                        <td width="150" class="negro12">JABALIES []</td>
                        <td width="150" class="negro12">BUBALINOS []</td>
                      
                        
                        <td width="150">&nbsp;</td>
                      </tr>
                    </table></td>
                </tr>
              </table></td>
            </tr>
          </table></td>

  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table border="0" cellspacing="0" cellpadding="1">
      <tr>
        <td height="40" bgcolor="#000000"><table width="150%" border="0" cellspacing="2" cellpadding="2" bgcolor="ffffff">
          <tr>
            <td align="center" bgcolor="#FFFFFF" class="negro14"><table width="150%" border="0" cellspacing="0" cellpadding="0">
              <tr>
                 <td height="20"><strong>DETALLE DIIOS</strong></td>
                </tr>
          </table></td>
          </tr>
          <tr>
            <td bgcolor="#FFFFFF" class="negro12"><table border="0" cellspacing="0" cellpadding="0">
              <tr> 
                <tr>
                 <td width="90" class="negro25"><b>['.$diio1.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio2.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio3.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio4.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio5.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio6.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio7.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio8.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio9.']&nbsp;<b></td>
                 <td width="90" class="negro25"><b>['.$diio10.']&nbsp;<b></td>
              </tr>
              </tr>
              <tr> 
                <tr>
                 <td width="60" class="negro25"><b>['.$diio11.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio12.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio13.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio14.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio15.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio16.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio17.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio18.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio19.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio20.']&nbsp;<b></td>
                 
              </tr>

              </tr>
              <tr> 
                <tr>
                 <td width="60" class="negro25"><b>['.$diio21.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio22.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio23.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio24.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio25.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio26.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio27.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio28.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio29.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio30.']&nbsp;<b></td>
                 
              </tr>

              </tr>
              <tr> 
                <tr>
                 <td width="60" class="negro25"><b>['.$diio31.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio32.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio33.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio34.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio35.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio36.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio37.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio38.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio39.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio40.']&nbsp;<b></td>
                 
              </tr>

              </tr>
              <tr> 
                <tr>
                 <td width="60" class="negro25"><b>['.$diio41.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio42.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio43.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio44.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio45.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio46.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio47.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio48.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio49.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio50.']&nbsp;<b></td>
                 
              </tr>

              </tr>
              <tr> 
                <tr>
                 <td width="60" class="negro25"><b>['.$diio51.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio52.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio53.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio54.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio55.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio56.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio57.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio58.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio59.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio60.']&nbsp;<b></td>
                 
              </tr>

              </tr>
              <tr> 
                <tr>
                 <td width="60" class="negro25"><b>['.$diio61.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio62.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio63.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio64.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio65.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio66.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio67.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio68.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio69.']&nbsp;<b></td>
                 <td width="60" class="negro25"><b>['.$diio70.']&nbsp;<b></td>
              </tr>

              </tr>
            </table></td>
          </tr>
         
        <tr>
       
        </tr>

          
    </table></td>
  </tr>
  <tr>
  <tr>
    </tr>
     </tr>
      </tr>
            <tr>
              <td bgcolor="#FFFFFF"><p>&nbsp;</p></td>
            </tr>
          </table></td>
        </tr>
    <!-- OBSER -->
    <tr>
      <td><p>Observaciones &nbsp;: ____________________________________________________________</p>
      </td>
    </tr>
    <tr>
      <td><br><br>
      </td>
    </tr> 
    <tr>
      <td><p>Marca Señal o Tatuaje : __________________________________________________________________Fecha entrega oficina SAG: ___ / _____ / ______ &nbsp;</p>
      </td>
    </tr>      
      </table>
      </body>
      </html>
      ============================';

    include(dirname(__FILE__)."/../libraries/MPDF54/mpdf.php");

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









