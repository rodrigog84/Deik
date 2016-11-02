Ext.define('Infosys_web.model.Cotizacion', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_producto'},
        {name: 'id_cliente'},
        {name: 'id_descuento'},
        {name: 'descuento'},
        {name: 'num_cotiza'},
        {name: 'nombre'},
        {name: 'rut'},
    	{name: 'codigo'},
    	{name: 'precio_base'},
        {name: 'total'},
        {name: 'neto'},
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