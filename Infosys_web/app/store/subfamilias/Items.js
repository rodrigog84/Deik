Ext.define('Infosys_web.store.subfamilias.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Subfamilia.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});