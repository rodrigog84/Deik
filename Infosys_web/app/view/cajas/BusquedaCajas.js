Ext.define('Infosys_web.view.cajas.BusquedaCajas' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarcajas',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Cajas',
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

            title : 'Cajas',
            store: 'Cajas',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Nombre Caja",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Cajero",
                flex: 1,
                dataIndex: 'nom_cajero'
            },{
                header: "Correlativo",
                flex: 1,
                dataIndex: 'correlativo'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bcajaId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcajas',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcajas',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cajas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
