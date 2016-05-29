Ext.define('Infosys_web.store.Control_cajas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.control_caja',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            create: preurl + 'control_caja/save', 
            read: preurl + 'control_caja/getAll',
            update: preurl + 'control_caja/update'
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