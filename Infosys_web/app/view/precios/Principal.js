Ext.define('Infosys_web.view.precios.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.preciosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Precios',
    store: 'Precios',
    height: 500,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "Codigo",
        flex: 1,
        dataIndex: 'cod_producto',
        align: 'center'
    },{
        header: "ID",
        flex: 1,
        dataIndex: 'id_producto',
        hidden: true
        
    },{
        header: "Nombre Producto",
        flex: 1,
        dataIndex: 'nom_producto'
        
    },{
        header: "Precio Original",
        flex: 1,
        dataIndex: 'valor_original',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Precio Nuevo",
        flex: 1,
        dataIndex: 'nuevalor',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Stock",
        flex: 1,
        dataIndex: 'stock',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        renderer:Ext.util.Format.dateRenderer('d/m/Y')

        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'ingresar',
                text : 'Ingresar'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'subirexcel',
                text : 'Agregar'
            },{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'actualizar',
                text : 'Actualizar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'EXCEL LISTA',
                action:'exportarexcelproductos'
            },'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 110,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                value: "Nombre",
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'productos.Selector'
            },{
                width: 160,
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
                action: 'cerrarprecios',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Precios',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
