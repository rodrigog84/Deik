Ext.define('Infosys_web.store.Precios', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Precios',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'precios/save', 
            read: preurl + 'precios/getAll',
            update: preurl + 'precios/update'
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