Ext.define('Infosys_web.view.cotizaciones.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cotizacionprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Cotizaciones',
    store: 'Cotizaciones',
    height: 300,
    viewConfig: {
        forceFit: true
    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
        hidden: true
    },{
        header: "Id Cliente",
        flex: 1,
        dataIndex: 'id_cliente',
        hidden: true
    },{
        header: "Numero",
        width: 65,
        dataIndex: 'num_cotiza'
    },{
        header: "Contacto",
        width: 250,
        dataIndex: 'nombre_contacto'
    },{
        header: "Telefono",
       width: 70,
        dataIndex: 'telefono_contacto'
    },{
        header: "Mail",
        flex: 1,
        dataIndex: 'email_contacto'
    },{
        header: "Rut",
        width: 100,
        dataIndex: 'rut',
        align: 'right'
    },{
        header: "Empresa",
        width: 400,
        dataIndex: 'nombre'
    },{
        header: "Neto",
        width: 100,
        dataIndex: 'neto',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
    },{
        header: "Descuento",
        width: 100,
        dataIndex: 'descuento',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
    },{
        header: "Afecto",
        dataIndex: 'afecto',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")},
        hidden: true
    },{
        header: "Iva",
        dataIndex: 'iva',
        width: 100,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
    },{
        header: "Total",
        dataIndex: 'total',
        width: 100,
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
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
                text: 'Agregar',
                action: 'agregarcotizacion'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarcotiza',
                text : 'Editar / Agregar'
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'generaventa',
                text : 'Genera Ticket Venta'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-pdf',
                text: 'Imprimir PDF',
                action: 'exportarcotizacion'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-email',
                text: 'Enviar E-mail',
                action: 'enviaremail'
            },
            '->',
            {
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                value: "Nombre",
                store : 'cotizacion.Selector'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'Buscar',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarcotizacion',
                text : 'Cerrar'
            }
            ]      


        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cotizaciones',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
        // QUITA FILTROS DEL STORE.  SI NO SE QUITAN, SE CAE AL SALIR DE LA PÁGINA
        this.on('beforedestroy',function(combo){
            if(combo.leaveFilter === true) return;
            combo.getStore().clearFilter();
        }); 
    },
    loadStore: function() {
        this.getStore().load();
    }
});
