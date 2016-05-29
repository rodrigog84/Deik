Ext.define('Infosys_web.store.Cartolascuentacorriente', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cuentacorriente',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'cuentacorriente/getAllCartolas'
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