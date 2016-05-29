
Ext.define('Infosys_web.model.cuentacorriente.Librodiario', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'tipocomprobante'},
        {name: 'nrocomprobante'},
    	{name: 'fecha'},
    	{name: 'cuentacontable'},
    	{name: 'rut'},
    	{name: 'documento'},
    	{name: 'fechavencimiento'},
    	{name: 'cargos'},
    	{name: 'abonos'}
    ]
});