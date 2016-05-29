Ext.define('Infosys_web.store.Marcas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.marcas',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'marcas/save', 
            read: preurl + 'marcas/getAll',
            update: preurl + 'marcas/update'
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