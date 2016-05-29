Ext.define('Infosys_web.view.ordencompra.Principaltodas' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.ordencompraprincipaltodas',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Ordenes de Compra Todas ',
    store: 'Orden_compratodas',
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
        dataIndex: 'num_orden'
    },{
        header: "Empresa",
        flex: 1,
        dataIndex: 'empresa'
    },{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut'
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
        header: "Descuento",
        flex: 1,
        dataIndex: 'descuento'
    },{
        header: "Neto",
        flex: 1,
        dataIndex: 'pretotal'
    },{
        header: "Iva",
        flex: 1,
        dataIndex: 'iva'
    },{
        header: "Total",
        flex: 1,
        dataIndex: 'total'
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        type: 'date',
        renderer:Ext.util.Format.dateRenderer('d/m/Y') 
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Edita / Imprimir PDF',
                action: 'exportarordencompra'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelordencompra'
            },'->',{
                xtype: 'combo',
                itemId: 'tipoSeleccionId',
                fieldLabel: '',
                forceSelection : true,
                editable : false,
                valueField : 'id',
                displayField : 'nombre',
                emptyText : "Seleccione",
                value: "Nombre",
                store : 'ordencompra.Selector'
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
            store: 'Orden_compratodas',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.getStore().load();
    }
});
