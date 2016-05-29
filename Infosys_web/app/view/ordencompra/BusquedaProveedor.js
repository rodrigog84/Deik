Ext.define('Infosys_web.view.ordencompra.BusquedaProveedor' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.busquedaproveedor',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Proveedor',
    layout: 'fit',
    autoShow: true,
    width: 780,
    height: 480,
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
                header: "Nombre Empresa",
                 width: 350,
                dataIndex: 'nombres'
            },{
                header: "Rut",
                width: 350,
                dataIndex: 'rut'
            },{
                header: "Contacto",
                flex: 1,
                dataIndex: 'nombre_contacto'
            },{
                header: "Telefono Contacto",
                flex: 1,
                dataIndex: 'fono_contacto'
            },{
                header: "Mail Contacto",
                flex: 1,
                dataIndex: 'e_mail_contacto'
            },{
                header: "Fecha Ingreso",
                flex: 1,
                dataIndex: 'fecha_incorporacion',
                renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
            }]

        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 250,
                xtype: 'textfield',
                itemId: 'bproveedornombreId',
                fieldLabel: 'Nombre'
            },
            '-',{
                width: 250,
                xtype: 'textfield',
                itemId: 'bproveedorrutId',
                fieldLabel: 'Rut'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarproveedor',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarproveedor',
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
