
Ext.define('Infosys_web.model.Tipo_movimientodiario', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_tipom'},
        {name: 'id_tipomd'},
        {name: 'rut'},
        {name: 'nom_tipomd'},
        {name: 'id_bodegaent'},
        {name: 'nom_bodegaent'},
        {name: 'id_bodegasal'},
        {name: 'nom_bodegasal'},
        {name: 'detalle'},
        {name: 'numero'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"}
    ]
});