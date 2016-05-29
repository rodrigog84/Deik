Ext.define('Infosys_web.store.Ordencompraforzada', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Orden_compra',
    autoLoad: true,
    pageSize: 35,

    proxy: {
      type: 'ajax',
        url : preurl +'ordencompra/forzada',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});