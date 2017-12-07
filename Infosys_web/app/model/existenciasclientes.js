
Ext.define('Infosys_web.model.existenciasclientes', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'id_producto'},
        {name: 'id_cliente'},
        {name: 'nom_producto'},
        {name: 'cantidad_salida'},
        {name: 'valor_producto'},        
        {name: 'nom_tipo_movimiento'},
        {name: 'num_movimiento'},
        {name: 'codigo'},
        {name: 'fecha_movimiento',type:'date',dateFormat:"Y-m-d"},
       
    ]
});