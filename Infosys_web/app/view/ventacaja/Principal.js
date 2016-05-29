Ext.define('Infosys_web.view.ventacaja.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ventacajaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Venta Cajas',
    store: 'Control_cajas',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
                header: "Id",
                flex: 1,
                dataIndex: 'id',
                hidden: true
            },{
                header: "Id_caja",
                flex: 1,
                dataIndex: 'id_caja',
                hidden: true
            },{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nom_caja'
           
            },{
                header: "Id_cajero",
                flex: 1,
                dataIndex: 'id_cajero',
                hidden: true
           
            },{
                header: "Nombre",
                flex: 1,
                dataIndex: 'nom_cajero'
           
            },{
                header: "Efectivo",
                flex: 1,
                dataIndex: 'efectivo',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
           
            },{
                header: "Cheques",
                flex: 1,
                dataIndex: 'cheques',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
           
            },{
                header: "Otros",
                flex: 1,
                dataIndex: 'otros',
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
           
            },{
                header: "Fecha",
                flex: 1,
                dataIndex: 'fecha',
                renderer: Ext.util.Format.dateRenderer('d/m/Y'),
                align: 'center'
           
            }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls: 'icon-edit',
                action: '',
                text : 'Editar'
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: '',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcontrolcaja',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Control_cajas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();

    }
});
