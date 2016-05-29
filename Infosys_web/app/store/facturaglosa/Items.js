Ext.define('Infosys_web.store.facturaglosa.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.facturaglosa.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});