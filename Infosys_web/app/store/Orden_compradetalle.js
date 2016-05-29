Ext.define('Infosys_web.store.Orden_compradetalle', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 35,

    fields: [
        {name: 'id'},
        {name: 'nombre'},
        {name: 'precio_base'},
        {name: 'subtotal'},
        {name: 'id_producto'},
        {name: 'total'},
        {name: 'totaliva'},
        {name: 'numero'},
        {name: 'dcto'},
        {name: 'descripcion'},
        {name: 'requisitos'},
        {name: 'cantidad'},
        {name: 'cant_final'},
        {name: 'sub_total'},
        {name: 'valor_prom'},
        {name: 'fecha_recepcion'},
        {name: 'descuentoprct'},
        {name: 'img'},
        {name: 'cantidadrec'},
        {name: 'existe'},
        {name: 'valor'},
        {name: 'stock'}
        
    ],
    data: [
        {stock: 0, valor: 0}
    ],
    
    proxy: {
      type: 'ajax',
        url : preurl +'ordencompra/detalle',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});