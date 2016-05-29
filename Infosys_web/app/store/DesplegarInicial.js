Ext.define('Infosys_web.store.DesplegarInicial', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Inventariodesplegar',
    autoLoad: true,
    //pageSize: 14,
    
    proxy: {
        type: 'ajax',
        actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'inventario/buscar',
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