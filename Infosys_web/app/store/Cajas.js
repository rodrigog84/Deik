Ext.define('Infosys_web.store.Cajas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Caja',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'caja/save', 
            read: preurl + 'caja/getAll',
            update: preurl + 'caja/update'
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