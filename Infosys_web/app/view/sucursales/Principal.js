Ext.define('Infosys_web.view.sucursales.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.sucursalesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-casa',

    title : 'Sucursales',
    store: 'Sucursal',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Sucursales",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Direccion",
                flex: 1,
                dataIndex: 'direccion'
            },{
                header: "Rut",
                flex: 1,
                dataIndex: 'rut'
            },{
                header: "Telefono",
                flex: 1,
                dataIndex: 'fono'
            },{
                header: "Contacto",
                flex: 1,
                dataIndex: 'nom_contacto'
            },{
                header: "E_Mail",
                flex: 1,
                dataIndex: 'e_mail'
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
                action: 'agregarsucursales',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarsucursales',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelsucursales'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarsucursales',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarsucursales',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Sucursal',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
