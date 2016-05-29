Ext.define('Infosys_web.store.cuentacorriente.Librodiario', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.cuentacorriente.Librodiario',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});