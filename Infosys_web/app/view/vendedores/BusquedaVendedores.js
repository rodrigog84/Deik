Ext.define('Infosys_web.view.vendedores.BusquedaVendedores' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarvendedores',
    
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

            title : 'Vendedores',
            store: 'Vendedores',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Rut",
                flex: 1,
                dataIndex: 'rut'
            },{
                header: "Direccion",
                flex: 1,
                dataIndex: 'direccion'
            },{
                header: "Fono",
                flex: 1,
                dataIndex: 'fono'
            },{
                header: "Comision",
                flex: 1,
                dataIndex: 'comision'
            },{
                header: "Estado",
                flex: 1,
                dataIndex: 'estado'
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
                action: 'buscarvendedores',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarvendedores',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Vendedores',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
