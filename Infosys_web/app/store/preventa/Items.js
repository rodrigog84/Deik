Ext.define('Infosys_web.store.preventa.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.preventa.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});