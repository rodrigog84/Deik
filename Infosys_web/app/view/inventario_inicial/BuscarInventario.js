Ext.define('Infosys_web.view.inventario_inicial.BuscarInventario' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarinventario',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Inventario',
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

            title : 'Inventario',
            store: 'Inventari',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
            header: "ID",
            flex: 1,
            itemId: 'Id',
            dataIndex: 'id',
            hidden : true
            },{
                header: "Producto",
                width: 390,
                dataIndex: 'nom_producto'
                
            },{
                header: "Cantidad",
                flex: 1,
                dataIndex: 'stock'
               
            },{
                header: "Bodega",
                flex: 1,
                dataIndex: 'nom_bodega'
            },{
                header: "Fecha",
                flex: 1,
                type: 'date',
                renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
                dataIndex: 'fecha_inventario'
            }],
            };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                header: "Numero",
                flex: 1,
                name: 'numero',
                itemId: 'numeroId'
            },{
                header: "Bodega",
                flex: 1,
                name: 'bodega',
                itemId: 'bodegaId',
                dataIndex: 'nom_bodega'
            },
            {
                header: "Fecha",
                flex: 1,
                type: 'date',
                name: 'fecha',
                itemId: 'fechaId',
                renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
                dataIndex: 'fecha'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcliente',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Inventari',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
