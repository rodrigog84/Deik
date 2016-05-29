Ext.define('Infosys_web.view.ubicaciones.BusquedaUbicaciones' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedaubicaciones',
    
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

            title : 'Ubicaciones Fisicas',
            store: 'Ubicaciones',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Ubicaciones Fisicas",
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
                itemId: 'bciudadesnombreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarubicaciones',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarubicaciones',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Ubicaciones',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
