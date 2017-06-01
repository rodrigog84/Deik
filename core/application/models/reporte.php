<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/**
* Name:  Ion Auth Model
*
* Version: 2.5.2
*
* Author:  Ben Edmunds
* 		   ben.edmunds@gmail.com
*	  	   @benedmunds
*
* Added Awesomeness: Phil Sturgeon
*
* Location: http://github.com/benedmunds/CodeIgniter-Ion-Auth
*
* Created:  10.01.2009
*
* Last Change: 3.22.13
*
* Changelog:
* * 3-22-13 - Additional entropy added - 52aa456eef8b60ad6754b31fbdcc77bb
*
* Description:  Modified auth system based on redux_auth with extensive customization.  This is basically what Redux Auth 2 should be.
* Original Author name has been kept but that does not mean that the method has not been modified.
*
* Requirements: PHP5 or above
*
*/

class Reporte extends CI_Model
{

	public function __construct()
	{
		parent::__construct();
		$this->load->database();
		$this->load->helper('cookie');
		$this->load->helper('date');
	}


	public function mensual_ventas($mes,$anno){

       	$neto_productos = $this->db->query("select concepto, Facturacion, Facturacion_doctos, Boletas, Boletas_doctos, NDebito, NDebito_doctos, NCredito, NCredito_doctos, (Facturacion+Boletas+NDebito-NCredito) as totales, (Facturacion_doctos+Boletas_doctos+NDebito_doctos-NCredito_doctos) as totales_doctos from
        		(select '<b>Neto Productos</b>' as concepto,
				(select 
				COALESCE(SUM(neto),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (1,19,101,103) ) as 'Facturacion',
				(select 
				count(id)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (1,19,101,103) ) as 'Facturacion_doctos',				 
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas', 
				(select 
				count(id)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas_doctos', 
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104) )  as 'NDebito', 
				(select 
				count(id)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104) )  as 'NDebito_doctos', 
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito_doctos'
				union all
					select '<b>Neto Afecto</b>' as concepto,
				(select 
				COALESCE(SUM(neto),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (1,101) ) as 'Facturacion',
				 (select 
				count(id)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (1,101) ) as 'Facturacion_doctos',
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106)  and iva > 0 )  as 'Boletas', 
				(select 
				count(id)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106)  and iva > 0 )  as 'Boletas_doctos', 
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104)  and iva > 0 )  as 'NDebito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104)  and iva > 0 )  as 'NDebito_doctos',
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102)  and iva > 0 )  as 'NCredito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102)  and iva > 0 )  as 'NCredito_doctos'
				union all
					select '<b>Neto Exento</b>' as concepto,
				(select 
				COALESCE(SUM(neto),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (19,103) ) as 'Facturacion',
				(select 
				count(id) as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in (19,103) ) as 'Facturacion_doctos',
				(select 
				COALESCE(SUM(neto),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106)  and iva = 0 )  as 'Boletas', 				
				(select 
				count(id)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106)  and iva = 0 )  as 'Boletas_doctos', 		
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104)   and iva = 0)  as 'NDebito',
				(select 
				count(id) as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104)   and iva = 0)  as 'NDebito_doctos',
				(select 
				COALESCE(SUM(neto),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102)   and iva = 0)  as 'NCredito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102)   and iva = 0)  as 'NCredito_doctos'
				union all
				select '<b>Impuesto IVA</b>' as concepto,
				(select 
				COALESCE(SUM(iva),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in  (1,19,101,103) ) as 'Facturacion',
				(select 
				count(id)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in  (1,19,101,103) ) as 'Facturacion_doctos',
				(select 
				COALESCE(SUM(iva),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas', 				
				(select 
				count(id)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas_doctos', 	
				(select 
				COALESCE(SUM(iva),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104))  as 'NDebito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104))  as 'NDebito_doctos',
				(select 
				COALESCE(SUM(iva),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito_doctos'
				union all
				select '<b>Totales</b>' as concepto,
				(select 
				COALESCE(SUM(totalfactura),0)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in  (1,19,101,103) ) as 'Facturacion',
				(select 
				count(id)  as facturacion
				 from factura_clientes where month(fecha_factura) = " . $mes . " and year(fecha_factura) = " . $anno . " and tipo_documento in  (1,19,101,103) ) as 'Facturacion_doctos',
				(select 
				COALESCE(SUM(totalfactura),0)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas', 				
				(select 
				count(id)  as boletas
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (2,106) )  as 'Boletas_doctos',
				(select 
				COALESCE(SUM(totalfactura),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104))  as 'NDebito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (16,104))  as 'NDebito_doctos',
				(select 
				COALESCE(SUM(totalfactura),0)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito',
				(select 
				count(id)  as ncredito
				 from factura_clientes where month(fecha_factura) = " . $mes . "  and year(fecha_factura) = " . $anno . "  and tipo_documento in (11,102))  as 'NCredito_doctos'
        ) as tmp");
		//echo $this->db->last_query();
		return $neto_productos->result();

	}



	public function reporte_stock($start,$limit,$familia = '',$subfamilia = '',$agrupacion = '',$marca = '',$producto = ''){


		$data_stock = $this->db->select('count(p.id) as cantidad ')
		  ->from('productos p')
		  ->join('existencia e','e.id_producto = p.id and e.id_bodega = 1','left')
		  ->join('existencia e2','e2.id_producto = p.id and e2.id_bodega = 2','left')
		  ->join('existencia e3','e3.id_producto = p.id and e3.id_bodega = 3','left')
		  ->join('existencia e4','e4.id_producto = p.id and e4.id_bodega = 4','left');
		
		$data_stock = $familia != '' ? $data_stock->where('p.id_familia',$familia) : $data_stock;
		$data_stock = $subfamilia != '' ? $data_stock->where('p.id_subfamilia',$subfamilia) : $data_stock;
		$data_stock = $agrupacion != '' ? $data_stock->where('p.id_agrupacion',$agrupacion) : $data_stock;
		$data_stock = $marca != '' ? $data_stock->where('p.id_marca',$marca) : $data_stock;
		$data_stock = $producto != '' ? $data_stock->like('p.nombre',$producto) : $data_stock;

		$query = $this->db->get();   

        $result_cantidad = $query->row()->cantidad; 


		$data_stock = $this->db->select('p.id, p.id as num, codigo, nombre as descripcion, fecha_ult_compra, p_costo, p_venta, e.stock as stock1, e2.stock as stock2, e3.stock as stock3, e4.stock as stock4 ')
		  ->from('productos p')
		  ->join('existencia e','e.id_producto = p.id and e.id_bodega = 1','left')
		  ->join('existencia e2','e2.id_producto = p.id and e2.id_bodega = 2','left')
		  ->join('existencia e3','e3.id_producto = p.id and e3.id_bodega = 3','left')
		  ->join('existencia e4','e4.id_producto = p.id and e4.id_bodega = 4','left');

		$data_stock = is_null($limit) ? $data_stock : $data_stock->limit($limit,$start);
		$data_stock = $familia != '' ? $data_stock->where('p.id_familia',$familia) : $data_stock;
		$data_stock = $subfamilia != '' ? $data_stock->where('p.id_subfamilia',$subfamilia) : $data_stock;
		$data_stock = $agrupacion != '' ? $data_stock->where('p.id_agrupacion',$agrupacion) : $data_stock;
		$data_stock = $marca != '' ? $data_stock->where('p.id_marca',$marca) : $data_stock;
		$data_stock = $producto != '' ? $data_stock->like('p.nombre',$producto) : $data_stock;


		$query = $this->db->get();
		$result = $query->result();
		 return array('cantidad' => $result_cantidad,'data' => $result);
	}




	public function reporte_detalle_productos_stock($start,$limit,$mes = '',$anno = '',$idproducto = ''){


		$data_detalle = $this->db->select("count(acc.id) as cantidad",false)
		  ->from('existencia_detalle acc')
		  ->join('productos c','acc.id_producto = c.id','left')
		  ->join('correlativos cor','acc.id_tipo_movimiento = cor.id','left')
		  ->join('factura_clientes f','acc.id_tipo_movimiento = f.tipo_documento and acc.num_movimiento = f.num_factura','left')
		  ->join('factura_compras fc','acc.id_tipo_movimiento = fc.tipo_documento and acc.num_movimiento = fc.num_factura','left')
		  ->join('clientes cli','f.id_cliente = cli.id','left')
		  ->join('clientes clic','fc.id_proveedor = clic.id','left')
		  ->where('if(acc.cantidad_entrada > 0,fc.id is not null,if(acc.cantidad_salida > 0,f.id is not null,1=1))');


		$data_detalle = $mes != '' ? $data_detalle->where('if(acc.cantidad_entrada > 0,month(fc.fecha_factura),if(acc.cantidad_salida > 0,month(f.fecha_factura),month(acc.fecha_movimiento))) = ' .$mes) : $data_detalle;
		$data_detalle = $anno != '' ? $data_detalle->where('if(acc.cantidad_entrada > 0,year(fc.fecha_factura),if(acc.cantidad_salida > 0,year(f.fecha_factura),year(acc.fecha_movimiento))) = ' . $anno) : $data_detalle;
		$data_detalle = $idproducto != '' ? $data_detalle->where('acc.id_producto',$idproducto) : $data_detalle;

		$query = $this->db->get();                            
        $result_cantidad = $query->row()->cantidad; 


		/*$data_stock = $this->db->select("m.id as num, '' as tipodocto, '' as numdocto, fecha, '' as precio, '' as cant_entradas, '' as cant_salidas, '' as stock, '' as detalle",false)
		  ->from('movimientodiario_detalle m');*/

		$data_detalle = $this->db->select("acc.id as num, cor.nombre as tipodocto, acc.num_movimiento as numdocto, if(acc.cantidad_entrada > 0,fc.fecha_factura,if(acc.cantidad_salida > 0,f.fecha_factura,null)) as fecha, acc.valor_producto as precio, acc.cantidad_entrada as cant_entradas, acc.cantidad_salida as cant_salidas, 0 as stock, if(acc.cantidad_entrada > 0,clic.nombres,if(acc.cantidad_salida > 0,cli.nombres,null)) as detalle",false)
		  ->from('existencia_detalle acc')
		  ->join('productos c','acc.id_producto = c.id','left')
		  ->join('correlativos cor','acc.id_tipo_movimiento = cor.id','left')
		  ->join('factura_clientes f','acc.id_tipo_movimiento = f.tipo_documento and acc.num_movimiento = f.num_factura','left')
		  ->join('factura_compras fc','acc.id_tipo_movimiento = fc.tipo_documento and acc.num_movimiento = fc.num_factura','left')
		  ->join('clientes cli','f.id_cliente = cli.id','left')
		  ->join('clientes clic','fc.id_proveedor = clic.id','left')
		  ->where('if(acc.cantidad_entrada > 0,fc.id is not null,if(acc.cantidad_salida > 0,f.id is not null,1=1))');

		$data_detalle = is_null($limit) ? $data_detalle : $data_detalle->limit($limit,$start);
		$data_detalle = $mes != '' ? $data_detalle->where('if(acc.cantidad_entrada > 0,month(fc.fecha_factura),if(acc.cantidad_salida > 0,month(f.fecha_factura),month(acc.fecha_movimiento))) = ' .$mes) : $data_detalle;
		$data_detalle = $anno != '' ? $data_detalle->where('if(acc.cantidad_entrada > 0,year(fc.fecha_factura),if(acc.cantidad_salida > 0,year(f.fecha_factura),year(acc.fecha_movimiento))) = ' . $anno) : $data_detalle;
		$data_detalle = $idproducto != '' ? $data_detalle->where('acc.id_producto',$idproducto) : $data_detalle;

		$query = $this->db->get();
		//echo $this->db->last_query(); exit;
		$result = $query->result();
		 return array('cantidad' => $result_cantidad,'data' => $result);
	}


	public function reporte_estadisticas_ventas($start,$limit,$mes = '',$anno = ''){


		$data_detalle = $this->db->select("count(distinct p.id) as cantidad",false)
		  ->from('detalle_factura_cliente d')
		  ->join('factura_clientes f','d.id_factura = f.id')
		  ->join('productos p','d.id_producto = p.id');


		$data_detalle = $mes != '' ? $data_detalle->where('month(f.fecha_factura)',$mes) : $data_detalle;
		$data_detalle = $anno != '' ? $data_detalle->where('year(f.fecha_factura)',$anno) : $data_detalle;
		$query = $this->db->get();                            
        $result_cantidad = $query->row()->cantidad; 
	

		/*$data_stock = $this->db->select("m.id as num, '' as tipodocto, '' as numdocto, fecha, '' as precio, '' as cant_entradas, '' as cant_salidas, '' as stock, '' as detalle",false)
		  ->from('movimientodiario_detalle m');*/

		$data_detalle = $this->db->select("p.id, p.codigo, p.nombre, sum(d.cantidad) as unidades, sum(d.neto) as ventaneta, round(p.p_costo*sum(d.cantidad)) as costo, round((sum(d.neto) - p.p_costo*sum(d.cantidad))) as margen, concat(round((sum(d.neto)/round(p.p_costo*sum(d.cantidad)) - 1)*100,2),' %') as porcmargen",false)
		  ->from('detalle_factura_cliente d')
		  ->join('factura_clientes f','d.id_factura = f.id')
		  ->join('productos p','d.id_producto = p.id')
		  ->group_by('p.id');

		$data_detalle = is_null($limit) ? $data_detalle : $data_detalle->limit($limit,$start);
		$data_detalle = $mes != '' ? $data_detalle->where('month(f.fecha_factura)',$mes) : $data_detalle;
		$data_detalle = $anno != '' ? $data_detalle->where('year(f.fecha_factura)',$anno) : $data_detalle;

		$query = $this->db->get();
		$result = $query->result();
		 return array('cantidad' => $result_cantidad,'data' => $result);
	}



	public function get_familias(){


		$data_stock = $this->db->select('id, codigo, nombre ')
		  ->from('familias f')
		  ->where('codigo <> ""')
		  ->where('nombre <> ""');
		
		$query = $this->db->get();                            
        return $query->result(); 

	}


	public function get_subfamilias($id_familia = ''){


		$data_subfamilia = $this->db->select('id, codigo, nombre ')
		  ->from('subfamilias sf')
		  ->where('codigo <> ""')
		  ->where('nombre <> ""');

		$data_subfamilia = $id_familia != '' ? $data_subfamilia->where('sf.id_familias',$id_familia) : $data_subfamilia;		  
		
		$query = $this->db->get();                            
        return $query->result(); 

	}

	public function get_existencia($idproducto){

		$data_subfamilia = $this->db->select('stock ')
		  ->from('existencia')
		  ->where('id_producto',$idproducto);
		$query = $this->db->get();                            
        return $query->row(); 

	}


public function get_producto($idproducto){

		$data_subfamilia = $this->db->select('nombre ')
		  ->from('productos')
		  ->where('id',$idproducto);
		$query = $this->db->get();                            
        return $query->row(); 

	}

	public function get_agrupaciones($id_familia = '',$id_subfamilia = ''){


		$data_agrupacion = $this->db->select('id, codigo, nombre ')
		  ->from('agrupacion a')
		  ->where('codigo <> ""')
		  ->where('nombre <> ""');

		$data_agrupacion = $id_familia != '' ? $data_agrupacion->where('a.id_familia',$id_familia) : $data_agrupacion;		  
		$data_agrupacion = $id_subfamilia != '' ? $data_agrupacion->where('a.id_subfamilia',$id_subfamilia) : $data_agrupacion;		  
		
		$query = $this->db->get();                            
        return $query->result(); 

	}



	public function get_marcas(){


		$data_stock = $this->db->select('id, codigo, nombre ')
		  ->from('marcas')
		  ->where('codigo <> ""')
		  ->where('nombre <> ""');
		
		$query = $this->db->get();                            
        return $query->result(); 

	}


}
