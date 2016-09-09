Ext.define('Infosys_web.store.Pedidos.Editar', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.pedidos.Item',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'pedidos/edita2',
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