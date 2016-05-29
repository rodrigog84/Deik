Ext.define('Infosys_web.store.bodegas.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Bodegas.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});