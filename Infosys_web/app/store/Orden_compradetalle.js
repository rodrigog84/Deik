Ext.define('Infosys_web.store.Orden_compradetalle', {
    extend: 'Ext.data.Store',
    autoLoad: true,
    pageSize: 35,

    fields: [
        {name: 'id'},
        {name: 'nombre'},
        {name: 'precio_base', decimalPrecision: 3},
        {name: 'subtotal'},
        {name: 'id_producto'},
        {name: 'total'},
        {name: 'totaliva'},
        {name: 'numero'},
        {name: 'dcto'},
        {name: 'descripcion'},
        {name: 'requisitos'},
        {name: 'cantidad', decimalPrecision: 3},
        {name: 'cant_final', decimalPrecision: 3},
        {name: 'cant_medida', decimalPrecision: 3},
        {name: 'sub_total'},
        {name: 'valor_prom', decimalPrecision: 3},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"},
        {name: 'fecha_recepcion', type:'date',dateFormat:"Y-m-d"},
        {name: 'descuentoprct'},
        {name: 'img'},
        {name: 'cantidadrec', decimalPrecision: 3},
        {name: 'existe'},
        {name: 'valor', decimalPrecision: 3},
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