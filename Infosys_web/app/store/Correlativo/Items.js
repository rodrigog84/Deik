Ext.define('Infosys_web.store.Correlatrivo.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Correlativos.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});