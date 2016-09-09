Ext.define('Infosys_web.store.Tiponegocio', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Tiponegocio',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'tiponegocio/save', 
            read: preurl + 'tiponegocio/getAll',
            update: preurl + 'tiponegocio/update'
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