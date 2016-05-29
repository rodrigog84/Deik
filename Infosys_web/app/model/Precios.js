
Ext.define('Infosys_web.model.Precios', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'nom_producto'},
        {name: 'id_producto'},
        {name: 'cod_producto'},
        {name: 'valor_original'},
        {name: 'nuevalor'},
        {name: 'stock'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"}     
    ]
});