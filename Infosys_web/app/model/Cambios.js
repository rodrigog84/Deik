
Ext.define('Infosys_web.model.Cambios', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'num_comprobante'},
    	{name: 'id_bodega'},
        {name: 'nom_bodega'},
    	{name: 'id_vendedor'},
    	{name: 'id_cliente'},
        {name: 'nom_cliente'},
        {name: 'rut_cliente'},
    	{name: 'fecha', type:'date',dateFormat:"Y-m-d"},
    	{name: 'fecha_cambio', type:'date',dateFormat:"Y-m-d"}    	
    ]
});