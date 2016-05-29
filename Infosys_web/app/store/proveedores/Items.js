Ext.define('Infosys_web.store.proveedores.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Proveedores.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});