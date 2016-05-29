Ext.define('Infosys_web.store.TipoCiudades', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.TipoCiudad',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        actionMethods: 'POST',
        api: {
             read: preurl + 'ciudades/getcomboAll'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});