Ext.define('Infosys_web.store.Agrupacion', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Agrupaciones',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'agrupaciones/save', 
            read: preurl + 'agrupaciones/getAll',
            update: preurl + 'agrupaciones/update'
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