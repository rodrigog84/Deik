
Ext.define('Infosys_web.model.Preventa_detalle', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'num_ticket'},
    	{name: 'id_producto'},
    	{name: 'nom_producto'},
        {name: 'valor_unit'},
        {name: 'cantidad'},
    	{name: 'neto'},
        {name: 'descuentoprct'},        
        {name: 'desc'},
    	{name: 'iva'},
    	{name: 'total'},
    	{name: 'fecha', type:'date',dateFormat:"Y-m-d"}    	
    ]
});