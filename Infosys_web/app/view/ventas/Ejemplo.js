Ext.define('Infosys_web.view.ventas.Ejemplo', {
    extend: 'Ext.window.Window',
    alias : 'widget.ventasejemplo',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.form.field.Display',
        'Ext.form.field.TextArea',
        'Ext.tab.Panel',
        'Ext.tab.Tab',
        'Ext.form.FieldSet',
        'Ext.form.field.Checkbox',
        'Ext.form.field.Date',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.toolbar.Separator'
    ],

    height: 408,
    width: 879,
    layout: 'fit',
    title: 'Ficha Articulo',

    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    margin: 8,
                    layout: {
                        type: 'vbox',
                        align: 'stretch'
                    },
                    items: [
                        {
                            xtype: 'container',
                            height: 155,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 60,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            height: 30,
                                            maxHeight: 30,
                                            width: 300,
                                            fieldLabel: 'Codigo'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 50,
                                            labelWidth: 50,
                                            value: ''
                                        },
                                        {
                                            xtype: 'textareafield',
                                            width: 400,
                                            fieldLabel: 'Descripcion'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    height: 40,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            height: 30,
                                            maxHeight: 30,
                                            width: 300,
                                            fieldLabel: 'Codigo'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 50,
                                            labelWidth: 50,
                                            value: ''
                                        },
                                        {
                                            xtype: 'textfield',
                                            height: 30,
                                            maxHeight: 30,
                                            width: 400,
                                            fieldLabel: 'Descripcion 2'

                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    height: 40,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            height: 30,
                                            maxHeight: 30,
                                            width: 300,
                                            fieldLabel: 'Codigo'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 50,
                                            labelWidth: 50,
                                            value: ''
                                        },
                                        {
                                            xtype: 'textfield',
                                            height: 30,
                                            maxHeight: 30,
                                            width: 400,
                                            fieldLabel: 'Proveedor'
                                        },
                                        {
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 20,
                                            labelWidth: 50,
                                            value: ''
                                        },
                                        {
                                            xtype: 'button',
                                            flex: 1,
                                            iconCls: 'icon-search',
                                            height: 25,
                                            maxHeight: 25,
                                            maxWidth: 30,
                                            width: 30,
                                            text: ''
                                        },
                                        {
                                            xtype: 'button',
                                            flex: 1,
                                            iconCls: 'icon-reset',
                                            height: 25,
                                            maxHeight: 25,
                                            maxWidth: 30,
                                            width: 30,
                                            text: ''
                                        }
                                    ]
                                }
                            ]
                        },
                        {
                            xtype: 'tabpanel',
                            flex: 1,
                            activeTab: 0,
                            items: [
                                {
                                    xtype: 'panel',
                                    margin: 4,
                                    title: 'Datos generales',
                                    items: [
                                        {
                                            xtype: 'container',
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    height: 250,
                                                    maxHeight: 250,
                                                    width: 480,
                                                    title: '',
                                                    items: [
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            height: 40,
                                                            width: 500,
                                                            fieldLabel: '',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 30,
                                                                    maxHeight: 30,
                                                                    width: 370,
                                                                    fieldLabel: 'Codigo'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    flex: 1,
                                                                    maxWidth: 20,
                                                                    labelWidth: 50,
                                                                    value: ''
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    iconCls: 'icon-add',
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    maxWidth: 30,
                                                                    width: 30,
                                                                    text: '>>'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    iconCls: 'icon-add',
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    maxWidth: 30,
                                                                    width: 30,
                                                                    text: '>>'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            height: 40,
                                                            width: 500,
                                                            fieldLabel: '',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 30,
                                                                    maxHeight: 30,
                                                                    width: 370,
                                                                    fieldLabel: 'Codigo'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    flex: 1,
                                                                    maxWidth: 20,
                                                                    labelWidth: 50,
                                                                    value: ' '
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    height: 25,
                                                                    iconCls: 'icon-add',
                                                                    maxHeight: 25,
                                                                    maxWidth: 30,
                                                                    width: 30,
                                                                    text: '>>'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    height: 25,
                                                                    iconCls: 'icon-add',
                                                                    maxHeight: 25,
                                                                    maxWidth: 30,
                                                                    width: 30,
                                                                    text: '>>'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            height: 40,
                                                            width: 500,
                                                            fieldLabel: '',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 30,
                                                                    maxHeight: 30,
                                                                    width: 370,
                                                                    fieldLabel: 'Codigo'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    flex: 1,
                                                                    maxWidth: 20,
                                                                    labelWidth: 50,
                                                                    value: ''
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    maxWidth: 30,
                                                                    width: 30,
                                                                    text: '>>'
                                                                },
                                                                {
                                                                    xtype: 'button',
                                                                    flex: 1,
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    maxWidth: 30,
                                                                    width: 30,
                                                                    text: '>>'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    height: 250,
                                                    maxHeight: 250,
                                                    width: 350,
                                                    title: '',
                                                    items: [
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        },
                                                        {
                                                            xtype: 'checkboxfield',
                                                            anchor: '100%',
                                                            fieldLabel: '',
                                                            boxLabel: 'Es una rticulo...'
                                                        }
                                                    ]
                                                }
                                            ]
                                        },
                                        {
                                            xtype: 'container',
                                            height: 200,
                                            layout: {
                                                type: 'hbox',
                                                align: 'stretch'
                                            },
                                            items: [
                                                {
                                                    xtype: 'fieldset',
                                                    width: 480,
                                                    collapsible: true,
                                                    title: '',
                                                    items: [
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            height: 40,
                                                            width: 462,
                                                            fieldLabel: '',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    width: 190,
                                                                    fieldLabel: 'Codigo'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    flex: 1,
                                                                    maxWidth: 50,
                                                                    labelWidth: 50,
                                                                    value: ''
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    width: 190,
                                                                    fieldLabel: 'Descripcion 2'
                                                                }
                                                            ]
                                                        },
                                                        {
                                                            xtype: 'fieldcontainer',
                                                            height: 40,
                                                            width: 462,
                                                            fieldLabel: '',
                                                            layout: {
                                                                type: 'hbox',
                                                                align: 'stretch'
                                                            },
                                                            items: [
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    width: 190,
                                                                    fieldLabel: 'Codigo'
                                                                },
                                                                {
                                                                    xtype: 'displayfield',
                                                                    flex: 1,
                                                                    maxWidth: 50,
                                                                    labelWidth: 50,
                                                                    value: ''
                                                                },
                                                                {
                                                                    xtype: 'textfield',
                                                                    height: 25,
                                                                    maxHeight: 25,
                                                                    width: 190,
                                                                    fieldLabel: 'Descripcion 2'
                                                                }
                                                            ]
                                                        }
                                                    ]
                                                },
                                                {
                                                    xtype: 'fieldset',
                                                    flex: 1,
                                                    collapsible: true,
                                                    title: '',
                                                    items: [
                                                        {
                                                            xtype: 'datefield',
                                                            anchor: '100%',
                                                            fieldLabel: 'Label'
                                                        }
                                                    ]
                                                }
                                            ]
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: 'Lista precios',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldLabel: 'Label'
                                        }
                                    ]
                                },
                                {
                                    xtype: 'panel',
                                    title: 'otro'
                                }
                            ]
                        }
                    ]
                }
            ],
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
                            text: 'Aceptar'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            iconCls: 'icon-reset',
                            text: 'Cancelar',
                            scope: this,                       
                            xtype: 'button',
                            handler: this.close
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }

});