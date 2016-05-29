Ext.define('Infosys_web.view.Preventa.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.preventaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Pre Venta',
    store: 'Preventa',
    height: 300,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
        hidden: true
               
    },{
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
        header: "Giro",
        width: 390,
        dataIndex: 'nom_giro',
        hidden: true
    },{
        header: "Direccion",
         width: 390,
        dataIndex: 'direccion',
        hidden: true
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor'
    },{
        header: "Id_Vendedor",
        flex: 1,
        dataIndex: 'id_vendedor',
        hidden: true
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        hidden: true,
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        aling: 'rigth'
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'desc',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Total Venta",
        flex: 1,
        dataIndex: 'total',       
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        align: 'right'        
    },{
        header: "Id Sucursal",
        flex: 1,
        dataIndex: 'id_sucursal',
        hidden: true
    },{
        header: "Direccion",
        flex: 1,
        dataIndex: 'direccion_sucursal',
        hidden: true
    },{
        header: "Comuna",
        flex: 1,
        dataIndex: 'comuna',
        hidden: true
    },{
        header: "Ciudad",
        flex: 1,
        dataIndex: 'ciudad',
        hidden: true
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarpreventa',
                text : 'Nueva Venta'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarpreventa',
                text : 'Editar / Agregar'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'exportarpreventa'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelpreventa'
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
            },{
                xtype: 'button',
                iconCls: 'icon-search',
                action: '',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpreventa',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Preventa',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
