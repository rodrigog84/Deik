Ext.define('Infosys_web.store.Cond_pago', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cond_pag',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'cond_pago/save', 
            read: preurl + 'cond_pago/getAll',
            update: preurl + 'cond_pago/update'
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