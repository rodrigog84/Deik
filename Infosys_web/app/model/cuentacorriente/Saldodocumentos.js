Ext.define('Infosys_web.model.cuentacorriente.Saldodocumentos', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'cuentacontable'},
        {name: 'documento'},
    	{name: 'fecha'},
    	{name: 'fechavencimiento'},
    	{name: 'saldoporvencer'},
    	{name: 'saldovencido'},
    	{name: 'dias'},
    	{name: 'saldodocto'}
    ]
});