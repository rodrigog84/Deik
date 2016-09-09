Ext.define('Infosys_web.store.Precios2', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Precios2',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'precios/getAll2',
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