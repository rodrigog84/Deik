Ext.define('Infosys_web.model.Pedidos', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'num_pedido'},
        {name: 'tip_documento'},
        {name: 'nom_documento'},
        {name: 'fecha_doc', type:'date',dateFormat:"Y-m-d"},        
        {name: 'id_cliente'},
        {name: 'nom_cliente'},
        {name: 'id_sucursal'},        
        {name: 'rut_cliente'},
        {name: 'id_vendedor'},
        {name: 'nom_vendedor'},
        {name: 'fecha_pedido', type:'date',dateFormat:"Y-m-d"},
        {name: 'hora_pedido'},
        {name: 'fecha_venc', type:'date',dateFormat:"Y-m-d"},
        {name: 'fecha_despacho', type:'date',dateFormat:"Y-m-d"},
        {name: 'hora_despacho'},
        {name: 'id_pago'},
        {name: 'descuento'},
        {name: 'neto'},
        {name: 'iva'},
        {name: 'total'},
        {name: 'id_tipopedido'},
        {name: 'estado'},
         
       
    ]
});