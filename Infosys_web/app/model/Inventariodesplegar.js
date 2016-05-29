
Ext.define('Infosys_web.model.Inventariodesplegar', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'num_inventario'},
        {name: 'nom_bodega'},
        {name: 'nom_producto'},
        {name: 'id_producto'},
        {name: 'id_bodega'},
        {name: 'fecha_inventario', type: "date", dateFormat: 'c' },
        {name: 'stock'},

    	
    ]
});