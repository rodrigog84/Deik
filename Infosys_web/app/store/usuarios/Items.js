Ext.define('Infosys_web.store.usuarios.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Usuarios.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});