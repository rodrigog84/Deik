Ext.define('Infosys_web.store.Venta', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Venta.Item',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'venta/save', 
            read: preurl + 'venta/getAll',
            update: preurl + 'venta/update'
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