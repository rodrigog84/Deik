Ext.define('Infosys_web.store.ubicacion.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Ubicacion.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});