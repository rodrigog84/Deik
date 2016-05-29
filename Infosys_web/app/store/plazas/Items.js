Ext.define('Infosys_web.store.plazas.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Plazas.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});