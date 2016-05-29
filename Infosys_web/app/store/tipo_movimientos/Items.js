Ext.define('Infosys_web.store.tipo_movimientos.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Tipo_movimientos.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});