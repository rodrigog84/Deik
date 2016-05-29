Ext.define('Infosys_web.model.Notacredito.Item', {
    extend: 'Ext.data.Model',
    fields: [
      	{name: 'id'},
        {name: 'id_producto'},
        {name: 'nombre'},
        {name: 'codigo'},
        {name: 'id_ubi_prod'},
        {name: 'stock'},
        {name: 'cantidad'},
        {name: 'total'},
        {name: 'iva'},
        {name: 'totaliva'},
        {name: 'neto'},
        {name: 'precio'}
        ]
});