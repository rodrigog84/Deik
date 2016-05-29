Ext.define('Infosys_web.store.usuarios.Selector', {
    extend: 'Ext.data.Store',
	fields: ['id', 'nombre'],
	autoLoad: true,
    proxy: {
        type: 'ajax',

        api: {
            read: preurl + 'roles/getAllWithNotFilter'
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