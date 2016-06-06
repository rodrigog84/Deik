Ext.define('Infosys_web.model.Contribuyentesautorizados', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'rut_contribuyente'},
    	{name: 'razon_social'},
    	{name: 'nro_resolucion'},
        {name: 'fec_resolucion'},
    	{name: 'mail'},
    	{name: 'url'}
    ]
});