Ext.define('Infosys_web.view.recaudacion.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.recaudacionprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Recaudacion',
    store: 'Recauda',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        align: 'right',
        dataIndex: 'id',
        hidden: true               
    },{
        header: "Id_caja",
        flex: 1,
        align: 'right',
        dataIndex: 'id_caja',
        hidden: true
               
    },{
        header: "Caja",
        flex: 1,
        align: 'right',
        dataIndex: 'nom_caja'               
    },{
        header: "Id_cajero",
        flex: 1,
        align: 'right',
        dataIndex: 'id_cajero',
        hidden: true
               
    },{
        header: "Cajero",
        width: 140,
        align: 'right',
        dataIndex: 'nom_cajero'
               
    },{
        header: "Documento",
        flex: 1,
        align: 'right',
        dataIndex: 'num_ticket'
               
    },{
        header: "Comprobante",
        flex: 1,
        align: 'right',
        dataIndex: 'num_comp'
               
    },{
        header: "Fecha Venta",
        flex: 1,
        dataIndex: 'fecha',
        align: 'center',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
    },{
        header: "Id",
        flex: 1,
        align: 'right',
        dataIndex: 'id_cliente',
        hidden: true
    },{
        header: "Rut",
        flex: 1,
        align: 'right',
        dataIndex: 'rut_cliente'
    },{
        header: "Razon Social",
        width: 390,
        dataIndex: 'nom_cliente'
    },{
        header: "Vendedor",
        width: 180,
        dataIndex: 'nom_vendedor'
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'desc',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")},
        hidden: true
    },{
        header: "Total Venta",
        flex: 1,
        dataIndex: 'total',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
        
    },],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'Editapago',
                text : 'Editar'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Edita / Imprimir PDF',
                action:'exportarrecaudacionPdf'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarecauda'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Libro Recaudacion PDF',
                action:'exportarlibrorecaudacion'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Actualizar',
                action:'actualizar',
                hidden: true
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombresId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: '',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarrecaudacion',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Recauda',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
