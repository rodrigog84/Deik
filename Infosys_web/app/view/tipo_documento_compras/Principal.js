Ext.define('Infosys_web.view.tipo_documento_compras.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tipodocumentoprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tipos de Movimientos',
    store: 'Tipo_documento_compras',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nombre'
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
                action: 'agregartipodocumento',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-exel',
                action: 'exportarexceltipodocumento',
                text : 'Exportar Excel'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscartipodocumento',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrartipodocumento',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Tipo_documento_compras',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
