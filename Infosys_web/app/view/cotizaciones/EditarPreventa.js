Ext.define('Infosys_web.view.cotizaciones.EditarPreventa', {
    extend: 'Ext.window.Window',
    alias : 'widget.preventaeditarcotiza',

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
    title: 'Editar Preventa',

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
                            height: 200,
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
                                    items: [{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 200,
                                            allowBlank: false,
                                            name: 'id',
                                            itemId: 'idId',
                                            fieldLabel: '<b>ID</b>',
                                            hidden: true

                                        },{
                                            xtype: 'numberfield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 200,
                                            allowBlank: false,
                                            name: 'num_ticket',
                                            itemId: 'ticketId',
                                            fieldLabel: '<b>TICKET VENTA</b>',
                                            readOnly: true

                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                           
                                        },{
                                            xtype: 'combo',
                                            align: 'center',
                                            width: 450,
                                            maxHeight: 25,
                                            matchFieldWidth: false,
                                            listConfig: {
                                                width: 350
                                            },
                                            itemId: 'tipoDocumento2Id',
                                            fieldLabel: '<b>DOCUMENTO</b>',
                                            fieldCls: 'required',
                                            store: 'Tipo_documento.Selector',
                                            valueField: 'id',
                                            displayField: 'nombre'
                                        },{
                                            xtype: 'displayfield',
                                            width: 10
                                           
                                        },{
                                            xtype: 'datefield',
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            width: 230,
                                            fieldLabel: '<b>FECHA</b>',
                                            itemId: 'fechaventaId',
                                            name: 'fecha_venta',
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
                                            name : 'rut',
                                            readOnly: true                                            
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>RAZON SOCIAL</b>',
                                            maxHeight: 25,
                                            labelWidth: 140,
                                            width: 845,
                                            itemId: 'nombre_id',
                                            name : 'nombre',
                                            readOnly: true
                                            
                                        }
                                    ]
                                },{
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
                                            readOnly: true
                                        },{xtype: 'splitter'},{
                                            xtype: 'button',
                                            text: 'Sucursal',
                                            itemId: 'sucursalId',
                                            maxHeight: 25,
                                            width: 70,
                                            allowBlank: true,
                                            action: 'buscarsucursalpreventa2'
                                              
                                        },{xtype: 'splitter'},{
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            fieldLabel: '<b>GIRO</b>',
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
                                            xtype: 'combo',
                                            itemId: 'tipoVendedorId',
                                            width: 450,
                                            fieldCls: 'required',
                                            maxHeight: 25,
                                            fieldLabel: '<b>VENDEDOR</b>',
                                            forceSelection : true,
                                            name : 'id_vendedor',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Vendedores',
                                            allowBlank: false,
                                            readOnly: true
                                        },{xtype: 'splitter'},{
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
                                        },{
                                            xtype: 'textareafield',
                                            width: 110,
                                            fieldLabel: 'Observaciones',
                                            name: 'observaciones',
                                            itemId: 'observacionesId',
                                            style: 'font-weight: bold;',
                                            hidden: true

                                        }
                                    ]
                                    },{
                    xtype: 'fieldset',
                    title: 'Items Documento',
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
                                labelWidth: 40,
                                fieldLabel: 'Codigo',
                                itemId: 'codigoId',
                                style: 'font-weight: bold;'
                            }, {xtype: 'splitter'},{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 55,
                                itemId: 'nombreproductoId',
                                fieldLabel: 'Producto',
                                name: 'nomproducto',                                
                                readOnly: true
                            },{
                                xtype: 'textfield',
                                align: 'center',
                                labelWidth: 60,
                                itemId: 'productoId',
                                fieldLabel: 'Producto',
                                name: 'Productos',                                
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar Producto',
                                maxHeight: 25,
                                width: 120,
                                allowBlank: true,
                                action: 'buscarproductos',
                                itemId: 'buscarproc'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 130,
                                labelWidth: 40,
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;'
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 80,
                                labelWidth: 40,
                                minValue: 0,
                                fieldLabel: 'Stock',
                                readOnly: true,
                                itemId: 'cantidadOriginalId',
                                style: 'font-weight: bold;'

                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 120,
                                labelWidth: 60,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Cantidad',
                                itemId: 'cantidadId'
                            },{
                                xtype: 'numberfield',
                                width: 120,
                                labelWidth: 60,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Descuento Pro',
                                itemId: 'totdescuentoId',
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                            xtype: 'combo',
                            width: 220,
                            queryMode: 'local',
                            itemId: 'DescuentoproId',
                            fieldLabel: 'Descto %',
                            store: 'Tabladescuento',
                            emptyText : "Seleccione",
                            valueField: 'id',
                            disabled : true,
                            displayField: 'nombre'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                width: 80,
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
                            store: 'Cotizaeditar',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem2'
                            },
                            {
                                iconCls: 'icon-delete',
                                text: 'Editar',
                                action: 'editaritem2'
                            }
                            ],
                            height: 210,
                            columns: [
                                { text: 'Id Producto',  dataIndex: 'id_producto', width: 250, hidden: true },
                                { text: 'Id descuento',  dataIndex: 'id_descuento', width: 250, hidden: true },
                                { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                { text: 'Precio Unitario',  dataIndex: 'precio_base', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                { text: 'Cantidad',  dataIndex: 'cantidad', align: 'right',width: 100 },
                                { text: 'Descuento',  dataIndex: 'dcto', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                { text: 'Neto',  dataIndex: 'neto', hidden: true, align: 'right', flex:1,renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                { text: 'Iva',  dataIndex: 'iva', hidden: true, align: 'right', flex:1,renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} },
                                { text: 'Total',  dataIndex: 'total', align: 'right', flex:1, renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,000")} }
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
                            xtype: 'combo',
                            width: 280,
                            queryMode: 'local',
                            itemId: 'tipoDescuentoId',
                            fieldLabel: '<b>DESCUENTO</b>',
                            store: 'Tabladescuento',
                            emptyText : "Seleccione",
                            valueField: 'id',
                            labelAlign: 'top',
                            displayField: 'nombre'
                        },{
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'descuento',
                            itemId: 'finaldescuentoId',
                            readOnly: true,
                            fieldLabel: '<b>descuento</b>',
                            hidden: true
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 150,
                            name : 'descuentovalor',
                            itemId: 'descuentovalorId',
                            readOnly: true,
                            fieldLabel: '<b>DESCUENTO $</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},{
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
                            text: 'Observaciones',
                            scale: 'large',
                            iconCls: '',
                            width: 150,
                            allowBlank: true,
                            action: 'agregarobservaciones2'
                        },
                        {
                            xtype: 'button',
                            iconCls: 'icon-save',
                            scale: 'large',
                            action: 'grabarpreventa',
                            text: 'Grabar / Emitir'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
        //me.down('itemsgridId').getStore().load();
    }

});
