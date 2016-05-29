Ext.define('Infosys_web.store.cuentascontable', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.cuentascontable',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'cuentacontable/save', 
            read: preurl + 'cuentacontable/getAll',
            update: preurl + 'cuentacontable/update'
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