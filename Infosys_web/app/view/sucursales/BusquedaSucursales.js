Ext.define('Infosys_web.view.sucursales.BusquedaSucursales' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedasucursales',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Sucursales',
    layout: 'fit',
    autoShow: true,
    width: 780,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Sucursales',
            store: 'Sucursal',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Sucursal",
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
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bsucursalnombreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarsucursales',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarbancos',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Sucursal',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
