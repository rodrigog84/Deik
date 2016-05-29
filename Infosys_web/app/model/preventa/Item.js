Ext.define('Infosys_web.model.preventa.Item', {
    extend: 'Ext.data.Model',
    fields: [
      	{name: 'id'},
        {name: 'id_producto'},
        {name: 'id_descuento'},
        {name: 'nombre'},
        {name: 'codigo'},
        {name: 'stock'},
        {name: 'cantidad'},
        {name: 'dcto'},
        {name: 'total'},
        {name: 'neto'},
        {name: 'descuentoprct'},
        {name: 'iva'},
        {name: 'totaliva'},
        {name: 'precio'},
        {name: 'id_documento'},
        {name: 'secuencia'}
        
        ]
});