
Ext.define('Infosys_web.model.ordencompra.Item', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'nombre'},
        {name: 'subtotal'},
        {name: 'id_producto'},
        {name: 'id_descuento'},
        {name: 'cant_medida', decimalPrecision:3},
        {name: 'precio', decimalPrecision:3},
        {name: 'total'},
        {name: 'iva'},
        {name: 'neto'},
        {name: 'totaliva'},
        {name: 'dcto'},
        {name: 'descripcion'},
        {name: 'requisitos'},
        {name: 'cantidad', decimalPrecision:3},
        {name: 'cant_final', decimalPrecision:3},
        {name: 'valor_prom'},
        {name: 'fecha_recepcion', type:'date',dateFormat:"Y-m-d"},
        {name: 'descuentoprct'},
        {name: 'img'},
        {name: 'cantidadrec', decimalPrecision:3},
        {name: 'existe'},
        {name: 'valor'},
        {name: 'stock', decimalPrecision:3}
        
    ]
});