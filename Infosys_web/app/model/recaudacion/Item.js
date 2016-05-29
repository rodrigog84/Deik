
Ext.define('Infosys_web.model.recaudacion.Item', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'id_pago'},
        {name: 'detalle'},
        {name: 'id_recaudacion'},
    	{name: 'fecha_comp', type:'date',dateFormat:"Y-m-d"},
    	{name: 'nom_forma'},
        {name: 'ticket'},
        {name: 'id_ticket'},
        {name: 'id_forma'},
        {name: 'num_doc'},
        {name: 'id_doc'},
        {name: 'num_cheque'},
        {name: 'nom_banco'},
        {name: 'id_banco'},
        {name: 'valor_pago'},
        {name: 'valor_cancelado'},
        {name: 'valor_vuelto'},
        {name: 'fecha_transac', type:'date',dateFormat:"Y-m-d"}
    ]
});