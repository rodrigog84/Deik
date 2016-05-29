Ext.define('Infosys_web.view.clientes.Desplieguesucursales' ,{
    extend: 'Ext.window.Window',
    alias : 'widget.desplegarsucursales',
    
    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Sucursales Clientes',
    layout: 'fit',
    autoShow: true,
    width: 800,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {

        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                fieldDefaults: {
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    labelWidth: 90,                    
                    msgTarget: 'side'
                },

                items: [{
                        xtype: 'button',
                        iconCls: 'icon-add',
                        action: 'agregaSucursalesclientes',
                        text : 'Agregar'
                    
                    },{
                        xtype: 'textfield',
                        name : 'id_cliente',
                        itemId: 'id_clienteID',
                        fieldLabel: 'id cliente',
                        hidden: true

                    },{
                        xtype: 'textfield',
                        name : 'nombre',
                        itemId: 'nombreId',
                        width: 750,
                        fieldLabel: 'Razon Social',
                        readOnly: true
                    },{
          xtype: 'fieldset',
          title: 'Sucursales',
          height:330,
          items: [{
              xtype: 'grid',
              itemId: 'desplegarinicialId',
              store: 'Sucursales_clientes',                 
              height: 300,
              columns: [
                { header: "Razon Social", itemId: 'nombresId',width: 390, dataIndex: 'nombres', hidden: true },
                { header: "Rut", flex: 1, itemId: 'rutId', dataIndex: 'rut', hidden: true },
                { header: "Direccion", width: 390, dataIndex: 'direccion'},
                { header: "Ciudad", flex: 1, dataIndex: 'nombre_ciudad'},
                { header: "Comuna", flex: 1, dataIndex: 'nombre_comuna'},
                { header: "Telefono", flex: 1, dataIndex: 'fono_contacto', hidden: true },
                { header: "E-Mail", flex: 1, dataIndex: 'mail_contacto', hidden: true },
                { header: "Contacto", flex: 1, dataIndex: 'nombre_contacto', hidden: true}
              ]
          }],
        }
        ]
          }
        ];
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',{
                iconCls: 'icon-reset',
                text: 'Cerrar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
