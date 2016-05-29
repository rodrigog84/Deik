Ext.define('Infosys_web.view.correlativos.BusquedaCorrelativos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedacorrelativos',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Correlativos',
    layout: 'fit',
    autoShow: true,
    width: 780,
    height: 480,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Correlativos',
            store: 'Correlativos',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Tipo",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Correlativo",
                flex: 1,
                dataIndex: 'correlativo'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bcorrelativoId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcorrelativo',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionacorrelativo',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Correlativos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
