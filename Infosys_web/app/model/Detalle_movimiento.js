
Ext.define('Infosys_web.model.Detalle_movimiento', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_tipom'},
        {name: 'id_movimiento'},
        {name: 'id_tipomd'},
        {name: 'id_producto'},
        {name: 'nom_producto'},
        {name: 'rut'},
        {name: 'nom_tipomd'},
        {name: 'id_bodegaent'},
        {name: 'nom_bodegaent'},
        {name: 'id_bodegasal'},
        {name: 'id_orden_compra'},
        {name: 'nom_bodegasal'},
        {name: 'detalle'},
        {name: 'numero'},
        {name: 'cantidad'},
        {name: 'valor'},
        {name: 'stock'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"}
    ]
});