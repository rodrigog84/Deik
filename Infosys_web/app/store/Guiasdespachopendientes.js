Ext.define('Infosys_web.store.Guiasdespachopendientes', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Guiasdespacho',
    autoLoad: true,
    pageSize: 21,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'guias/save', 
            read: preurl + 'guias/pendientes',
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