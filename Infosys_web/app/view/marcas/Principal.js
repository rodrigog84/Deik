Ext.define('Infosys_web.view.marcas.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.marcasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Marcas',
    store: 'Marcas',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Codigo",
        flex: 1,
        dataIndex: 'codigo'
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
                action: 'agregarmarcas',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarmarcas',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarmarcas',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarmarcas',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Marcas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
