Ext.define('Infosys_web.view.proveedores.BusquedaProveedor' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedaproveedor',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Proveedores',
    layout: 'fit',
    autoShow: true,
    width: 780,
    height: 280,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Proveedores',
            store: 'Proveedores',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
            columns: [{
                    header: "Nombre",
                    flex: 1,
                    dataIndex: 'nombres'
                },{
                    header: "Apellido Paterno",
                    flex: 1,
                    dataIndex: 'apellido_paterno'
                },{
                    header: "Apellido Materno",
                    flex: 1,
                    dataIndex: 'apellido_materno'
                },{
                    header: "Direccion Accionistas",
                    flex: 1,
                    dataIndex: 'direccion'
                },{
                    header: "Ciudad",
                    flex: 1,
                    dataIndex: 'nombre_ciudad'
                },{
                    header: "Telefono",
                    flex: 1,
                    dataIndex: 'fono'
                },{
                    header: "Rut",
                    flex: 1,
                    dataIndex: 'rut'
                },{
                    header: "Dv",
                    flex: 1,
                    dataIndex: 'dv'
                },{
                    header: "E-Mail",
                    flex: 1,
                    dataIndex: 'e_mail'
                },{
                    header: "Comuna",
                    flex: 1,
                    dataIndex: 'id_comuna'
                },{
                    header: "Estado",
                    flex: 1,
                    dataIndex: 'estado'
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bclientenombreId',
                fieldLabel: 'nombrea'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarclientes',
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
            store: 'Proveedores',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
