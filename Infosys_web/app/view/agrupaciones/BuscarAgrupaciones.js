Ext.define('Infosys_web.view.agrupaciones.BuscarAgrupaciones' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedaagrupaciones',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Agrupaciones',
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

            title : 'Agrupaciones',
            store: 'Agrupacion',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Nombre Agrupacion",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Familia",
                flex: 1,
                dataIndex: 'nom_familia'
            },{
                header: "Sub-Familia",
                flex: 1,
                dataIndex: 'nom_subfamilia'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bagrupacionId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscaragrupaciones',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionagrupaciones',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Agrupacion',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
