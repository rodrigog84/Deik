Ext.define('Infosys_web.store.medidas.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Medida.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});