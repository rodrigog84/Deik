Ext.define('Infosys_web.store.Cajeros', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cajero',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'cajeros/save', 
            read: preurl + 'cajeros/getAll',
            update: preurl + 'cajeros/update'
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