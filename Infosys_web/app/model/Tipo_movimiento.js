
Ext.define('Infosys_web.model.Tipo_movimiento', {
    extend: 'Ext.data.Model',
    fields: [
    	{name: 'id'},
        {name: 'tipo_mov'},
        {name: 'id_tipo'},
        {name: 'id_correlativo'},
        {name: 'id_cuenta'},
        {name: 'nombre'},
        {name: 'cuenta'},
        {name: 'id_correccion'},
        {name: 'id_orden_compra'},
        {name: 'id_usuario'},
        {name: 'id_estad_compras'},
        {name: 'id_estad_consumo'},
        {name: 'id_rut'},
        {name: 'id_stock'}
    ]
});