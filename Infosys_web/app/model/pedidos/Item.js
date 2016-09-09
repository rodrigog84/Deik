Ext.define('Infosys_web.model.pedidos.Item', {
    extend: 'Ext.data.Model',
    fields: [
      	{name: 'id'},
        {name: 'id_pedido'},
        {name: 'num_pedido'},
        {name: 'id_producto'},
        {name: 'id_descuento'},
        {name: 'nom_producto'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"},
        {name: 'precio'},
        {name: 'cantidad'},
        {name: 'descuento'},
        {name: 'neto'},
        {name: 'iva'},
        {name: 'total'}
        
        ]
});