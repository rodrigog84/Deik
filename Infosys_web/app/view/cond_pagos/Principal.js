Ext.define('Infosys_web.view.cond_pagos.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.condicionesdepagosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Condiciones de Pago',
    store: 'Cond_pago',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Codigo",
                flex: 1,
                dataIndex: 'codigo'
            },{
                header: "Descripcion",
                flex: 1,
                dataIndex: 'nombre'
            },{
                header: "Dias Vencimiento",
                flex: 1,
                dataIndex: 'dias'
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
                action: 'agregarcondicionesdepagos',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarcondicionesdepagos',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelcondiciondepago'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcondicionesdepagos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcondicionesdepagos',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cond_pago',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
