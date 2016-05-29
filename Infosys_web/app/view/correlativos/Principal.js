Ext.define('Infosys_web.view.correlativos.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.correlativosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Correlativos',
    store: 'Correlativos',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Tipo",
        flex: 1,
        dataIndex: 'nombre'
    },{
        header: "Correlativo",
        flex: 1,
        dataIndex: 'correlativo'
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarcorrelativos',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarcorrelativos',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcorrelativos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcorrelativos',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Correlativos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
