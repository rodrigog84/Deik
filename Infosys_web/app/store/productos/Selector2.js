Ext.define('Infosys_web.store.productos.Selector2', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"Nombre", "nombre":"Nombre"},
        {"id":"Numero", "nombre":"Numero"},
        {"id":"Todos", "nombre":"Todos"}
           
    ]
});