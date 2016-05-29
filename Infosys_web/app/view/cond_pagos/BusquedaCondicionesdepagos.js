Ext.define('Infosys_web.view.cond_pagos.BusquedaCondicionesdepagos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedacondicionesdepagos',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Condiciones de Pagos',
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

            title : 'Condiciones de Pagos',
            store: 'Cond_pago',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Descripcion",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Cantidad Dias",
                flex: 1,
                dataIndex: 'dias'
            }]

        };
        this.dockedItems = [{

            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bcondicionnombreId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcondiciondepagos',
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
            store: 'Cond_pago',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
