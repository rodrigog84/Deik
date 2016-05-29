Ext.define('Infosys_web.model.Recaudacion', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_pago'},
        {name: 'num_comp'},
    	{name: 'fecha_comp', type:'date',dateFormat:"Y-m-d"},
    	{name: 'id_documento'},
        {name: 'tipo_docu'},
        {name: 'id_cliente'},
    	{name: 'nom_cliente'},
    	{name: 'rut_cliente'},
        {name: 'id_caja'},
        {name: 'id_cajero'},
        {name: 'monto_documento'},
        {name: 'monto_recaudado'},
        {name: 'monto_devuelto'},
    	{name: 'fecha_factura', type:'date',dateFormat:"Y-m-d"}
    	]
});