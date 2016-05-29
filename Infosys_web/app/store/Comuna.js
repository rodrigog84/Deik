Ext.define('Infosys_web.store.Comuna', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Comuna',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'comunas/save', 
            read: preurl + 'comunas/getAll',
            update: preurl + 'comunas/update'
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