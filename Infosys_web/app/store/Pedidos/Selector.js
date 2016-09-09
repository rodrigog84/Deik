Ext.define('Infosys_web.store.Pedidos.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"FIJO"},
        {"id":"2", "nombre":"RETENIDO"}          
    ]
});