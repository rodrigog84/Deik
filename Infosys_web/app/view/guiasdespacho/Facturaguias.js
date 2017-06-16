Ext.define('Infosys_web.view.guiasdespacho.Facturaguias', {
    extend: 'Ext.window.Window',
    alias : 'widget.facturaguias',

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
    width: 1300,
    layout: 'fit',
    title: 'Factura Guias Despacho',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('guiasdespacho.Items');
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
                            height: 240,
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
                                            name: 'id_documento',
                                            itemId: 'tipodocumentoId',
                                            hidden: true
                                          
                                        },{
                                            xtype: 'textfield',
                                            name: 'id_factura',
                                            itemId: 'facturaId',
                                            hidden: true
                                          
                                        },{
                                            xtype: 'textfield',
                                            width: 450,
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            name: 'nom_documento',
                                            itemId: 'nomdocumentoId',
                                            value: 12,
                                            readOnly: true
                                          
                                        },{
                                            xtype: 'displayfield',
                                            width: 40                                          
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
                                            value: new Date(),
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
                                            itemId: 'id_cliente',
                                            name : 'id',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            msgTarget: 'side',
                                            maxHeight: 25,
                                            width: 220,
                                            fieldLabel: '<b>RUT</b>',
                                            itemId: 'rutId',
                                            name : 'rut'
                                            //disabled : true                                            
                                        }, {xtype: 'splitter'},
                                        {
                                            xtype: 'button',
                                            text: 'Buscar',
                                            maxHeight: 25,
                                            width: 80,
                                            allowBlank: true,
                                            //disabled : true,                                            
                                            action: 'validarut21',
                                            itemId: 'buscarBtn'
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>RAZON SOCIAL</b>',
                                            maxHeight: 25,
                                            labelWidth: 80,
                                            width: 845,
                                            itemId: 'nombre_id',
                                            name : 'nombre',
                                            //disabled : true,                                            
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
                                            hidden: true
                                        },{
                                            xtype: 'textareafield',
                                            itemId: 'obsId',
                                            name : 'idobserva',
                                            fieldLabel: 'Id Observacion',
                                            hidden: true
                                        },{
                                            xtype: 'textareafield',
                                            itemId: 'observaId',
                                            name : 'observacion',
                                            fieldLabel: 'Observacion',
                                            hidden: true
                                        },{
                                            xtype: 'textfield',
                                            fieldLabel: '<b>DIRECCION</b>',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 580,
                                            itemId: 'direccionId',
                                            name : 'direccion',
                                            //disabled : true,                                            
                                            readOnly: true
                                        },{xtype: 'splitter'},{
                                            xtype: 'button',
                                            text: 'Sucursal',
                                            itemId: 'sucursalId',
                                            maxHeight: 25,
                                            width: 70,
                                            allowBlank: true,
                                            action: 'buscarsucursaldespacho'
                                            //,disabled : true  
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>GIRO</b>',
                                            maxHeight: 25,
                                            width: 495,
                                            itemId: 'giroId',
                                            readOnly: true,
                                            //disabled : true,                                           
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
                                            width: 200,
                                            labelWidth: 60,
                                            readOnly: true,
                                            //disabled : true,                                            
                                            fieldLabel: '<b>CIUDAD</b>'
                                        },{
                                            xtype: 'displayfield',
                                            width: 15
                                            //labelWidth: 50
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'tipoComunaId',
                                            name : 'nombre_comuna',
                                            readOnly: true,
                                            maxHeight: 25,
                                            width: 200,
                                            labelWidth: 60,
                                            //disabled : true,                                           
                                            fieldLabel: '<b>COMUNA</b>'
                                        },{
                                            xtype: 'displayfield',
                                            width: 15
                                            //labelWidth: 50
                                        },{
                                            xtype: 'combo',
                                            itemId: 'tipoVendedorId',
                                            width: 300,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            labelWidth: 80,
                                            fieldLabel: '<b>VENDEDOR</b>',
                                            forceSelection : true,
                                            name : 'id_vendedor',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Vendedores',
                                            //disabled : true, 
                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                        },{
                                            xtype: 'combo',
                                            itemId: 'tipocondpagoId',
                                            width: 300,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>COND.PAGO</b>',
                                            forceSelection : true,
                                            name : 'id_condpago',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Cond_pago',
                                            //disabled : true, 
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            width: 200,
                                            labelWidth: 85,
                                            maxHeight: 25,
                                            fieldLabel: '<b>O. COMPRA</b>',
                                            name: 'orden_compra',
                                            itemId: 'ordencompraId',
                                            style: 'font-weight: bold;'
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
                                        }
                                    ]
                                    },{
                    xtype: 'fieldset',
                    title: '<b>ITEMS DOCUMENTOS</b>',
                    fieldDefaults: {
                        labelWidth: 70,
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
                                width: 140,
                                fieldLabel: 'Guia',
                                itemId: 'numguiaId',
                                style: 'font-weight: bold;',
                                readOnly: true
                            },{
                                xtype: 'numberfield',
                                width: 140,
                                fieldLabel: 'Guia',
                                itemId: 'idguiaId',
                                style: 'font-weight: bold;',
                                hidden: true
                            },{xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar Guias',
                                iconCls: 'icon-plus',
                                width: 105,
                                allowBlank: true,
                                action: 'buscarguias'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 150,
                                fieldLabel: 'Neto',
                                itemId: 'netoId',
                                readOnly: true,
                                style: 'font-weight: bold;'
                            },{xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 150,
                                fieldLabel: 'Iva',
                                minValue: 0,
                                readOnly: true,
                                itemId: 'ivaId',
                                readOnly: true,
                                style: 'font-weight: bold;'

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 170,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Total',
                                readOnly: true,
                                itemId: 'totalId'
                            },{
                                xtype: 'numberfield',
                                width: 170,
                                minValue: 0,
                                value: 0,
                                fieldLabel: 'Secuencia',
                                readOnly: true,
                                itemId: 'secuenciaId',
                                hidden: true
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
                    }]}]
                        },{
                            xtype: 'grid',
                            itemId: 'itemsgridId',
                            title: 'Detalle',
                            labelWidth: 70,
                            store: 'guiasdespacho.Items',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem2'
                            }
                            ],
                            height: 210,
                            columns: [
                                    { text: 'Id Guia',  dataIndex: 'id_guia', width: 50, hidden: true },
                                    { text: 'Num',  dataIndex: 'secuencia', width: 50},
                                    { text: 'Guia',  dataIndex: 'num_guia', width: 120, align: 'right', },
                                    { text: 'Neto',  dataIndex: 'neto',  align: 'right', width: 250, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                    { text: 'Iva',  dataIndex: 'iva',  align: 'right', width: 250, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                    { text: 'Total',  dataIndex: 'total',  align: 'right', width: 250, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} }
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
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'neto',
                            itemId: 'finaltotalnetoId',
                            readOnly: true,
                            fieldLabel: '<b>VALOR NETO</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 150,
                            name : 'afecto',
                            itemId: 'finalafectoId',
                            readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            width: 150,
                            fieldCls: 'required',
                            name : 'iva',
                            itemId: 'finaltotalivaId',
                            readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top'
                            //renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")} 
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 230,
                            name : 'total',
                            itemId: 'finaltotalId',
                            readOnly: true,
                            fieldLabel: '<b>TOTAL DOCUMENTO</b>',
                            labelAlign: 'top'
                        },{
                            xtype: 'numberfield',
                            itemId: 'finaltotalpostId',
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
                    items: ['->',{
                            xtype: 'button',
                            //iconCls: 'icono',
                            scale: 'large',
                            action: 'observaciones',
                            text: 'OBSERVACIONES'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            action: 'grabarfactura',
                            text: 'Grabar / Emitir'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
     
    }

});
