
Ext.define('Infosys_web.view.Preventa.Autoriza2', {
    extend: 'Ext.window.Window',
    alias: 'widget.autorizacion2',

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
    closable: false,
    layout: 'fit',
    iconCls: 'icon-lock16',
    title: 'VENDEDORES',
   
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
                            action: 'autoriza1',
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
                            fieldLabel: 'Clave Autoriza',
                            name: 'password',
                            itemId: 'enter1Id',
                            inputType: 'password'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});