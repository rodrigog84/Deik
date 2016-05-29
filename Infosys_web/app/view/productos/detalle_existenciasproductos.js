Ext.define('Infosys_web.view.productos.detalle_existenciasproductos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.detalleexistenciasproductos',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Detalle Existencias ',
    layout: 'fit',
    autoShow: true,
    width: 880,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',
            title : 'Detalle Existencia Productos',
            store: 'Existencias2',
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
                width: 190,
                dataIndex: 'nom_producto'
                
            },{
                header: "Tipo",
                flex: 1,
                dataIndex: 'nom_tipo_movimiento'
            },{
                header: "Numero",
                flex: 1,
                dataIndex: 'num_movimiento'
            },{
                header: "Bodega",
                flex: 1,
                dataIndex: 'nom_bodega'
            },{
                header: "Entrada",
                flex: 1,
                dataIndex: 'cantidad_entrada'
            },{
                header: "Salida",
                flex: 1,
                dataIndex: 'cantidad_salida'
            },{
                header: "Valor",
                flex: 1,
                dataIndex: 'valor_producto'
            },{
                header: "Fecha",
                flex: 1,
                type: 'date',
                renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
                dataIndex: 'fecha_movimiento'
            }],
            };
        this.dockedItems = [{
           xtype: 'toolbar',
            dock: 'top',
            items: [
           {
                width: 250,
                xtype: 'textfield',
                itemId: 'productoId',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelexistenciadetalleproducto'
            },'->',{
                xtype: 'numberfield',
                itemId: 'stockId',
                name : 'stock',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
                width: 160,
                fieldLabel: '<b>Stock</b>',
                labelAlign: 'right',
                align: 'top',
                readOnly: true
            }
            ]      
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Existencias2',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
