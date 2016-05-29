Ext.define('Infosys_web.store.Detalle_tipo_movimiento', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Detalle_movimiento',
    autoLoad: true,
    pageSize: 14,

    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'detalle_movimiento/getAll'
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