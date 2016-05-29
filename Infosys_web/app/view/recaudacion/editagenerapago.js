Ext.define('Infosys_web.view.recaudacion.editagenerapago', {
    extend: 'Ext.window.Window',
    alias : 'widget.editagenerapago',

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
    width: 1310,
    layout: 'fit',
    title: 'Recaudacion Caja',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('recaudacion.Items');
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
                            height: 80,
                            layout: {
                                type: 'vbox',
                                align: 'stretch'
                            },
                            items: [
                                {
                                    xtype: 'fieldcontainer',
                                    height: 30,
                                    labelWidth: 120,
                                    width: 262,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [{
                                            width: 80,
                                            labelWidth: 20,
                                            xtype: 'textfield',
                                            itemId: 'valida2Id',
                                            value: "NO",
                                            fieldLabel: 'valida',
                                            readOnly: true,
                                            hidden :true
                                        },{
                                            width: 80,
                                            labelWidth: 20,
                                            xtype: 'textfield',
                                            itemId: 'recaudaId',
                                            fieldLabel: 'recau',
                                            readOnly: true,
                                            hidden :true
                                        },{
                                            width: 80,
                                            labelWidth: 20,
                                            xtype: 'textfield',
                                            itemId: 'cajaId',
                                            fieldLabel: 'Caja',
                                            readOnly: true,
                                            hidden :true
                                        },{
                                            width: 120,
                                            labelWidth: 40,
                                            xtype: 'textfield',
                                            itemId: 'nomcajaId',
                                            fieldLabel: '<b>CAJA</b>',
                                            //labelAlign: 'top',
                                            readOnly: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 5                                          
                                        },{
                                            width: 120,
                                            xtype: 'textfield',
                                            itemId: 'cajeroId',
                                            fieldLabel: 'Cajero',
                                            readOnly: true,
                                            hidden: true
                                        },{
                                            width: 210,
                                            labelWidth: 50,
                                            xtype: 'textfield',
                                            itemId: 'nomcajeroId',
                                            //labelAlign: 'top',
                                            fieldLabel: '<b>CAJERO</b>',
                                            readOnly: true
                                        },{
                                            xtype: 'displayfield',
                                            width: 5                                          
                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 105,
                                            width: 200,
                                            allowBlank: false,
                                            name: 'ticket',
                                            readOnly: true,
                                            itemId: 'comprobanteId',
                                            fieldLabel: '<b>COMPROBANTE</b>'

                                        },{
                                            xtype: 'displayfield',
                                            width: 5                                          
                                        },{
                                            xtype: 'combo',
                                            align: 'center',
                                            width: 280,
                                            maxHeight: 25,
                                            matchFieldWidth: false,
                                            listConfig: {
                                                width: 280
                                            },
                                            itemId: 'tipoDocumentoId',
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            fieldCls: 'required',
                                            store: 'Tipo_documento.Selector',
                                            valueField: 'id',
                                            displayField: 'nombre'
                                        },{
                                            xtype: 'displayfield',
                                            width: 5                                          
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 60,
                                            width: 140,
                                            allowBlank: false,
                                            name: 'num_factura',
                                            itemId: 'numfacturaId',
                                            fieldLabel: '<b>NUMERO</b>'

                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            name: 'valida',
                                            value: 0,
                                            itemId: 'validaId',
                                            fieldLabel: '<b>valida</b>',
                                            hidden: true

                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            name: 'contado',
                                            value: 0,
                                            itemId: 'contadoId',
                                            fieldLabel: '<b>CONTADO</b>',
                                            hidden: true

                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            name: 'cheuqes',
                                            value: 0,
                                            itemId: 'chequesId',
                                            fieldLabel: '<b>CHEQUES</b>',
                                            hidden: true

                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            name: 'otros',
                                            value: 0,
                                            itemId: 'otrosId',
                                            fieldLabel: '<b>OTROS</b>',
                                            hidden: true

                                        },{
                                            xtype: 'displayfield',
                                            width: 5                                          
                                        },{
                                            xtype: 'button',
                                            iconCls: 'icon-find',
                                            //scale: 'large',
                                            labelWidth: 30,
                                            maxHeight: 25,
                                            action: 'visualizar',
                                            text: 'Visualizar'
                                        },{
                                            xtype: 'displayfield',
                                            width: 5
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 60,
                                            width: 190,
                                            fieldLabel: '<b>FECHA</b>',
                                            itemId: 'fechafacturaId',
                                            name: 'fecha_factura',
                                            value: new Date()
                                        }
                                    ]
                                },{
                                    xtype: 'fieldcontainer',
                                    height: 37,
                                    width: 462,
                                    fieldLabel: '',
                                    layout: {
                                        type: 'hbox',
                                        align: 'stretch'
                                    },
                                    items: [
                                        {
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 160,
                                            allowBlank: false,
                                            name: 'ticket',
                                            itemId: 'idticketId',
                                            readOnly: true,
                                            fieldLabel: '<b>ID_TICKET</b>',
                                            hidden : true

                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 160,
                                            allowBlank: false,
                                            name: 'ticket',
                                            itemId: 'ticketId',
                                            readOnly: true,
                                            fieldLabel: '<b>TICKET</b>'

                                        },{
                                            xtype: 'displayfield',
                                            width: 25
                                        },{
                                            xtype: 'textfield',
                                            itemId: 'id_cliente',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            maxHeight: 25,
                                            width: 140,
                                            labelWidth: 40,
                                            fieldLabel: '<b>RUT</b>',
                                            itemId: 'rutId',
                                            name : 'rut',
                                            disabled : true                                            
                                        },{
                                            xtype: 'displayfield',
                                            width: 25
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>RAZON SOCIAL</b>',
                                            maxHeight: 25,
                                            labelWidth: 160,
                                            width: 619,
                                            itemId: 'nombre_id',
                                            name : 'nombre',
                                            disabled : true,                                            
                                            readOnly: true
                                            
                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                        },{
                                            xtype: 'combo',
                                            itemId: 'tipocondpagoId',
                                            width: 300,
                                            labelWidth: 85,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>COND.PAGO</b>',
                                            forceSelection : true,
                                            name : 'id_condpago',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Cond_pago'
                                        }
                                    ]
                                }
                                ,
                                 {
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
                                            fieldLabel: '<b>DIRECCION</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 120,
                                            width: 706,
                                            itemId: 'direccionId',
                                            name : 'direccion',
                                            disabled : true,                                            
                                            readOnly: true,
                                            hidden: true
                                        }, {xtype: 'splitter'},
                                       {
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>GIRO</b>',
                                            maxHeight: 25,
                                            labelWidth: 40,
                                            width: 570,
                                            itemId: 'giroId',
                                            readOnly: true,
                                            disabled : true,                                           
                                            name : 'giro',
                                            hidden: true
                                          
                                        }
                                    ]
                                },
                                {
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
                                            width: 210,
                                            readOnly: true,
                                            disabled : true,                                            
                                            fieldLabel: '<b>CIUDAD</b>',
                                            hidden: true
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25,
                                            labelWidth: 50,
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'tipoComunaId',
                                            name : 'nombre_comuna',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 210,
                                            disabled : true,                                           
                                            fieldLabel: '<b>COMUNA</b>',
                                            hidden: true
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25,
                                            labelWidth: 50,
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'VendedorId',
                                            name : 'nombre_vendedor',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 450,
                                            disabled : true,                                           
                                            fieldLabel: '<b>VENDEDOR</b>',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'idVendedorId',
                                            name : 'id_vendedor',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 450,
                                            disabled : true,                                           
                                            fieldLabel: '<b>ID</b>',
                                            hidden: true
                                        }
                                    ]
                    }
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
                            itemId: 'netoaId',
                            readOnly: true,
                            fieldLabel: '<b>VALOR NETO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(neto),"0,000")}
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'neto',
                            itemId: 'netoId',
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
                            itemId: 'descuentoaId',
                            fieldLabel: '<b>DESCUENTO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0.000")}
                        },{
                            xtype: 'numberfield',
                            width: 200,
                            value: 0,
                            name : 'descuento',
                            itemId: 'descuentoId',
                            fieldLabel: '<b>DESCUENTO</b>',
                            labelAlign: 'top',
                            hidden: true
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'afecto',
                            itemId: 'afectoaId',
                            readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(afecto),"0.000")}
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'afecto',
                            itemId: 'afectoId',
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
                            itemId: 'ivaaId',
                            readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")} 
                        },{
                            xtype: 'numberfield',
                            width: 200,
                            fieldCls: 'required',
                            name : 'iva',
                            itemId: 'ivaId',
                            readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top',
                            hidden: true
                             
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 300,
                            name : 'total',
                            itemId: 'totalaId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL DOCUMENTO</b>',
                            labelAlign: 'top',
                            renderer: function(valor){return Ext.util.Format.number(parseInt(total),"0.000")}

                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 300,
                            name : 'total',
                            itemId: 'totalId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL DOCUMENTO</b>',
                            labelAlign: 'top',
                            hidden: true
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpostId',
                            hidden: true
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalUnformat',
                            hidden: true
                        }]
                    }
                    ]

                },{
                        xtype: 'fieldset',
                        title: 'Condicion Venta',
                        align: 'top',

                        fieldDefaults: {
                        labelWidth: 120
                        },
                        items: [
                            {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 180,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'condpagoId',
                            fieldLabel: '<b>FORMA PAGO</b>',
                            fieldCls: 'required',
                            store: 'Cond_pago',
                            name: 'cond_pago',
                            valueField: 'id',
                            displayField: 'nombre'
                           
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 180,
                            minValue: 0,
                            name : 'afecto',
                            itemId: 'numchequeId',
                            fieldLabel: '<b>NUMCHEQUE</b>',
                            value: 0,
                            labelAlign: 'top',
                            disabled : false  
                        },{xtype: 'splitter'},{
                            xtype: 'combo',
                            labelAlign: 'top',
                            width: 210,
                            matchFieldWidth: false,
                            listConfig: {
                                width: 210
                            },
                            itemId: 'bancoId',
                            fieldLabel: '<b>BANCO</b>',
                            fieldCls: 'required',
                            store: 'Banco',
                            name: 'banco',
                            valueField: 'id',
                            displayField: 'nombre',
                            disabled : false  
                           
                        },{xtype: 'splitter'},
                        {
                            xtype: 'datefield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'fecha_cheq',
                            itemId: 'fechacheqId',
                             format: 'd/m/Y',
                             submitFormat: 'd/m/Y',
                            fieldLabel: '<b>FECHA</b>',
                            labelAlign: 'top',

                            value: new Date()
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valorpago',
                            value: 0,
                            minValue: 0,
                            readOnly: true,
                            itemId: 'valorpagoId',
                            fieldLabel: '<b>VALOR</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valorcancela',
                            minValue: 0,
                            value : 0,
                            itemId: 'valorcancelaId',
                            fieldLabel: '<b>CANCELA</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valorvuelto',
                            minValue: 0,
                            value : 0,
                            itemId: 'valorvueltoId',
                            fieldLabel: '<b>VUELTO</b>',
                            labelAlign: 'top',
                            readOnly: true,
                            disabled : true
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'button',
                            text: 'Agregar',
                            iconCls: '',
                            maxHeight: 60,
                            scale: 'large',
                            labelAlign: 'top',
                            action: 'agregarrecaudacion'
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 140,
                            name : 'valortotal',
                            itemId: 'valortotalId',
                            value : 0,
                            fieldLabel: '<b>TOTAL</b>',
                            hidden : true
                        }]
                    }
                    ]

                },{
                  xtype: 'fieldset',
                  title: 'Recaudacion ',
                  height: 270,
                  items: [{
                          xtype: 'grid',
                          tbar: [

                            {
                                xtype: 'button',
                                text: 'Eliminar',
                                iconCls: 'icon-delete',
                                allowBlank: true,
                                action: 'eliminaritem'
                            }
                            ],
                          itemId: 'recaudacionId',
                          title: 'Ingreso',
                          store: 'recaudacion.Items',
                          height: 240,
                          columns: [
                              { text: 'Forma Pago',  dataIndex: 'nom_forma', width: 250 },
                              { text: 'Documento',  dataIndex: 'num_cheque', width: 150},
                              { text: 'Valor', dataIndex: 'valor_pago', width: 150},
                              { text: 'Cancelado', dataIndex: 'valor_cancelado', width: 150},
                              { text: 'Vuelto', dataIndex: 'valor_vuelto', width: 150},
                              { text: 'Fecha Docu', dataIndex: 'fecha_comp', width: 150, renderer:Ext.util.Format.dateRenderer('d/m/Y')},
                              { text: 'Fecha Transac', dataIndex: 'fecha_transac', width: 150, renderer:Ext.util.Format.dateRenderer('d/m/Y')}
                             
                          ]
                      }],
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
                            action: 'grabarecaudacion',
                            text: 'Grabar / Emitir'
                        },
                        {
                            xtype: 'tbseparator'
                        },
                        {
                            xtype: 'button',
                            //iconCls: 'icono',
                            scale: 'large',
                            text: 'Cuenta Corriente'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
