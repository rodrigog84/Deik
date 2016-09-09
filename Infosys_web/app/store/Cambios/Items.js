Ext.define('Infosys_web.store.Cambios.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cambios.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});