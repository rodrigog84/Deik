Ext.define('Infosys_web.view.comisiones.Principal',{
    extend: 'Ext.grid.Panel',
    alias : 'widget.comisionesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Vendedores',
    store: 'comision',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id'
            },{
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
            }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls : '',
                text: 'Genera Comisiones',
                action:'generarcomisionespdf'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscar',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrar',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'comision',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
