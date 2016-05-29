Ext.define('Infosys_web.view.cajas.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cajasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Cajas',
    store: 'Cajas',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Nombre Caja",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Cajero",
                flex: 1,
                dataIndex: 'nom_cajero'
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
                action: 'agregarcajas',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarcajas',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcajas',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcajas',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cajas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
