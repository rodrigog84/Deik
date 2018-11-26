Ext.define('Infosys_web.store.Facturaproveedor', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Facturaproveedor',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'facturasproveedores/save', 
            read: preurl + 'facturasproveedores/getAll',
            update: preurl + 'facturasproveedores/update'
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