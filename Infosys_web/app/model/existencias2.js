
Ext.define('Infosys_web.model.existencias2', {
    extend: 'Ext.data.Model',
    fields: [       
        {name: 'id'},
        {name: 'id_producto'},
        {name: 'id_bodega'},
        {name: 'nom_bodega'},
        {name: 'nom_producto'},
        {name: 'tipo_movimiento'},
        {name: 'nom_tipo_movimiento'},
        {name: 'num_movimiento'},
        {name: 'cantidad_entrada', decimalPrecision: 3},
        {name: 'cantidad_salida', decimalPrecision: 3},
        {name: 'fecha_movimiento',type:'date',dateFormat:"Y-m-d"},
	    {name: 'valor_producto', decimalPrecision: 3}
    ]
});