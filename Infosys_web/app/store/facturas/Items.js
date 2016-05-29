Ext.define('Infosys_web.store.facturas.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Facturas.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});