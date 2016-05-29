
Ext.define('Infosys_web.model.Precios.Item', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'nombre'},
        {name: 'idproducto'},
        {name: 'codigo'},
        {name: 'p_venta'},
        {name: 'precionuevo'},
        {name: 'stock'}
    ]
});