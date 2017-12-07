Ext.define('Infosys_web.view.existencia.PrincipalClientes' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.existenciaprincipalclientes',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Tarjeta Existencia Productos por Clientes',
    store: 'ExistenciasClientes',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id Producto",
        width: 290,
        dataIndex: 'id_producto',
         hidden: true        
    },{
        header: "Codigo",
        width: 150,
        dataIndex: 'codigo',
    },{
        header: "Nombre Producto",
        width: 290,
        dataIndex: 'nom_producto'
        
    },{
        header: "Cantidad",
        width: 100,
        dataIndex: 'cantidad_salida',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Valor",
        width: 100,
        dataIndex: 'valor_producto',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00.00")}

    },{
        header: "Tipo",
        width: 100,
        dataIndex: 'nom_tipo_movimiento'        
    },{
        header: "Documento",
        width: 100,
        dataIndex: 'num_movimiento',
        align: 'right'
    },{
        header: "Fecha Movimiento",
        flex: 1,
        renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
        dataIndex: 'fecha_movimiento'
        
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Editar Detalle',
                action:'editarexistencia',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelexistencia',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'ACTUALIZA',
                action:'actualizatabla',
                hidden: true
            },{
                width: 610,
                xtype: 'textfield',
                labelWidth: 120,
                itemId: 'razonidd',
                fieldLabel: 'Razon Social'
            },'->',{
                width: 180,
                xtype: 'textfield',
                labelWidth: 30,
                itemId: 'rutId',
                fieldLabel: 'Rut'
            },'-',{
                width: 180,
                xtype: 'textfield',
                labelWidth: 50,
                itemId: 'nombreId',
                fieldLabel: 'Codigo'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarexistencia',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarexistencia',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'ExistenciasClientes',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
