
Ext.define('Infosys_web.model.Recauda', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'num_ticket'},
        {name: 'id_ticket'},
        {name: 'id_factura'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"},
    	{name: 'id_cliente'},
        {name: 'id_caja'},
        {name: 'nom_caja'},
        {name: 'num_comp'},
        {name: 'id_cajero'},
        {name: 'nom_cajero'},
        {name: 'nom_cliente'},
        {name: 'rut_cliente'},
    	{name: 'nom_vendedor'},
    	{name: 'neto'},
        {name: 'iva'},
        {name: 'desc'},
    	{name: 'total'}
    	
    ]
});