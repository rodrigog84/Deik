Ext.define('Infosys_web.store.cotizacion.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
    data : [
        {"id":"Nombre", "nombre":"Nombre"},
        {"id":"Rut", "nombre":"Rut"},
        {"id":"Numero", "nombre":"Numero"},
        {"id":"Contacto", "nombre":"Contacto"},
        {"id":"Todos", "nombre":"Todos"}
           
    ]
});