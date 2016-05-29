
Ext.define('Infosys_web.model.cuentascontable', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'codigo'},
    	{name: 'nombre'},
    	{name: 'id_agrupacion'},
    	{name: 'id_imputacion'},
    	{name: 'flujo_fondos'},
    	{name: 'id_estado_situacion'},
        {name: 'cancelaabono'},
        {name: 'cancelacargo'},
        {name: 'tiene_imputacion'},
        {name: 'tipo_cancelacion'}
    ]
});