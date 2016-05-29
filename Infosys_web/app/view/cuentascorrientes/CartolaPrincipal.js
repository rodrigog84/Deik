Ext.define('Infosys_web.view.cuentascorrientes.CartolaPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.cartolaprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Cartolas Cuentas Corrientes',
    store: 'Cartolascuentacorriente',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Rut Cliente",
        flex: 1,
        dataIndex: 'rut'
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
        xtype: 'numbercolumn', 
        format: '0,000.'        
    },{
        header: "Deuda Vencida",
        flex: 1,
        dataIndex: 'deudavencida',
        xtype: 'numbercolumn', 
        format: '0,000.'        
    },{
            header: "Ver",
            xtype:'actioncolumn',
            width:50,
            items: [{
                icon: 'images/search_page.png',  // Use a URL in the icon config
                tooltip: 'Ver Cartola',
                handler: function(grid, rowIndex, colIndex) {
                    var rec = grid.getStore().getAt(rowIndex);
                    //salert("Edit " + rec.get('firstname'));
                    var vista = this.up('cartolaprincipal');
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
            '->',{
                            xtype: 'combobox',
                            fieldLabel: '<b>Rut:</b>',
                            store : 'Cartolascuentacorriente',
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
            },'-',{
                            xtype: 'combobox',
                            fieldLabel: '<b>Nombre:</b>',
                            store : 'Cartolascuentacorriente',
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
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarctactecartola',
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
