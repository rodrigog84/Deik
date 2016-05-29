Ext.define('Infosys_web.model.Inventario.Item', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'num_inventario'},
    	{name: 'id_producto'},
    	{name: 'id_bodega'},
    	{name: 'desc_producto'},
    	{name: 'desc_bodega'}
    	
    ]
});