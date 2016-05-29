Ext.define('Infosys_web.model.facturaglosa.Item', {
    extend: 'Ext.data.Model',
    fields: [
      	{name: 'id'},
        {name: 'glosa'},
        {name: 'iva'},
        {name: 'total'},
        {name: 'neto'}
        ]
});