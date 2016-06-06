Ext.define('Infosys_web.store.Tipo_documento.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"FACTURA"},
        {"id":"101", "nombre":"FACTURA ELECTRONICA"},
        {"id":"19", "nombre":"FACTURA EXENTA"},            
        {"id":"103", "nombre":"FACTURA EXENTA ELECTRONICA"},          
        {"id":"2", "nombre":"BOLETA"},
     	{"id":"3", "nombre":"GUIA DESPACHO"},
    ]
});