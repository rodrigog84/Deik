Ext.define('Infosys_web.view.ciudades.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ciudadesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Ciudades',
    store: 'Ciudad',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id'
    },{
        header: "Ciudades",
        flex: 1,
        dataIndex: 'nombre'
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
                action: 'agregarciudades',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarciudades',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelciudades'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarciudades',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarciudades',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Ciudad',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
