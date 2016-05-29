Ext.define('Infosys_web.store.Tabladescuento', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Tabladescuento',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'descuentos/save', 
            read: preurl + 'descuentos/getAll',
            update: preurl + 'descuentos/update'
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