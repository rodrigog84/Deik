Ext.define('Infosys_web.view.ubicaciones.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ubicacionesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Ubicaciones Fisicas',
    store: 'Ubicaciones',
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
                action: 'agregarubicaciones',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarubicaciones',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarubicaciones',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarubicaciones',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Ubicaciones',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
