Ext.define('Infosys_web.view.tipo_movimiento.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tipomovimientoprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tipos de Movimientos',
    store: 'Tipo_movimiento',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "tipo",
                flex: 1,
                dataIndex: 'id_tipo',
                hidden: true
                },{
                header: "Tipo",
                flex: 1,
                dataIndex: 'id_tipo',
                renderer: function(value){
                if (value == 1) {
                    return 'Entrada';
                 }
                 if (value == 2) {
                    return 'Salida';
                 }
                 if (value == 3) {
                    return 'Traspaso';
                 }
                }
            },{
                header: "Usuario",
                flex: 1,
                dataIndex: 'id_usuario',
                hidden: true
            },{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Cuenta Asociada",
                flex: 1,
                dataIndex: 'cuenta'
            },{
                header: "Correccion Monetaria",
                flex: 1,
                dataIndex: 'id_correccion',
                renderer: function(value){
                if (value == "on") {
                    return 'Activo';
                 }
                    return 'Inactivo';   
                }
            },{
                header: "Orden de Compra",
                flex: 1,
                dataIndex: 'id_orden_compra',
                renderer: function(value){
               if (value == "on") {
                    return 'Activo';
                 }
                    return 'Inactivo';   
                } 
            },{
                header: "Usuario Autorizado",
                flex: 1,
                dataIndex: 'id_usuario',
                renderer: function(value){
                if (value == 1) {
                    return 'Admin';
                 }
                    return 'Usuario';   
                }
            },{
                header: "Estadisticas Compras",
                flex: 1,
                dataIndex: 'id_estad_compras',
                renderer: function(value){
                if (value == "on") {
                    return 'Activo';
                 }
                    return 'Inactivo';   
                }
            },{
                header: "Estadisticas Consumo",
                flex: 1,
                dataIndex: 'id_estad_consumo',
                renderer: function(value){
                if (value == "on") {
                    return 'Activo';
                 }
                    return 'Inactivo';   
                }
            },{
                header: "Stock",
                flex: 1,
                dataIndex: 'id_stock',
                renderer: function(value){
                if (value == "on") {
                    return 'Activo';
                 }
                    return 'Inactivo';   
                }
            }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'tipomovimiento',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editartipomovimientos',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: '',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'tipomovimientocerrar',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Tipo_movimiento',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
