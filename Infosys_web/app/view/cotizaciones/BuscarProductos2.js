Ext.define('Infosys_web.view.cotizaciones.BuscarProductos2' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.buscarproductos2',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Productos Editar',
    layout: 'fit',
    autoShow: true,
    width: 1080,
    height: 580,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Productos',
            store: 'Productosf',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
          columns: [{
                header: "Id",
                width: 100,
                dataIndex: 'id'
            },{
                header: "Codigo de Barra",
                width: 100,
                dataIndex: 'codigo'
            },{
                header: "Nombres",
                width: 580,
                dataIndex: 'nombre'
            },{
                header: "Ubicacion Fisica",
                flex: 1,
                dataIndex: 'nom_ubi_prod',
                hidden: true
            },{
                header: "Precio Venta",
                flex: 1,
                dataIndex: 'p_venta',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
            },{
                header: "Precio Neto",
                flex: 1,
                dataIndex: 'p_neto',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")},
                hidden: true
            },{
                header: "Stock",
                width: 100,
                align: 'right',
                dataIndex: 'stock'
            }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 450,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarprocoti',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 15,
            action: 'seleccionarproductos2',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Productosf',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
