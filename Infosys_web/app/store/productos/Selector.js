Ext.define('Infosys_web.store.productos.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"Nombre", "nombre":"Nombre"},
        {"id":"Codigo", "nombre":"Codigo"},
        {"id":"Todos", "nombre":"Todos"}
           
    ]
});