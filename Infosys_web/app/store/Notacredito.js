Ext.define('Infosys_web.store.Notacredito', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Notacredito',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'notacredito/save', 
            read: preurl + 'notacredito/getAllnc',
            update: preurl + 'notacredito/update'
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