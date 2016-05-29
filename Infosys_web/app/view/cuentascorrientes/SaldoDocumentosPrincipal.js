Ext.define('Infosys_web.view.cuentascorrientes.SaldoDocumentosPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.saldodocumentosprincipal',

    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Saldo de Documentos',
    store: 'cuentacorriente.Saldodocumentos',
    autoHeight: true,
   // autoLoad: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{         
        header: "Cuenta Contable",
        width: 200,
        dataIndex: 'cuentacontable'
    },{
        header: "Docto.",
        flex: 1,
        dataIndex: 'documento'
    },{
        header: "Rut Cliente",
        flex: 1,
        dataIndex: 'rut'
    },{
        header: "Cliente",
        width: 300,
        dataIndex: 'cliente'
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },{
        header: "Fecha Venc.",
        flex: 1,
        dataIndex: 'fechavencimiento',
        renderer: Ext.util.Format.dateRenderer('d/m/Y')
    },{
        header: "Saldo por Vencer",
        flex: 1,
        dataIndex: 'saldoporvencer'
    },{
        header: "Saldo Vencido",
        flex: 1,
        dataIndex: 'saldovencido',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "D&iacute;as Morosidad",
        flex: 1,
        dataIndex: 'dias'
    },{
        header: "Saldo Documento",
        flex: 1,
        dataIndex: 'saldodocto',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    }],
    
    initComponent: function() {
        var me = this;
        //storeCtaCte = this.store;
       // Ext.getCmp("comment-grid").getStore().removeAll();
        //console.log(this.getStore());
         var cuentascontableabono = Ext.create('Ext.data.Store', {
            model: 'Infosys_web.model.cuentascontable',
            proxy: {
              type: 'ajax',
                url : preurl +'cuentacorriente/cuentasabono',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });  


        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                            xtype: 'combobox',
                            fieldLabel: '<b>Rut Cliente:</b>',
                            store : 'Cuentacorriente',
                            displayField: 'rut',
                            valueField: 'rut',
                            triggerAction: 'all',
                            queryMode: 'local',
                            editable: true,
                            emptyText : 'Ingresar Rut',
                            width: 200,
                            name: 'rutcliente',
                            itemId: 'rutcliente',
                            listConfig: {
                                    width :  300,
                                    minWidth : 300
                            }                               
            },{
                            xtype: 'combobox',
                            fieldLabel: '<b>Nombre Cliente:</b>',
                            store : 'Cuentacorriente',
                            displayField: 'cliente',
                            valueField: 'cliente',
                            triggerAction: 'all',
                            queryMode: 'local',
                            editable: true,
                            emptyText : 'Ingresar Nombre Cliente',
                            width: 280,
                            name: 'nombrecliente',
                            itemId: 'nombrecliente',
                            listConfig: {
                                    width :  300,
                                    minWidth : 300
                            }                            

            },{
                            xtype: 'combo',
                            fieldLabel: '<b>Cuenta Contable:</b>',
                            displayField: 'nombre',
                            valueField: 'id',
                            triggerAction: 'all',
                            selectOnTab: true,
                            editable: false,
                            width: 280,
                            emptyText : 'Seleccionar',
                            queryMode: 'remote',
                            store: cuentascontableabono,
                            itemId: 'cuentacontable',
                            listConfig: {
                                    width :  300,
                                    minWidth : 300
                            }
            },{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarsaldodocumentos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarsaldodocumentos'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'generarsaldodocumentospdf'
            },{
                xtype: 'button',
                iconCls : 'icon-email',
                text: 'Envio de correo',
                action:'generarsaldodocumentosmail'
            },'->',{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpantalla',
                text : 'Cerrar'                        
            }
            ]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'cuentacorriente.Librodiario',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }      
});
