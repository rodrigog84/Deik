Ext.define('Infosys_web.store.Correlativos', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Correlativo',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'correlativos/save', 
            read: preurl + 'correlativos/getAll',
            update: preurl + 'correlativos/update'
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