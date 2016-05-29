Ext.define('Infosys_web.store.Sucursal', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Sucursal',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'sucursales/save', 
            read: preurl + 'sucursales/getAll',
            update: preurl + 'sucursales/update'
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