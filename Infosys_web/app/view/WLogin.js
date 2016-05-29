
Ext.define('Infosys_web.view.WLogin', {
    extend: 'Ext.window.Window',
    alias: 'widget.login',

    requires: [
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.button.Button',
        'Ext.form.Panel',
        'Ext.form.field.Text',
        'Ext.form.FieldContainer',
        'Ext.form.field.Checkbox'
    ],

    draggable: false,
    height: 165,
    width: 285,
    resizable: false,
    layout: 'fit',
    closable: false,
    iconCls: 'icon-lock16',
    title: 'Ingresar',
    id: 'widlogin',

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
                            action: 'login',
                            iconCls: 'icon-lock',
                            scale: 'medium',
                            text: 'Ingresar'
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
                            itemId: 'enter2Id',
                            fieldLabel: 'Usuario',
                            name: 'nombre'
                            //value: 'sergarr'
                        },
                        {
                            xtype: 'textfield',
                            anchor: '80%',
                            //value: '123456',
                            fieldLabel: 'Clave Acceso',
                            name: 'password',
                            itemId: 'enterId',
                            inputType: 'password'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});