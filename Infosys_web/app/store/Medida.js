Ext.define('Infosys_web.store.Medida', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Medida',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        actionMethods: 'POST',
        api: {
             read: preurl + 'medidas/getAll'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});