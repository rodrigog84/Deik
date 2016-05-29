Ext.define('Infosys_web.store.Proveedores', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Proveedor',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'proveedores/save', 
            read: preurl + 'proveedores/getAll',
            update: preurl + 'proveedores/update'
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