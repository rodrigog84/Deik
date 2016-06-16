Ext.define('Infosys_web.view.guiasdespacho.Despachafactura', {
    extend: 'Ext.window.Window',
    alias : 'widget.despachofactura',

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
    title: 'Despacho de Facturas',

    initComponent: function() {
        var me = this;
        var stItms = Ext.getStore('productos.Items');
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
                                            xtype: 'combo',
                                            align: 'center',
                                            width: 450,
                                            maxHeight: 25,
                                            matchFieldWidth: false,
                                            listConfig: {
                                                width: 350
                                            },
                                            itemId: 'tipodocumentoId',
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            fieldCls: 'required',
                                            store: 'Tipo_documento.Selectorg',
                                            valueField: 'id',
                                            displayField: 'nombre'
                                        },/*{
                                            xtype: 'textfield',
                                            name: 'id_documento',
                                            itemId: 'tipodocumentoId',
                                            hidden: true
                                          
                                        },{
                                            xtype: 'textfield',
                                            width: 450,
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            name: 'nom_documento',
                                            itemId: 'nomdocumentoId',
                                            value: 12,
                                            readOnly: true
                                          
                                        },*/{
                                            xtype: 'textfield',
                                            name: 'id_factura',
                                            itemId: 'facturaId',
                                            hidden: true
                                          
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
                                            action: 'validarut3',
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
                                            action: 'buscarsucursalfacturadespacho'
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
                                            width: 210,
                                            readOnly: true,
                                            //disabled : true,                                            
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
                                            width: 210,
                                            //disabled : true,                                           
                                            fieldLabel: '<b>COMUNA</b>'
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25,
                                            labelWidth: 50
                                        },{
                                            xtype: 'combo',
                                            itemId: 'tipoVendedorId',
                                            width: 350,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>VENDEDOR</b>',
                                            forceSelection : true,
                                            name : 'id_vendedor',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Vendedores'
                                            //disabled : true, 
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25,
                                            labelWidth: 50
                                        },{
                                            xtype: 'combo',
                                            itemId: 'tipocondpagoId',
                                            width: 310,
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
                                            itemId: 'factId',
                                            labelWidth: 70,
                                            name : 'idfact',
                                            maxHeight: 25,
                                            width: 210,
                                            hidden: true,                                          
                                            fieldLabel: '<b>ID</b>'
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'numfactId',
                                            labelWidth: 70,
                                            name : 'num_fact',
                                            maxHeight: 25,
                                            width: 210,
                                            fieldLabel: '<b>FACTURA</b>'
                                        },{
                                            xtype: 'displayfield',
                                            flex: 1,
                                            maxWidth: 25
                                            
                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            itemId: 'descuentoId',
                                            name : 'tot_fact',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 210,
                                            readOnly: true,
                                            labelAlign: 'rigth',
                                            hidden: true,                                            
                                            fieldLabel: '<b>DESCUENTO</b>',
                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            itemId: 'netofacId',
                                            name : 'neto_fact',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 210,
                                            readOnly: true,
                                            labelAlign: 'rigth',
                                            hidden: true,                                            
                                            fieldLabel: '<b>NETO</b>',
                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            itemId: 'ivafacId',
                                            name : 'iva_fact',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 210,
                                            readOnly: true,
                                            labelAlign: 'rigth',
                                            hidden: true,                                            
                                            fieldLabel: '<b>DESCUENTO</b>',
                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            itemId: 'totalId',
                                            name : 'tot_fact',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 210,
                                            readOnly: true,
                                            labelAlign: 'rigth',
                                            hidden: true,                                            
                                            fieldLabel: '<b>TOTAL</b>'
                                        },{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'totfactId',
                                            name : 'tot_fact',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 210,
                                            readOnly: true,
                                            labelAlign: 'rigth',
                                            //disabled : true,                                            
                                            fieldLabel: '<b>TOTAL</b>',
                                            renderer: function(valor){return Ext.util.Format.number(parseInt(total),"0,00")}
                                        },{xtype: 'splitter'},{
                                            xtype: 'button',
                                            text: 'Facturas',
                                            itemId: 'facturaId',
                                            maxHeight: 25,
                                            width: 70,
                                            allowBlank: true,
                                            action: 'buscarfactura'
                                            //,disabled : true  
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
                                fieldLabel: 'Codigo',
                                itemId: 'codigoId',
                                style: 'font-weight: bold;',
                                readOnly: true,
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
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;',
                                readOnly: true,
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 110,
                                minValue: 0,
                                fieldLabel: 'Vendidos',
                                readOnly: true,
                                itemId: 'cantidadOriginalId',
                                style: 'font-weight: bold;'

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 170,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Cantidad',
                                itemId: 'cantidadId',
                                readOnly: true,
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                width: 105,
                                allowBlank: true,
                                action: 'agregarItem2'
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
                            store: 'productos.Items',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem'
                            }
                            ],
                            height: 210,
                            columns: [
                                    { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                    { text: 'IdProducto',  dataIndex: 'idproducto', width: 250,hidden: true },
                                    { text: 'Precio Unitario',  dataIndex: 'precio', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                    { text: 'Cantidad',  dataIndex: 'cantidad', width: 100, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                    { text: 'Total',  dataIndex: 'totaliva', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} }
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
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'descuentofinal',
                            itemId: 'descuentofinalId',
                            readOnly: true,
                            fieldLabel: '<b>DESCUENTO</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'afecto',
                            itemId: 'finalafectoId',
                            readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            width: 200,
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
                            width: 300,
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
                    items: ['->',
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            action: 'grabarfacturadespacho',
                            text: 'Grabar / Emitir'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('#productoId').getStore().load();
    }

});
