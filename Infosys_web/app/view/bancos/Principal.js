Ext.define('Infosys_web.view.bancos.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.bancosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Bancos',
    store: 'Banco',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Bancos",
        flex: 1,
        dataIndex: 'nombre'
    },{
        header: "Codigo",
        flex: 1,
        dataIndex: 'codigo'
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
                action: 'agregarbancos',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarbancos',
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
                action: 'buscarbancos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarbancos',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Banco',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
