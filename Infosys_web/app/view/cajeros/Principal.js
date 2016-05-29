Ext.define('Infosys_web.view.cajeros.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cajerosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Cajeros',
    store: 'Cajeros',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Rut",
                flex: 1,
                dataIndex: 'rut'
            },{
                header: "Direccion",
                flex: 1,
                dataIndex: 'direccion'
           
            },{
                header: "Fono",
                flex: 1,
                dataIndex: 'fono'
           
            },{
                header: "Comision",
                flex: 1,
                dataIndex: 'comision'
           
            },{
                header: "Estado",
                flex: 1,
                dataIndex: 'estado'
           
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
                action: 'agregarcajeros',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarcajeros',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelcajeros'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcajeros',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcajeros',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cajeros',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
