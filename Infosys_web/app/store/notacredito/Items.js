Ext.define('Infosys_web.store.notacredito.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Notacredito.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});