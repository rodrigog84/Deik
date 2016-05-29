Ext.define('Infosys_web.store.Orden_compratodas', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Orden_compra',
    autoLoad: true,
    pageSize: 35,
    
    proxy: {
      type: 'ajax',
        url : preurl +'ordencompra/getAll2',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});