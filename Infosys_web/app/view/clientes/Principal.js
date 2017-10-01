Ext.define('Infosys_web.view.clientes.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.clientesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Clientes',
    store: 'Clientes',
    height: 500,
    viewConfig: {
        forceFit: true,
        style: 'background-color: ##00FF00;'
    },
    columns: [{
        header: "Id",
        width: 390,
        dataIndex: 'id',
        hidden:true
        
    },{
        header: "Razon Social",
        width: 390,
        dataIndex: 'nombres'
        
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut',
        align: 'right',
        hidden: true
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rutmuestra',
        align: 'right'
    },{
        header: "Direccion",
         width: 390,
        dataIndex: 'direccion'
    },{
        header: "Giro",
        flex: 1,
        dataIndex: 'giro'
    },{
        header: "Ciudad",
        flex: 1,
        dataIndex: 'nombre_ciudad'
    },{
        header: "Comuna",
        flex: 1,
        dataIndex: 'nombre_comuna'
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
    },{
        header: "Estadoc",
        flex: 1,
        dataIndex: 'estadoc',
        hidden: true
    },{
        header: "Estado",
        flex: 1,
        dataIndex: 'estado',
        renderer: function(value){
            if (value == 1) {
                return 'VIGENTE';
             }
            if (value == 2) {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'INACTIVO';   
            }
            if (value == 3) {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'BLOQUEADO';   
            }
            if (value == 4) {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'PROTESTO VIGENTE';   
            }
            if (value == 5) {
             //return '<img src="http://localhost:999/rutaimg.jpg" />'
               return 'AUTORIZADO';   
            }
        }
    }
   
    ],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'validar',
                text : 'Agregar'
            },{
                xtype: 'button',
                iconCls: 'icon-edit',
                action: 'editarclientes',
                text : 'Editar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'eliminarclientes',
                text : 'Eliminar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelclientes'
            },'->',{
                xtype: 'button',
                iconCls : 'icon-search',
                text: 'Contactos',
                action:'despliegacontactosclientes'
            },{
                xtype: 'button',
                iconCls : 'icon-search',
                text: 'Sucursales',
                action:'despliegasucursales'
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
                action: 'buscarclientes',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarclientes',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Clientes',
            displayInfo: true
        }];
        
        this.callParent(arguments);
         this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }      
});
