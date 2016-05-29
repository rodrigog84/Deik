Ext.define('Infosys_web.view.bodegas.BuscarBodegas' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedabodegas',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Bodegas',
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

            title : 'Bodegas',
            store: 'Bodegas',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Nombre Bodega",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Direccion",
                flex: 1,
                dataIndex: 'direccion'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bbodegasId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarbodegas',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarbodegas',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Bodegas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
