Ext.define('Infosys_web.store.clientes.Activo', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre'],
    data : [
       	{"id":"1", "nombre":"VIGENTE"},
       	{"id":"2", "nombre":"INACTIVO"},
	 	{"id":"3", "nombre":"BLOQUEADO"},
	 	{"id":"4", "nombre":"PROTESTO VIGENTE"},
	 	{"id":"5", "nombre":"AUTORIZADO"}
    ]
});