Ext.define('Infosys_web.store.clientes.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Clientes.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});