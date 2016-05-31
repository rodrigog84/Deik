Ext.define('Infosys_web.view.facturaelectronica.ContribuyentesAutorizados' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.contribuyentesautorizados',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Lista Contribuyentes Autorizados',
    store: 'Contribuyentesautorizados',
    //autoHeight: true,
    height: 500,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Rut",
        flex: 1,
        dataIndex: 'rut_contribuyente',
        align: 'left'
    },{
        header: "Raz&oacute;n Social",
        width:200,
        dataIndex: 'razon_social'
    },{         
        header: "Nro. Resoluci&oacute;n",
        width:200,
        dataIndex: 'nro_resolucion'
    },{         
        header: "Fecha Resoluci&oacute;n",
        width:200,
        dataIndex: 'fec_resolucion'
    },{         
        header: "E-mail",
        width:200,
        dataIndex: 'mail'
    },{         
        header: "Url",
        width:200,
        dataIndex: 'url'
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
                action: 'addlistacontribuyentes',
                text : 'Cargar Listado'
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
            store: 'Contribuyentesautorizados',
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
