Ext.define('Infosys_web.store.Productoslista', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Producto',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'productofact/save', 
            read: preurl + 'productosfact/getAlllista',
            update: preurl + 'productosfact/update'
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