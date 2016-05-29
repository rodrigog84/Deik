Ext.define('Infosys_web.view.cuentascorrientes.VerCartola' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.vercartola',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Cartola Cuentas Corrientes',
    layout: 'fit',
    autoShow: true,
    width: 1200,
    height: 450,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        var ctacte = me.ctacte;
        var cliente = me.cliente;
        var rut = me.rut;
        var total_debe = me.total_debe;
        var total_haber = me.total_haber;



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
                width: 200,
                xtype: 'displayfield',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold',
                fieldLabel: 'Rut',
                value : rut
            },'-',{
                width: 250,
                xtype: 'displayfield',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold',
                fieldLabel: 'Saldo Cuenta',
                value : saldo_cta_cte,
                align: 'right',
                renderer: function(valor){return "$ "+Ext.util.Format.number(parseInt(valor),"0,00")}          
            },'->',{
                xtype: 'button',
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarcartola'
            },'-',{
                xtype: 'button',
                iconCls : 'icon-pdf',
                text: 'Imprimir PDF',
                action:'generarcartolapdf'
            },{
                xtype: 'textfield',
                itemId: 'idctacte',
                name : 'idctacte',
                value : ctacte,
                hidden: true
            }
            ]      
        },{
            xtype: 'toolbar',
            dock: 'bottom',
            items: [
            {
                width: 270,
                xtype: 'displayfield',
                fieldLabel : 'TOTALES',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold'
            },'->',{
                width: 150,
                xtype: 'displayfield',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold',
                fieldLabel: 'Debe',
                value : total_debe,
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}          
            },'-',{
                width: 150,
                xtype: 'displayfield',
                labelStyle: ' font-weight:bold',
                fieldStyle: 'font-weight:bold',
                fieldLabel: ' Haber',
                value : total_haber,
                align: 'right',
                renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}
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
            fields: ['origen','referencia', 'debe','haber','glosa','fecvencimiento','fecha','comprobante','idcomprobante'],
            proxy: {
              type: 'ajax',
                actionMethods:  {
                    read: 'POST'
                 },              
                url : preurl +'cuentacorriente/getCartola?idcuentacorriente='+ctacte,
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
        header: "Origen",
        width: 150,
        dataIndex: 'origen'
        
    },{
        header: "Referencia",
        width: 150,
        dataIndex: 'referencia'
        
    },{
        header: "Comprobante",
        width: 120,
        dataIndex: 'comprobante'
        
    },{
        header: "Debe",
        width: 90,
        dataIndex: 'debe',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'  
    },{
        header: "Haber",
        width: 90,
        dataIndex: 'haber',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'    
    },{
        header: "Glosa",
        width: 270,
        dataIndex: 'glosa'
    },{
        header: "Fecha Venc.",
        width: 100,
        dataIndex: 'fecvencimiento'
    },{
        header: "Fecha",
        width: 100,
        dataIndex: 'fecha'
    },{
            header: "Comprobante",
            xtype:'actioncolumn',
            width:110,
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Comprobante',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                   // console.log(rec);
                    var vista = this.up('vercartola');
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
    }




    ],
        };
        
        this.callParent(arguments);
    }
});
