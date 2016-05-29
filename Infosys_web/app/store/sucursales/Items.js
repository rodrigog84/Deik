Ext.define('Infosys_web.store.sucursales.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Sucursales.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});