Ext.define('Infosys_web.store.ordencompra.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.ordencompra.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});