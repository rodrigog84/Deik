Ext.define('Infosys_web.store.agrupaciones.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Agrupacion.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});