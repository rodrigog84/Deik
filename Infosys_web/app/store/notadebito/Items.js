Ext.define('Infosys_web.store.notadebito.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Nota.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});