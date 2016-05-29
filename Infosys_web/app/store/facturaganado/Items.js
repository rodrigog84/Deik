Ext.define('Infosys_web.store.facturaganado.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.facturaganado.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});