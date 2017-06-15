
Ext.define('Infosys_web.model.Preventa', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'num_ticket'},
    	{name: 'fecha_venta', type:'date',dateFormat:"Y-m-d"},
        {name: 'fecha_venc', type:'date',dateFormat:"Y-m-d"},
        {name: 'id_cliente'},
        {name: 'direccion'},
        {name: 'nom_giro'},        
        {name: 'id_sucursal'},
        {name: 'direccion_sucursal'},
        {name: 'comuna'},
        {name: 'ciudad'},
        {name: 'id_vendedor'},
        {name: 'id_tip_docu'},
        {name: 'id_pago'},
        {name: 'nom_documento'},
    	{name: 'nom_cliente'},
        {name: 'rut_cliente'},
    	{name: 'nom_vendedor'},
    	{name: 'neto'},
    	{name: 'desc'},
    	{name: 'total'},
        {name: 'id_documento'},
        {name: 'id_observa'},
        {name: 'orden_compra'},
        
        
    	
    ]
});