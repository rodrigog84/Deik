Ext.define('Infosys_web.store.Usuarios', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Usuario',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'usuarios/save', 
            read: preurl + 'usuarios/getAll',
            update: preurl + 'usuarios/update'
            //destroy: 'php/deletaContacto.php'
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