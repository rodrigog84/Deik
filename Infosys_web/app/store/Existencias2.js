Ext.define('Infosys_web.store.Existencias2', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.existencias2',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'existencias2/getAll',
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