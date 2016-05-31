Ext.define('Infosys_web.view.facturaelectronica.HistLibroCompraVenta' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.histlibrocompraventa',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    //title : 'Lista Contribuyentes Autorizados',
    title : 'Hist&oacute;rico Libros de Compra/Venta',
    store: 'Loglibros',
    //autoHeight: true,
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id Libro",
        flex: 1,
        dataIndex: 'id',
        align: 'right',
        hidden: true
               
    },{
        header: "Mes",
        flex : 1,
        dataIndex: 'mes',
        align: 'left'
    },{
        header: "A&ntilde;o",
        flex : 1,
        dataIndex: 'anno'
    },{         
        header: "Tipo Libro",
        flex : 1,
        dataIndex: 'tipo_libro'
    },{         
        header: "Fecha Creaci&oacute;n",
        flex : 1,
        dataIndex: 'fecha_creacion'
    },{
            header: "Ver XML",
            xtype:'actioncolumn',
            width:70,
            align: 'center',
            items: [{
                icon: 'images/download-icon.png',  // Use a URL in the icon config
                tooltip: 'Descargar XML',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('histlibrocompraventa');
                    vista.fireEvent('verEstadoDte',rec,4)
                }
            }]
    }],
    
    initComponent: function() {

        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            '->',
            /*{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarctactecancelacion',
                text : 'Buscar'
            },*/{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpantalla',
                text : 'Cerrar'                        
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Loglibros',
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
