Ext.define('Infosys_web.view.movimiento_diario_inventario.BuscarProductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductos',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        var record = me.record;

        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',
            title : 'Productos',
            store: 'Productosf',
            autoHeight: true,
            viewConfig: {
                forceFit: true,
                listeners: {
                    itemdblclick: function(dataview, r, item, index, e) {
                        var win =this.up('buscarproductos')
                        record.set({producto: parseInt(r.get('id')), stock: r.get('stock')})
                        win.close()
                    }
                }
            },
           columns: [{
                header: "Nombres",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Codigo de Barra",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Ubicacion Fisica",
                flex: 1,
                dataIndex: 'nom_ubi_prod'
            },{
                header: "Precio",
                flex: 1,
                dataIndex: 'p_promedio'
            },{
                header: "Stock",
                flex: 1,
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
            margin: 5,
            dock: 'bottom',
            text : 'Seleccionar',
            handler: function(){
                var win =this.up('buscarproductos')
                var grid = win.down('grid');
                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelection()[0];
                    record.set({producto: parseInt(row.get('id')), stock: row.get('stock')})
                    win.close()
                }else{
                    Ext.Msg.alert('Alerta', 'Selecciona un registro.');
                    return;  
                }
                

                
            }
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
