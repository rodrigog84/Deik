Ext.define('Infosys_web.store.cuentacorriente.Saldodocumentos', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.cuentacorriente.Saldodocumentos',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});