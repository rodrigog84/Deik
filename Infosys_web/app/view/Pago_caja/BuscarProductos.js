Ext.define('Infosys_web.view.Pago_caja.BuscarProductos',{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductoscaja',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',
            title : 'Productos',
            store: 'Productoslista',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Id producto",
                flex: 1,
                dataIndex: 'id_producto',
                hidden: true
            },{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Codigo de Barra",
                flex: 1,
                dataIndex: 'codigo_barra'
            },{
                header: "Nombres",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "ID Bodega",
                flex: 1,
                dataIndex: 'id_bodega',
                hidden: true
            },{
                header: "Bodega",
                flex: 1,
                dataIndex: 'nom_bodega'
            },{
                header: "Precio Venta",
                flex: 1,
                dataIndex: 'valor',
                align: 'right'
            },{
                header: "Precio Lista",
                flex: 1,
                dataIndex: 'valor_lista',
                align: 'right'
            },{
                header: "Stock",
                flex: 1,
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
            },{
                width: 450,
                xtype: 'textfield',
                itemId: 'listaId',
                fieldLabel: 'IdLista',
                hidden: true
            },{
                width: 450,
                xtype: 'textfield',
                itemId: 'bodegaId',
                fieldLabel: 'id_bodega',
                hidden: true
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
            action: 'seleccionarproductos',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Productoslista',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
