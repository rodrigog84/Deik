
Ext.define('Infosys_web.model.Orden_compra', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'num_orden'},
        {name: 'num_recepcion'},
        {name: 'nombre'},
        {name: 'id_vendedor'},
        {name: 'nom_vendedor'},        
        {name: 'stock', decimalPrecision:3},
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
        {name: 'valor', decimalPrecision: 3},
        {name: 'direccion'},
        {name: 'empresa'},
        {name: 'descuento'},
        {name: 'pretotal', decimalPrecision: 3},
        {name: 'iva'},
        {name: 'neto'},
        {name: 'afecto'},
        {name: 'total'},
        {name: 'estado'},
        {name: 'fecha', type:'date',dateFormat:"Y-m-d"},
        {name: 'fecha_recepcion', type:'date',dateFormat:"Y-m-d"}

    ]
});