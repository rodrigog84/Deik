Ext.define('Infosys_web.view.facturaelectronica.ConsumoFolios' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.consumofolios',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Lista Consumo de Folios Diario',
    store: 'Consumofolios',
    autoHeight: true,
    //height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha',
        align: 'right'
    },{         
        header: "Cantidad Folios",
        flex: 1,
        dataIndex: 'cant_folios',
        align: 'right'
    },{         
        header: "Folio Desde",
        flex: 1,
        dataIndex: 'folio_desde',
        align: 'right'
    },{         
        header: "Folio Hasta",
        flex: 1,
        dataIndex: 'folio_hasta',
        align: 'right'
    },{
            header: "XML",
            xtype:'actioncolumn',
            width:90,
            align: 'center',
            items: [{
                icon: 'images/xml-icon.png',  // Use a URL in the icon config
                tooltip: 'Descargar DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('consumofolios');
                    vista.fireEvent('verEstadoDte',rec,7)
                },
               /* isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    if(record.get('tipo_documento') == 101 || record.get('tipo_documento') == 103 || record.get('tipo_documento') == 105 || record.get('tipo_documento') == 107){
                        return false;
                    }else{
                        return true;
                    }
                }*/                
            }]
    },{
            header: "Estado DTE",
            xtype:'actioncolumn',
            width:90,
            align: 'center',
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Estado DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('consumofolios');
                    vista.fireEvent('verEstadoDte',rec,8)
                },
                /*isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    if(record.get('tipo_documento') == 101 || record.get('tipo_documento') == 103 || record.get('tipo_documento') == 105 || record.get('tipo_documento') == 107){
                        return false;
                    }else{
                        return true;
                    }
                }  */              
            }]
    }],
    
    initComponent: function() {

        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
           ,'->',
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
            store: 'Consumofolios',
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
