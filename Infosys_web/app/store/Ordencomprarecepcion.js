Ext.define('Infosys_web.store.Ordencomprarecepcion', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Orden_compra',
    autoLoad: true,
    pageSize: 35,

    proxy: {
      type: 'ajax',
        url : preurl +'ordencompra/recepcion',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});