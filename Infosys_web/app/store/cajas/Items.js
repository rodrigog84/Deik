Ext.define('Infosys_web.store.cajas.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cajas.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});