Ext.define('Infosys_web.store.estados', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"CUMPLIDA"},
        {"id":"2", "nombre":"SEMICUMPLIDA"},
     	{"id":"3", "nombre":"PENDIENTE"},
     	{"id":"4", "nombre":"TODAS"}
    ]
});