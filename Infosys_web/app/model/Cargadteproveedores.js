
Ext.define('Infosys_web.model.Cargadteproveedores', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'proveedor'},
    	{name: 'e_mail'},
        {name: 'fecha_documento'},
    	{name: 'path_dte'},
    	{name: 'arch_rec_dte'},
    	{name: 'arch_res_dte'},
    	{name: 'arch_env_rec'},
    	{name: 'fecha_creacion'},
    ]
});