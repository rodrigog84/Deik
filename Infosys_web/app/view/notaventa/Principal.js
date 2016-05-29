Ext.define('Infosys_web.view.notaventa.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.notaventaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Notaventa Venta',
    store: 'notaventa',
    height: 300,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Ticket",
        flex: 1,
        dataIndex: 'num_ticket'
               
    },{
        header: "Tipo Documento",
        flex: 1,
        dataIndex: 'id_tip_docu',
        hidden : true
               
    },{
        header: "Documento",
        flex: 1,
        dataIndex: 'nom_documento'
               
    },{
        header: "Fecha Venta",
        flex: 1,
        dataIndex: 'fecha_venta',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
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
        flex: 1,
        dataIndex: 'nom_vendedor'
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        aling: 'rigth',
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
                action: 'agregarnotaventa',
                text : 'Genera Venta'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarnotaventa',
                text : 'Editar / Agregar'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'exportarnotaventa'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelnotaventa'
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
                action: 'cerrarnotaventa',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'notaventa',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
