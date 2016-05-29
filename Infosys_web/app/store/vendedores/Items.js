Ext.define('Infosys_web.store.vendedores.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Vendedores.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});