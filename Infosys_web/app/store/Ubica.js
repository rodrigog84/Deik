Ext.define('Infosys_web.store.Ubicas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Ubica',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        actionMethods: 'POST',
        api: {
             read: preurl + 'ubicacion/getAll'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});