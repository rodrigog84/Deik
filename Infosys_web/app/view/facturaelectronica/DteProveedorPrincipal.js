Ext.define('Infosys_web.view.facturaelectronica.DteProveedorPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dteproveeprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Lista Carga DTE Proveedores',
    store: 'Cargadteproveedores',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Proveedor",
        flex: 1,
        dataIndex: 'proveedor',
        align: 'left'
    },{
        header: "Email",
        width:200,
        dataIndex: 'e_mail'
    },{         
        header: "Fecha Documento",
        width:200,
        dataIndex: 'fecha_documento'
    },{         
        header: "Fecha Env&iacute;o",
        width:200,
        dataIndex: 'fecha_creacion'
    },{
            header: "XML Recepcion DTE",
            xtype:'actioncolumn',
            width:150,
            items: [{
                icon: 'images/download-icon.png',  // Use a URL in the icon config
                tooltip: 'Ver Recepcion DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vista = this.up('dteproveeprincipal');
                    vista.fireEvent('verxmlprovee',rec,1)
                }
            }]
    },{
            header: "XML Resultado DTE",
            xtype:'actioncolumn',
            width:150,
            items: [{
                icon: 'images/download-icon.png',  // Use a URL in the icon config
                tooltip: 'Ver Resultado DTE',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vista = this.up('dteproveeprincipal');
                    vista.fireEvent('verxmlprovee',rec,2)
                }
            }]
    },{
            header: "XML Envio Recibo",
            xtype:'actioncolumn',
            width:150,
            items: [{
                icon: 'images/download-icon.png',  // Use a URL in the icon config
                tooltip: 'Ver Envio Recibo',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    var vista = this.up('dteproveeprincipal');
                    vista.fireEvent('verxmlprovee',rec,3)
                }
            }]
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
                action: 'adddteprovee',
                text : 'Cargar DTE'
            },'->',
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
            store: 'Cuentacorriente',
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
