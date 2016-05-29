Ext.define('Infosys_web.store.Sucursales_clientes', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Sucursales_clientes',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'sucursales_clientes/getAll',
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