
Ext.define('Infosys_web.model.Inventari', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'indice'},
        {name: 'num_inventario'},
        {name: 'nom_producto'},
        {name: 'nom_bodega'},
        {name: 'id_producto'},
    	{name: 'id_bodega'},
        {name: 'stock'},
        {name: 'bodega'},
        {name: 'fecha'},
        {name: 'fecha_inventario', type: "date", dateFormat: 'c' }
    	
    ]
});