Ext.define('Infosys_web.store.Tipo_documento_compras', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Tipo_documentocompras',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'Tipo_documentocompras/save', 
            read: preurl + 'Tipo_documentocompras/getAll'
            update: preurl + 'Tipo_documentocompras/update'
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