Ext.define('Infosys_web.store.clientes.Clientes', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre'],
    data : [
       	{"id":"1", "nombre":"CLIENTE"},
	 	{"id":"2", "nombre":"PROVEEDOR"},
	 	{"id":"3", "nombre":"CLIENTE / PROVEEDOR"}
    ]
});