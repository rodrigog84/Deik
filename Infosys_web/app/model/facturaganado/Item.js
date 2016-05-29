Ext.define('Infosys_web.model.facturaganado.Item', {
    extend: 'Ext.data.Model',
    fields: [
      	{name: 'id'},
        {name: 'kilos'},
        {name: 'nombre'},        
        {name: 'codigo'},
        {name: 'precio'},
        {name: 'cantidad'},
        {name: 'id_producto'},
        {name: 'neto'},
        {name: 'iva'},
        {name: 'total'}
        ]
});