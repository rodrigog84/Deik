Ext.define('Infosys_web.view.usuarios.Principal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.usuariosprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    
    iconCls: 'icon-grid',

    title : 'Bitacora de Actividades',
    store: 'Bitacora',
    autoHeight: true,
    viewConfig: {
        forceFit: true

    },
    columns: [{
        header: "Id",
        flex: 1,
        dataIndex: 'id',
        hidden: true
    },{
        header: "Actividad",
        flex: 1,
        dataIndex: 'operacion'
    },{
        header: "Nombre",
        flex: 1,
        dataIndex: 'nom_usuario'
    },{
        header: "Apellido",
        flex: 1,
        dataIndex: 'apellido_usuario'
    },{
        header: "Host",
        flex: 1,
        dataIndex: 'host',
        hidden: true
    },{
        header: "Fecha",
        flex: 1,
        dataIndex: 'modificado'
    },{
        header: "Tabla",
        flex: 1,
        dataIndex: 'tabla'
    },{
        header: "Registro",
        flex: 1,
        dataIndex: 'id_tabla',
        hidden: true
    }],
    
    initComponent: function() {
        var me = this

        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'top',
            items: [
            {
                xtype: 'button',
                width: 120,
                iconCls : 'icon-exel',
                text: 'Exportar EXCEL',
                action:'exportarexcelbitacora'
            },{
                width: 250,
                xtype: 'textfield',
                itemId: '',
                fieldLabel: '',
                hidden: true
            },'->',{
                width: 250,
                xtype: 'textfield',
                itemId: 'nombreId',
                fieldLabel: 'Nombre'
            },'-',{
                xtype: 'button',
                iconCls: 'icon-search',
                action: 'buscarbitacora',
                text : 'Buscar'
            },{
                xtype: 'button',
                iconCls: 'icon-delete',
                action: 'cerrarusuarios',
                text : 'Cerrar'
            }]      
        },{
            xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Bitacora',
            displayInfo: true
        }];
        
        this.callParent(arguments);
    }
});
