Ext.define('Infosys_web.store.notaventa.Editar', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.notaventa.Item',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'preventa/edita',
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