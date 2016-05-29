Ext.define('Infosys_web.store.cajeros.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cajero.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});