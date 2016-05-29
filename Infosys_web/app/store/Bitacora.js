Ext.define('Infosys_web.store.Bitacora', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.bitacora',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
       
        api: {
            read: preurl + 'Detallebitacora/getAll',
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