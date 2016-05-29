Ext.define('Infosys_web.store.bancos.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Bancos.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});