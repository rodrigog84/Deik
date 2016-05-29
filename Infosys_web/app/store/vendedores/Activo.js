Ext.define('Infosys_web.store.vendedores.Activo', {
    extend: 'Ext.data.Store',
    fields: ['id', 'nombre'],
    data : [
       	{"id":"1", "nombre":"VIGENTE"},
	 	{"id":"2", "nombre":"INACTIVO"},
	 	{"id":"3", "nombre":"GERENCIA"}
    ]
});