Ext.define('Infosys_web.view.comunas.BusquedaCliente' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedacomunas',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Comunas',
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

            title : 'Comunas',
            store: 'Comuna',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Nombre Comuna",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Region",
                flex: 1,
                dataIndex: 'id_region'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bcomunaId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcomunas',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcomuna',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Comuna',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
