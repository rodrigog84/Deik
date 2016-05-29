Ext.define('Infosys_web.store.productos.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Productos.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});