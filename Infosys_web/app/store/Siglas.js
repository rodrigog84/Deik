Ext.define('Infosys_web.store.Siglas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Siglas',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'siglas/save', 
            read: preurl + 'siglas/getAll',
            update: preurl + 'siglas/update'
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