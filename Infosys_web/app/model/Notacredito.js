
Ext.define('Infosys_web.model.Notacredito', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'id_factura'},
        {name: 'id_cliente'},
        {name: 'tipo_documento'},
        {name: 'nombre_cliente'},
        {name: 'rut_cliente'},
        {name: 'num_factura'},
        {name: 'tipo_doc'},
        {name: 'id_vendedor'},
        {name: 'nom_vendedor'},
        {name: 'fecha_factura', type:'date',dateFormat:"Y-m-d"},
        {name: 'fecha_venc', type:'date',dateFormat:"Y-m-d"},
        {name: 'sub_total'},
        {name: 'descuento'},
        {name: 'neto'},
        {name: 'iva'},
        {name: 'totalfactura'},        
        {name: 'forma'}
       
    ]
});