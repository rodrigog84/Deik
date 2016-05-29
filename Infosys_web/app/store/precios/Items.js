Ext.define('Infosys_web.store.precios.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Precios.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});