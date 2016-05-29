
Ext.define('Infosys_web.view.Preventa.Autoriza', {
    extend: 'Ext.window.Window',
    alias: 'widget.autorizacion',

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
    height: 145,
    width: 285,
    resizable: false,
    //closable: false,
    layout: 'fit',
    iconCls: 'icon-lock16',
    title: 'AUTORIZACION',
   
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
                            action: 'autoriza',
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
                            //value: '123456',
                            fieldLabel: 'Clave Autoriza',
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