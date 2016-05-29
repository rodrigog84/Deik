Ext.define('Infosys_web.store.Recepcion', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"FACTURA"},
        {"id":"2", "nombre":"GUIA DESPACHO"},
     	{"id":"3", "nombre":"BOLETA"}           
    ]
});