Ext.define('Infosys_web.model.cotizacion.Item', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_producto'},
        {name: 'id_descuento'},
        {name: 'nombre'},
    	{name: 'codigo'},
    	{name: 'precio_base'},
        {name: 'total'},
        {name: 'neto', decimalPrecision:2},
        {name: 'totaliva'},
        {name: 'iva'},
        {name: 'dcto'},
    	{name: 'descripcion'},
    	{name: 'requisitos'},
    	{name: 'cantidad'},
        {name: 'descuentoprct'},
        {name: 'img'}
    ]
});