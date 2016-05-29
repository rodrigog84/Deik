Ext.define('Infosys_web.view.subfamilias.BuscarSubfamilias' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedasubfamilias',
    
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

            title : 'Sub Familias',
            store: 'Subfamilia',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Nombre Sub Familia",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Familia",
                flex: 1,
                dataIndex: 'nom_familia'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bsubfamiliaId',
                fieldLabel: 'nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarsubfamilia',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionasubfamilia',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Subfamilia',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
