Ext.define('Infosys_web.store.productos.Precios', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Productos.Precios',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});