Ext.define('Infosys_web.store.Inventarios', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Inventarios',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'inventarios/save', 
            read: preurl + 'inventarios/getAll',
            update: preurl + 'inventarios/update'
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