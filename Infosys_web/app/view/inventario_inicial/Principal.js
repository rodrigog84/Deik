Ext.define('Infosys_web.view.inventario_inicial.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.inventarioprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Inventario Inicial',
    store: 'Inventarios',
    height: 500,
    viewConfig: {
        forceFit: true

    },

    columns: [{
                header: "Id",
                flex: 1,
                itemId: 'idId',
                name: 'id',
                dataIndex: 'id',
                hidden: true
            },{
                header: "Numero Inventario",
                flex: 1,
                itemId: 'numId',
                name: 'num_inventario',
                dataIndex: 'num_inventario'
            },{
                header: "Fecha",
                flex: 1,
                type: 'date',
                renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
                dataIndex: 'fecha'
            },{
                header: "Nombre Bodega",
                flex: 1,
                dataIndex: 'nom_bodega'
            },{
                header: "Codigo Bodega",
                flex: 1,
                dataIndex: 'id_bodega',
                hidden : true
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
                action: 'inventarioprimario',
                text : 'Agregar'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarinventario',
                text : 'Editar'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelinventario'
            },{
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'DETALLE EXCEL',
                action:'exportarexceldetalle'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarinventario',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'inventariocerrar',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Inventarios',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
