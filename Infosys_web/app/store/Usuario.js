Ext.define('Infosys_web.store.Usuario', {
    extend: 'Ext.data.Store',
    model: 'Infosys_web.model.Usuario',
    autoLoad: true,
    pageSize: 14,
    
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'usuarios/getAllWithNotFilter'
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