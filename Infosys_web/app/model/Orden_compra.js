
Ext.define('Infosys_web.model.Orden_compra', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'num_orden'},
        {name: 'nombre'},
        {name: 'stock'},
        {name: 'nombre_contacto'},
        {name: 'ciudad'},
        {name: 'comuna'},
        {name: 'direccion'},
        {name: 'id_proveedor'},
        {name: 'rut'},
        {name: 'telefono_contacto'},
    	{name: 'mail_contacto'},
    	{name: 'cumplida'},
        {name: 'semicumplida'},
        {name: 'emitida'},
        {name: 'giro'},
        {name: 'valor'},
        {name: 'direccion'},
        {name: 'empresa'},
        {name: 'descuento'},
        {name: 'pretotal'},
        {name: 'iva'},
        {name: 'neto'},
        {name: 'afecto'},
        {name: 'total'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"}

    ]
});