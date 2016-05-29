Ext.define('Infosys_web.store.familias.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Familias.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});