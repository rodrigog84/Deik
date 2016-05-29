Ext.define('Infosys_web.store.cod_activ_econ.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cod_activ_econ.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});