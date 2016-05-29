Ext.define('Infosys_web.view.cotizaciones.Desplieguecontactos' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.desplegarcontactoscotiza',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Busqueda Contactos',
    layout: 'fit',
    autoShow: true,
    width: 680,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        var me = this
        this.items = {
            xtype: 'grid',
            iconCls: 'icon-grid',

            title : 'Contactos',
            store: 'Contacto_clientes',
            autoHeight: true,
            viewConfig: {
                forceFit: true

            },
           columns: [
                { 
                    header: "IdContacto", 
                    itemId: 'idcontacto',
                    width: 390,
                    dataIndex: 'id',
                    hidden: true 
                },{ 
                    header: "Razon Social", 
                    itemId: 'nombresId',
                    width: 390,
                    dataIndex: 'nombres',
                    hidden: true 
                },{ 
                    header: "Rut", 
                    flex: 1, 
                    itemId: 'rutId', 
                    dataIndex: 'rut', 
                    hidden: true 
                },{ 
                    header: "Contacto", 
                    flex: 1,
                    itemId: 'contactoId', 
                    dataIndex: 'nombre'
                },{ 
                    header: "Telefono", 
                    flex: 1,
                    itemId: 'fonoId', 
                    dataIndex: 'fono'
                },{ 
                    header: "E-Mail", 
                    flex: 1,
                    itemId: 'emailId',
                    dataIndex: 'email'
                }
                
              ],
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
                action: 'buscar',
                text : 'Buscar'
            }
            ]      
        },{
            xtype: 'button',
            margin: 15,
            action: 'seleccionarcontactos',
            dock: 'bottom',
            text : 'Seleccionar'
        }];
        
        this.callParent(arguments);
    }
});
