Ext.define('Infosys_web.view.ventas.Principalfactura' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.facturasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Facturacion',
    store: 'Factura',
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
        header: "Forma",
        flex: 1,
        dataIndex: 'forma',
        align: 'right',
        hidden: true
               
    },{
        header: "Id Cliente",
        flex: 1,
        dataIndex: 'id_cliente',
        align: 'right',
        hidden: true
               
    },{
        header: "Numero Documento",
        flex: 1,
        dataIndex: 'num_factura',
        align: 'right'
               
    },{
        header: "Fecha Emision ",
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
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
    },{
        header: "Total",
        flex: 1,
        dataIndex: 'totalfactura',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
     
        
    }],
    
    initComponent: function() {
        var me = this
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'mfactura',
                text : 'Genera Venta'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'mfacturaglosa',
                text : 'Glosa'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'mfacturaganado',
                text : 'Ganado',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-add',
                text: 'Edita Factura',
                action:'editafactura',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Impr. PDF',
                action:'generarfacturapdf'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'EXCEL',
                action:'exportarexcelfacturas'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'PDF Libro',
                action:'generarlibropdf'
            },'->',{
                xtype: 'combo',
                align: 'center',
                width: 260,
                labelWidth: 85,
                maxHeight: 25,
                matchFieldWidth: false,
                listConfig: {
                    width: 175
                },
                itemId: 'tipoDocumentoId',
                fieldLabel: '<b>DOCUMENTO</b>',
                fieldCls: 'required',
                store: 'Tipo_documento.Selector',
                valueField: 'id',
                displayField: 'nombre'
            },{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 100,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'clientes.Selector'
            },{
                width: 200,
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
                action: 'cerrarfactura',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Factura',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }      
});
