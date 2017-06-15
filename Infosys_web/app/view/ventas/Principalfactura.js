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
        header: "Num Docto",
        flex: 1,
        dataIndex: 'num_factura',
        align: 'right'
               
    },{
        header: "Tipo Documento",
        dataIndex: 'tipo_doc',
        width:280,
        align: 'left'
               
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
         width: 300,
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
     
        
    },{
        header: "Orden Compra",
        flex: 1,
        dataIndex: 'orden_compra',
        align: 'right'        
    },{
            header: "Estado DTE",
            xtype:'actioncolumn',
            width:85,
            align: 'center',
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Estado DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('facturasprincipal');
                    vista.fireEvent('verEstadoDte',rec,1)
                },
                isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    if(record.get('tipo_documento') == 101 || record.get('tipo_documento') == 103 || record.get('tipo_documento') == 105){
                        return false;
                    }else{
                        return true;
                    }
                }                
            }]
    },{
            header: "DTE SII",
            xtype:'actioncolumn',
            width:70,
            align: 'center',
            items: [{
                icon: 'images/xml-icon.png',  // Use a URL in the icon config
                tooltip: 'Descargar DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('facturasprincipal');
                    vista.fireEvent('verEstadoDte',rec,2)
                },
                isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    if(record.get('tipo_documento') == 101 || record.get('tipo_documento') == 103 || record.get('tipo_documento') == 105){
                        return false;
                    }else{
                        return true;
                    }
                }                
            }]
    },{
            header: "DTE Cliente",
            xtype:'actioncolumn',
            width:90,
            align: 'center',
            items: [{
                icon: 'images/xml-icon.png',  // Use a URL in the icon config
                tooltip: 'Descargar DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('facturasprincipal');
                    vista.fireEvent('verEstadoDte',rec,5)
                },
                isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    if(record.get('tipo_documento') == 101 || record.get('tipo_documento') == 103 || record.get('tipo_documento') == 105){
                        return false;
                    }else{
                        return true;
                    }
                }                
            }]
    },{
            header: "Env&iacute;o SII",
            xtype:'actioncolumn',
            width:70,
            align: 'center',
            items: [{
                iconCls: 'icon-upload',  // Use a URL in the icon config
                tooltip: 'Ver Estado Env&iacute;o',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('facturasprincipal');
                    vista.fireEvent('verEstadoDte',rec,3)
                },
                isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    if(record.get('tipo_documento') == 101 || record.get('tipo_documento') == 103 || record.get('tipo_documento') == 105){
                        return false;
                    }else{
                        return true;
                    }
                }                
            }]     
        
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
                text: 'Imprimir PDF',
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
            },{                
                xtype: 'button',
                iconCls : 'icon-word',
                text: 'EXPORTAR TXT',
                action:'exporttxt'
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
                store : 'facturas.Selector2'
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
