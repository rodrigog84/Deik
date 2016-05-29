Ext.define('Infosys_web.store.Recauda', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Recauda',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'recaudacion/save', 
            read: preurl + 'recaudacion/getAll',
            update: preurl + 'recaudacion/update'
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