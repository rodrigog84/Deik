Ext.define('Infosys_web.store.Banco', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Banco',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'bancos/save', 
            read: preurl + 'bancos/getAll',
            update: preurl + 'bancos/update'
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