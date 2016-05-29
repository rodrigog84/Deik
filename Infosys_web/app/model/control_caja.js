
Ext.define('Infosys_web.model.control_caja', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
    	{name: 'id_caja'},
    	{name: 'nom_caja'},
    	{name: 'id_cajero'},
    	{name: 'nom_cajero'},
    	{name: 'efectivo'},
        {name: 'cheques'},
        {name: 'otros'},
        {name: 'fecha' , type:'date',dateFormat:"Y-m-d"}
    	]
});