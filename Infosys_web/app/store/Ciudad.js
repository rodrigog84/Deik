Ext.define('Infosys_web.store.Ciudad', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Ciudad',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'ciudades/save', 
            read: preurl + 'ciudades/getAll',
            update: preurl + 'ciudades/update'
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