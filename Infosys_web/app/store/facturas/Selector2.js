Ext.define('Infosys_web.store.facturas.Selector2', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"Nombre", "nombre":"Nombre"},
        {"id":"Rut", "nombre":"Rut"},
        {"id":"Numero", "nombre":"Numero"},
        {"id":"Todos", "nombre":"Todos"}
           
    ]
});