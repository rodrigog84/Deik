Ext.define('Infosys_web.store.Cobrador', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cobrador',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'cobrador/save', 
            read: preurl + 'cobrador/getAll',
            update: preurl + 'cobrador/update'
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