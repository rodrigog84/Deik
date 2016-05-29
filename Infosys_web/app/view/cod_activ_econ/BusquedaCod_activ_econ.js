Ext.define('Infosys_web.view.cod_activ_econ.BusquedaCod_activ_econ' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedacodactivecon',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Codigo Actividad Economica',
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

            title : 'Actividad Economica',
            store: 'Cod_activ_eco',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Nombre",
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
                itemId: 'bcodactiveconId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarccodactivecon',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcodactivecon',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cod_activ_econ',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
