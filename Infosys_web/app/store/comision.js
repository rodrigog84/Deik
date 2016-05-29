Ext.define('Infosys_web.store.comision', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Vendedor',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'comisiones/getAll',
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});