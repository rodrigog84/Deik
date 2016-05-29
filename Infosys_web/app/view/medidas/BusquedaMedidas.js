Ext.define('Infosys_web.view.medidas.BusquedaMedidas' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedamedidas',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Ubicaciones',
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

            title : 'Unidades de Medida',
            store: 'Medidas',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Unidades de Medida",
                flex: 1,
                dataIndex: 'nombre'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bmedidasmbreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarmedidas',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarmedidas',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Medidas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
