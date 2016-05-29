Ext.define('Infosys_web.view.medidas.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.medidasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Unidades de Medida',
    store: 'Medidas',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Ubicaciones Fisicas",
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
                action: 'agregarmedidas',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarmedidas',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarmedidas',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarmedidas',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Medidas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
