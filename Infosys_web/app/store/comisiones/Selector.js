Ext.define('Infosys_web.store.comisiones.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"PDF", "nombre":"PDF"},
        {"id":"EXCEL", "nombre":"EXCEL"}           
    ]
});