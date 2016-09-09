Ext.define('Infosys_web.view.recepciones.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.recepcionesprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Recepcion de Compras',
    store: 'Ordencompra_recepcion',
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
        header: "Id Proveedor",
        flex: 1,
        dataIndex: 'id_proveedor',
        hidden: true
    },{
        header: "Numero Orden",
        flex: 1,
        dataIndex: 'num_recepcion'
    },{
        header: "Empresa",
        width: 350,
        dataIndex: 'empresa'
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut'
    },{
        header: "id_vendedor",
        flex: 1,
        dataIndex: 'id_vendedor',
        hidden: true
    },{
        header: "Vendedor",
        flex: 1,
        dataIndex: 'nom_vendedor'
    },{
        header: "Direccion",
        flex: 1,
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
        dataIndex: 'ciudad',
        hidden: true
    },{
        header: "Comuna",
        flex: 1,
        dataIndex: 'comuna',
        hidden: true
    },{
        header: "Contacto",
        flex: 1,
        dataIndex: 'nombre_contacto'
    },{
        header: "Telefono Contacto",
        flex: 1,
        dataIndex: 'telefono_contacto'
    },{
        header: "E-Mail Contacto",
        flex: 1,
        dataIndex: 'mail_contacto'
    },{
        header: "Afecto",
        flex: 1,
        dataIndex: 'Afecto',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Descuento",
        flex: 1,
        dataIndex: 'descuento',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'neto',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Iva",
        flex: 1,
        dataIndex: 'iva',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")},
        hidden: true
    },{
        header: "Total",
        flex: 1,
        dataIndex: 'total',
        align: 'right',
        renderer: function(valor){return Ext.util.Format.number((valor),"0,00")}
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
    },{
        header: "Estado",
        flex: 1,
        dataIndex: 'estado',
        hidden: true
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
                action: 'agregarordencompra',
                hidden: true
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                action: 'editarorden',
                text : 'Editar/Agregar',
                hidden: true
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                text: 'Recepcionar',
                action: 'recepcionarordencompra',
                hidden: true
            },{
                xtype: 'button',
                iconCls: 'icon-add',
                text: 'Recep Forzada',
                action: 'recepcionforzada',
                hidden: true
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action: 'exportarordencompra4'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'EXCEL',
                action:'exportarexcelordencomprap'
            },'->',{
                xtype: 'button',
                iconCls: 'icon-email',
                text: 'E-mail',
                action: 'enviaremail'
            },{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                width: 130,
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                value: "Nombre",
                store : 'ordencompra.Selector'
            },{
                width: 230,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: ''
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                text : 'Buscar',
                action: 'buscarorden'                
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarordendecompra',
                text : 'Cerrar'
            }
            ] 
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Ordencompra_recepcion',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
