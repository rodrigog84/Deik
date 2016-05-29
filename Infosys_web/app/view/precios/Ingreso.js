Ext.define('Infosys_web.view.precios.Ingreso', {
    extend: 'Ext.window.Window',
    alias : 'widget.preciosingresar',

    requires: [
        'Ext.form.FieldContainer',
        'Ext.button.Button',
        'Ext.form.field.Display',
        'Ext.form.field.ComboBox',
        'Ext.grid.Panel',
        'Ext.grid.column.Number',
        'Ext.grid.column.Date',
        'Ext.grid.column.Boolean',
        'Ext.grid.View',
        'Ext.toolbar.Toolbar',
        'Ext.toolbar.Fill',
        'Ext.form.field.Number',
        'Ext.toolbar.Separator'
    ],

    autoShow: true,
    height: 640,
    width: 1200,
    layout: 'fit',
    title: 'Actualizacion de Precios',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('precios.Items');
        stItms.removeAll();
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
                            height: 100,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 37,
                                    labelWidth: 120,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [  {
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            allowBlank: false,
                                            name: 'numero',
                                            itemId: 'numeroId',
                                            fieldLabel: '<b>NUMERO</b>',
                                            readOnly: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 45
                                           
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 170,
                                            fieldLabel: '<b>FECHA</b>',
                                            itemId: 'fechaId',
                                            name: 'fecha',
                                            value: new Date()
                                        },{
                                            xtype: 'displayfield',
                                            width: 50
                                           
                                        }
                                    ]
                                },{
                                    xtype: 'fieldset',
                                    title: '<b>ITEMS DOCUMENTOS</b>',
                                    fieldDefaults: {
                                        labelWidth: 90,
                                        align: 'center'                        
                                    },
                                    items: [
                                    {
                                    xtype: 'container',
                                    layout: {
                                        type: 'vbox'
                                    },
                                    defaults: {
                                        flex: 1
                                    },
                                    items: [

                                    {
                                        xtype: 'fieldcontainer',
                                        layout: 'hbox',
                                        align: 'center',     
                                        items: [{
                                            xtype: 'textfield',
                                            width: 240,
                                            fieldLabel: 'Codigo',
                                            itemId: 'codigoId',
                                            style: 'font-weight: bold;'
                                        }, {xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>ID</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            itemId: 'productoId',
                                            name : 'id_producto',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>ID</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 280,
                                            itemId: 'nomproductoId',
                                            name : 'nom_producto',
                                            hidden: true
                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'button',
                                            text: 'Buscar Productos',
                                            itemId: 'buscarproc',
                                            maxHeight: 25,
                                            width: 120,
                                            allowBlank: true,
                                            action: 'buscarproductos'
                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'numberfield',
                                            width: 150,
                                            labelWidth: 50,
                                            fieldLabel: 'Stock',
                                            itemId: 'stockId',
                                            style: 'font-weight: bold;',
                                            readOnly: true,
                                        },{xtype: 'splitter'},
                                        {
                                            xtype: 'numberfield',
                                            width: 210,
                                            labelWidth: 50,
                                            minValue: 0,
                                            fieldLabel: 'Precio',
                                            readOnly: true,
                                            itemId: 'valorOriginalId',
                                            style: 'font-weight: bold;'

                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'numberfield',
                                            width: 280,
                                            minValue: 0,
                                            value: 0,
                                            fieldLabel: 'Nuevo Precio',
                                            itemId: 'nuevovalorId',
                                            style: 'font-weight: bold;'
                                        },
                                        {xtype: 'splitter'},
                                        {
                                            xtype: 'button',
                                            text: 'Agregar',
                                            iconCls: 'icon-plus',
                                            width: 105,
                                            allowBlank: true,
                                            action: 'agregarItem'
                                        }]
                                    }

                                    ]
                                }]

                                 }

                                        ]
                        },{
                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle',
                            labelWidth: 50,
                            store: 'precios.Items',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem'
                            }
                            ],
                            height: 410,
                            columns: [
                                    { text: 'IdProducto',  dataIndex: 'idproducto', width: 250,hidden: true },
                                    { text: 'Codigo',  dataIndex: 'codigo', width: 250},
                                    { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                    { text: 'Stock',  dataIndex: 'stock', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                    { text: 'Precio',  dataIndex: 'p_venta', width: 100, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                    { text: 'Nuevo Precio',  dataIndex: 'precionuevo', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} }
                                ]
                            }
                    ]
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'bottom',
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: ['->',
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            action: 'grabaringreso',
                            text: 'Grabar'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
