Ext.define('Infosys_web.model.Recaudacion_detalle', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_pago'},
        {name: 'id_recaudacion'},
    	{name: 'fecha_comp', type:'date',dateFormat:"Y-m-d"},
    	{name: 'documento'},
    	{name: 'id_forma'},
    	{name: 'secuencia'},
    	{name: 'monto_canc'},
    	{name: 'fecha_transac', type:'date',dateFormat:"Y-m-d"}
    	]
});