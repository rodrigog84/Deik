Ext.define('Infosys_web.view.proveedores.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.proveedorprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Proveedores',
    store: 'Proveedores',
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Nombres",
        flex: 1,
        dataIndex: 'nombres'
        
    },{
        header: "Rut",
        width: 120,
        dataIndex: 'rut',
        align: 'right'
    },{
        header: "Direccion",
        flex: 1,
        dataIndex: 'direccion'
    },{
        header: "Ciudad",
        width: 120,
        dataIndex: 'nombre_ciudad'
    },{
        header: "Comuna",
        width: 120,
        dataIndex: 'nombre_comuna'
    },{
        header: "Telefono",
        width: 120,
        dataIndex: 'fono',
        hidden: true
    },{
        header: "E-Mail",
        flex: 1,
        dataIndex: 'e_mail',
        hidden: true
    },{
        header: "Fecha Incorporacion",
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
        flex: 1,
        dataIndex: 'fecha_incorporacion',
        hidden: true

    },{
        header: "Ultima Actualizacion",
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y'),  
        flex: 1,
        dataIndex: 'fecha_ult_actualiz',
        hidden: true

    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'agregarproveedor',
                text : 'Agregar'
            },{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarproveedor',
                text : 'Editar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarproveedores',
                text : 'Eliminar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelproveedor'
            },'->',{
                xtype: 'button',
                iconCls : 'icon-search',
                text: 'Contactos',
                action:'despliegacontactos'
            },{
                xtype: 'button',
                iconCls : 'icon-search',
                text: 'Sucursales',
                action:'despliegasucursalesproveedores'
            },{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                store : 'clientes.Selector'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarproveedor',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarproveedor',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Proveedores',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
