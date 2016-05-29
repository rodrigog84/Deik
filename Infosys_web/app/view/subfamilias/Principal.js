Ext.define('Infosys_web.view.subfamilias.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.subfamiliasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Sub Familias',
    store: 'Subfamilia',
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
                action: 'agregarsubfamilias',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarsubfamilias',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarsubfamilia',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarsubfamilias',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Subfamilia',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
