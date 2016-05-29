Ext.define('Infosys_web.view.agrupaciones.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.agrupacionesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Agrupaciones',
    store: 'Agrupacion',
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
    },{
        header: "Familia",
        flex: 1,
        dataIndex: 'nom_familia'
    },{
        header: "Sub Familia",
        flex: 1,
        dataIndex: 'nom_subfamilia'
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
                action: 'agregaragrupaciones',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editaragrupaciones',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscaragrupaciones',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerraragrupaciones',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Agrupacion',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
