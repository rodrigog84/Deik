Ext.define('Infosys_web.store.ciudades.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Ciudades.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});