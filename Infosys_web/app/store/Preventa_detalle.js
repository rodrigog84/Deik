Ext.define('Infosys_web.store.Preventa_detalle', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Preventa_detalle',
    autoLoad: true,
      
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            read: preurl + 'genera_pagos/getAll',
          },
        reader: {
            type: 'json',
            root: 'data',
            successProperty: 'success'
        },
        writer: {
            type: 'json',
            writeAllFields: true,
            encode: true,
            root: 'data'
        }
    }
});