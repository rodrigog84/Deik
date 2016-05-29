
Ext.define('Infosys_web.model.Cuentacorriente', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'cliente'},
    	{name: 'rut'},
    	{name: 'rut_sf'},
    	{name: 'dato_cliente'},    	
    	{name: 'cuentacontable'},
    	{name: 'saldo'},
    	{name: 'deudavencida'},
    ]
});