Ext.define('Infosys_web.view.Preventa.EditarPreventa', {
    extend: 'Ext.window.Window',
    alias : 'widget.preventaeditar',

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
                                            store: 'Tipo_documento',
                                            valueField: 'id',
                                            displayField: 'descripcion',
                                            readOnly: true
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
                                            //editable : false,
                                            //disabled : true,                                            
                                            name : 'id_vendedor',
                                            valueField : 'id',
                                            displayField : 'nombre',
                                            emptyText : "Seleccione",
                                            store : 'Vendedores',
                                            allowBlank: false,
                                            readOnly: true
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
                                width: 180,
                                labelWidth: 40,
                                fieldLabel: 'Codigo',
                                itemId: 'codigoId',
                                style: 'font-weight: bold;'
                            }, {xtype: 'splitter'},{
                                xtype: 'combo',
                                align: 'center',
                                labelWidth: 50,
                                itemId: 'productoId',
                                fieldLabel: 'Producto',
                                name: 'Productos',
                                store: 'Productosf',
                                queryMode: 'local',
                                forceSelection: true,
                                displayField: 'nombre',
                                valueField: 'id',
                                listConfig: {
                                    minWidth: 450
                                }, 
                                    width: 320
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar',
                                maxHeight: 25,
                                width: 60,
                                allowBlank: true,
                                action: 'buscarproductos2'
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
                                width: 100,
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
                                width: 130,
                                labelWidth: 60,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Cantidad',
                                itemId: 'cantidadId'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 100,
                                labelWidth: 45,
                                fieldLabel: 'Dcto(%)',
                                value: 0,
                                itemId: 'descuentoId'
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
                            store: 'Preventaeditar',
                            tbar: [{
                                iconCls: 'icon-delete',
                                text: 'Eliminar',
                                action: 'eliminaritem2'
                            }
                            ],
                            height: 210,
                            columns: [
                                { text: 'Id Producto',  dataIndex: 'id_producto', width: 250, hidden: true },
                                { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                { text: 'Precio Unitario',  dataIndex: 'precio', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Cantidad',  dataIndex: 'cantidad', width: 100, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Descuento',  dataIndex: 'dcto', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Descuento',  dataIndex: 'descuentoprct', flex:1, hidden: true},
                                { text: 'Neto',  dataIndex: 'neto', flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Iva',  dataIndex: 'iva', flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                                { text: 'Total',  dataIndex: 'totaliva', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} }
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
                            width: 200,
                            value: 0,
                            name : 'descuento',
                            itemId: 'finaldescuentoId',
                            fieldLabel: '<b>DESCUENTO %</b>',
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
                            action: 'grabarpreventa2',
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
