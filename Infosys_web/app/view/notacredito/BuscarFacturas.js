Ext.define('Infosys_web.view.notacredito.BuscarFacturas' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarfacturas',
    
    requires: ['Ext.toolbar.Paging'],
    title : '<b>Facturas</b>',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : '<b>Facturas</b>',
            store: 'Factura2',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Id",
                flex: 1,
                itemId: 'idId',
                dataIndex: 'id',
                hidden: true
            },{
                header: "Numero",
                 width: 190,
                dataIndex: 'num_factura'
                
            },{
                header: "Neto",
                flex: 1,
                dataIndex: 'neto',
                labelAlign: 'rigth',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            
               
            },{
                header: "Iva",
                flex: 1,
                dataIndex: 'iva',
                labelAlign: 'rigth',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            
            },{
                header: "Total",
                flex: 1,
                dataIndex: 'totalfactura',
                labelAlign: 'rigth',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            },{
                header: "Fecha",
                flex: 1,
                dataIndex: 'fecha_factura',
                type: 'date',
                renderer:Ext.util.Format.dateRenderer('d/m/Y') 
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 450,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Numero'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarfac',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarfactura',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Factura2',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
