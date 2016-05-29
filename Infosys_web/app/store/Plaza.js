Ext.define('Infosys_web.store.Plaza', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Plaza',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'plaza/save', 
            read: preurl + 'plaza/getAll',
            update: preurl + 'plaza/update'
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