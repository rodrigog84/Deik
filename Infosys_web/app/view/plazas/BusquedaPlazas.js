Ext.define('Infosys_web.view.plazas.BusquedaPlazas' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedaplazas',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Plazas',
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

            title : 'Plazas',
            store: 'Plaza',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Plazas",
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
                itemId: 'bplazosnombreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarplazos',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarplazos',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Plaza',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
