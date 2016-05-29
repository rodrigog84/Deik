
Ext.define('Infosys_web.model.Cartolacuentacorriente', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'cliente'},
    	{name: 'rut'},
    	{name: 'cuentacontable'},
    	{name: 'saldo'},
    	{name: 'deudavencida'},
    ]
});