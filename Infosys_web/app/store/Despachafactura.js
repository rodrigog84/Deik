Ext.define('Infosys_web.store.Despachafactura', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Notacreditop',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'facturas/save', 
            read: preurl + 'facturas/getAlldespachafactura',
            update: preurl + 'facturas/update'
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