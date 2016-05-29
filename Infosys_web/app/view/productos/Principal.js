Ext.define('Infosys_web.view.productos.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.productosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Productos',
    store: 'Productos',
    height: 500,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "ID",
        flex: 1,
        dataIndex: 'id',
        hidden: true
        
    },{
        header: "Codigo",
        flex: 1,
        dataIndex: 'codigo',
        align: 'center'
    },{
        header: "Nombre Producto",
        flex: 1,
        dataIndex: 'nombre'
        
    },{
        header: "Marca",
        flex: 1,
        dataIndex: 'nom_marca'
        
    },{
        header: "Precio Venta",
        flex: 1,
        dataIndex: 'p_venta',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Stock",
        flex: 1,
        dataIndex: 'stock',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Ubicacion Fisica",
        flex: 1,
        dataIndex: 'nom_ubi_prod',
        hidden: true
    },{
        header: "Bodega",
        flex: 1,
        dataIndex: 'nom_bodega',
         hidden: true
    },{
        header: "Precio Costo",
        flex: 1,
        dataIndex: 'p_costo',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
        hidden: true

    },{
        header: "Precio Ultima Compra",
        flex: 1,
        dataIndex: 'p_ult_compra',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
         hidden: true

    },{
        header: "Precio Mayor Compra",
        flex: 1,
        dataIndex: 'p_may_compra',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
        hidden: true
        
    },{
        header: "Precio Promedio",
        flex: 1,
        dataIndex: 'p_promedio',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")},
         hidden: true
    },{
        header: "Unidad de Medida",
        flex: 1,
        dataIndex: 'nom_uni_medida',
        hidden: true
    },{
        header: "Familia",
        flex: 1,
        dataIndex: 'nom_familia'
        
    },{
        header: "Sub Familia",
        flex: 1,
        dataIndex: 'nom_subfamilia'
        
    },{
        header: "Agrupacion",
        flex: 1,
        dataIndex: 'nom_agrupacion'
        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarproductos',
                text : 'Agregar'
            },{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarproductos',
                text : 'Editar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarprod',
                text : 'Eliminar'
            },{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'detalleexistenciasproductos',
                text : 'Detalle'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Expor EXCEL',
                action:'exportarexcelproductos'
            },
            '->',{
                        xtype: 'combo',
                        itemId: 'tipofamiliaId',
                        fieldLabel: '',
                        forceSelection : true,
                        width: 150,
                        editable : false,
                        name : 'id_familia',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Familias",
                        store : 'Familias',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'tipoagrupacionId',
                        fieldLabel: '',
                        forceSelection : true,
                         width: 150,
                        editable : false,
                        name : 'id_agrupacion',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Agrupaciones",
                        store : 'Agrupacion',
                        allowBlank: false
                    },{
                        xtype: 'combo',
                        itemId: 'tiposubfamiliaId',
                        fieldLabel: '',
                        forceSelection : true,
                        width: 150,
                        editable : false,
                        name : 'id_subfamilia',
                        valueField : 'id',
                        displayField : 'nombre',
                        emptyText : "Sub-Familias",
                        store : 'Subfamilia',
                        allowBlank: false
                    },
                    {
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 90,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                value: "Nombre",
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'productos.Selector'
            },{
                width: 140,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarproductos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarproductos',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Productos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
