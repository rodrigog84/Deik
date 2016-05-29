Ext.define('Infosys_web.view.familias.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.familiasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Familias',
    store: 'Familias',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Codigo",
        flex: 1,
        dataIndex: 'codigo'
    },{
        header: "Nombre Familia",
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
                action: 'agregarfamilias',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarfamilias',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarfamilias',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarfamilias',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Familias',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
