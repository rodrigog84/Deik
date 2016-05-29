Ext.define('Infosys_web.store.Tipo_movimientodiario', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Tipo_movimientodiario',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'tipo_movimientodiario/getAll'
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