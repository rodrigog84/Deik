Ext.define('Infosys_web.store.Orden_compradetallerec', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.ordencompra.Item',
    autoLoad: true,
    pageSize: 35,

    proxy: {
      type: 'ajax',
        url : preurl +'ordencompra/detallerec',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});