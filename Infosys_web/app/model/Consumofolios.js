Ext.define('Infosys_web.model.Consumofolios', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'fecha'},
    	{name: 'cant_folios'},
    	{name: 'folio_desde'},
        {name: 'folio_hasta'},
        {name: 'path_consumo_folios'},
        {name: 'archivo_consumo_folios'},
        {name: 'xml'},
        {name: 'trackid'}
    ]
});