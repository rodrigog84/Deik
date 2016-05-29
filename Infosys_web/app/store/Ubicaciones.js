Ext.define('Infosys_web.store.Ubicaciones', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Ubica',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'ubicacion/save', 
            read: preurl + 'ubicacion/getAll',
            update: preurl + 'ubicacion/update'
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