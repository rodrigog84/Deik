Ext.define('Infosys_web.view.ordencompra.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.ordencompraingresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text',
               'Ext.grid.plugin.CellEditing'],

    title : 'Crear Orden de Compra',
    layout: 'fit',
    autoShow: true,
    height: 660,
    width: 1300,
    modal: true,
    iconCls: 'icon-sheet',
    //y: 10,
    initComponent: function() {
        //limpiamos store productos
        var st = Ext.getStore('Productos');
        st.proxy.extraParams = {};
        st.load();
        //limpiamos store items
        var stItms = Ext.getStore('ordencompra.Items');
        stItms.load();

        this.items = [{
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelWidth: 120,
                    labelAlign: 'left',
                    allowBlank: true,
                    combineErrors: false,
                    msgTarget: 'side'
                },

                items: [{
                    xtype: 'fieldset',
                    title: 'Datos Proveedor',
                    items: [{
                        xtype: 'container',
                        layout: {
                            type: 'vbox'
                        },
                        defaults: {
                            flex: 1
                        },
                        items: [
        					{
        					    xtype: 'textfield',
        					    name : 'id',
        					    hidden: true
        					},{
                                xtype: 'textfield',
                                name : 'idproveedor',
                                itemId: 'idproveedor',
                                hidden: true
                            },    
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'button',
                                    iconCls: 'icon-search',
                                    text: 'Buscar Proveedor',
                                    width: 250,
                                    allowBlank: true,
                                    action: 'wbuscarproveedor2'
                                },{
                                    xtype: 'displayfield',
                                    width: 265                                          
                                },{xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    width: 155,
                                    labelWidth: 40,
                                    fieldLabel: 'Rut',
                                    name : 'rut',
                                    itemId: 'rutId',
                                    readOnly : true                                  
                                },{
                                    xtype: 'displayfield',
                                    width: 40                                          
                                },{
                                    xtype: 'datefield',
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    width: 200,
                                    labelWidth: 60,
                                    fieldLabel: '<b>FECHA</b>',
                                    itemId: 'fechaordenId',
                                    name: 'fecha',
                                    value: new Date()
                                },{
                                    xtype: 'displayfield',
                                    width: 20                                          
                                },{
                                    xtype: 'datefield',
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    labelWidth: 90,
                                    width: 210,
                                    fieldLabel: '<b>RECEPCION</b>',
                                    itemId: 'fecharecepcionId',
                                    name: 'fecha_recepcion',
                                    value: new Date()
                                }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    fieldLabel: 'Nombre Empresa',
                                    xtype: 'textfield',
                                    width: 795,
                                    labelWidth: 120,
                                    name : 'nombres',
                                    itemId: 'nombreId',
                                    readOnly : true
                                   
                                }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    width: 795,
                                    labelWidth: 120,
                                    name : 'direccion',
                                    itemId: 'direccionId',
                                    fieldLabel: 'Direccion Empresa',
                                    readOnly : true
                                },{
                                    xtype: 'displayfield',
                                    width: 20                                          
                                },{
                                    xtype: 'textfield',
                                    width: 395,
                                    labelWidth: 40,
                                    name : 'nom_giro',
                                    itemId: 'nom_giroId',
                                    fieldLabel: 'Giro',
                                    readOnly : true
                                },{
                                    xtype: 'textfield',
                                    width: 295,
                                    name : 'id_giro',
                                    itemId: 'giroId',
                                    fieldLabel: 'Giro',
                                    hidden: true
                                }]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    width: 240,
                                    name : 'fono',
                                    itemId: 'fonoId',
                                    fieldLabel: 'Telefono Empresa',
                                    readOnly : true
                                }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                   width: 360,
                                   fieldLabel: 'Nombre Contacto',
                                    itemId: 'nombre_contactoId',
                                    name : 'nombre_contacto'
                                }, {xtype: 'splitter'},{
                                    xtype: 'button',
                                    text: 'Buscar',
                                    maxHeight: 25,
                                    width: 60,
                                    allowBlank: true,
                                    action: 'buscarcontactos'
                                },{xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    width: 190,
                                    name : 'fono_contacto',
                                    itemId: 'fono_contactoId',
                                    fieldLabel: 'Telefono Contacto'
                                },{xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    width: 245,
                                    name : 'e_mail_contacto',
                                    itemId: 'mail_contactoId',
                                    fieldLabel: 'Mail Contacto'
                                },{xtype: 'splitter'},{
                                    xtype: 'combo',
                                    itemId: 'tipoVendedorId',
                                    width: 350,
                                    labelWidth: 80,
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    fieldLabel: '<b>VENDEDOR</b>',
                                    forceSelection : true,
                                    name : 'id_vendedor',
                                    valueField : 'id',
                                    displayField : 'nombre',
                                    emptyText : "Seleccione",
                                    store : 'Vendedores'                                    //disabled : true, 
                                }


                                ]
                            }
                            ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Items Ordencompra',
                    fieldDefaults: {
                        labelWidth: 70
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
                            },{
                                xtype: 'numberfield',
                                align: 'center',
                                labelWidth: 60,
                                itemId: 'cantmedId',
                                fieldLabel: 'Cantidad medidad',
                                name: 'cant_medidad',                                
                                hidden: true
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Buscar',
                                maxHeight: 25,
                                width: 140,
                                allowBlank: true,
                                icon: gbl_site + 'Infosys_web/resources/images/search.png',
                                tooltip: 'Buscar',
                                handler: function (grid, rowIndex, colIndex, id) {
                                    var view = Ext.create('Infosys_web.view.ordencompra.BuscarProductos');
                                    view.down("#nombreId").focus();
                                }
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'numberfield',
                                width: 130,
                                labelWidth: 40,
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;',
                                decimalPrecision: 3
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 120,
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
                                width: 150,
                                labelWidth: 60,
                                minValue: 0,
                                value: 1,
                                fieldLabel: 'Cantidad',
                                itemId: 'cantidadId',
                                decimalPrecision: 3

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
                                displayField: 'nombre'
                                },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                width: 80,
                                allowBlank: true,
                                action: 'agregarItem'
                            }]
                        }

                        ]
                    }]

                },
                {
                    xtype: 'grid',
                    itemId: 'itemsgridId',
                    title: 'Items',
                    store: 'ordencompra.Items',
                    tbar: [{
                        iconCls: 'icon-delete',
                        text: 'Eliminar',
                        action: 'eliminaritem'
                    },
                    {
                        iconCls: 'icon-delete',
                        text: 'Editar',
                        action: 'editaritem'
                    }
                    ],
                    height: 250,
                    columns: [
                            {text: 'Id producto',  dataIndex: 'id_producto', width: 250, hidden : true },
                            { text: 'Id descuento',  dataIndex: 'id_descuento', width: 250, hidden : true },
                            { text: 'codigo',  dataIndex: 'codigo', width: 250, hidden : true },
                            { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                            { text: 'Precio Unitario',  dataIndex: 'precio', align: 'right',flex:1, decimalPrecision: 3},
                            { text: 'Cantidad',  dataIndex: 'cantidad', align: 'right',width: 120, decimalPrecision: 3},
                            { text: 'Cant Medidad',  dataIndex: 'cant_medida', align: 'right',width: 100, hidden: true, decimalPrecision: 3},
                            { text: 'Descuento',  dataIndex: 'dcto', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                            { text: 'Neto',  dataIndex: 'neto', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                            { text: 'Iva',  dataIndex: 'iva', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} },
                            { text: 'Total',  dataIndex: 'total', align: 'right',flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")} }
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'RESUMEN ORDEN DE COMPRA',
                    fieldDefaults: {
                        labelWidth: 110
                    },
                    items: [
                    {
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [ {
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
                            //renderer: function(valor){return Ext.util.Format.number((iva),"0.000")} 
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
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'grabar'
            },'-',{
                iconCls: 'icon-reset',
                text: 'Cancelar',
                scope: this,
                handler: this.close
            }]
        }];
        this.callParent(arguments);
    }
});
