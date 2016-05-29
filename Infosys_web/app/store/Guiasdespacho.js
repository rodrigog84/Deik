Ext.define('Infosys_web.store.Guiasdespacho', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Guiasdespacho',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'guias/save', 
            read: preurl + 'guias/getAll',
            update: preurl + 'guias/update'
            //destroy: 'php/deletaContacto.php'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success',
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});