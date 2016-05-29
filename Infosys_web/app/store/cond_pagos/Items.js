Ext.define('Infosys_web.store.cond_pagos.Items', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cond_pago.Item',
    proxy: {
        type: 'memory',
        reader: {
            type: 'json',
            root: 'root'
        }
    }
});