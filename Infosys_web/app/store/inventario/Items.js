Ext.define('Infosys_web.store.inventario.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Inventario.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});