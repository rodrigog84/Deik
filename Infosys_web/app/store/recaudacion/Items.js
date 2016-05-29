Ext.define('Infosys_web.store.recaudacion.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.recaudacion.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});