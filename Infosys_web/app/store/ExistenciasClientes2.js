Ext.define('Infosys_web.store.ExistenciasClientes2', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.existenciasclientes',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'existenciasclientes/getAll2',
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