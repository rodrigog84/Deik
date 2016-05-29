Ext.define('Infosys_web.view.cuentascorrientes.CreacionCuentasPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.creacioncuentasprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Asociaci&oacute;n de Cuentas',
    store: 'cuentascontable',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Codigo",
        width:100,
        dataIndex: 'codigo'
    },{
        header: "Nombre",
        flex : 1,
        dataIndex: 'nombre'
    },{         
        header: "Tiene Imputacion",
        width:150,
        dataIndex: 'tiene_imputacion'
    },{
        header: "Tipo Cancelaci&oacute;n",
        width:150,
        dataIndex: 'tipo_cancelacion'
    },{
            header: "Asociar Cuentas",
            xtype:'actioncolumn',
            width:150,
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Asociar Cuentas',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('creacioncuentasprincipal');
                    vista.fireEvent('asociacuenta',rec)
                }
            }]
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            '->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarcuentacontable',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarpantalla',
                text : 'Cerrar'                        
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'cuentascontable',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
