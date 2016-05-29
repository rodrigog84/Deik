Ext.define('Infosys_web.store.Clientes', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cliente',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'clientes/save', 
            read: preurl + 'clientes/getAll',
            update: preurl + 'clientes/update'
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