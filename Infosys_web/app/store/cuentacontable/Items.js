Ext.define('Infosys_web.store.cuentacontable.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cuentacontable.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});