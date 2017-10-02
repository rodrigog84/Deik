Ext.define('Infosys_web.view.usuarios.CambioClave', {
    extend: 'Ext.window.Window',
    alias: 'widget.CambioClave',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox'
    ],
    y: 150,
    draggable: false,
    height: 210,
    width: 385,
    resizable: false,
    layout: 'fit',
    //closable: false,
    iconCls: 'icon-lock16',
    title: 'Cambio Clave',
    //id: 'widlogin',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    items: [
                        {
                            xtype: 'tbfill'
                        },
                        {
                            xtype: 'button',
                            action: 'cambiar',
                            iconCls: 'icon-lock',
                            scale: 'medium',
                            text: 'Modificar'
                        }
                    ]
                }
            ],
            items: [
                {
                    xtype: 'form',
                    border: false,
                    bodyPadding: 10,
                    frameHeader: false,
                    title: '',
                    items: [
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            fieldLabel: 'Clave Actual',
                            itemId: 'ActualId',
                            name: 'passwordOr',
                            inputType: 'password'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            //value: '123456',
                            fieldLabel: 'Nueva Clave',
                            name: 'password1',
                            itemId: 'NuevaId',
                            inputType: 'password'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            //value: '123456',
                            fieldLabel: 'Repita Clave',
                            name: 'password2',
                            itemId: 'RepiteId',
                            inputType: 'password'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});