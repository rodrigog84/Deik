Ext.define('Infosys_web.store.cuentacorriente.Ctactemovimientos', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.cuentacorriente.Ctactemovimientos',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});