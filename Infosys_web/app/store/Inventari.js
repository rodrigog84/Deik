Ext.define('Infosys_web.store.Inventari', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Inventari',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'inventario/save', 
            read: preurl + 'inventario/getAll',
            update: preurl + 'inventario/update'
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