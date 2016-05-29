Ext.define('Infosys_web.view.ventas.BuscarSucursales' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarsucursalesclientes',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Sucursales',
    layout: 'fit',
    autoShow: true,
    width: 980,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Sucursales Clientes',
            store: 'Sucursales_clientes',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Id",
                width: 390,
                dataIndex: 'id',
                hidden : true
            
            },{
                header: "Direccion",
                width: 390,
                dataIndex: 'direccion'
                    
            },{
                header: "Ciudad",
                width: 390,
                dataIndex: 'nombre_ciudad'
            },{
                header: "Comuna",
                width: 390,
                dataIndex: 'nombre_comuna'
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 450,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscar',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarsucursalcliente',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Sucursales_clientes',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
