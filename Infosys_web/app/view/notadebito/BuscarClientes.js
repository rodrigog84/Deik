Ext.define('Infosys_web.view.notadebito.BuscarClientes' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.notadebitobuscarclientes',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Clientes',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Clientes',
            store: 'Clientes',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [{
        header: "Razon Social",
        width: 390,
        dataIndex: 'nombres'
        
    },{
        header: "Rut",
        flex: 1,
        itemId: 'rutId',
        dataIndex: 'rut',
        hidden: true
    },{
        header: "Rut",
        flex: 1,
        itemId: 'rutmuestraId',
        dataIndex: 'rutmuestra'
    },{
        header: "Direccion",
         width: 390,
        dataIndex: 'direccion',
        hidden: true
    },{
        header: "Giro",
        flex: 1,
        dataIndex: 'giro',
        hidden: true
    },{
        header: "Ciudad",
        flex: 1,
        dataIndex: 'nombre_ciudad',
        hidden: true
    },{
        header: "Comuna",
        flex: 1,
        dataIndex: 'nombre_comuna',
        hidden: true
    },{
        header: "Telefono",
        flex: 1,
        dataIndex: 'fono',
        hidden: true
    },{
        header: "E-Mail",
        flex: 1,
        dataIndex: 'e_mail',
         hidden: true
    },{
        header: "Descuento %",
        flex: 1,
        dataIndex: 'descuento',
        hidden: true
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nombre_vendedor',
        hidden: true
    },{
        header: "Condicion Pago",
        flex: 1,
        dataIndex: 'nom_id_pago',
        hidden: true
    },{
        header: "Cupo Disponible",
        flex: 1,
        dataIndex: 'cupo_disponible',
        hidden: true
    },{
        header: "Impuesto Adicional",
        flex: 1,
        dataIndex: 'imp_adicional',
        hidden: true
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
                action: 'buscar',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcliente',
            dock: 'bottom',
            text : 'Seleccionar'
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Clientes',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
