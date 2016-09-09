Ext.define('Infosys_web.store.Pedidos.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.pedidos.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});