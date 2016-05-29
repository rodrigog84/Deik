Ext.define('Infosys_web.store.TipoComunas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.TipoComuna',
    autoLoad: true,
    
    proxy: {
        type: 'ajax',
        actionMethods: 'POST',
        api: {
             read: preurl + 'comunas/getcomboAll'
        },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        }
    }
});