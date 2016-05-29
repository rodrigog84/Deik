Ext.define('Infosys_web.view.proveedores.IngresarContactos', {
    extend: 'Ext.window.Window',
    alias : 'widget.contactoingresarproveedores',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Editar/Crear Contactos',
    layout: 'fit',
    autoShow: true,
    width: 480,
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
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [{
                        xtype: 'textfield',
                        name : 'id_cliente',
                        itemId: 'id_clienteID',
                        fieldLabel: 'Cliente',
                        hidden: true
                    },{
                        xtype: 'textfield',
                        itemId: 'nombreId',
                        name : 'nombre',
                        fieldLabel: 'Nombre Contacto'
                    },{
                        xtype: 'textfield',
                        name : 'email',
                        itemId: 'emailId',
                        fieldLabel: 'E_Mail'
                    },{
                        xtype: 'textfield',
                        itemId: 'fonoId',
                        name : 'fono',
                        fieldLabel: 'Telefono Contacto'
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabarcontactos'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];

        this.callParent(arguments);
    }
});
