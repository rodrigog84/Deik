Ext.define('Infosys_web.view.cuentascorrientes.OtrosingresosPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.otrosingresosprincipal',

    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Otros Ingresos Cuentas Corrientes',
    store: 'Cuentacorriente',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Rut Cliente",
        flex: 1,
        dataIndex: 'rut',
        align: 'right'
    },{
        header: "Cliente",
        flex: 1,
        dataIndex: 'cliente'
    },{         
        header: "Cuenta Contable",
        flex: 1,
        dataIndex: 'cuentacontable'
    },{
        header: "Deuda Total",
        flex: 1,
        dataIndex: 'saldo',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'
    },{
        header: "Deuda Vencida",
        flex: 1,
        dataIndex: 'deudavencida',
        align: 'right',
        xtype: 'numbercolumn', 
        format: '0,000.'       
    },{
            header: "Ver Comprobantes",
            xtype:'actioncolumn',
            width:150,
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Comprobantes',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('otrosingresosprincipal');
                    console.log(vista)
                    vista.fireEvent('verCartola',rec,1)
                }
            }]
    },{
            header: "Ver Cartola",
            xtype:'actioncolumn',
            width:100,
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Cartola',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('otrosingresosprincipal');
                    console.log(vista)
                    vista.fireEvent('verCartola',rec,2)
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
                action: 'agregarotrosingresos',
                text : 'Agregar Ingresos'
            },'->',{
                            xtype: 'combobox',
                            fieldLabel: '<b>Rut:</b>',
                            store : 'Cuentacorriente',
                            displayField: 'rut_sf',
                            valueField: 'rut_sf',
                            triggerAction: 'all',
                            queryMode: 'local',
                            editable: true,
                            emptyText : 'Ingresar Rut',
                            width: 300,
                            name: 'rutcliente',
                            itemId: 'rutcliente',
                            listConfig: {
                                    width :  450,
                                    minWidth : 450
                            }                               
            },{
                            xtype: 'combobox',
                            fieldLabel: '<b>Nombre:</b>',
                            store : 'Cuentacorriente',
                            displayField: 'cliente',
                            valueField: 'cliente',
                            triggerAction: 'all',
                            queryMode: 'local',
                            editable: true,
                            emptyText : 'Ingresar Nombre',
                            width: 300,
                            name: 'nombrecliente',
                            itemId: 'nombrecliente',
                            listConfig: {
                                    width :  450,
                                    minWidth : 450
                            }                               
            },'-',/*{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarctacteotrosingresos',
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
        this.on('beforedestroy',function(combo){
            if(combo.leaveFilter === true) return;
            combo.getStore().clearFilter();
        });             
    },
    loadStore: function() {
        this.getStore().load();
    }
});
