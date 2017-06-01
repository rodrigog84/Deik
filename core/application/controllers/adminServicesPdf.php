<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class AdminServicesPdf extends CI_Controller {



  public function __construct()
  {
    parent::__construct();
    $this->load->helper('format');
    $this->load->database();
  }

  public function reporte_mensual_ventas($mes,$anno){


    #$mes = $this->input->post('mes');
    #$anno = $this->input->post('anno');

    $this->load->model('reporte');
    $neto_productos = $this->reporte->mensual_ventas($mes,$anno);
 
    $this->load->model('facturaelectronica');
    $empresa = $this->facturaelectronica->get_empresa();

    $logo =  PATH_FILES."facturacion_electronica/images/".$empresa->logo; 
    $fecha = date('d/m/Y');

      $html = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Untitled Document</title>
    <style type="text/css">
    td {
      font-size: 16px;
    }
    p {
    }
    </style>
    </head>

    <body>
    <table width="987px" height="602" border="0">
      <tr>
      <td width="197px"><img src="' . $logo . '" width="150" height="136" /></td>
        <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top" >
        <p>' . $empresa->razon_social .'</p>
        <p>RUT:' . number_format($empresa->rut,0,".",".").'-' . $empresa->dv . '</p>
        <p>' . $empresa->dir_origen . ' - ' . $empresa->comuna_origen . ' - Chile</p>
        <p>Fonos: ' . $empresa->fono . '</p>
        <p>&nbsp;</p>
        </td>
        <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top" >
              <p>&nbsp;</p>
              <!--p>&nbsp;</p-->
              <p>FECHA EMISION : '.$fecha.'</p>
              <!--p>&nbsp;</p-->             
      </td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr>
      <td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>Detalle Resumen de Ventas Mensuales - ' . month2string((int)$mes)." de " . $anno . '</h2></td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>      
      <tr>
        <td colspan="3" width="987px" >
      </td>
      </tr>
      <tr>
        <td colspan="3" >
          <table width="987px" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="300px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" ><b>Conceptos</b></td>
            <td width="50px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" >-</td>
            <td width="87px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>Facturaci&oacute;n</b></td>
             <td width="50px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>-</b></td>
            <td width="87px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>Boletas</b></td>
            <td width="50px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>-</b></td>
            <td width="87px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>N/D&eacute;bito</b></td>
            <td width="50px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>-</b></td>
            <td width="87px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>N/Cr&eacute;dito</b></td>
            <td width="139px"   style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Totales</b></td>
          </tr>';
    //$descripciones = '';
   // $i = 0;
    foreach ($neto_productos as $producto) {

      if($producto->concepto == '<b>Totales</b>'){
      
        $html .= '<tr>
        <td style="text-align:left">'.$producto->concepto.'&nbsp;&nbsp;</td>      
        <td style="text-align:right"><b>(' . str_pad($producto->Facturacion_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>   
        <td style="text-align:right"><b>'.number_format($producto->Facturacion,0,".",".").'</b></td>      
        <td style="text-align:right"><b>(' . str_pad($producto->Boletas_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>
        <td style="text-align:right"><b>'.number_format($producto->Boletas, 0, '.', '.').'</b></td>
        <td style="text-align:right"><b>(' . str_pad($producto->NDebito_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>
        <td style="text-align:right"><b>'.number_format($producto->NDebito, 0, '.', '.').'</b></td>
        <td style="text-align:right"><b>(' . str_pad($producto->NCredito_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>
        <td style="text-align:right"><b>'.number_format($producto->NCredito, 0, '.', '.').'</b></td>      
        <td style="text-align:right"><b>'.number_format($producto->totales, 0, '.', '.').'</b></td>        
        </tr>';
        

      }else{

        $html .= '<tr>
        <td style="text-align:left">'.$producto->concepto.'&nbsp;&nbsp;</td>      
        <td style="text-align:right"><b>(' . str_pad($producto->Facturacion_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>   
        <td style="text-align:right">' .number_format($producto->Facturacion,0,".",".").'</td>      
        <td style="text-align:right"><b>(' . str_pad($producto->Boletas_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>
        <td style="text-align:right">'.number_format($producto->Boletas, 0, '.', '.').'</td>
        <td style="text-align:right"><b>(' . str_pad($producto->NDebito_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>
        <td style="text-align:right">'.number_format($producto->NDebito, 0, '.', '.').'</td>
        <td style="text-align:right"><b>(' . str_pad($producto->NCredito_doctos,5," ",STR_PAD_LEFT).')&nbsp;&nbsp;</b></td>
        <td style="text-align:right">'.number_format($producto->NCredito, 0, '.', '.').'</td>
        <td style="text-align:right">'.number_format($producto->totales, 0, '.', '.').'</td>
        </tr>';
        

      }

      //}
      //$i++;
    }

    $html .= '</table></td></tr></table></body></html>';
      //==============================================================
      //==============================================================
      //==============================================================
      #echo $html; exit;
      //include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");

      $this->load->library("mpdf");

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





public function reporte_stock($familia,$subfamilia,$agrupacion,$marca){

    ini_set('memory_limit','512M');

    #$mes = $this->input->post('mes');
    #$anno = $this->input->post('anno');

    $familia = $familia == 0 ? '' : $familia;
    $subfamilia = $subfamilia == 0 ? '' : $subfamilia;
    $agrupacion = $agrupacion == 0 ? '' : $agrupacion;
    $marca = $marca == 0 ? '' : $marca;

    $this->load->model('reporte');
    $datos_stock = $this->reporte->reporte_stock(null,null,$familia,$subfamilia,$agrupacion,$marca);
 
    $this->load->model('facturaelectronica');
    $empresa = $this->facturaelectronica->get_empresa();

    $logo =  PATH_FILES."facturacion_electronica/images/".$empresa->logo; 
    $fecha = date('d/m/Y');

      $encabezado_pdf = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Untitled Document</title>
    <style type="text/css">
    td {
      font-size: 16px;
    }
    p {
    }
    </style>
    </head>

    <body>
    <table width="987px" height="602" border="0">
      <tr>
      <td width="197px"><img src="' . $logo . '" width="150" height="136" /></td>
        <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top" >
        <p>' . $empresa->razon_social .'</p>
        <p>RUT:' . number_format($empresa->rut,0,".",".").'-' . $empresa->dv . '</p>
        <p>' . $empresa->dir_origen . ' - ' . $empresa->comuna_origen . ' - Chile</p>
        <p>Fonos: ' . $empresa->fono . '</p>
        <p>&nbsp;</p>
        </td>
        <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top" >
              <p>&nbsp;</p>
              <!--p>&nbsp;</p-->
              <p>FECHA EMISION : '.$fecha.'</p>
              <!--p>&nbsp;</p-->             
      </td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr>
      <td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>Reporte Stock</h2></td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>      
      <tr>
        <td colspan="3" width="987px" >
      </td>
      </tr>';

      $formato_tabla_detalle = '
      <tr>
        <td colspan="3" >
          <table width="987px" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="300px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:left;" ><b>#</b></td>
            <td width="137px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>C&oacute;digo</b></td>
            <td width="137px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Descripci&oacute;n</b></td>
            <td width="137px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Fec. &Uacute;ltima Compra</b></td>
            <td width="137px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>¨Precio Costo</b></td>
            <td width="139px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Precio Venta</b></td>
            <td width="139px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Stock 1</b></td>
            <td width="139px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Stock 2</b></td>
            <td width="139px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Stock 3</b></td>
            <td width="139px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Stock 4</b></td>
          </tr>';

          $fin_pagina = '</table></td></tr></table></body></html>';


      //==============================================================
      //==============================================================
      //==============================================================
      //include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");

      $this->load->library("mpdf");

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


    $cantidad_hoja = 50;
      $fila = 1;
      $this->mpdf->SetHeader('Manzor - Informe Stock');
      $this->mpdf->setFooter('{PAGENO}');         
      foreach ($datos_stock['data'] as $stock) {
        if($fila == 1){
          $this->mpdf->WriteHTML($header);    
          //echo $header.$header2.$body_header;
        }

        $detail_row = '<tr>
        <td style="text-align:left">'.$stock->num.'</td>      
        <td style="text-align:left">'.$stock->codigo.'</td> 
        <td style="text-align:left">'.$stock->descripcion.'</td> 
        <td style="text-align:left">'.$stock->fecha_ult_compra.'</td> 
        <td align="right">'.number_format($stock->p_costo, 0, '.', ',').'</td>
        <td align="right">'.number_format($stock->p_venta, 0, '.', ',').'</td>
        <td style="text-align:left">'.$stock->stock1.'</td> 
        <td style="text-align:left">'.$stock->stock2.'</td> 
        <td style="text-align:left">'.$stock->stock3.'</td> 
        <td style="text-align:left">'.$stock->stock4.'</td> 
        </tr>';


        $this->mpdf->WriteHTML($detail_row);
        //echo $detail;

        if(($fila % $cantidad_hoja) == 0 ){  #LLEVA 30 LINEAS EN LA HOJA
            $this->mpdf->WriteHTML($fin_pagina);         
          //echo $fin_tabla;
            $fila = 0;            
            $this->mpdf->AddPage();
        }   
        //echo $fila."<br>";
        $fila++;
        //$pag++;
      }
      $this->mpdf->WriteHTML($fin_pagina);
      //echo $body_totales.$footer.$fin_tabla; exit;
     // $this->mpdf->WriteHTML($body_totales.$footer.$fin_tabla);
      //echo $html; exit;
      //exit;
      //$this->mpdf->AddPage();
      //$this->mpdf->WriteHTML($html2);
      $this->mpdf->Output("InformeStock.pdf", "I");      
      exit;
         }





public function reporte_detalle_productos_stock($idproducto,$mes,$anno){

    ini_set('memory_limit','512M');

    #$mes = $this->input->post('mes');
    #$anno = $this->input->post('anno');

    $idproducto = $idproducto == 0 ? '' : $idproducto;
    $mes = $mes == 0 ? '' : $mes;
    $anno = $anno == 0 ? '' : $anno;

    $this->load->model('reporte');
    $detalle_productos_stock = $this->reporte->reporte_detalle_productos_stock(null,null,$mes,$anno,$idproducto);

    $producto = $this->reporte->get_producto($idproducto);
 
    $this->load->model('facturaelectronica');
    $empresa = $this->facturaelectronica->get_empresa();

    $logo =  PATH_FILES."facturacion_electronica/images/".$empresa->logo; 
    $fecha = date('d/m/Y');

      $encabezado_pdf = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Untitled Document</title>
    <style type="text/css">
    td {
      font-size: 16px;
    }
    p {
    }
    </style>
    </head>

    <body>
    <table width="987px" height="602" border="0">
      <tr>
      <td width="197px"><img src="' . $logo . '" width="150" height="136" /></td>
        <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top" >
        <p>' . $empresa->razon_social .'</p>
        <p>RUT:' . number_format($empresa->rut,0,".",".").'-' . $empresa->dv . '</p>
        <p>' . $empresa->dir_origen . ' - ' . $empresa->comuna_origen . ' - Chile</p>
        <p>Fonos: ' . $empresa->fono . '</p>
        <p>&nbsp;</p>
        </td>
        <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top" >
              <p>&nbsp;</p>
              <!--p>&nbsp;</p-->
              <p>FECHA EMISION : '.$fecha.'</p>
              <!--p>&nbsp;</p-->             
      </td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr>
      <td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>Reporte Detalle Stock - ' . $producto->nombre . '</h2></td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>      
      <tr>
        <td colspan="3" width="987px" >
      </td>
      </tr>';

      $formato_tabla_detalle = '
      <tr>
        <td colspan="3" >
          <table width="987px" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="50px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>#</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>Tipo Documento</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>Num. Documento</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center" ><b>Fec. Documento</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right" ><b>Precio Costo</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Cantidad Entradas</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Cantidad Salidas</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Stock</b></td>
            <td width="237px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Detalle</b></td>
          </tr>';

          $fin_pagina = '</table></td></tr></table></body></html>';


      //==============================================================
      //==============================================================
      //==============================================================
      //include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");

      $this->load->library("mpdf");

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


    $cantidad_hoja = 50;
      $fila = 1;
      $num_final = 1;
      $this->mpdf->SetHeader('Manzor - Informe Detalle Producto Stock');
      $this->mpdf->setFooter('{PAGENO}');         
      foreach ($detalle_productos_stock['data'] as $detalle_producto) {
        if($fila == 1){
          $this->mpdf->WriteHTML($encabezado_pdf.$formato_tabla_detalle);    

          //echo $header.$header2.$body_header;
        }
        $detail_row = '<tr>
        <td style="text-align:left">'.$num_final.'</td>      
        <td style="text-align:left">'.$detalle_producto->tipodocto.'</td> 
        <td style="text-align:right">'.$detalle_producto->numdocto.'</td> 
        <td style="text-align:right">'.$detalle_producto->fecha.'</td> 
        <td align="right">'.number_format($detalle_producto->precio, 0, '.', ',').'</td>
        <td align="text-align:right">'.$detalle_producto->cant_entradas.'</td>
        <td style="text-align:right">'.$detalle_producto->cant_salidas.'</td> 
        <td style="text-align:right">'.$detalle_producto->stock.'</td> 
        <td style="text-align:right">'.$detalle_producto->detalle.'</td> 
        </tr>';


        $this->mpdf->WriteHTML($detail_row);
        //echo $detail;

        if(($fila % $cantidad_hoja) == 0 ){  #LLEVA 30 LINEAS EN LA HOJA
            $this->mpdf->WriteHTML($fin_pagina);         
          //echo $fin_tabla;
            $fila = 0;            
            $this->mpdf->AddPage();
        }   
        //echo $fila."<br>";
        $fila++;
        $num_final++;
        //$pag++;
      }
      $this->mpdf->WriteHTML($fin_pagina);
      //echo $body_totales.$footer.$fin_tabla; exit;
     // $this->mpdf->WriteHTML($body_totales.$footer.$fin_tabla);
      //echo $html; exit;
      //exit;
      //$this->mpdf->AddPage();
      //$this->mpdf->WriteHTML($html2);
      $this->mpdf->Output("InformeDetalleStock.pdf", "I");      
      exit;
         }
       

    public function reporte_estadisticas_ventas($mes,$anno){

    ini_set('memory_limit','512M');

    #$mes = $this->input->post('mes');
    #$anno = $this->input->post('anno');

    $mes = $mes == 0 ? '' : $mes;
    $anno = $anno == 0 ? '' : $anno;

    $this->load->model('reporte');
    $detalle_estadistica_venta = $this->reporte->reporte_estadisticas_ventas(null,null,$mes,$anno);

      $this->load->model('facturaelectronica');
    $empresa = $this->facturaelectronica->get_empresa();

    $logo =  PATH_FILES."facturacion_electronica/images/".$empresa->logo; 
    $fecha = date('d/m/Y');

      $encabezado_pdf = '
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <title>Untitled Document</title>
    <style type="text/css">
    td {
      font-size: 16px;
    }
    p {
    }
    </style>
    </head>

    <body>
    <table width="987px" height="602" border="0">
      <tr>
      <td width="197px"><img src="' . $logo . '" width="150" height="136" /></td>
        <td width="493px" style="font-size: 14px;text-align:center;vertical-align:text-top" >
        <p>' . $empresa->razon_social .'</p>
        <p>RUT:' . number_format($empresa->rut,0,".",".").'-' . $empresa->dv . '</p>
        <p>' . $empresa->dir_origen . ' - ' . $empresa->comuna_origen . ' - Chile</p>
        <p>Fonos: ' . $empresa->fono . '</p>
        <p>&nbsp;</p>
        </td>
        <td width="296px" style="font-size: 16px;text-align:left;vertical-align:text-top" >
              <p>&nbsp;</p>
              <!--p>&nbsp;</p-->
              <p>FECHA EMISION : '.$fecha.'</p>
              <!--p>&nbsp;</p-->             
      </td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>
      <tr>
      <td style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" colspan="3"><h2>Detalle Estadísticas Ventas - ' . month2string((int)$mes)." de " . $anno . '</h2></td>
      </tr>
      <tr><td>&nbsp;</td></tr>
      <tr><td>&nbsp;</td></tr>      
      <tr>
        <td colspan="3" width="987px" >
      </td>
      </tr>';

      $formato_tabla_detalle = '
      <tr>
        <td colspan="3" >
          <table width="987px" cellspacing="0" cellpadding="0" border="0">
          <tr>
            <td width="50px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>#</b></td>
            <td width="100px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>Cod. Productos</b></td>
            <td width="327px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center;" ><b>Desc. Producto</b></td>
            <td width="60px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:center" ><b>Unidades</b></td>
            <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right" ><b>Venta Neta</b></td>
            <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Costo Venta</b></td>
            <td width="120px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>Margen Neto</b></td>
            <td width="90px"  style="border-bottom:1pt solid black;border-top:1pt solid black;text-align:right;" ><b>% Margen</b></td>
          </tr>';

          $fin_pagina = '</table></td></tr></table></body></html>';


      //==============================================================
      //==============================================================
      //==============================================================
      //include(dirname(__FILE__)."/../libraries/mpdf60/mpdf.php");

      $this->load->library("mpdf");

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


    $cantidad_hoja = 50;
      $fila = 1;
      $num_final = 1;
      $this->mpdf->SetHeader('Manzor - Informe Estadísticas Ventas');
      $this->mpdf->setFooter('{PAGENO}');         
      foreach ($detalle_estadistica_venta['data'] as $detalle_estadistica) {
        if($fila == 1){
          $this->mpdf->WriteHTML($encabezado_pdf.$formato_tabla_detalle);    

          //echo $header.$header2.$body_header;
        }
        $detail_row = '<tr>
        <td style="text-align:left">'.$num_final.'</td>      
        <td style="text-align:left">'.$detalle_estadistica->codigo.'</td> 
        <td style="text-align:right">'.$detalle_estadistica->nombre.'</td> 
        <td style="text-align:right">'.$detalle_estadistica->unidades.'</td> 
        <td align="right">'.number_format($detalle_estadistica->ventaneta, 0, '.', '.').'</td>
        <td align="right">'.number_format($detalle_estadistica->costo, 0, '.', '.').'</td>
        <td style="text-align:right">'.$detalle_estadistica->margen.'</td> 
        <td style="text-align:right">'.$detalle_estadistica->porcmargen.'</td> 
        </tr>';


        $this->mpdf->WriteHTML($detail_row);
        //echo $detail;

        if(($fila % $cantidad_hoja) == 0 ){  #LLEVA 30 LINEAS EN LA HOJA
            $this->mpdf->WriteHTML($fin_pagina);         
          //echo $fin_tabla;
            $fila = 0;            
            $this->mpdf->AddPage();
        }   
        //echo $fila."<br>";
        $fila++;
        $num_final++;
        //$pag++;
      }
      $this->mpdf->WriteHTML($fin_pagina);
      //echo $body_totales.$footer.$fin_tabla; exit;
     // $this->mpdf->WriteHTML($body_totales.$footer.$fin_tabla);
      //echo $html; exit;
      //exit;
      //$this->mpdf->AddPage();
      //$this->mpdf->WriteHTML($html2);
      $this->mpdf->Output("InformeEstadisticasVenta.pdf", "I");      
      exit;
         }
       


      }
 
?>
