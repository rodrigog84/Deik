Ext.define('Infosys_web.store.Preciosdescuentos', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Preciosdescuentos',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'preciosdescuentos/save', 
            read: preurl + 'preciosdescuentos/getAll',
            update: preurl + 'preciosdescuentos/update'
            //destroy: 'php/deletaContacto.php'
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