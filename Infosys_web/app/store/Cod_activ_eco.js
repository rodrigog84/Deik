Ext.define('Infosys_web.store.Cod_activ_eco', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cod_activ_eco',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'cod_activ_econ/save', 
            read: preurl + 'cod_activ_econ/getAll',
            update: preurl + 'cod_activ_econ/update'
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