
Ext.define('Infosys_web.model.Inventarios', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'num_inventario'},
        {name: 'nom_bodega'},
      	{name: 'id_bodega'},
        {name: 'fecha', type: "date", dateFormat: 'c' }
    	
    ]
});