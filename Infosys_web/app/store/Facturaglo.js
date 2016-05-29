Ext.define('Infosys_web.store.Facturaglo', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Facturaglo',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            create: preurl + 'facturaglosa/save', 
            read: preurl + 'facturaglosa/getAllnc',
            update: preurl + 'facturaglosa/update'
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