Ext.define('Infosys_web.view.cancelaciones.BuscarClientes' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.cancelacionesbuscarclientes',
    
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
        var record = me.record;

        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Clientes',
            store: 'Clientes',
            autoHeight: true,
            viewConfig: {
                forceFit: true,
                listeners: {
                    itemdblclick: function(dataview, r, item, index, e) {
                        var win =this.up('cancelacionesbuscarclientes')
                        record.set({cliente: parseInt(r.get('id'))})
                        console.log(record)
                        Ext.Ajax.request({
                           url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + r.get('id') ,
                           success: function(response, opts) {
                              var obj = Ext.decode(response.responseText);
                              record.set({saldo: obj.data[0].saldo});  
                           },
                           failure: function(response, opts) {
                              console.log('server-side failure with status code ' + response.status);
                           }
                        })
                        win.close()
                    }
                }
            },
           columns: [{
        header: "Razon Social",
        width: 390,
        dataIndex: 'nombres'
        
    },{
        header: "Rut",
        flex: 1,
        itemId: 'rutId',
        dataIndex: 'rut'
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
