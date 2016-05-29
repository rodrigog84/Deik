Ext.define('Infosys_web.store.Preventa', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Preventa',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'preventa/save', 
            read: preurl + 'preventa/getAll',
            update: preurl + 'preventa/update'
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