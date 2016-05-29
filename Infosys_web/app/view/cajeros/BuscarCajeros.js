Ext.define('Infosys_web.view.cajeros.BuscarCajeros' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarcajeros',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Cajeros',
    layout: 'fit',
    autoShow: true,
    width: 780,
    height: 280,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Cajeros',
            store: 'Cajeros',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                    header: "Nombre",
                    flex: 1,
                    dataIndex: 'nombres'
                },{
                    header: "Rut",
                    flex: 1,
                    dataIndex: 'rut'
                },{
                    header: "Telefono",
                    flex: 1,
                    dataIndex: 'fono',
                     hidden:true
                },{
                    header: "Comision",
                    flex: 1,
                    dataIndex: 'comision',
                     hidden:true
                },{
                    header: "Estado",
                    flex: 1,
                    dataIndex: 'estado',
                     hidden:true
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bcajeronombreId',
                fieldLabel: 'Nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcajeros',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcajero',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cajeros',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
