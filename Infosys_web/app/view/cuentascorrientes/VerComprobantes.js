Ext.define('Infosys_web.view.cuentascorrientes.VerComprobantes' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.vercomprobantes',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Comprobantes Cuentas Corrientes',
    layout: 'fit',
    autoShow: true,
    width: 900,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        var ctacte = me.ctacte;
        var cliente = me.cliente;
        var rut = me.rut;
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'displayfield',
                fieldLabel : 'Cliente',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold',
                value : cliente
            },'-',{
                width: 250,
                xtype: 'displayfield',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold',
                fieldLabel: 'Rut',
                value : rut
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cuentacorriente',
            displayInfo: true
        }];
        this.items = {
            xtype: 'grid',
            store:Ext.create('Ext.data.Store', {
            fields: ['idcomprobante','numcomprobante', 'tipo', 'proceso','glosa','fecha'],
            proxy: {
              type: 'ajax',
                actionMethods:  {
                    read: 'POST'
                 },              
                url : preurl +'cuentacorriente/getComprobante?idcuentacorriente='+ctacte,
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true            
            }),
            autoHeight: true,
            viewConfig: {
                forceFit: true,
            },
           columns: [{
        header: "Numero de Comprobante",
        flex: 1,
        dataIndex: 'numcomprobante'
        
    },{
        header: "Tipo de Comprobante",
        flex: 1,
        dataIndex: 'tipo'
    },{
        header: "Proceso",
        flex: 1,
        dataIndex: 'proceso'
    },{
        header: "Glosa",
        width: 200,
        dataIndex: 'glosa'
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'fecha'
    },{
            header: "Ver Comprobante",
            xtype:'actioncolumn',
            width:150,
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Comprobante',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                   // console.log(rec);
                    var vista = this.up('vercomprobantes');

                    vista.fireEvent('verComprobante',rec)
                },
                isDisabled: function(view, rowIndex, colIndex, item, record) {
                    // Returns true if 'editable' is false (, null, or undefined)
                    //console.log(record.get('idcomprobante'));
                    if(record.get('idcomprobante') != null && record.get('idcomprobante') != ''){
                        return false;
                    }else{
                        return true;
                    }
                }

            }]
    }],
        };
        
        this.callParent(arguments);
    }
});
