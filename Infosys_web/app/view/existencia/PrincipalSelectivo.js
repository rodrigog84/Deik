Ext.define('Infosys_web.view.existencia.PrincipalSelectivo' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.existenciaprincipalselectivo',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Listado Inventario Selectivo Por Bodega',
    store: 'InventarioSlectivo',
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
        header: "Fecha U.Compra",
        flex: 1,
        renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
        dataIndex: 'fecha_ultimo_movimiento'
        
    },{
        header: "Precio Costo",
        flex: 1,
        dataIndex: 'p_costo',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Precio Venta",
        flex: 1,
        dataIndex: 'p_venta',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Bodega",
        flex: 1,
        dataIndex: 'nom_bodega'
    },{
        header: "Stock",
        flex: 1,
        dataIndex: 'stock',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelexistenciaselector'
            },'->',{
                xtype: 'combo',
                itemId: 'bodegaId',
                labelWidth: 60,
                width: 255,
                fieldCls: 'required',
                maxHeight: 25,
                fieldLabel: '<b>BODEGA</b>',
                forceSelection : true,
                name : 'id_bodega',
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'Bodegas'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Producto'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarexistenciaselectivo',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarexistenciaselector',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'InventarioSlectivo',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
