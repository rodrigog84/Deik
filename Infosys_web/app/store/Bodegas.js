Ext.define('Infosys_web.store.Bodegas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Bodega',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'bodegas/save', 
            read: preurl + 'bodegas/getAll',
            update: preurl + 'bodegas/update'
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