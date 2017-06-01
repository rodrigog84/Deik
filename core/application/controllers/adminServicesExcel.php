<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class AdminServicesExcel extends CI_Controller {
  
public function __construct()
  {
    parent::__construct();
    $this->load->helper('format');
    $this->load->database();
  }




public function reporte_stock($familia,$subfamilia,$agrupacion,$marca,$producto)
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=reporte_stock.xls"); 
            

            $familia = $familia == '0' ? '' : $familia;
            $subfamilia = $subfamilia == '0' ? '' : $subfamilia;
            $agrupacion = $agrupacion == '0' ? '' : $agrupacion;
            $marca = $marca == '0' ? '' : $marca;
            //$producto = $producto == '0' ? '' : base64_decode($producto);
            $producto = $producto == '0' ? '' : str_replace("%20"," ",$producto);


            $this->load->model('reporte');
            $datos_stock = $this->reporte->reporte_stock(null,null,$familia,$subfamilia,$agrupacion,$marca,$producto);       

            
            echo '<table>';
            echo "<tr><td colspan='6'><b>Informe Stock</b></td></tr>";
            echo "<tr>";
            echo "<td><b>#</b></td>";
            echo "<td><b>C&oacute;digo</b></td>";
            echo "<td><b>Descripci&oacute;n</b></td>";
            echo "<td><b>Fecha &Uacute;ltima Compra</b></td>";
            echo "<td><b>Precio Costo</b></td>";
            echo "<td><b>Precio Venta</b></td>";
            echo "<td><b>Stock 1</b></td>";
            echo "<td><b>Stock 2</b></td>";
            echo "<td><b>Stock 3</b></td>";
            echo "<td><b>Stock 4</b></td>";
            echo "</tr>";
              $i = 1;
              foreach($datos_stock['data'] as $stock){
                 echo "<tr>";
                 echo "<td>".$i."</td>";
                 echo "<td>".$stock->codigo."</td>";
                 echo "<td>".$stock->descripcion."</td>";
                 echo "<td>".$stock->fecha_ult_compra."</td>";
                 echo "<td>".$stock->p_costo."</td>";
                 echo "<td>".$stock->p_venta."</td>";
                 echo "<td>".$stock->stock1."</td>";
                 echo "<td>".$stock->stock2."</td>";
                 echo "<td>".$stock->stock3."</td>";
                 echo "<td>".$stock->stock4."</td>";
                 echo "</tr>";
                $i++;
            }
            echo '</table>';
        }


 public function reporte_mensual_ventas($mes,$anno)
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=reporte_mensual_ventas.xls"); 
            


            $this->load->model('reporte');
            $neto_productos = $this->reporte->mensual_ventas($mes,$anno);            

            
            echo '<table>';
            echo "<tr><td colspan='6'><b>Detalle Resumen de Ventas Mensuales - " . month2string((int)$mes)." de " . $anno . "</b></td></tr>";
            echo "<tr>";
            echo "<td><b>Conceptos</b></td>";
            echo "<td><b>-</b></td>";
            echo "<td><b>Facturaci&oacute;n</b></td>";
            echo "<td><b>-</b></td>";
            echo "<td><b>Boletas</b></td>";
            echo "<td><b>-</b></td>";
            echo "<td><b>N/D&eacute;bito</b></td>";
            echo "<td><b>-</b></td>";
            echo "<td><b>N/Cr&eacute;dito</b></td>";
            echo "<td><b>Totales</b></td>";
            echo "</tr>";
              
              foreach($neto_productos as $producto){
                if($producto->concepto == '<b>Totales</b>'){
                 echo "<tr>";
                 echo "<td><b>".$producto->concepto."</b></td>";
                 echo "<td><b>'(" . str_pad($producto->Facturacion_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td><b>".$producto->Facturacion."</b></td>";
                 echo "<td><b>'(" . str_pad($producto->Boletas_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td><b>".$producto->Boletas."</b></td>";
                 echo "<td><b>'(" . str_pad($producto->NDebito_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td><b>".$producto->NDebito."</b></td>";
                 echo "<td><b>'(" . str_pad($producto->NCredito_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td><b>".$producto->NCredito."</b></td>";
                 echo "<td><b>".$producto->totales."</b></td>";
                 echo "</tr>";
                }else{

                 echo "<tr>";
                 echo "<td>".$producto->concepto."</td>";
                 echo "<td><b>'(" . str_pad($producto->Facturacion_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td>".$producto->Facturacion."</td>";
                 echo "<td><b>'(" . str_pad($producto->Boletas_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td>".$producto->Boletas."</td>";
                 echo "<td><b>'(" . str_pad($producto->NDebito_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td>".$producto->NDebito."</td>";
                 echo "<td><b>'(" . str_pad($producto->NCredito_doctos,5," ",STR_PAD_LEFT).")</b></td>";
                 echo "<td>".$producto->NCredito."</td>";
                 echo "<td>".$producto->totales."</td>";
                 echo "</tr>";
                }

                 
            }
            echo '</table>';
        }




    public function reporte_detalle_productos_stock($idproducto,$mes,$anno)
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=reporte_detalle_productos_stock.xls"); 
            

            $idproducto = $idproducto == 0 ? '' : $idproducto;
            $mes = $mes == 0 ? '' : $mes;
            $anno = $anno == 0 ? '' : $anno;

            $this->load->model('reporte');
            $detalle_productos_stock = $this->reporte->reporte_detalle_productos_stock(null,null,$mes,$anno,$idproducto);                    
            $producto = $this->reporte->get_producto($idproducto);
            
            echo '<table>';
            echo "<tr><td colspan='9'><b>Reporte Detalle Stock - " . $producto->nombre . "</b></td></tr>";
            echo "<tr>";
            echo "<td><b>#</b></td>";
            echo "<td><b>Tipo Documento</b></td>";
            echo "<td><b>Num. Documento</b></td>";
            echo "<td><b>Fec. Documento</b></td>";
            echo "<td><b>Precio Costo</b></td>";
            echo "<td><b>Cantidad Entradas</b></td>";
            echo "<td><b>Cantidad Salidas</b></td>";
            echo "<td><b>Stock</b></td>";
            echo "<td><b>Detalle</b></td>";
            echo "</tr>";
              $i = 1;              
              foreach($detalle_productos_stock['data'] as $detalle_productos){
                 echo "<tr>";
                 echo "<td>".$i."</td>";
                 echo "<td>".$detalle_productos->tipodocto."</td>";
                 echo "<td>".$detalle_productos->numdocto."</td>";
                 echo "<td>".$detalle_productos->fecha."</td>";
                 echo "<td>".number_format($detalle_productos->precio,0,".",".")."</td>";
                 echo "<td>".$detalle_productos->cant_entradas."</td>";
                 echo "<td>".$detalle_productos->cant_salidas."</td>";
                 echo "<td>".$detalle_productos->stock."</td>";
                 echo "<td>".$detalle_productos->detalle."</td>";
                 echo "</tr>";

                  $i++;
            }
            echo '</table>';
        }



        public function reporte_estadisticas_ventas($mes,$anno)
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=reporte_estadisticas_ventas.xls"); 
            


            $mes = $mes == 0 ? '' : $mes;
            $anno = $anno == 0 ? '' : $anno;

            $this->load->model('reporte');
            $detalle_estadistica_venta = $this->reporte->reporte_estadisticas_ventas(null,null,$mes,$anno);
                    
            
            echo '<table>';
            echo "<tr><td colspan='8'><b>Detalle Estadisticas Ventas - " . month2string((int)$mes)." de " . $anno . "</b></td></tr>";
            echo "<tr>";
            echo "<td><b>#</b></td>";
            echo "<td><b>Cod. Productos</b></td>";
            echo "<td><b>Desc. Producto</b></td>";
            echo "<td><b>Unidades</b></td>";
            echo "<td><b>Venta Neta</b></td>";
            echo "<td><b>Costo Venta</b></td>";
            echo "<td><b>Margen Neto</b></td>";
            echo "<td><b>% Margen</b></td>";
            echo "</tr>";
              $i = 1;              
              foreach($detalle_estadistica_venta['data'] as $detalle_estadistica){
                 echo "<tr>";
                 echo "<td>".$i."</td>";
                 echo "<td>".$detalle_estadistica->codigo."</td>";
                 echo "<td>".$detalle_estadistica->nombre."</td>";
                 echo "<td>".$detalle_estadistica->unidades."</td>";
                 echo "<td>".number_format($detalle_estadistica->ventaneta,0,".",".")."</td>";
                 echo "<td>".number_format($detalle_estadistica->costo,0,".",".")."</td>";
                 echo "<td>".$detalle_estadistica->margen."</td>";
                 echo "<td>".$detalle_estadistica->porcmargen."</td>";
                 echo "</tr>";

                  $i++;
            }
            echo '</table>';
        }




      public function exportarTXT(){

        header("Content-Type: application/force-download");
        header("Content-Transfer-Encoding: binary");

        header("Content-disposition: attachment; filename=facturacion.txt");

        $fecha = $this->input->get('fecha');
        list($dia, $mes, $anio) = explode("/",$fecha);
        $fecha3 = $anio ."-". $mes ."-". $dia;
        $fecha2 = $this->input->get('fecha2');
        list($dia, $mes, $anio) = explode("/",$fecha2);
        $fecha4 = $anio ."-". $mes ."-". $dia;

                          
        $data = array();
        $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, t.descripcion as nomdocumento, t.id as tipdocumento, con.nombre as nomcondventa, c.id_pago as codigo_con_pago FROM factura_clientes acc
        left join clientes c on (acc.id_cliente = c.id)
        left join tipo_documento t on (acc.tipo_documento = t.id)
        left join cond_pago con on (c.id_pago = con.id)
        left join vendedores v on (acc.id_vendedor = v.id)
        WHERE acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
        ' 
        );

        echo "NUM_DOCUMENTO";
        echo ";";
        echo "FECHA FACTURA";
        echo ";";
        echo "FECHA VENCIMIENTO";
        echo ";";
        echo "TIPO DOCUMENTO";
        echo ";";
        echo "RUT";
        echo ";";
        echo "NOMBRE";
        echo ";";
        echo "COND VENTA";
        echo ";";
        echo "CODIGO CONDICION";
        echo ";";
        echo "VENDEDOR";
        echo ";";
        echo "COD VENDEDOR";
        echo ";";
        echo "NETO";
        echo ";";
        echo "IVA";
        echo ";";
        echo "TOTAL";
        echo ";";
        echo "CODIGO";
        echo ";";
        echo "NOMBRE PRODUCTO";
        echo ";";
        echo "PRECIO";
        echo ";";
        echo "CANTIDAD";
        echo ";";
        echo "DESCUENTO";
        echo ";";
        echo "NETO";
        echo ";";
        echo "IVA";
        echo ";";
        echo "TOTAL";
        
        //$users = $query->result_array();
                      
        foreach ($query->result() as $v){

            
            $nomdocumento = $v->nomdocumento;
            $fechafactura = $v->fecha_factura;
            $fechavenc = $v->fecha_venc;            
            $numdocumento = $v->num_factura;
            $rutcliente = $v->rut_cliente;
            $nomcliente = $v->nombre_cliente;
            $condventa = $v->nomcondventa;
            $codcondventa = $v->codigo_con_pago;
            $vendedor = $v->nom_vendedor;
            $codvendedor = $v->id_vendedor;
            if ($v->tipdocumento==102){
                $neto = (round($v->totalfactura /1.19) / -1);
                $iva = (($v->totalfactura - $neto) / -1);
                $total = ($v->totalfactura / -1);                
            }else{
                $neto = (round($v->totalfactura /1.19));
                $iva = ($v->totalfactura - $neto);
                $total = ($v->totalfactura);             
            };
            
            $id = $v->id;

            
            $query2 = $this->db->query('SELECT acc.*, c.codigo as codigo,
            c.nombre as nom_producto
            FROM detalle_factura_cliente acc
            left join productos c on (acc.id_producto = c.id)
            WHERE acc.id_factura = "'.$id.'"');                     

            foreach ($query2->result() as $z){
            if ($v->tipdocumento==102){
            $netop = (round($z->totalproducto / 1.19)/ -1);
            $ivap = (($z->totalproducto - $netop) /-1);
            $totalproductop = ($z->totalproducto / -1);
            }else{
            $netop = (round($z->totalproducto / 1.19));
            $ivap = ($z->totalproducto - $netop);
            $totalproductop = ($z->totalproducto);                
            };
            echo chr(13).chr(10);
            echo $numdocumento;
            echo ";";
            echo $fechafactura;
            echo ";";
            echo $fechavenc;
            echo ";";
            echo $nomdocumento;
            echo ";";
            echo $rutcliente;
            echo ";";
            echo $nomcliente;
            echo ";";
            echo $condventa;
            echo ";";
            echo $codcondventa;
            echo ";";
            echo $vendedor;
            echo ";";
            echo $codvendedor;
            echo ";";
            echo $neto;
            echo ";";
            echo $iva;
            echo ";";
            echo $total;   
            echo ";";
            echo $z->codigo;
            echo ";";
            echo $z->nom_producto;
            echo ";";
            echo $z->precio;
            echo ";";
            echo $z->cantidad;
            echo ";";
            echo $z->descuento;
            echo ";";
            echo $netop;
            echo ";";
            echo $ivap;
            echo ";";
            echo $totalproductop;
                       
            //echo chr(13).chr(10);     
            }
            //echo chr(13).chr(10);
          }
          
      }


      public function exportarExcellistaProductos()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=listaproductos.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();

             $query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre  as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
              left join mae_ubica c on (acc.id_ubi_prod = c.id)
              left join marcas m on (acc.id_marca = m.id)
              left join mae_medida ca on (acc.id_uni_medida = ca.id)
              left join familias fa on (acc.id_familia = fa.id)
              left join agrupacion ag on (acc.id_agrupacion = ag.id)
              left join subfamilias sb on (acc.id_subfamilia = sb.id)
              left join bodegas bo on (acc.id_bodega = bo.id)' );

            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LISTADO PARA ACTUALIZAR PRECIOS PRODUCTOS</td>";
            echo "<tr>";
            echo "<td>ID</td>";
            echo "<td>CODIGO</td>";
            echo "<td>NOMBRE</td>";
            echo "<td>PRECIO VENTA</td>";
            echo "<td>STOCK</td>";
            echo "<tr>";
              
              foreach($users as $v){
               echo "<tr>";
               echo "<td>".$v['id']."</td>";
               echo "<td>".$v['codigo']."</td>";
               echo "<td>".$v['nombre']."</td>";
               echo "<td>".$v['p_venta']."</td>";
               echo "<td>".$v['stock']."</td>";
                 
            }
            echo '</table>';
        }


      public function exportarExcelPreventa()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=preventas.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            
            $data = array();
                                   
            $this->load->database();
            $data = array();
            $query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, c.direccion as direccion,
            c.id_pago as id_pago, suc.direccion as direccion_sucursal, ciu.nombre as ciudad, com.nombre as comuna, cor.nombre as nom_documento, cod.nombre as nom_giro FROM preventa acc
            left join correlativos cor on (acc.id_tip_docu = cor.id)
            left join clientes c on (acc.id_cliente = c.id)
            left join vendedores v on (acc.id_vendedor = v.id)
            left join clientes_sucursales suc on (acc.id_sucursal = suc.id)
            left join comuna com on (suc.id_comuna = com.id)
            left join ciudad ciu on (suc.id_ciudad = ciu.id)
            left join cod_activ_econ cod on (c.id_giro = cod.id)
            order by acc.id desc ' );
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>PREVENTAS</td>";
            echo "<td>DESPACHO</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("num_ticket", $columnas)):
                    echo "<td>NUMERO</td>";
                endif;
                if (in_array("id_tip_docu", $columnas)):
                     echo "<td>TIPO</td>";
                endif;
                if (in_array("nom_documento", $columnas)):
                     echo "<td>DOCUMENTO</td>";
                endif;
                if (in_array("fecha_venta", $columnas)) :
                    echo "<td>FECHA</td>";
                endif;
                if (in_array("rut_cliente", $columnas)) :
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nom_cliente", $columnas)) :
                    echo "<td>NOMBRE</td>";
                endif;
                if (in_array("nom_giro", $columnas)) :
                    echo "<td>GIRO</td>";
                endif;
                if (in_array("direccion", $columnas)) :
                    echo "<td>DIRECCION</td>";
                endif;
                if (in_array("nom_vendedor", $columnas)) :
                    echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("neto", $columnas)) :
                    echo "<td>NETO</td>";
                endif;
                if (in_array("desc", $columnas)) :
                    echo "<td>DESCUENTO</td>";
                endif;                
                if (in_array("total", $columnas)) :
                    echo "<td>TOTAL</td>";
                endif;
                if (in_array("id_sucursal", $columnas)) :
                    echo "<td>ID SUCURSAL</td>";
                endif;
                if (in_array("direccion_sucursal", $columnas)) :
                    echo "<td>DIRECCION SUCURSAL</td>";
                endif;
                if (in_array("comuna", $columnas)) :
                    echo "<td>COMUNA</td>";
                endif;
                if (in_array("ciudad", $columnas)) :
                    echo "<td>CIUDAD</td>";
                endif;

                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                 if (in_array("id", $columnas)) :
                    echo "<td>".$v['id']."</td>";
                 endif;                    
                 if (in_array("num_ticket", $columnas)) :
                    echo "<td>".$v['num_ticket']."</td>";
                 endif;
                 if (in_array("id_tip_docu", $columnas)) :
                    echo "<td>".$v['id_tip_docu']."</td>";
                 endif;
                 if (in_array("nom_documento", $columnas)) :
                    echo "<td>".$v['nom_documento']."</td>";
                 endif;
                 if (in_array("fecha_venta", $columnas)) :
                    echo "<td>".$v['fecha_venta']."</td>";
                 endif;
                  if (in_array("rut_cliente", $columnas)) :
                      echo "<td>".$v['rut_cliente']."</td>";
                  endif;
                  if (in_array("nom_cliente", $columnas)) :
                      echo "<td>".$v['nom_cliente']."</td>";
                  endif;
                  if (in_array("nom_giro", $columnas)) :
                      echo "<td>".$v['nom_giro']."</td>";
                  endif;
                  if (in_array("direccion", $columnas)) :
                      echo "<td>".$v['direccion']."</td>";
                  endif;
                  if (in_array("nom_vendedor", $columnas)) :
                      echo "<td>".$v['nom_vendedor']."</td>";
                  endif;
                  if (in_array("neto", $columnas)) :
                      echo "<td>".$v['neto']."</td>";
                  endif;
                  if (in_array("desc", $columnas)) :
                      echo "<td>".$v['desc']."</td>";
                  endif;
                  if (in_array("total", $columnas)) :
                      echo "<td>".$v['total']."</td>";
                  endif;
                  if (in_array("id_sucursal", $columnas)) :
                      echo "<td>".$v['id_sucursal']."</td>";
                  endif;
                  if (in_array("direccion_sucursal", $columnas)) :
                      echo "<td>".$v['direccion_sucursal']."</td>";
                  endif;
                  if (in_array("comuna", $columnas)) :
                      echo "<td>".$v['comuna']."</td>";
                  endif;
                  if (in_array("ciudad", $columnas)) :
                      echo "<td>".$v['ciudad']."</td>";
                  endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }


      public function exportarExcelInventario()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=Inventarioinicial.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();

           $query = $this->db->query('SELECT acc.*, com.nombre as nom_bodega FROM inventario_inicial acc
           left join bodegas com on (acc.id_bodega = com.id)  order by acc.id desc' );      

            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LISTADO DE PRODUCTOS</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("num_inventario", $columnas)):
                    echo "<td>NUMERO</td>";
                endif;
                if (in_array("fecha", $columnas)):
                     echo "<td>FECHA</td>";
                endif;
                if (in_array("nom_bodega", $columnas)):
                     echo "<td>NOMBRE BODEGA</td>";
                endif;
                if (in_array("id_bodega", $columnas)) :
                    echo "<td>ID BODEGA</td>";
                endif;
                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("num_inventario", $columnas)) :
                      echo "<td>".$v['num_inventario']."</td>";
                   endif;
                   if (in_array("fecha", $columnas)) :
                      echo "<td>".$v['fecha']."</td>";
                   endif;
                   if (in_array("nom_bodega", $columnas)) :
                      echo "<td>".$v['nom_bodega']."</td>";
                   endif;
                   if (in_array("id_bodega", $columnas)) :
                      echo "<td>".$v['id_bodega']."</td>";
                   endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }

        public function exportarExcelInventariodetalle()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=Inventarioinicialdetalle.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            $nombre = json_decode($this->input->get('id'));
            
            $this->load->database();

           $query = $this->db->query('SELECT acc.*, c.nombre as nom_producto, com.nombre as nom_bodega FROM inventario acc
            left join productos c on (acc.id_producto = c.id)
            left join bodegas com on (acc.id_bodega = com.id)
            WHERE acc.num_inventario like "'.$nombre.'"');
       

            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LISTADO DE PRODUCTOS</td>";
            echo "<tr>";
                echo "<td>ID</td>";
                echo "<td>NUMERO</td>";
                echo "<td>FECHA</td>";
                echo "<td>PRODUCTO</td>";
                echo "<td>CANTIDAD</td>";
                echo "<td>BODEGA</td>";
            echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   echo "<td>".$v['id']."</td>";
                   echo "<td>".$v['num_inventario']."</td>";
                   echo "<td>".$v['fecha_inventario']."</td>";
                   echo "<td>".$v['nom_producto']."</td>";
                   echo "<td>".$v['stock']."</td>";
                   echo "<td>".$v['nom_bodega']."</td>";
                   //echo "<tr>";
            }
            echo '</table>';
        }

       public function exportarExcelrecaudacion(){

          header("Content-type: application/vnd.ms-excel"); 
          
          $columnas = json_decode($this->input->get('cols'));
          $idcaja = $this->input->get('idcaja');
          $idcajero = $this->input->get('idcajero');
          $nomcaja = $this->input->get('nomcaja');
          $nomcajero = $this->input->get('nomcajero');
          $fecha = $this->input->get('fecha2');
          list($dia, $mes, $anio) = explode("-",$fecha);
          $fecha2 = $anio ."-". $mes ."-". $dia;
          $tipo = $this->input->get('tipo');

          if ($tipo == "DETALLE"){

            header("Content-disposition: attachment; filename=recaudaciondetalle.xls"); 
      

            $this->load->database();

            $items = $this->db->query('SELECT acc.*, t.nombre as desc_pago,
            r.id_caja as id_caja, r.id_cajero as id_cajero, n.nombre as nom_caja,
            e.nombre as nom_cajero, r.num_comp as num_comp, b.nombre as nom_banco FROM recaudacion_detalle acc
            left join cond_pago t on (acc.id_forma = t.id)
            left join recaudacion r on (acc.id_recaudacion = r.id)
            left join cajas n on (r.id_caja = n.id)
            left join cajeros e on (r.id_cajero = e.id)
            left join banco b on (acc.id_banco = b.id)
            WHERE acc.fecha_comp ="'.$fecha.'"');                

            $users = $items->result_array();
                                   
            echo '<table>';
            echo "<td></td>";
            echo "<td>DETALLE RECAUDACION DIARIA CAJAS</td>";
            echo "<tr>";
            echo "<td>CAJA : ".$nomcaja."</td>";
            echo "<td></td>";
            echo "<td>CAJERO : ".$nomcajero."</td>";
            echo "</tr>";                  
            echo "<tr>";
            echo "<td>FECHA : ".$fecha2."</td>";
            echo "</tr>";                  
            echo "<tr>";
            echo "<td>COMPROBANTE</td>";
            echo "<td>FORMA DE PAGO</td>";
            echo "<td>CHEQUE</td>";
            echo "<td>BANCO</td>";
            echo "<td>TOTAL</td>";
            echo "<td>CANCELADO</td>";
            echo "<td>VUELTO</td>";
            echo "<td>FECHA TRANSACCION</td>";
            echo "<td>FECHA COMPROBANTE</td>";
              
            foreach($users as $v){

             if ($idcaja == $v['id_caja'] and $idcajero == $v['id_cajero'] ){
              echo "<tr>";
              echo "<td>".$v['num_comp']."</td>";
              echo "<td>".$v['desc_pago']."</td>";
              echo "<td>".$v['num_cheque']."</td>";
              echo "<td>".$v['nom_banco']."</td>";
              echo "<td>".$v['valor_pago']."</td>";
              echo "<td>".$v['valor_cancelado']."</td>";
              echo "<td>".$v['valor_vuelto']."</td>";
              echo "<td>".$v['fecha_transac']."</td>";
              echo "<td>".$v['fecha_comp']."</td>";
                }
              }
              echo '</table>';
         
            }else{

                header("Content-disposition: attachment; filename=recaudacion.xls");                   
                $this->load->database();

                $query = $this->db->query('SELECT acc.*, c.nombres as nom_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor, v.id as id_vendedor, p.num_ticket as num_ticket, p.total as total, n.nombre as nom_caja, e.nombre as nom_cajero FROM recaudacion acc
                left join preventa p on (acc.id_ticket = p.id)
                left join clientes c on (acc.id_cliente = c.id)
                left join cajas n on (acc.id_caja = n.id)
                left join cajeros e on (acc.id_cajero = e.id)
                left join vendedores v on (p.id_vendedor = v.id)
                WHERE acc.id_caja = "'.$idcaja.'" AND acc.id_cajero = "'.$idcajero.'" AND acc.fecha = "'.$fecha.'"');

                $users = $query->result_array();
                           
                echo '<table>';
                echo "<td></td>";
                echo "<td>RECAUDACION DIARIA CAJAS</td>";
                echo "<tr>";
                if (in_array("id_caja", $columnas)):
                     echo "<td>ID CAJA</td>";
                endif;
                if (in_array("nom_caja", $columnas)):
                     echo "<td>CAJA</td>";
                endif;
                if (in_array("id_cajero", $columnas)):
                     echo "<td>ID CAJERO</td>";
                endif;
                if (in_array("nom_cajero", $columnas)):
                     echo "<td>CAJERO</td>";
                endif;
                if (in_array("id_ticket", $columnas)):
                    echo "<td>ID TICKET</td>";
                endif;
                if (in_array("num_comp", $columnas)):
                     echo "<td>COMPROBANTE</td>";
                endif;
                if (in_array("fecha", $columnas)) :
                    echo "<td>FECHA</td>";
                endif;
                if (in_array("rut_cliente", $columnas)) :
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nom_cliente", $columnas)) :
                    echo "<td>RAZON SOCIAL</td>";
                endif;
                if (in_array("nom_vendedor", $columnas)) :
                    echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("neto", $columnas)) :
                    echo "<td>NETO</td>";
                endif;
                if (in_array("desc", $columnas)) :
                    echo "<td>DESCUENTO</td>";
                endif;
                if (in_array("total", $columnas)) :
                    echo "<td>TOTAL</td>";
                endif;                
                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id_caja", $columnas)) :
                      echo "<td>".$v['id_caja']."</td>";
                   endif;
                    
                   if (in_array("nom_caja", $columnas)) :
                      echo "<td>".$v['nom_caja']."</td>";
                   endif;
                   if (in_array("id_cajero", $columnas)) :
                      echo "<td>".$v['id_cajero']."</td>";
                   endif;
                  
                  if (in_array("nom_cajero", $columnas)) :
                      echo "<td>".$v['nom_cajero']."</td>";
                  endif;
                  if (in_array("id_ticket", $columnas)) :
                      echo "<td>".$v['id_ticket']."</td>";
                  endif;

                  if (in_array("num_comp", $columnas)) :
                      echo "<td>".$v['num_comp']."</td>";
                  endif;
                  if (in_array("fecha", $columnas)) :
                      echo "<td>".$v['fecha']."</td>";
                  endif;

                  if (in_array("rut_cliente", $columnas)) :
                      echo "<td>".$v['rut_cliente']."</td>";
                  endif;
                  if (in_array("nom_cliente", $columnas)) :
                      echo "<td>".$v['nom_cliente']."</td>";
                  endif;
                  if (in_array("nom_vendedor", $columnas)) :
                      echo "<td>".$v['nom_vendedor']."</td>";
                  endif;
                  if (in_array("neto", $columnas)) :
                      echo "<td>".$v['neto']."</td>";
                  endif;
                   if (in_array("desc", $columnas)) :
                      echo "<td>".$v['desc']."</td>";
                  endif;
                   if (in_array("total", $columnas)) :
                      echo "<td>".$v['total']."</td>";
                  endif;
            }
            echo '</table>';
          }
       }


      
        public function exportarExcelProductos()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=productos.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();

             $query = $this->db->query('SELECT acc.*, c.nombre as nom_ubi_prod, ca.nombre  as nom_uni_medida, m.nombre as nom_marca, fa.nombre as nom_familia, bo.nombre as nom_bodega, ag.nombre as nom_agrupacion, sb.nombre as nom_subfamilia FROM productos acc
              left join mae_ubica c on (acc.id_ubi_prod = c.id)
              left join marcas m on (acc.id_marca = m.id)
              left join mae_medida ca on (acc.id_uni_medida = ca.id)
              left join familias fa on (acc.id_familia = fa.id)
              left join agrupacion ag on (acc.id_agrupacion = ag.id)
              left join subfamilias sb on (acc.id_subfamilia = sb.id)
              left join bodegas bo on (acc.id_bodega = bo.id)' );

            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LISTADO DE PRODUCTOS</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("codigo", $columnas)):
                    echo "<td>CODIGO</td>";
                endif;
                if (in_array("nombre", $columnas)):
                     echo "<td>NOMBRE</td>";
                endif;
                if (in_array("nom_marca", $columnas)):
                     echo "<td>MARCA</td>";
                endif;
                if (in_array("nom_ubi_prod", $columnas)) :
                    echo "<td>UBICACION</td>";
                endif;
                if (in_array("nom_uni_medida", $columnas)) :
                    echo "<td>MEDIDA</td>";
                endif;
                if (in_array("nom_bodega", $columnas)) :
                    echo "<td>BODEGA</td>";
                endif;
                if (in_array("p_ult_compra", $columnas)) :
                    echo "<td>PRECIO ULTIMA COMPRA</td>";
                endif;
                if (in_array("p_venta", $columnas)) :
                    echo "<td>PRECIO VENTA</td>";
                endif;
                if (in_array("p_costo", $columnas)) :
                    echo "<td>PRECIO COSTO</td>";
                endif;
                 if (in_array("p_promedio", $columnas)) :
                    echo "<td>PRECIO PROMEDIO</td>";
                endif;
                if (in_array("p_may_compra", $columnas)) :
                    echo "<td>PRECIO MAYOR COMPRA</td>";
                endif;
                 if (in_array("stock", $columnas)) :
                    echo "<td>STOCK</td>";
                endif;
                if (in_array("nom_familia", $columnas)) :
                    echo "<td>FAMILIA</td>";
                endif;
                if (in_array("nom_subfamilia", $columnas)) :
                    echo "<td>SUB FAMILIA</td>";
                endif;
                if (in_array("nom_agrupacion", $columnas)) :
                    echo "<td>AGRUPACION</td>";
                endif;

                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("codigo", $columnas)) :
                      echo "<td>".$v['codigo']."</td>";
                   endif;
                   if (in_array("nombre", $columnas)) :
                      echo "<td>".$v['nombre']."</td>";
                   endif;
                   if (in_array("nom_marca", $columnas)) :
                      echo "<td>".$v['nom_marca']."</td>";
                   endif;
                   if (in_array("nom_ubi_prod", $columnas)) :
                      echo "<td>".$v['nom_ubi_prod']."</td>";
                   endif;
                  if (in_array("nom_uni_medida", $columnas)) :
                      echo "<td>".$v['nom_uni_medida']."</td>";
                  endif;
                  if (in_array("nom_bodega", $columnas)) :
                      echo "<td>".$v['nom_bodega']."</td>";
                  endif;
                  if (in_array("p_venta", $columnas)) :
                      echo "<td>".$v['p_venta']."</td>";
                  endif;
                  if (in_array("p_costo", $columnas)) :
                      echo "<td>".$v['p_costo']."</td>";
                  endif;
                  if (in_array("p_ult_compra", $columnas)) :
                      echo "<td>".$v['p_ult_compra']."</td>";
                  endif;
                  if (in_array("p_promedio", $columnas)) :
                      echo "<td>".$v['p_promedio']."</td>";
                  endif;
                  if (in_array("p_may_compra", $columnas)) :
                      echo "<td>".$v['p_may_compra']."</td>";
                  endif;
                  if (in_array("stock", $columnas)) :
                      echo "<td>".$v['stock']."</td>";
                  endif;
                   if (in_array("nom_familia", $columnas)) :
                      echo "<td>".$v['nom_familia']."</td>";
                  endif;
                   if (in_array("nom_subfamilia", $columnas)) :
                      echo "<td>".$v['nom_subfamilia']."</td>";
                  endif;
                   if (in_array("nom_agrupacion", $columnas)) :
                      echo "<td>".$v['nom_agrupacion']."</td>";
                  endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }

        public function exportarExcelFacturas()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=Ventas.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 102;
            $tipo2 = 19;
            $tipo3 = 101;
            $tipo4 = 103;
            
            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
            if($opcion == "Rut"){
    
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and c.rut = '.$nombres.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc'    

              );

                }else if($opcion == "Nombre"){

                  
                $sql_nombre = "";
                    $arrayNombre =  explode(" ",$nombres);

                    foreach ($arrayNombre as $nombre) {
                      $sql_nombre .= "and c.nombres like '%".$nombre."%' ";
                    }
                            
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') ' . $sql_nombre . ' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'" 
                order by acc.id desc' 
                
                );
             
              }else if($opcion == "Todos"){

                
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 
                
                );
            

              }else{

                
              $data = array();
              $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in (  '.$tipo.','.$tipo2.','.$tipo3.','.$tipo4.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 

                );


              }

            };            
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE VENTAS</td>";
            echo "<td>FACTURAS</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("num_factura", $columnas)):
                    echo "<td>NUMERO</td>";
                endif;
                if (in_array("fecha_factura", $columnas)):
                     echo "<td>FECHA</td>";
                endif;
                if (in_array("fecha_venc", $columnas)):
                     echo "<td>VENCIMIENTO</td>";
                endif;
                if (in_array("rut_cliente", $columnas)) :
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nombre_cliente", $columnas)) :
                    echo "<td>NOMBRE</td>";
                endif;
                if (in_array("nom_vendedor", $columnas)) :
                    echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("sub_total", $columnas)) :
                    echo "<td>AFECTO</td>";
                endif;
                if (in_array("descuento", $columnas)) :
                    echo "<td>DESCUENTO</td>";
                endif;
                if (in_array("neto", $columnas)) :
                    echo "<td>NETO</td>";
                endif;
                 if (in_array("iva", $columnas)) :
                    echo "<td>IVA</td>";
                endif;
                if (in_array("totalfactura", $columnas)) :
                    echo "<td>TOTAL</td>";
                endif;

                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("num_factura", $columnas)) :
                      echo "<td>".$v['num_factura']."</td>";
                   endif;
                   if (in_array("fecha_factura", $columnas)) :
                      echo "<td>".$v['fecha_factura']."</td>";
                   endif;
                   if (in_array("fecha_venc", $columnas)) :
                      echo "<td>".$v['fecha_venc']."</td>";
                   endif;
                   if (in_array("rut_cliente", $columnas)) :
                      echo "<td>".$v['rut_cliente']."</td>";
                   endif;
                  if (in_array("nombre_cliente", $columnas)) :
                      echo "<td>".$v['nombre_cliente']."</td>";
                  endif;
                  if (in_array("nom_vendedor", $columnas)) :
                      echo "<td>".$v['nom_vendedor']."</td>";
                  endif;
                  if (in_array("sub_total", $columnas)) :
                      echo "<td>".$v['sub_total']."</td>";
                  endif;
                  if (in_array("descuento", $columnas)) :
                      echo "<td>".$v['descuento']."</td>";
                  endif;
                  if (in_array("neto", $columnas)) :
                      echo "<td>".$v['neto']."</td>";
                  endif;
                  if (in_array("iva", $columnas)) :
                      echo "<td>".$v['iva']."</td>";
                  endif;
                  if (in_array("totalfactura", $columnas)) :
                      echo "<td>".$v['totalfactura']."</td>";
                  endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }

        public function exportarExcelGuias()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=guias.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 3;
            $tipo2 = 2;
                        

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
            if($opcion == "Rut"){
    
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') and c.rut = '.$nombres.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc'    

              );

                }else if($opcion == "Nombre"){

                  
                $sql_nombre = "";
                    $arrayNombre =  explode(" ",$nombres);

                    foreach ($arrayNombre as $nombre) {
                      $sql_nombre .= "and c.nombres like '%".$nombre."%' ";
                    }
                            
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') ' . $sql_nombre . ' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'" 
                order by acc.id desc' 
                
                );
             
              }else if($opcion == "Todos"){

                
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 
                
                );
            

              }else{

                
              $data = array();
              $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento = '.$tipo.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 

                );


              }

            };            
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE GUIAS</td>";
            echo "<td>DESPACHO</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("num_factura", $columnas)):
                    echo "<td>NUMERO</td>";
                endif;
                if (in_array("fecha_factura", $columnas)):
                     echo "<td>FECHA</td>";
                endif;
                if (in_array("fecha_venc", $columnas)):
                     echo "<td>VENCIMIENTO</td>";
                endif;
                if (in_array("rut_cliente", $columnas)) :
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nombre_cliente", $columnas)) :
                    echo "<td>NOMBRE</td>";
                endif;
                if (in_array("nom_vendedor", $columnas)) :
                    echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("sub_total", $columnas)) :
                    echo "<td>AFECTO</td>";
                endif;
                if (in_array("descuento", $columnas)) :
                    echo "<td>DESCUENTO</td>";
                endif;
                if (in_array("neto", $columnas)) :
                    echo "<td>NETO</td>";
                endif;
                 if (in_array("iva", $columnas)) :
                    echo "<td>IVA</td>";
                endif;
                if (in_array("totalfactura", $columnas)) :
                    echo "<td>TOTAL</td>";
                endif;

                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("num_factura", $columnas)) :
                      echo "<td>".$v['num_factura']."</td>";
                   endif;
                   if (in_array("fecha_factura", $columnas)) :
                      echo "<td>".$v['fecha_factura']."</td>";
                   endif;
                   if (in_array("fecha_venc", $columnas)) :
                      echo "<td>".$v['fecha_venc']."</td>";
                   endif;
                   if (in_array("rut_cliente", $columnas)) :
                      echo "<td>".$v['rut_cliente']."</td>";
                   endif;
                  if (in_array("nombre_cliente", $columnas)) :
                      echo "<td>".$v['nombre_cliente']."</td>";
                  endif;
                  if (in_array("nom_vendedor", $columnas)) :
                      echo "<td>".$v['nom_vendedor']."</td>";
                  endif;
                  if (in_array("sub_total", $columnas)) :
                      echo "<td>".$v['sub_total']."</td>";
                  endif;
                  if (in_array("descuento", $columnas)) :
                      echo "<td>".$v['descuento']."</td>";
                  endif;
                  if (in_array("neto", $columnas)) :
                      echo "<td>".$v['neto']."</td>";
                  endif;
                  if (in_array("iva", $columnas)) :
                      echo "<td>".$v['iva']."</td>";
                  endif;
                  if (in_array("totalfactura", $columnas)) :
                      echo "<td>".$v['totalfactura']."</td>";
                  endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }

        public function exportarExcellibroBoletas()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=LibroBoletas.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 2;
            $otros = 0;
            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
                          
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.fecha_factura, acc.tipo_documento, acc.num_factura' 
                
                
                );
            

              };
              
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE VENTAS</td>";
            echo "<td>BOLETAS</td>";
            echo "<tr>";
                echo "<td>NUMERO</td>";
                echo "<td>FECHA</td>";
                echo "<td>AFECTO</td>";
                echo "<td>IVA</td>";
                echo "<td>OTROS IMP.</td>";
                echo "<td>TOTAL</td>";
                echo "<tr>";
              
              foreach($users as $v){
                $total = $v['totalfactura'];
                $neto = round(($total / 1.19), 0);
                $iva = ($total - $neto);
                echo "<tr>";
                   echo "<td>".$v['num_factura']."</td>";
                   echo "<td>".$v['fecha_factura']."</td>";
                   echo "<td>".$neto."</td>";
                   echo "<td>".$iva."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$v['totalfactura']."</td>";
                echo "</tr>";
            }
            echo '</table>';
        }

        public function exportarExcellibroFacturas()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=LibroFacturas.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 101;
            $tipo2 = 102;
            $totalnc = 0;
            $totalafnc = 0;
            $totalnetonc = 0;
            $totaliva = 0;
            $totalfa = 0;
            $totalaffa = 0;
            $totalnetofa = 0;
            $totalivafa = 0;
            $cantfac = 0;
            $cantnc = 0;
            $otros = 0;

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){            
                          
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento in ( '.$tipo.','.$tipo2.') and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.fecha_factura, acc.tipo_documento, acc.num_factura' 
                
                );           

              };
              
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE VENTAS</td>";
            echo "<td>FACTURAS</td>";
            echo "<tr>";
                echo "<td>NUMERO</td>";
                echo "<td>TIPO</td>";
                echo "<td>FECHA</td>";
                echo "<td>VENCIMIENTO</td>";
                echo "<td>RUT</td>";
                echo "<td>NOMBRE</td>";
                echo "<td>AFECTO</td>";
                echo "<td>DESCUENTO</td>";
                echo "<td>NETO</td>";
                echo "<td>IVA</td>";
                echo "<td>TOTAL</td>";
                echo "<tr>";
              
              foreach($users as $v){
                 $total = $v['totalfactura'];
                 $afecto = $v['sub_total'];
                 $neto = $v['neto'];
                 $iva = $v['iva'];
                 if ($v['tipo_documento']==102){
                  $total = ($v['totalfactura']/-1);
                  $afecto = ($v['sub_total']/-1);
                  $neto = ($v['neto']/-1);
                  $iva = $v['iva']/-1;
                  $cantnc = $cantnc + 1;
                  $totalnc = $totalnc + $total;
                  $totalafnc = $totalafnc + $afecto;
                  $totalnetonc = $totalnetonc + $neto;
                  $totaliva = $totaliva + $iva;
                  $tip="N/C";
                 }else{
                  $tip="FACT";
                  $totalfa = $totalfa + $total;
                  $totalaffa = $totalaffa + $afecto;
                  $totalnetofa = $totalnetofa + $neto;
                  $totalivafa = $totalivafa + $iva;
                  $cantfac = $cantfac +1;                   
                 }

                echo "<tr>";
                   echo "<td>".$v['num_factura']."</td>";
                   echo "<td>".$tip."</td>";
                   echo "<td>".$v['fecha_factura']."</td>";
                   echo "<td>".$v['fecha_venc']."</td>";
                   echo "<td>".$v['rut_cliente']."</td>";
                   echo "<td>".$v['nombre_cliente']."</td>";
                   echo "<td>".$afecto."</td>";
                   echo "<td>".$v['descuento']."</td>";
                   echo "<td>".$neto."</td>";
                   echo "<td>".$iva."</td>";
                   echo "<td>".$total."</td>";
                echo "</tr>";
            }
            echo "<tr>";
                echo "<td>TIPO</td>";
                echo "<td>VIGENTES</td>";
                echo "<td>NULOS</td>";
                echo "<td>AFECTO</td>";
                echo "<td>EXENTO</td>";
                echo "<td>IMPUESTO IVA</td>";
                echo "<td>OTROS IMP.</td>";
                echo "<td>TOTAL FACTURAS</td>";
            echo "<tr>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
            echo "<tr>";
                   echo "<td>FACTURAS</td>";
                   echo "<td>".$cantfac."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalaffa."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalivafa."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalfa."</td>";
            echo "</tr>";
            echo "<tr>";
                   echo "<td>NOTAS CREDITO</td>";                
                   echo "<td>".$cantnc."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalafnc."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totaliva."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalnc."</td>";
            echo "</tr>";
             $totalafecto = $totalaffa + $totalafnc;
             $totalivafin = $totalivafa + $totaliva;
             $totalfinala = $totalfa + $totalnc;
             
            echo "<tr>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
                echo "<td>-------------</td>";
            echo "<tr>";                
                   echo "<td>TOTALES</td>";                
                   echo "<td></td>";
                   echo "<td></td>";
                   echo "<td>".$totalafecto."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalivafin."</td>";
                   echo "<td>".$otros."</td>";
                   echo "<td>".$totalfinala."</td>";                  
            echo "</tr>";
            echo '</table>';
        }

        public function exportarExcellibroGuias()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=LibroGuias.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 3;
            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
                          
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento = '.$tipo.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.tipo_documento' 
                
                );
            

              };
              
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE GUIAS</td>";
            echo "<td>DESPACHO</td>";
            echo "<tr>";
                echo "<td>NUMERO</td>";
                echo "<td>FECHA</td>";
                echo "<td>VENCIMIENTO</td>";
                echo "<td>RUT</td>";
                echo "<td>NOMBRE</td>";
                echo "<td>AFECTO</td>";
                echo "<td>DESCUENTO</td>";
                echo "<td>NETO</td>";
                echo "<td>IVA</td>";
                echo "<td>TOTAL</td>";
                echo "<tr>";
              
              foreach($users as $v){
                echo "<tr>";
                   echo "<td>".$v['num_factura']."</td>";
                   echo "<td>".$v['fecha_factura']."</td>";
                   echo "<td>".$v['fecha_venc']."</td>";
                   echo "<td>".$v['rut_cliente']."</td>";
                   echo "<td>".$v['nombre_cliente']."</td>";
                   echo "<td>".$v['sub_total']."</td>";
                   echo "<td>".$v['descuento']."</td>";
                   echo "<td>".$v['neto']."</td>";
                   echo "<td>".$v['iva']."</td>";
                   echo "<td>".$v['totalfactura']."</td>";
                echo "</tr>";
            }
            echo '</table>';
        }

        public function exportarexcelordencompra()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=ordencompra.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 1;
            $tipo2 = 2;
            $semi =" ";
                        

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
            if($opcion == "Rut"){

                $query = $this->db->query('SELECT ctz.*, pro.nombres as empresa, pro.rut as rut, pro.direccion as direccion, ciu.nombre as ciudad, com.nombre as comuna, gir.nombre as giro 
                FROM orden_compra ctz
                INNER JOIN clientes pro ON (ctz.id_proveedor = pro.id)
                INNER JOIN ciudad ciu ON (pro.id_ciudad = ciu.id)
                INNER JOIN comuna com ON (pro.id_comuna = com.id)
                INNER JOIN cod_activ_econ gir ON (pro.id_giro = gir.id)
                WHERE ctz.semicumplida="'.$semi.'" and pro.rut = '.$nombres.''    

                );

              }else if($opcion == "Nombre"){

                $sql_nombre = "";
                    $arrayNombre =  explode(" ",$nombres);

                    foreach ($arrayNombre as $nombre) {
                      $sql_nombre .= "and pro.nombres like '%".$nombre."%' ";
                    }

                $query = $this->db->query('SELECT ctz.*, pro.nombres as empresa, pro.rut as rut, pro.direccion as direccion, ciu.nombre as ciudad, com.nombre as comuna, gir.nombre as giro 
                FROM orden_compra ctz
                INNER JOIN clientes pro ON (ctz.id_proveedor = pro.id)
                INNER JOIN ciudad ciu ON (pro.id_ciudad = ciu.id)
                INNER JOIN comuna com ON (pro.id_comuna = com.id)
                INNER JOIN cod_activ_econ gir ON (pro.id_giro = gir.id)
                WHERE ctz.semicumplida="'.$semi.'" ' . $sql_nombre . '');

              }else if($opcion == "Todos"){

                $query = $this->db->query('SELECT ctz.*, pro.nombres as empresa, pro.rut as rut, pro.direccion as direccion, ciu.nombre as ciudad, com.nombre as comuna, gir.nombre as giro 
                FROM orden_compra ctz
                INNER JOIN clientes pro ON (ctz.id_proveedor = pro.id)
                INNER JOIN ciudad ciu ON (pro.id_ciudad = ciu.id)
                INNER JOIN comuna com ON (pro.id_comuna = com.id)
                INNER JOIN cod_activ_econ gir ON (pro.id_giro = gir.id)
                WHERE ctz.semicumplida="'.$semi.'"');

              }else{

                $query = $this->db->query('SELECT ctz.*, pro.nombres as empresa, pro.rut as rut, pro.direccion as direccion, ciu.nombre as ciudad, com.nombre as comuna, gir.nombre as giro 
                FROM orden_compra ctz
                INNER JOIN clientes pro ON (ctz.id_proveedor = pro.id)
                INNER JOIN ciudad ciu ON (pro.id_ciudad = ciu.id)
                INNER JOIN comuna com ON (pro.id_comuna = com.id)
                INNER JOIN cod_activ_econ gir ON (pro.id_giro = gir.id)
                WHERE ctz.semicumplida="'.$semi.'"');
              };

            };
            
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>ORDENES DE COMPRAS</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("id_proveedor", $columnas)):
                    echo "<td>ID PROVEEDOR</td>";
                endif;
                if (in_array("num_orden", $columnas)):
                     echo "<td>NUMERO</td>";
                endif;
                if (in_array("empresa", $columnas)):
                     echo "<td>NOMBRE</td>";
                endif;
                if (in_array("rut", $columnas)) :
                    echo "<td>RUT</td>";
                endif;
                if (in_array("direccion", $columnas)) :
                    echo "<td>DIRECCION</td>";
                endif;
                if (in_array("giro", $columnas)) :
                    echo "<td>GIRO</td>";
                endif;
                if (in_array("ciudad", $columnas)) :
                    echo "<td>CIUDAD</td>";
                endif;
                if (in_array("comuna", $columnas)) :
                    echo "<td>COMUNA</td>";
                endif;
                if (in_array("nombre_contacto", $columnas)) :
                    echo "<td>CONTACTO</td>";
                endif;
                 if (in_array("telefono_contacto", $columnas)) :
                    echo "<td>FONO</td>";
                endif;
                if (in_array("mail_contacto", $columnas)) :
                    echo "<td>MAIL</td>";
                endif;
                if (in_array("descuento", $columnas)) :
                    echo "<td>DESC.</td>";
                endif;
                if (in_array("pretotal", $columnas)) :
                    echo "<td>NETO</td>";
                endif;
                if (in_array("iva", $columnas)) :
                    echo "<td>IVA</td>";
                endif;
                if (in_array("total", $columnas)) :
                    echo "<td>TOTAL</td>";
                endif;
                if (in_array("fecha", $columnas)) :
                    echo "<td>FECHA</td>";
                endif;

                echo "<tr>";
              
              foreach($users as $v){

                 $iva = (($v['total']) - ($v['pretotal']));
                 echo "<tr>";
                  
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("id_proveedor", $columnas)) :
                      echo "<td>".$v['id_proveedor']."</td>";
                   endif;
                   if (in_array("num_orden", $columnas)) :
                      echo "<td>".$v['num_orden']."</td>";
                   endif;
                   if (in_array("empresa", $columnas)) :
                      echo "<td>".$v['empresa']."</td>";
                   endif;
                   if (in_array("rut", $columnas)) :
                      echo "<td>".$v['rut']."</td>";
                   endif;
                  if (in_array("direccion", $columnas)) :
                      echo "<td>".$v['direccion']."</td>";
                  endif;
                  if (in_array("giro", $columnas)) :
                      echo "<td>".$v['giro']."</td>";
                  endif;
                  if (in_array("ciudad", $columnas)) :
                      echo "<td>".$v['ciudad']."</td>";
                  endif;
                  if (in_array("comuna", $columnas)) :
                      echo "<td>".$v['comuna']."</td>";
                  endif;
                  if (in_array("nombre_contacto", $columnas)) :
                      echo "<td>".$v['nombre_contacto']."</td>";
                  endif;
                  if (in_array("telefono_contacto", $columnas)) :
                      echo "<td>".$v['telefono_contacto']."</td>";
                  endif;
                  if (in_array("mail_contacto", $columnas)) :
                      echo "<td>".$v['mail_contacto']."</td>";
                  endif;
                  if (in_array("descuento", $columnas)) :
                      echo "<td>".$v['descuento']."</td>";
                  endif;
                  if (in_array("pretotal", $columnas)) :
                      echo "<td>".$v['pretotal']."</td>";
                  endif;
                  if (in_array("iva", $columnas)) :
                      echo "<td>".$iva."</td>";
                  endif;
                  if (in_array("total", $columnas)) :
                      echo "<td>".$v['total']."</td>";
                  endif;
                  if (in_array("fecha", $columnas)) :
                      echo "<td>".$v['fecha']."</td>";
                  endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }

        public function exportarExcelNotacredito()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=productos.xls");
            
            $columnas = json_decode($this->input->get('cols'));
            $fecha = $this->input->get('fecha');
            $nombres = $this->input->get('nombre');
            $opcion = $this->input->get('opcion');
            list($dia, $mes, $anio) = explode("/",$fecha);
            $fecha3 = $anio ."-". $mes ."-". $dia;
            $fecha2 = $this->input->get('fecha2');
            list($dia, $mes, $anio) = explode("/",$fecha2);
            $fecha4 = $anio ."-". $mes ."-". $dia;
            $tipo = 11;
            $tipo2 = 2;
                        

            $data = array();
                                   
            $this->load->database();
            
            if($fecha){
            
            if($opcion == "Rut"){
    
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento = '.$tipo.' and c.rut = '.$nombres.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc'    

              );

                }else if($opcion == "Nombre"){

                  
                $sql_nombre = "";
                    $arrayNombre =  explode(" ",$nombres);

                    foreach ($arrayNombre as $nombre) {
                      $sql_nombre .= "and c.nombres like '%".$nombre."%' ";
                    }
                            
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento = '.$tipo.' ' . $sql_nombre . ' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'" 
                order by acc.id desc' 
                
                );
             
              }else if($opcion == "Todos"){

                
                $data = array();
                $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento = '.$tipo.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 
                
                );
            

              }else{

                
              $data = array();
              $query = $this->db->query('SELECT acc.*, c.nombres as nombre_cliente, c.rut as rut_cliente, v.nombre as nom_vendedor  FROM factura_clientes acc
                left join clientes c on (acc.id_cliente = c.id)
                left join vendedores v on (acc.id_vendedor = v.id)
                WHERE acc.tipo_documento = '.$tipo.' and acc.fecha_factura between "'.$fecha3.'"  AND "'.$fecha4.'"
                order by acc.id desc' 

                );


              }

            };            
             
            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LIBRO DE VENTAS</td>";
            echo "<td>NOTAS DE CREDITO</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("num_factura", $columnas)):
                    echo "<td>NUMERO</td>";
                endif;
                if (in_array("fecha_factura", $columnas)):
                     echo "<td>FECHA</td>";
                endif;
                if (in_array("fecha_venc", $columnas)):
                     echo "<td>VENCIMIENTO</td>";
                endif;
                if (in_array("rut_cliente", $columnas)) :
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nombre_cliente", $columnas)) :
                    echo "<td>NOMBRE</td>";
                endif;
                if (in_array("nom_vendedor", $columnas)) :
                    echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("sub_total", $columnas)) :
                    echo "<td>AFECTO</td>";
                endif;
                if (in_array("descuento", $columnas)) :
                    echo "<td>DESCUENTO</td>";
                endif;
                if (in_array("neto", $columnas)) :
                    echo "<td>NETO</td>";
                endif;
                 if (in_array("iva", $columnas)) :
                    echo "<td>IVA</td>";
                endif;
                if (in_array("totalfactura", $columnas)) :
                    echo "<td>TOTAL</td>";
                endif;

                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("num_factura", $columnas)) :
                      echo "<td>".$v['num_factura']."</td>";
                   endif;
                   if (in_array("fecha_factura", $columnas)) :
                      echo "<td>".$v['fecha_factura']."</td>";
                   endif;
                   if (in_array("fecha_venc", $columnas)) :
                      echo "<td>".$v['fecha_venc']."</td>";
                   endif;
                   if (in_array("rut_cliente", $columnas)) :
                      echo "<td>".$v['rut_cliente']."</td>";
                   endif;
                  if (in_array("nombre_cliente", $columnas)) :
                      echo "<td>".$v['nombre_cliente']."</td>";
                  endif;
                  if (in_array("nom_vendedor", $columnas)) :
                      echo "<td>".$v['nom_vendedor']."</td>";
                  endif;
                  if (in_array("sub_total", $columnas)) :
                      echo "<td>".$v['sub_total']."</td>";
                  endif;
                  if (in_array("descuento", $columnas)) :
                      echo "<td>".$v['descuento']."</td>";
                  endif;
                  if (in_array("neto", $columnas)) :
                      echo "<td>".$v['neto']."</td>";
                  endif;
                  if (in_array("iva", $columnas)) :
                      echo "<td>".$v['iva']."</td>";
                  endif;
                  if (in_array("totalfactura", $columnas)) :
                      echo "<td>".$v['totalfactura']."</td>";
                  endif;
                  //echo "<tr>";
            }
            echo '</table>';
        }

        public function exportarExcelExistencia()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=existencia.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();

            $query = $this->db->query('SELECT acc.*, c.nombre as nom_producto FROM existencia acc
            left join productos c on (acc.id_producto = c.id) order by acc.id desc ');

            $users = $query->result_array();
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>LISTADO DE EXSTENCIA PRODUCTOS</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("id_producto", $columnas)):
                    echo "<td>ID PRODUCTO</td>";
                endif;
                if (in_array("nom_producto", $columnas)):
                     echo "<td>NOMBRE</td>";
                endif;
                if (in_array("stock", $columnas)) :
                    echo "<td>STOCK</td>";
                endif;
                 if (in_array("fecha_ultimo_movimiento", $columnas)) :
                    echo "<td>FECHA</td>";
                endif;
                
                echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                    
                   if (in_array("id_producto", $columnas)) :
                      echo "<td>".$v['id_producto']."</td>";
                   endif;
                   if (in_array("nom_producto", $columnas)) :
                      echo "<td>".$v['nom_producto']."</td>";
                   endif;
                  
                  if (in_array("stock", $columnas)) :
                      echo "<td>".$v['stock']."</td>";
                  endif;
                  if (in_array("fecha_ultimo_movimiento", $columnas)) :
                      echo "<td>".$v['fecha_ultimo_movimiento']."</td>";
                  endif;
            }
            echo '</table>';
        }

        public function exportarExcelExistenciadetalle()
         {
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=detalleexistencia.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            $nombres = json_decode($this->input->get('idproducto'));
            
            $this->load->database();
            if($nombres){
                  $query = $this->db->query('SELECT acc.*, c.nombre as nom_producto, cor.nombre as nom_tipo_movimiento FROM existencia_detalle acc
                  left join productos c on (acc.id_producto = c.id)
                  left join correlativos cor on (acc.id_tipo_movimiento = cor.id)
                  WHERE acc.id_producto="'.$nombres.'"');
                }else{
                  $query = $this->db->query('SELECT acc.*, c.nombre as nom_producto, cor.nombre as nom_tipo_movimiento FROM existencia_detalle acc
                  left join productos c on (acc.id_producto = c.id)
                  left join correlativos cor on (acc.id_tipo_movimiento = cor.id) order by acc.id desc
                    limit '.$start.', '.$limit.' ' );
                }
            $users = $query->result_array();
            $row = $query->result();
            $row = $row[0];
            $nomproducto = $row->nom_producto;
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>DETALLE DE EXSTENCIA PRODUCTOS</td>";
            echo "<tr>";              
            echo "<td>NOMBRE PRODUCTO :</td>";
            echo "<td>".$nomproducto."</td>";
            echo "<tr>"; 
                 if (in_array("nom_producto", $columnas)):
                    echo "<td>NOMBRE</td>";
                  endif;   
                  if (in_array("nom_tipo_movimiento", $columnas)):
                    echo "<td>TIPO</td>";
                  endif;               
                    echo "<td>TIPO</td>";
                    echo "<td>NUMERO</td>";
                    echo "<td>ENTRADA</td>";
                    echo "<td>SALIDA</td>";
                    echo "<td>FECHA</td>";
            //echo "<tr>";              
              foreach($users as $v){
                 echo "<tr>";
                      if (in_array("nom_producto", $columnas)) :
                           echo "<td>".$v['nom_producto']."</td>";
                      endif;
                      if (in_array("nom_tipo_movimiento", $columnas)) :
                           echo "<td>".$v['nom_tipo_movimiento']."</td>";
                      endif;

                      echo "<td>".$v['nom_tipo_movimiento']."</td>";
                      echo "<td>".$v['num_movimiento']."</td>";
                      echo "<td>".$v['cantidad_entrada']."</td>";
                      echo "<td>".$v['cantidad_salida']."</td>";
                      echo "<td>".$v['fecha_movimiento']."</td>";
            }
            echo '</table>';
        }
        
        public function exportarExcelClientes(){

            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=cliente.xls"); 
            
            //filtro por nombre

            $nombre = $this->input->get('nombre');
            $tipo = $this->input->get('fTipo');
            $columnas = json_decode($this->input->get('cols'));
                      
            $this->load->database();
                 
            if($nombre){
               $query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
                ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
                left join ciudad c on (acc.id_ciudad = c.id)
                left join cod_activ_econ g on (acc.id_giro = g.id)
                left join comuna com on (acc.id_comuna = com.id)
                left join vendedores ven on (acc.id_vendedor = ven.id)
                left join cond_pago con on (acc.id_pago = con.id)
                WHERE acc.nombres like "%'.$nombres.'%"');

        
                }else if($tipo) {
              $query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
                ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
                left join ciudad c on (acc.id_ciudad = c.id)
                left join cod_activ_econ g on (acc.id_giro = g.id)
                left join comuna com on (acc.id_comuna = com.id)
                left join vendedores ven on (acc.id_vendedor = ven.id)
                left join cond_pago con on (acc.id_pago = con.id)
                WHERE estado ='.$tipo);
                } 
                else
                {
                $query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
                ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
                left join ciudad c on (acc.id_ciudad = c.id)
                left join cod_activ_econ g on (acc.id_giro = g.id)
                left join comuna com on (acc.id_comuna = com.id)
                left join vendedores ven on (acc.id_vendedor = ven.id)
                left join cond_pago con on (acc.id_pago = con.id)');
          }
            
                 
            $users = $query->result_array();
            $cant = 0;
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>NOMINA DE CLIENTES</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("rut", $columnas)):
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nombres", $columnas)):
                    echo "<td>RAZON SOCIAL</td>";
                endif;
                if (in_array("giro", $columnas)):
                    echo "<td>GIRO</td>";
                endif;
                if (in_array("direccion", $columnas)):
                    echo "<td> DIRECCION</td>";
                endif;
                if (in_array("ciudad", $columnas)):
                     echo "<td>CIUDAD</td>";
                endif;
                if (in_array("nombre_comuna", $columnas)):
                     echo "<td>COMUNA</td>";
                endif;
                if (in_array("nombre_ciudad", $columnas)):
                     echo "<td>CIUDAD</td>";
                endif;
                if (in_array("fono", $columnas)):
                     echo "<td>TELEFONO</td>";
                endif;
                if (in_array("e_mail", $columnas)):
                     echo "<td>E_MAIL</td>";
                endif;
                if (in_array("descuento", $columnas)):
                     echo "<td>DESCUENTO %</td>";
                endif;
                if (in_array("nombre_vendedor", $columnas)):
                     echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("nom_id_pago", $columnas)):
                     echo "<td>CONDICION DE PAGO</td>";
                endif;
                if (in_array("cupo_disponible", $columnas)):
                     echo "<td>CUPO DISPONIBLE</td>";
                endif;
                if (in_array("imp_adicional", $columnas)):
                     echo "<td>IMP. ADICIONAL</td>";
                endif;
            
                foreach($users as $v){
                 echo "<tr>";
                    if (in_array("id", $columnas)) :
                        echo "<td>".$v['id']."</td>";
                    endif;
                  
                    if (in_array("rut", $columnas)):
                        echo "<td>".$v['rut']."</td>";
                    endif;
                    if (in_array("nombres", $columnas)):
                        echo "<td>".$v['nombres']."</td>";
                    endif;
                    if (in_array("giro", $columnas)):
                        echo "<td>".$v['giro']."</td>";
                    endif;
                    if (in_array("direccion", $columnas)):
                        echo "<td>".$v['direccion']."</td>";
                    endif;
                    if (in_array("nombre_comuna", $columnas)):
                         echo "<td>".$v['nombre_comuna']."</td>";
                    endif;
                    if (in_array("nombre_ciudad", $columnas)):
                         echo "<td>".$v['nombre_ciudad']."</td>";
                    endif;
                    if (in_array("fono", $columnas)):
                         echo "<td>".$v['fono']."</td>";
                    endif;
                    if (in_array("e_mail", $columnas)):
                         echo "<td>".$v['e_mail']."</td>";
                    endif;
                    if (in_array("descuento", $columnas)):
                        echo "<td>".$v['descuento']."</td>";
                    endif;
                    if (in_array("nombre_vendedor", $columnas)):
                        echo "<td>".$v['nombre_vendedor']."</td>";
                    endif;
                    if (in_array("nom_id_pago", $columnas)):
                        echo "<td>".$v['nom_id_pago']."</td>";
                    endif;
                    if (in_array("cupo_disponible", $columnas)):
                        echo "<td>".$v['cupo_disponible']."</td>";
                    endif;
                    if (in_array("imp_adicional", $columnas)):
                        echo "<td>".$v['imp_adicional']."</td>";
                    endif;

                 }
                  echo "<tr>";
                  echo "<td> ></td>";
                  echo "<td> ></td>";
                  echo "<td> ></td>";
        
            echo '</table>';
        }

        public function exportarExcelProveedor(){

            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=proveedores.xls"); 
            
            //filtro por nombre

            $nombre = $this->input->get('nombre');
            $tipo = $this->input->get('fTipo');
            $columnas = json_decode($this->input->get('cols'));
                      
            $this->load->database();
                 
            if($nombre){
               $query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
                ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
                left join ciudad c on (acc.id_ciudad = c.id)
                left join cod_activ_econ g on (acc.id_giro = g.id)
                left join comuna com on (acc.id_comuna = com.id)
                left join vendedores ven on (acc.id_vendedor = ven.id)
                left join cond_pago con on (acc.id_pago = con.id)
                WHERE acc.nombres like "%'.$nombres.'%"');

        
                }else if($tipo) {
              $query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
                ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
                left join ciudad c on (acc.id_ciudad = c.id)
                left join cod_activ_econ g on (acc.id_giro = g.id)
                left join comuna com on (acc.id_comuna = com.id)
                left join vendedores ven on (acc.id_vendedor = ven.id)
                left join cond_pago con on (acc.id_pago = con.id)
                WHERE estado ='.$tipo);
                } 
                else
                {
                $query = $this->db->query('SELECT acc.*, c.nombre as nombre_ciudad, com.nombre as nombre_comuna,
                ven.nombre as nombre_vendedor, g.nombre as giro, con.nombre as nom_id_pago FROM clientes acc
                left join ciudad c on (acc.id_ciudad = c.id)
                left join cod_activ_econ g on (acc.id_giro = g.id)
                left join comuna com on (acc.id_comuna = com.id)
                left join vendedores ven on (acc.id_vendedor = ven.id)
                left join cond_pago con on (acc.id_pago = con.id)');
          }
            
                 
            $users = $query->result_array();
            $cant = 0;
            
            echo '<table>';
            echo "<td></td>";
            echo "<td>NOMINA DE PROVEEDORES</td>";
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                if (in_array("rut", $columnas)):
                    echo "<td>RUT</td>";
                endif;
                if (in_array("nombres", $columnas)):
                    echo "<td>RAZON SOCIAL</td>";
                endif;
                if (in_array("giro", $columnas)):
                    echo "<td>GIRO</td>";
                endif;
                if (in_array("direccion", $columnas)):
                    echo "<td> DIRECCION</td>";
                endif;
                if (in_array("ciudad", $columnas)):
                     echo "<td>CIUDAD</td>";
                endif;
                if (in_array("nombre_comuna", $columnas)):
                     echo "<td>COMUNA</td>";
                endif;
                if (in_array("nombre_ciudad", $columnas)):
                     echo "<td>CIUDAD</td>";
                endif;
                if (in_array("fono", $columnas)):
                     echo "<td>TELEFONO</td>";
                endif;
                if (in_array("e_mail", $columnas)):
                     echo "<td>E_MAIL</td>";
                endif;
                if (in_array("descuento", $columnas)):
                     echo "<td>DESCUENTO %</td>";
                endif;
                if (in_array("nombre_vendedor", $columnas)):
                     echo "<td>VENDEDOR</td>";
                endif;
                if (in_array("nom_id_pago", $columnas)):
                     echo "<td>CONDICION DE PAGO</td>";
                endif;
                if (in_array("cupo_disponible", $columnas)):
                     echo "<td>CUPO DISPONIBLE</td>";
                endif;
                if (in_array("imp_adicional", $columnas)):
                     echo "<td>IMP. ADICIONAL</td>";
                endif;
            
                foreach($users as $v){
                 echo "<tr>";
                    if (in_array("id", $columnas)) :
                        echo "<td>".$v['id']."</td>";
                    endif;
                  
                    if (in_array("rut", $columnas)):
                        echo "<td>".$v['rut']."</td>";
                    endif;
                    if (in_array("nombres", $columnas)):
                        echo "<td>".$v['nombres']."</td>";
                    endif;
                    if (in_array("giro", $columnas)):
                        echo "<td>".$v['giro']."</td>";
                    endif;
                    if (in_array("direccion", $columnas)):
                        echo "<td>".$v['direccion']."</td>";
                    endif;
                    if (in_array("nombre_comuna", $columnas)):
                         echo "<td>".$v['nombre_comuna']."</td>";
                    endif;
                    if (in_array("nombre_ciudad", $columnas)):
                         echo "<td>".$v['nombre_ciudad']."</td>";
                    endif;
                    if (in_array("fono", $columnas)):
                         echo "<td>".$v['fono']."</td>";
                    endif;
                    if (in_array("e_mail", $columnas)):
                         echo "<td>".$v['e_mail']."</td>";
                    endif;
                    if (in_array("descuento", $columnas)):
                        echo "<td>".$v['descuento']."</td>";
                    endif;
                    if (in_array("nombre_vendedor", $columnas)):
                        echo "<td>".$v['nombre_vendedor']."</td>";
                    endif;
                    if (in_array("nom_id_pago", $columnas)):
                        echo "<td>".$v['nom_id_pago']."</td>";
                    endif;
                    if (in_array("cupo_disponible", $columnas)):
                        echo "<td>".$v['cupo_disponible']."</td>";
                    endif;
                    if (in_array("imp_adicional", $columnas)):
                        echo "<td>".$v['imp_adicional']."</td>";
                    endif;

                 }
                  echo "<tr>";
                  echo "<td> ></td>";
                  echo "<td> ></td>";
                  echo "<td> ></td>";
        
            echo '</table>';
        }
        

        public function exportarExcelCiudades(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=usuarios.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();
            
            $query = $this->db->query("select cl.id, cl.nombre from ciudades cl");
            $users = $query->result_array();
            
            echo '<table>';
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                
                if (in_array("nombre", $columnas)):
                     echo "<td>NOMBRE</td>";
                endif;
                
              echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                   if (in_array("nombre", $columnas)) :
                      echo "<td>".$v['nombre']."</td>";
                   endif;
                 }
            echo '</table>';
        }

        public function exportarExcelTipodocumento(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=Tipodocumentos.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();
            
            $query = $this->db->query("select cl.id, cl.nombre from tipo_documento_compras cl");
            $users = $query->result_array();
            
            echo '<table>';
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                
                if (in_array("nombre", $columnas)):
                     echo "<td>NOMBRE</td>";
                endif;
                
              echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                   if (in_array("nombre", $columnas)) :
                      echo "<td>".$v['nombre']."</td>";
                   endif;
                 }
            echo '</table>';
        }

        public function exportarExcelCodactivecon(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=codactivecon.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            
            $this->load->database();
            
            $query = $this->db->query("select cl.id, cl.nombre, cl.codigo from cod_activ_econ cl");
            $users = $query->result_array();
            
            echo '<table>';
            echo "<tr>";
                if (in_array("id", $columnas)):
                     echo "<td>ID</td>";
                endif;
                
                if (in_array("nombre", $columnas)):
                     echo "<td>NOMBRE</td>";
                endif;

                 if (in_array("codigo", $columnas)):
                     echo "<td>CODIGO</td>";
                endif;
                
              echo "<tr>";
              
              foreach($users as $v){
                 echo "<tr>";
                   if (in_array("id", $columnas)) :
                      echo "<td>".$v['id']."</td>";
                   endif;
                   if (in_array("nombre", $columnas)) :
                      echo "<td>".$v['nombre']."</td>";
                   endif;
                   if (in_array("codigo", $columnas)) :
                      echo "<td>".$v['codigo']."</td>";
                   endif;
                 }
            echo '</table>';
        }
        

        public function exportarExcelResMov(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=ResumenMovimientos.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            $fecdesde = $this->input->get('fecdesde');
            $fechasta = $this->input->get('fechasta');

            $fecdesde = substr($fecdesde,6,4)."-".substr($fecdesde,3,2)."-".substr($fecdesde,0,2);
            $fechasta = substr($fechasta,6,4)."-".substr($fechasta,3,2)."-".substr($fechasta,0,2);
            $this->load->database();
            
            $query = $this->db->query("SELECT cuentacontable, sum(cancelaciones) as cancelaciones, sum(depositos) as depositos, sum(otrosingresos) as otrosingresos, sum(cargos) as cargos, sum(abonos) as abonos from
                          (select cc.id, cc.nombre as cuentacontable, if(mcc.proceso='CANCELACION',if(debe=0,haber,debe),0) as cancelaciones, if(mcc.proceso='DEPOSITO',if(debe=0,haber,debe),0) as depositos, if(mcc.proceso='OTRO',if(debe=0,haber,debe),0) as otrosingresos, haber as cargos, debe as abonos from detalle_mov_cuenta_corriente dm 
                          inner join cuenta_contable cc on dm.idctacte = cc.id 
                          inner join movimiento_cuenta_corriente mcc on dm.idmovimiento = mcc.id
                          where left(mcc.fecha,10) between '$fecdesde' and '$fechasta') as tmp
                          group by id");

            $datas = $query->result_array();
            
            echo '<table>';
            echo "<tr>";
                if (in_array("cuentacontable", $columnas)):
                     echo "<td>CUENTA CONTABLE</td>";
                endif;

                
                if (in_array("cancelaciones", $columnas)):
                     echo "<td>CANCELACIONES</td>";
                endif;
                
                if (in_array("depositos", $columnas)):
                     echo "<td>DEPOSITOS</td>";
                endif;
                
                if (in_array("otrosingresos", $columnas)):
                     echo "<td>OTROS INGRESOS</td>";
                endif;

                if (in_array("cargos", $columnas)):
                     echo "<td>CARGOS</td>";
                endif;
                
                if (in_array("abonos", $columnas)):
                     echo "<td>ABONOS</td>";
                endif;

              echo "</tr>";
              
              foreach($datas as $data){
                 echo "<tr>";
                   if (in_array("cuentacontable", $columnas)) :
                      echo "<td>".$data['cuentacontable']."</td>";
                   endif;
                   if (in_array("cancelaciones", $columnas)) :
                      echo "<td>".$data['cancelaciones']."</td>";
                   endif;
                   if (in_array("depositos", $columnas)) :
                      echo "<td>".$data['depositos']."</td>";
                   endif;
                   if (in_array("otrosingresos", $columnas)) :
                      echo "<td>".$data['otrosingresos']."</td>";
                   endif;
                   if (in_array("cargos", $columnas)) :
                      echo "<td>".$data['cargos']."</td>";
                   endif;                   
                   if (in_array("abonos", $columnas)) :
                      echo "<td>".$data['abonos']."</td>";
                   endif;                                      
                  echo "</tr>";
                 }
            echo '</table>';
        }




        public function exportarExcelLibroDiario(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=LibroDiario.xls"); 
            
            $columnas = json_decode($this->input->get('cols'));
            $comprobante = $this->input->get('comprobante');
            $fecdesde = $this->input->get('fecdesde');
            $fechasta = $this->input->get('fechasta');

            $fecdesde = substr($fecdesde,6,4)."-".substr($fecdesde,3,2)."-".substr($fecdesde,0,2);
            $fechasta = substr($fechasta,6,4)."-".substr($fechasta,3,2)."-".substr($fechasta,0,2);    
            
            $sql_comprobantes = $comprobante == 'TODOS' ? "" : "and m.proceso = '" . $comprobante . "'";        


            $this->load->database();
            
            $query = $this->db->query("select if(m.proceso = 'OTRO','OTROS INGRESOS',m.proceso) as tipocomprobante, m.numcomprobante as nrocomprobante, left(m.fecha,10) as fecha, cc.nombre as cuentacontable, '' as rut, concat(t.descripcion,' ',dm.numdocumento) as documento, DATE_FORMAT(dm.fecvencimiento,'%d/%m/%Y') as fechavencimiento, haber as cargos, debe as abonos from movimiento_cuenta_corriente m
                  inner join detalle_mov_cuenta_corriente dm on m.id = dm.idmovimiento 
                  inner join cuenta_contable cc on dm.idctacte = cc.id 
                  left join tipo_documento t on dm.tipodocumento = t.id
                  where left(m.fecha,10) between '" . $fecdesde . "' and '" . $fechasta . "' " . $sql_comprobantes 
                  . " order by m.proceso, m.numcomprobante, m.fecha asc, dm.tipo");

            $datas = $query->result_array();

            echo '<table>';
            echo "<tr>";
                if (in_array("tipocomprobante", $columnas)):
                     echo "<td>TIPO COMPROBANTE</td>";
                endif;

                if (in_array("nrocomprobante", $columnas)):
                     echo "<td>NRO COMPROBANTE</td>";
                endif;

                if (in_array("fecha", $columnas)):
                     echo "<td>FECHA</td>";
                endif;

                if (in_array("cuentacontable", $columnas)):
                     echo "<td>CUENTA CONTABLE</td>";
                endif;

                
                if (in_array("rut", $columnas)):
                     echo "<td>RUT</td>";
                endif;
                
                if (in_array("documento", $columnas)):
                     echo "<td>DOCUMENTO</td>";
                endif;
                
                if (in_array("fechavencimiento", $columnas)):
                     echo "<td>FECHA VENCIMIENTO</td>";
                endif;

                if (in_array("cargos", $columnas)):
                     echo "<td>CARGOS</td>";
                endif;
                
                if (in_array("abonos", $columnas)):
                     echo "<td>ABONOS</td>";
                endif;

              echo "</tr>";
              
              foreach($datas as $data){
                 echo "<tr>";
                   if (in_array("tipocomprobante", $columnas)) :
                      echo "<td>".$data['tipocomprobante']."</td>";
                   endif; 
                    if (in_array("nrocomprobante", $columnas)) :
                      echo "<td>".$data['nrocomprobante']."</td>";
                   endif;                                    
                   if (in_array("fecha", $columnas)) :
                      echo "<td>".$data['fecha']."</td>";
                   endif;                 
                   if (in_array("cuentacontable", $columnas)) :
                      echo "<td>".$data['cuentacontable']."</td>";
                   endif;
                   if (in_array("rut", $columnas)) :
                      echo "<td>".$data['rut']."</td>";
                   endif;
                   if (in_array("documento", $columnas)) :
                      echo "<td>".$data['documento']."</td>";
                   endif;
                   if (in_array("fechavencimiento", $columnas)) :
                      echo "<td>".$data['fechavencimiento']."</td>";
                   endif;
                   if (in_array("cargos", $columnas)) :
                      echo "<td>".$data['cargos']."</td>";
                   endif;                   
                   if (in_array("abonos", $columnas)) :
                      echo "<td>".$data['abonos']."</td>";
                   endif;                                      
                  echo "</tr>";
                 }
            echo '</table>';
        }


         public function exportarExcelSaldoDocumentos(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=SaldoDocumentos.xls"); 
            


            $columnas = json_decode($this->input->get('cols'));

            $rutcliente = $this->input->get('rutcliente');
            $nombrecliente = $this->input->get('nombrecliente');
            $cuentacontable = $this->input->get('cuentacontable');

            $sql_filtro = '';
            if($rutcliente != '' && $rutcliente != 'null'){
              $sql_filtro .= "and c.rut = '" . $rutcliente . "'";

            }

            if($nombrecliente != '' && $nombrecliente != 'null'){
              $sql_filtro .= "and c.nombres like '%" . $nombrecliente . "%'";

            }if($cuentacontable != '' && $cuentacontable != 'null'){

              $sql_filtro .= "and cco.id = '" . $cuentacontable . "'";
            }


            $this->load->database();

            $query = $this->db->query("SELECT cco.nombre as cuentacontable, dcc.numdocumento as documento, dcc.fecha, dcc.fechavencimiento, 
                  if(datediff(curdate(),dcc.fechavencimiento)<=0,dcc.saldo,0) as saldoporvencer,
                  if(datediff(curdate(),dcc.fechavencimiento)>0,dcc.saldo,0)  as saldovencido,
                  if(datediff(curdate(),dcc.fechavencimiento)>0,datediff(curdate(),dcc.fechavencimiento),0) as dias,
                  dcc.saldo as saldodocto,
                  c.rut,
                  c.nombres as cliente
                  FROM cuenta_corriente cc
                  inner join detalle_cuenta_corriente dcc on dcc.idctacte = cc.id
                  inner join clientes c on cc.idcliente = c.id
                  inner join cuenta_contable cco on cc.idcuentacontable = cco.id
                  where dcc.saldo > 0 " . $sql_filtro . " and dcc.tipodocumento not in (11,102)
                  order by cco.id, c.id, dcc.id");

            $datas = $query->result_array();

            echo '<table>';
            echo "<tr>";
                if (in_array("cuentacontable", $columnas)):
                     echo "<td>CUENTA CONTABLE</td>";
                endif;

                if (in_array("documento", $columnas)):
                     echo "<td>DOCUMENTO</td>";
                endif;


                if (in_array("rut", $columnas)):
                     echo "<td>RUT</td>";
                endif;

                if (in_array("cliente", $columnas)):
                     echo "<td>CLIENTE</td>";
                endif;

                if (in_array("fecha", $columnas)):
                     echo "<td>FECHA</td>";
                endif;

                if (in_array("fechavencimiento", $columnas)):
                     echo "<td>FECHA VENCIMIENTO</td>";
                endif;

                
                if (in_array("saldoporvencer", $columnas)):
                     echo "<td>SALDO POR VENCER</td>";
                endif;
                
                if (in_array("saldovencido", $columnas)):
                     echo "<td>SALDO VENCIDO</td>";
                endif;
                
                if (in_array("dias", $columnas)):
                     echo "<td>DIAS DE MOROSIDAD</td>";
                endif;

                if (in_array("saldodocto", $columnas)):
                     echo "<td>SALDO DOCUMENTO</td>";
                endif;

              echo "</tr>";
              
              foreach($datas as $data){
                 echo "<tr>";
                   if (in_array("cuentacontable", $columnas)) :
                      echo "<td>".$data['cuentacontable']."</td>";
                   endif; 
                    if (in_array("documento", $columnas)) :
                      echo "<td>".$data['documento']."</td>";
                   endif;         
                    if (in_array("rut", $columnas)) :
                      echo "<td>".$data['rut']."</td>";
                   endif; 
                    if (in_array("cliente", $columnas)) :
                      echo "<td>".$data['cliente']."</td>";
                   endif; 
                   if (in_array("fecha", $columnas)) :
                      echo "<td>".$data['fecha']."</td>";
                   endif;                 
                   if (in_array("fechavencimiento", $columnas)) :
                      echo "<td>".$data['fechavencimiento']."</td>";
                   endif;
                   if (in_array("saldoporvencer", $columnas)) :
                      echo "<td>".$data['saldoporvencer']."</td>";
                   endif;
                   if (in_array("saldovencido", $columnas)) :
                      echo "<td>".$data['saldovencido']."</td>";
                   endif;
                   if (in_array("dias", $columnas)) :
                      echo "<td>".$data['dias']."</td>";
                   endif;
                   if (in_array("saldodocto", $columnas)) :
                      echo "<td>".$data['saldodocto']."</td>";
                   endif;                   
                                   
                  echo "</tr>";
                 }
            echo '</table>';
        }



         public function exportarExcelCartola(){
            
            header("Content-type: application/vnd.ms-excel"); 
            header("Content-disposition: attachment; filename=Cartola.xls"); 
            



            $idctacte = $this->input->get('idctacte');
            $sqlCuentaCorriente = $idctacte != '' && $idctacte != 0 ? " where c.idctacte = '" . $idctacte . "'": "";

            $this->load->database();

            $query = $this->db->query("select concat(tc.descripcion,' ',c.numdocumento) as origen, concat(tc2.descripcion,' ',c.numdocumento_asoc) as referencia, if(dm.debe is not null,dm.debe,if((c.origen='VENTA' and c.tipodocumento in (1,2,19,101,103,16,104)) or (c.origen = 'CTACTE' and c.tipodocumento not in (1,2,19,101,103,16,104)),c.valor,0)) as debe, if(dm.haber is not null,dm.haber,if((c.origen='CTACTE' and c.tipodocumento in (1,2,19,101,103,16,104)) or (c.origen = 'VENTA' and c.tipodocumento not in (1,2,19,101,103,16,104)),c.valor,0)) as haber, c.glosa, DATE_FORMAT(c.fecvencimiento,'%d/%m/%Y') as fecvencimiento, DATE_FORMAT(c.fecha,'%d/%m/%Y') as fecha, concat(m.tipo,' ',m.numcomprobante) as comprobante, m.id as idcomprobante
                          from cartola_cuenta_corriente c 
                          inner join tipo_documento tc on c.tipodocumento = tc.id
                          left join tipo_documento tc2 on c.tipodocumento_asoc = tc2.id
                          left join movimiento_cuenta_corriente m on c.idmovimiento = m.id
                          left join detalle_mov_cuenta_corriente dm on c.idmovimiento = dm.idmovimiento and c.idcuenta = dm.idcuenta and c.tipodocumento = dm.tipodocumento and c.numdocumento = dm.numdocumento
                          ". $sqlCuentaCorriente . " order by c.tipodocumento, c.numdocumento, c.created_at");            


            $datas = $query->result_array();

            echo '<table>
                  <tr>
                    <td>Origen</td>
                    <td>Referencia</td>
                    <td>Comprobante</td>
                    <td>Glosa</td>
                    <td>Fecha Vencimiento</td>
                    <td>Fecha</td>
                    <td>Debe</td>
                    <td>Haber</td>                    
                    </tr>
                ';

              $total_debe = 0;
              $total_haber = 0;
              
              foreach($datas as $data){
                 echo "<tr>
                        <td>".$data['origen']."</td>
                        <td>".$data['referencia']."</td>
                        <td>".$data['comprobante']."</td>
                        <td>".$data['glosa']."</td>
                        <td>".$data['fecvencimiento']."</td>
                        <td>".$data['fecha']."</td>
                        <td>".$data['debe']."</td>
                        <td>".$data['haber']."</td>                        
                      </tr>";
                      $total_debe += $data['debe'];
                      $total_haber += $data['haber'];
                 }

                 echo "<tr>
                        <td colspan='2'>TOTALES</td>
                        <td colspan='4'>&nbsp;</td>
                        <td>".$total_debe."</td>
                        <td>".$total_haber."</td>
                      </tr>";


            echo '</table>';
        }



       
      }
 
?>
