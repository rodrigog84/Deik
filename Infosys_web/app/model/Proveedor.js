
Ext.define('Infosys_web.model.Proveedor', {
    extend: 'Ext.data.Model',
    fields: [
        {name: 'id'},
        {name: 'nombres'},
        {name: 'fono'},
        {name: 'direccion'},
        {name: 'id_giro'},
        {name: 'giro'},
        {name: 'id_rubro'},
        {name: 'id_ciudad'},
        {name: 'id_comuna'},
        {name: 'id_sector'},
        {name: 'id_vendedor'},
        {name: 'nombre_ciudad'},
        {name: 'nombre_vendedor'},
        {name: 'nombre_comuna'},
        {name: 'rut'},
        {name: 'descuento'},
        {name: 'e_mail'},
        {name: 'fecha_incripcion', type:'date',dateFormat:"Y-m-d"},
        {name: 'fecha_ult_actualiz', type:'date',dateFormat:"Y-m-d"},
        {name: 'id_pago'},
        {name: 'nom_id_pago'},
        {name: 'estado'},
        {name: 'cupo_disponible'},
        {name: 'imp_adicional'},
        {name: 'tipo'},
        {name: 'nombre_contacto'},
        {name: 'fono_contacto'},
        {name: 'e_mail_contacto'}
        
        

    ]
});