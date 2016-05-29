Ext.define('Infosys_web.view.cuentascorrientes.ResumenMovimientoPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.resumenmovimientoprincipal',

    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Resumen Movimientos',
    store: 'cuentacorriente.Ctactemovimientos',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{         
        header: "Cuenta Contable",
        flex: 1,
        dataIndex: 'cuentacontable'
    },{
        header: "Cancelaciones",
        flex: 1,
        dataIndex: 'cancelaciones',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "depositos",
        flex: 1,
        dataIndex: 'depositos',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "Otros Ingresos",
        flex: 1,
        dataIndex: 'otrosingresos',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "Cargos",
        flex: 1,
        dataIndex: 'cargos',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "Abonos",
        flex: 1,
        dataIndex: 'abonos',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [{
                            xtype: 'datefield',
                            fieldLabel: '<b>Fecha Desde:</b>',
                            width: 250,
                            name: 'fecdesde',
                            itemId: 'fecdesdeId',
                            value: new Date(),
                            format: 'Y-m-d',
            },{
                            xtype: 'datefield',
                            fieldLabel: '<b>Fecha Hasta:</b>',
                            width: 250,
                            name: 'fechasta',
                            itemId: 'fechastaId',
                            value: new Date(),
                            format: 'Y-m-d',
            },{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarmovimientos',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarresmovimientos'
            },{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'generarresmovpdf'
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
            store: 'cuentacorriente.Ctactemovimientos',
            displayInfo: true
        }];
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    } 
});
