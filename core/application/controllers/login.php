<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Login extends CI_Controller {

	public function __construct()
	{
		parent::__construct();
		$this->load->library('session');
		$this->load->database();
	}
	public function changePass(){
        $oldpass = $_REQUEST['oldpass'];
        $newpass = $_REQUEST['newpass'];
        $newpass2 = $_REQUEST['newpass2'];

		$str_q = 'SELECT *  FROM usuario ';
		$str_q .= ' WHERE username="'.$this->session->userdata('username').'" and password="'.$oldpass .'" ';

		$query = $this->db->query($str_q);

		$data = array();

		if ($query->num_rows() > 0 && $newpass == $newpass2)
		{
			$this->db->where('id', $this->session->userdata('id_usu') );
			$this->db->update('usuario', array(
			   'password' => $newpass
			)); 
			$data = array(
				"success"=> true
			);
		}else{
			$data = array(
				"success"=> false
			);
		}

        echo json_encode($data);
	}
	public function ingreso()
	{
		$resp = array();

        $usuario = $_REQUEST['nombre'];
        $password = $_REQUEST['password'];

		$str_q = 'SELECT *  FROM usuario ';
		$str_q .= ' WHERE username="'.$usuario.'" and password="'.$password .'" ';

		$query = $this->db->query($str_q);

		$data = array();

		if ($query->num_rows() > 0)
		{
			$row = $query->row();
			$nombre = $row->nombre;
			$apellido = $row->apellido;
			$username = $row->username;
			$id_usu = $row->id;

			$str_accesos = 'SELECT acc.* FROM accesos acc 
				inner join rol_acceso rla on (acc.id = rla.id_acceso) 
				inner join usuario_rol usro on (rla.id_rol = usro.id_rol) 
				where usro.id_usuario = '.$id_usu;

			$query_modulos = $this->db->query($str_accesos);

			$mods = array();
			foreach ($query_modulos->result() as $rowm)
			{
				$mods[] = $rowm;
			}
			$resp['nombre'] = $nombre." ".$apellido;
			$resp['username'] = $username;
			$resp['modules'] = $mods;

			$this->session->set_userdata( array(
			        'modules'=> $mods,
			        'nombre'=> $nombre,
			        'apellido'=> $apellido,
			        'username'=> $username,
			        'id_usu'=> $id_usu,
			        'is_ok'=>true
			    )
			);
			$resp['success'] = true;
		}else{
			$resp['success'] = false;
			$resp['errorMsg'] = "No se pudo ingresar";

		}
        echo json_encode($resp);
	
	}
	public function getModules(){

		if($this->session->userdata('is_ok')){
			$data = array(
				"modules"=> $this->session->userdata('accesos'),
				"success"=> true
			);
		}else{
			$data = array(
				"success"=> false
			);
		}
        echo json_encode($data);

	}
	public function getDataSesion(){
		if($this->session->userdata('is_ok')){
			$data = array(
				"nombre"=> $this->session->userdata('nombre'),
				"usuario"=> $this->session->userdata('usuario'),
				"username"=> $this->session->userdata('username'),
				"modules"=> $this->session->userdata('modules'),
				"success"=> true
			);
		}else{
			$data = array(
				"success"=> false
			);
		}
        echo json_encode($data);

	}
	public function salir(){
		$this->session->sess_destroy();
		unset($this->session->userdata); 
	}
	public function isLogin()
	{
		$resp['success'] = true;
		$resp['rol'] = $rol;
		$resp['login'] = $this->session->userdata('logged_in') == true ? true : false ;
		echo json_encode($resp);
	}
}
