Ext.define('Infosys_web.store.Subfamilia', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Subfamilias',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'subfamilias/save', 
            read: preurl + 'subfamilias/getAll',
            update: preurl + 'subfamilias/update'
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