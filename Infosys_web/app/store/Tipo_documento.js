Ext.define('Infosys_web.store.Tipo_documento', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Tipo_documento',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'tipo_documento/getAll'
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