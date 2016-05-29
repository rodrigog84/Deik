Ext.define('Infosys_web.store.guiasdespacho.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Guiasdespacho.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});