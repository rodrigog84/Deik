Ext.define('Infosys_web.store.cotizacion.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.cotizacion.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});