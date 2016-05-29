Ext.define('Infosys_web.store.Cotizaciones', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Cotizacion',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
      type: 'ajax',
        url : preurl +'cotizaciones/getAll',
        reader: {
            type: 'json',
            root: 'data'
        }
    }
});