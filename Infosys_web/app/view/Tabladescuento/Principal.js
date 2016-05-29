Ext.define('Infosys_web.view.Tabladescuento.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.tablaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tabla Descuentos',
    store: 'Tabladescuento',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id'
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'nombre'
    },{
        header: "Porcentaje",
        flex: 1,
        dataIndex: 'porcentaje'
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
                action: 'agregartablas',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editartablas',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelbancos'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscartablas',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrartablas',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Tabladescuento',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
