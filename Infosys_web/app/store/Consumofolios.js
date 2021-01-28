Ext.define('Infosys_web.store.Consumofolios', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Consumofolios',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
        api: {
            //create: preurl + 'cuentacorriente/save', 
            read: preurl + 'facturas/consumofoliosgetAll',
            //update: preurl + 'cuentacorriente/update'
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
})