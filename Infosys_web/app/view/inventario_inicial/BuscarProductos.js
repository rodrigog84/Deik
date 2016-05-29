Ext.define('Infosys_web.view.inventario_inicial.BuscarProductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductosinicial',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 620,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Productos',
            store: 'Productosf',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Producto",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo',
                hidden: true
            },{
                header: "Ubicacion",
                width: 150,
                dataIndex: 'nom_ubi_prod'
            },{
                header: "Precio",
                //flex: 1,
                dataIndex: 'p_promedio',
                hidden: true
            },{
                header: "Precio",
                //flex: 1,
                dataIndex: 'p_venta',
                hidden: true
            },{
                header: "Stock",
                width: 150,
                align: 'right',
                dataIndex: 'stock'
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
            margin: 15,
            action: 'seleccionarproductosiniical',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Productosf',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
