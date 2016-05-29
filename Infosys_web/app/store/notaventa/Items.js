Ext.define('Infosys_web.store.notaventa.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.notaventa.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});