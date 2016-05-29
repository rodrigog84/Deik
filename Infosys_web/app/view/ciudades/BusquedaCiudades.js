Ext.define('Infosys_web.view.ciudades.BusquedaCiudades' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedaciudades',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Ciudades',
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

            title : 'Ciudades',
            store: 'Ciudad',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Ciudades",
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
                action: 'buscarciudades',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarciudades',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Ciudad',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
