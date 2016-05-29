Ext.define('Infosys_web.store.comunas.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Comunas.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});