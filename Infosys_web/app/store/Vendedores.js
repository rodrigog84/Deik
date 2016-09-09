Ext.define('Infosys_web.store.Vendedores', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Vendedor',
    autoLoad: true,
    //pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'vendedores/save', 
            read: preurl + 'vendedores/getAll',
            update: preurl + 'vendedores/update'
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