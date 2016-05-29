Ext.define('Infosys_web.store.Orden_compra', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Orden_compra',
    autoLoad: true,
    pageSize: 14,

     proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'ordencompra/getAll',
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});

   
    