Ext.define('Infosys_web.model.Cotizacion', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_cliente'},
        {name: 'id_vendedor'},
        {name: 'rut'},
        {name: 'nombre'},
        {name: 'num_cotiza'},
        {name: 'nombre_giro'},
        {name: 'direccion'},
    	{name: 'nombre_contacto'},
    	{name: 'telefono_contacto'},
    	{name: 'email_contacto'},
    	{name: 'empresa'},
    	{name: 'iva'},
        {name: 'afecto'},
        {name: 'descuento'},
        {name: 'neto'},
    	{name: 'total'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"},
        {name: 'observaciones'},
        
    ]
});