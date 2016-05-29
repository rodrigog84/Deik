Ext.define('Infosys_web.store.Tipo_documento.Selector3', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"FACTURA"},
        {"id":"2", "nombre":"FACTURA ELECTRONICA"},
     	{"id":"3", "nombre":"FACTURA DE EXPORTACION"}, 
     	{"id":"4", "nombre":"FACTURA DE IMPORTACION"}, 
     	{"id":"5", "nombre":"FACTURA ACTIVO FIJO"}          
    ]
});