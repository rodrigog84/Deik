Ext.define('Infosys_web.view.Pago_caja.Facturas', {
    extend: 'Ext.window.Window',
    alias : 'widget.facturasvizualizar',

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
    height: 540,
    width: 1200,
    layout: 'fit',
    title: 'Facturacion',

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
                            height: 160,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 37,
                                    labelWidth: 120,
                                    width: 62,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [  {
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 200,
                                            allowBlank: false,
                                            name: 'tip_documento',
                                            itemId: 'tipodocumentoId',
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            readOnly: true


                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 100,
                                            name: 'preventa',
                                            itemId: 'preventaId',
                                            fieldLabel: '<b>Preventa</b>',
                                            hidden: true


                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 100,
                                            name: 'permite',
                                            value: "NO",
                                            itemId: 'permiteId',
                                            fieldLabel: '<b>permite</b>',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 100,
                                            name: 'valida',
                                            value: "NO",
                                            itemId: 'valida2Id',
                                            fieldLabel: '<b>validar</b>',
                                            hidden: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 142                                          
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            allowBlank: false,
                                            name: 'num_factura',
                                            itemId: 'numfacturaId',
                                            fieldLabel: '<b>NUMERO DOCUMENTO</b>',
                                            readOnly: true


                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 250,
                                            labelWidth: 150,
                                            allowBlank: false,
                                            name: 'id_factura',
                                            itemId: 'facturaId',
                                            fieldLabel: '<b>id DOCUMENTO</b>',
                                            hidden: true


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
                                            itemId: 'fechafacturaId',
                                            name: 'fecha_factura',
                                            value: new Date()
                                        },{
                                            xtype: 'displayfield',
                                            width: 50
                                           
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                             labelWidth: 50,
                                            width: 150,
                                            fieldLabel: '<b>VENC.</b>',
                                            itemId: 'fechavencId',
                                            name: 'fecha_venc',
                                            readOnly: true

                                        }
                                    ]
                                },
                                {
                                    xtype: 'fieldcontainer',
                                    height: 35,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            maxHeight: 25,
                                            width: 220,
                                            fieldLabel: '<b>id</b>',
                                            itemId: 'id_cliente',
                                            name : 'id',
                                            readOnly: true,
                                            hidden: true                                        
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            maxHeight: 25,
                                            width: 220,
                                            fieldLabel: '<b>RUT</b>',
                                            itemId: 'rutId',
                                            name : 'rut',
                                            readOnly: true                                         
                                        }, {xtype: 'splitter'},
                                        {
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>RAZON SOCIAL</b>',
                                            maxHeight: 25,
                                            labelWidth: 120,
                                            width: 845,
                                            itemId: 'nombre_id',
                                            name : 'nombre',
                                            readOnly: true
                                            
                                        }
                                    ]
                                }, {
                                    xtype: 'fieldcontainer',
                                    height: 30,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                         {
                                            xtype: 'textfield',
                                            fieldLabel: '<b>ID</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 580,
                                            itemId: 'id_sucursalID',
                                            name : 'id_sucursal',
                                            value: 0,
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'obsId',
                                            name : 'idobserva',
                                            fieldLabel: 'Id Observacion',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>DIRECCION</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 580,
                                            itemId: 'direccionId',
                                            name : 'direccion',
                                            readOnly: true
                                        },{xtype: 'splitter'},{
                                            xtype: 'button',
                                            text: 'Sucursal',
                                            itemId: 'sucursalId',
                                            maxHeight: 25,
                                            width: 70,
                                            allowBlank: true,
                                            action: 'buscarsucursalfactura'
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>GIRO</b>',
                                            labelWidth: 40,
                                            maxHeight: 25,
                                            width: 495,
                                            itemId: 'giroId',
                                            readOnly: true,
                                            name : 'giro'
                                          
                                        }
                                    ]
                                },{
                                    xtype: 'fieldcontainer',
                                    height: 30,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                       {
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'tipoCiudadId',
                                            name : 'nombre_ciudad',
                                            maxHeight: 25,
                                            width: 310,
                                            readOnly: true,
                                            fieldLabel: '<b>CIUDAD</b>'
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25,
                                            labelWidth: 50
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'tipoComunaId',
                                            name : 'nombre_comuna',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 310,
                                            fieldLabel: '<b>COMUNA</b>'
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25,
                                            labelWidth: 50
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'idvendedorId',
                                            name : 'id_vendedor',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 310,
                                            fieldLabel: '<b>ID</b>',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'vendedorId',
                                            name : 'nom_vendedor',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 310,
                                            fieldLabel: '<b>VENDEDOR</b>'
                                        }
                                    ]
                },

                            ]
                        },{
                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle',
                            labelWidth: 50,
                            store: 'Preventa_detalle',
                            height: 190,
                            columns: [
                                    { text: 'Producto',  dataIndex: 'nom_producto', width: 250 },
                                    { text: 'Precio Unitario',  dataIndex: 'valor_unit', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                    { text: 'Cantidad',  dataIndex: 'cantidad', width: 100 },
                                    { text: 'Descuento',  dataIndex: 'desc', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                    { text: 'Neto',  dataIndex: 'neto', flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                    { text: 'Iva',  dataIndex: 'iva', flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                    { text: 'Total',  dataIndex: 'total', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} }
                                ]
                            },{
                        xtype: 'fieldset',
                        title: 'Total Documento',
                        fieldDefaults: {
                        labelWidth: 120
                        },
                        items: [
                            {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'neto',
                            itemId: 'finaltotalnetoId',
                            readOnly: true,
                            fieldLabel: '<b>VALOR NETO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(total),"0.000")}

                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'neton',
                            itemId: 'finaltotalnetonId',
                            readOnly: true,
                            fieldLabel: '<b>VALOR NETO</b>',
                            labelAlign: 'top',
                            hidden: true
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'textfield',
                            width: 200,
                            value: 0,
                            name : 'descuento',
                            itemId: 'finaldescuentoId',
                            fieldLabel: '<b>DESCUENTO %</b>',
                            labelAlign: 'top',
                            readOnly: true,
                            renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")}
                        },{
                            xtype: 'numberfield',
                            width: 200,
                            value: 0,
                            name : 'descuenton',
                            itemId: 'finaldescuentonId',
                            fieldLabel: '<b>DESCUENTO %</b>',
                            labelAlign: 'top',
                            hidden: true
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'afecto',
                            itemId: 'finalafectoId',
                            readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")}
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'afecton',
                            itemId: 'finalafectonId',
                            readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top',
                            hidden: true
                        },{xtype: 'splitter'},
                        {
                            xtype: 'textfield',
                            width: 200,
                            fieldCls: 'required',
                            name : 'iva',
                            itemId: 'finaltotalivaId',
                            readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")} 
                        },{
                            xtype: 'numberfield',
                            width: 200,
                            fieldCls: 'required',
                            name : 'ivan',
                            itemId: 'finaltotalivanId',
                            readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top',
                            hidden: true
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 300,
                            name : 'total',
                            itemId: 'finaltotalId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL DOCUMENTO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")}
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpostId',
                            hidden: true
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalUnformat',
                            hidden: true
                        },{
                            xtype: 'numberfield',
                            itemId: 'tipocondpagoId',
                            hidden: true
                        },{
                            xtype: 'numberfield',
                            itemId: 'numchequeId',
                            hidden: true
                        }]
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
                    layout: {
                        type: 'hbox',
                        align: 'middle',
                        pack: 'center'
                    },
                    items: ['->',
                        {
                            xtype: 'button',
                            //iconCls: 'icono',
                            scale: 'large',
                            action: 'observaciones',
                            text: 'OBSERVACIONES',
                            hidden: true
                        },{
                            xtype: 'button',
                            //iconCls: 'icono',
                            scale: 'large',
                            action: 'grabarfactura',
                            text: 'IMPRIMIR'
                        },{
                            xtype: 'button',
                            //iconCls: 'icono',
                            scale: 'large',
                            action: 'salir',
                            text: 'CERRAR'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
