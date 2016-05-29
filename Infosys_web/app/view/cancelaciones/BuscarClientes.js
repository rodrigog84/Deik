Ext.define('Infosys_web.view.cancelaciones.BuscarClientes' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.cancelacionesbuscarclientes',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Clientes',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        var record = me.record;

        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Clientes',
            store: 'Cuentacorriente',
            autoHeight: true,
            viewConfig: {
                forceFit: true,
                listeners: {
                    itemdblclick: function(dataview, r, item, index, e) {
                        var win =this.up('cancelacionesbuscarclientes')
                        record.set({cliente: parseInt(r.get('id'))})
                        Ext.Ajax.request({
                           url: preurl + 'cuentacorriente/getCuentaCorriente/' + r.get('id') ,
                           success: function(response, opts) {
                              var obj = Ext.decode(response.responseText);
                              record.set({saldo: obj.data[0].saldo});  
                           },
                           failure: function(response, opts) {
                              console.log('server-side failure with status code ' + response.status);
                           }
                        })
                        win.close()
                    }
                }
            },
           columns: [{
        header: "Razon Social",
        width: 390,
        dataIndex: 'cliente'
        
    },{
        header: "Rut",
        flex: 1,
        itemId: 'rutId',
        dataIndex: 'rut'
    }],
        };
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                width: 450,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },
            '-',
            {
                xtype: 'button',
                iconCls: 'icon-search',
                text : 'Buscar',

                handler: function(){
                    var view =this.up('cancelacionesbuscarclientes')
                    var grid = view.down('grid');
                    var gridTb = view.down('pagingtoolbar');
                    var st = grid.getStore();
                    var stTb = gridTb.getStore();
                    var nombre = view.down('#nombreId').getValue()

                    Ext.Ajax.request({
                       url: preurl + 'cuentacorriente/getByName/',
                        params: {
                            nombre: nombre
                        },               
                       success: function(response, opts) {
                                var jsonData = Ext.decode(response.responseText)
                                var jsonRecords = jsonData.data;
                                st.loadData(jsonRecords);            
                                stTb.loadData(jsonRecords);            
                       },
                       failure: function(response, opts) {
                          console.log('server-side failure with status code ' + response.status);
                       }
                    })   

             
                    //st.proxy.extraParams = {nombre : nombre}
                    //st.load();
                }            

            }
            ]      
        },{
            xtype: 'button',
            margin: 5,
            action: 'seleccionarcliente',
            dock: 'bottom',
            text : 'Seleccionar',
            handler: function(){
                var win =this.up('cancelacionesbuscarclientes')
                var grid = win.down('grid');

                if (grid.getSelectionModel().hasSelection()) {
                    var row = grid.getSelectionModel().getSelection()[0];
                    record.set({cliente: parseInt(row.get('id'))})
                    Ext.Ajax.request({
                       url: preurl + 'cuentacorriente/getCuentaCorriente/' + record.get('cuenta') + '/' + row.get('id') ,
                       success: function(response, opts) {
                          var obj = Ext.decode(response.responseText);
                          record.set({saldo: obj.data[0].saldo});  
                       },
                       failure: function(response, opts) {
                          console.log('server-side failure with status code ' + response.status);
                       }
                    })


                    win.close()
                }else{
                    Ext.Msg.alert('Alerta', 'Selecciona un registro.');
                    return;  
                }

            }            
        },
        {
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cuentacorriente',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
