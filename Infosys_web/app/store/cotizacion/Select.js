Ext.define('Infosys_web.store.cotizacion.Select', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"Normal"},
        {"id":"2", "nombre":"Especial"}          
    ]
});