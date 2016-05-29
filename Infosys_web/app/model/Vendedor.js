Ext.define('Infosys_web.model.Vendedor', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'nombre'},
    	{name: 'rut'},
    	{name: 'direccion'},
    	{name: 'fono'},
    	{name: 'comision'},
    	{name: 'estado'},
        {name: 'password'},
        {name: 'valida'}
    	]
});