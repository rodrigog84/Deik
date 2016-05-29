Ext.define('Infosys_web.view.bancos.BusquedaBancos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedabancos',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Bancos',
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

            title : 'Bancos',
            store: 'Banco',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Bancos",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bbancosnombreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarbancos',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarbancos',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Banco',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
