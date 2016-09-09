Ext.define('Infosys_web.model.Guiasdespacho.Item', {
    extend: 'Ext.data.Model',
    fields: [
      	{name: 'id'},
      	{name: 'secuencia'},
        {name: 'id_guia'},
        {name: 'num_guia'},
        {name: 'neto'},
        {name: 'iva'},
        {name: 'total'}
        ]
});