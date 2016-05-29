Ext.define('Infosys_web.view.comunas.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.comunasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Comunas',
    store: 'Comuna',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id'
    },{
        header: "Nombre Comuna",
        flex: 1,
        dataIndex: 'nombre'
    },{
        header: "Region",
        flex: 1,
        dataIndex: 'id_region'
    },{
        header: "Codigo Sii",
        flex: 1,
        dataIndex: 'cod_sii'
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
                action: 'agregarcomunas',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarcomunas',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelcomunas'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcomunas',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcomunas',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Comuna',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
