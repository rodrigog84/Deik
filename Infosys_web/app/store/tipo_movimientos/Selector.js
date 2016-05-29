Ext.define('Infosys_web.store.tipo_movimientos.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"ENTRADA"},
        {"id":"2", "nombre":"SALIDA"},
     	{"id":"3", "nombre":"TRASPASO"}           
    ]
});