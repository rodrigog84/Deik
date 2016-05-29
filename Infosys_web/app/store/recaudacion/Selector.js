Ext.define('Infosys_web.store.recaudacion.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"GENERAL", "nombre":"GENERAL"},
        {"id":"DETALLE", "nombre":"DETALLE"}
           
    ]
});