Ext.define('Infosys_web.store.clientes.Selector2', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"1", "nombre":"Nombre"},
        {"id":"2", "nombre":"Codigo"},
        {"id":"3", "nombre":"Todos"}           
    ]
});