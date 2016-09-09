Ext.define('Infosys_web.store.Repartidor', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Repartidor',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'repartidor/save', 
            read: preurl + 'repartidor/getAll',
            update: preurl + 'repartidor/update'
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