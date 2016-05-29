
Ext.define('Infosys_web.model.ordencompra.Item', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'nombre'},
    	{name: 'subtotal'},
        {name: 'id_producto'},
        {name: 'id_descuento'},
        {name: 'precio'},
        {name: 'total'},
        {name: 'iva'},
        {name: 'neto'},
        {name: 'totaliva'},
        {name: 'dcto'},
    	{name: 'descripcion'},
    	{name: 'requisitos'},
    	{name: 'cantidad'},
        {name: 'cant_final'},
        {name: 'valor_prom'},
        {name: 'fecha_recepcion', type:'date',dateFormat:"Y-m-d"},
        {name: 'descuentoprct'},
        {name: 'img'},
        {name: 'cantidadrec'},
        {name: 'existe'},
        {name: 'valor'},
        {name: 'stock'}
        
    ]
});