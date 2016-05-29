Ext.define('Infosys_web.view.Preventa.BuscarPrecios' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarprecios',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Precios',
    layout: 'fit',
    autoShow: true,
    width: 450,
    height: 350,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Precios Descuentos',
            store: 'Preciosdescuentos',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
                header: "Id",
                width: 100,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Nombres",
                width: 340,
                dataIndex: 'nombre'
            },{
                header: "Valor",
                width: 100,
                dataIndex: 'valor',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 420,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarprecios',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Preciosdescuentos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
