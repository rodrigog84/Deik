Ext.define('Infosys_web.view.guiasdespacho.Principalguiaspendientes' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.guiasprincipalpendientes',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'FACTURACION GUIAS DE DESPACHO',
    store: 'Guiasdespachopendientes2',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id Factura",
        flex: 1,
        dataIndex: 'id',
        align: 'right',
        hidden: true
               
    },{
        header: "Numero Guia",
        flex: 1,
        dataIndex: 'num_factura',
        align: 'right'
               
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha_factura',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Fecha Venc.",
        flex: 1,
        dataIndex: 'fecha_venc',
        type: 'date',
        renderer: Ext.util.Format.dateRenderer('d/m/Y'),
        align: 'center'
        
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut_cliente',
        align: 'right'

    },{
        header: "Razon Social",
         width: 390,
        dataIndex: 'nombre_cliente'
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor',
        hidden: true
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'sub_total',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
     
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'descuento',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
     
    },{
        header: "Afecto",
        flex: 1,
        dataIndex: 'neto',
         hidden: true,
         align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
     
    },{
        header: "I.V.A",
        flex: 1,
        dataIndex: 'iva',
         hidden: true,
         align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
     
    },{
        header: "Total Guia",
        flex: 1,
        dataIndex: 'totalfactura',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
     
        
    }],
    
    initComponent: function() {
        var me = this
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'factguia',
                text : 'Facturar Guias'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'marcaguia',
                text : 'Marcar Guias',
                hidden:true
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                action: 'generarguias',
                text: 'Edita / Imprimir PDF'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:''
            },'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'clientes.Selector'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarfact',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarguiapendientes',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Guiasdespachopendientes2',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }      
});
