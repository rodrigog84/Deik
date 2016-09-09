Ext.define('Infosys_web.view.ordencompra.BuscarProductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductosord',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos Orden',
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
            store: 'Productosf',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Codigo",
                width: 100,
                dataIndex: 'codigo'
            },{
                header: "Nombres",
                width: 650,
                dataIndex: 'nombre'
            },{
                header: "id Unidad Medida",
                 width: 100,
                dataIndex: 'id_uni_medida',
                hidden: true
            },{
                header: "id Unidad Medida",
                 width: 100,
                dataIndex: 'nom_medida',
            },{
                header: "id Unidad Medida",
                 width: 100,
                dataIndex: 'cantidad_medida'
            },{
                header: "Ubicacion Fisica",
                 width: 100,
                dataIndex: 'nom_ubi_prod',
                hidden: true
            },{
                header: "Precio Venta",
                width: 100,
                dataIndex: 'p_venta',
                align: 'right'
            },{
                header: "Precio Neto",
                width: 100,
                dataIndex: 'p_neto',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")},
                hidden: true
            },{
                header: "Stock",
                width: 100,
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
                action: 'buscarprod',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 15,
            action: 'seleccionarproductos2',
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
