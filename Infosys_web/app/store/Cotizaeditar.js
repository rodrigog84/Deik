Ext.define('Infosys_web.store.Cotizaeditar', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.cotizacion.Item',
    autoLoad: true,
  
    proxy: {
        type: 'ajax',
         actionMethods:  {
            read: 'POST'
         },
        api: {
            //create: preurl + 'preventa/save', 
            read: preurl + 'cotizaciones/edita2',
            //update: preurl + 'preventa/update'
            //destroy: 'php/deletaContacto.php'
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