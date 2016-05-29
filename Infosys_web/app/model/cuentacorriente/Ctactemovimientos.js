
Ext.define('Infosys_web.model.cuentacorriente.Ctactemovimientos', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'cuentacontable'},
    	{name: 'cancelaciones'},
    	{name: 'depositos'},
    	{name: 'otrosingresos'},
    	{name: 'cargos'},
    	{name: 'abonos'}
    ]
});