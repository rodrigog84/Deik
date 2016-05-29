Ext.define('Infosys_web.store.Familias', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Familia',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'familias/save', 
            read: preurl + 'familias/getAll',
            update: preurl + 'familias/update'
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