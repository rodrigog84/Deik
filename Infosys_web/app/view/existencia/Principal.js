Ext.define('Infosys_web.view.existencia.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.existenciaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tarjeta Existencia productos',
    store: 'Existencias',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id Producto",
        width: 390,
        dataIndex: 'id_producto',
         hidden: true

        
    },{
        header: "Nombre Producto",
        width: 390,
        dataIndex: 'nom_producto'
        
    },{
        header: "Stock",
        flex: 1,
        dataIndex: 'stock',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Fecha Ultimo Movimiento",
        flex: 1,
        renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
        dataIndex: 'fecha_ultimo_movimiento'
        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Editar Detalle',
                action:'editarexistencia'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelexistencia'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Producto'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarexistencia',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarexistencia',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Existencias',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
