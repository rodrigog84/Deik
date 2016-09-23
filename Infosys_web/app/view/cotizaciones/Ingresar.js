Ext.define('Infosys_web.view.cotizaciones.Ingresar', {
    extend: 'Ext.window.Window',
    alias : 'widget.cotizacioningresar',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Crear Cotizacion',
    layout: 'fit',
    autoShow: true,
    width: 1200,
    height: 650,
    modal: true,
    iconCls: 'icon-sheet',
    
    
    initComponent: function() {
        //limpiamos store productos
        var st = Ext.getStore('Productos');
        st.proxy.extraParams = {};
        st.load();
        //limpiamos store items
        var stItms = Ext.getStore('cotizacion.Items');
        stItms.load();

        this.items = [{
                xtype: 'form',
                padding: '5 5 0 5',
                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelWidth: 130,
                    labelAlign: 'left',
                    allowBlank: true,
                    combineErrors: false,
                    msgTarget: 'side'
                },

                items: [{
                    xtype: 'fieldset',
                    title: 'Datos Cliente',
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
                                name : 'id_cliente',
                                itemId: 'idcliente',
                                hidden: true
                            },{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    width: 240,
                                    name : 'rut',
                                    itemId: 'rutId',
                                    fieldLabel: 'Rut Empresa'
                                },{xtype: 'splitter'},
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-search',
                                    width: 25,
                                    allowBlank: true,
                                    action: 'wbuscarcliente'
                                },{
                                    xtype: 'displayfield',
                                    width: 170                                          
                                },{
                                    xtype: 'textfield',
                                    maxHeight: 25,
                                    width: 180,
                                    labelWidth: 70,
                                    name : 'num_cotiza',
                                    itemId: 'numcotizaId',
                                    fieldLabel: 'Numero'
                                },{
                                    xtype: 'displayfield',
                                    width: 26                                          
                                },
                                {
                                    xtype: 'datefield',
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    width: 250,
                                    fieldLabel: '<b>FECHA</b>',
                                    itemId: 'fechaordenId',
                                    name: 'fecha',
                                    value: new Date(),
                                    renderer: Ext.util.Format.dateRenderer('Y-m-d')                                   
                                }
                                ]
                            },{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    msgTarget: 'side',
                                    fieldLabel: 'Nombre Empresa',
                                    xtype: 'textfield',
                                    width: 895,
                                    name : 'nombres',
                                    itemId: 'nombreId',
                                    readOnly : true
                                   
                                }
                                ]
                            },{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    width: 895,
                                    name : 'direccion',
                                    itemId: 'direccionId',
                                    fieldLabel: 'Direccion Empresa',
                                    readOnly : true
                                },{xtype: 'splitter'},
                                {
                                    xtype: 'textfield',
                                    width: 240,
                                    name : 'fono',
                                    itemId: 'fonoId',
                                    fieldLabel: 'Telefono Empresa',
                                    readOnly : true
                                }]
                            },{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    name : 'id_giro',
                                    itemId: 'giroId',
                                    hidden: true
                                },{
                                    xtype: 'textfield',
                                    width: 450,
                                    name : 'nom_giro',
                                    itemId: 'nom_giroId',
                                    fieldLabel: 'Giro Empresa',
                                    readOnly : true
                                },{xtype: 'splitter'},{
                                    xtype: 'combo',
                                    itemId: 'tipoVendedorId',
                                    labelWidth: 85,
                                    width: 290,
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    fieldLabel: '<b>VENDEDOR</b>',
                                    forceSelection : true,
                                    name : 'id_vendedor',
                                    valueField : 'id',
                                    displayField : 'nombre',
                                    emptyText : "Seleccione",
                                    store : 'Vendedores'
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
                                }]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    name : 'idcontacto',
                                    itemId: 'idcontacto',
                                    hidden: true
                                },{
                                    xtype: 'textfield',
                                    width: 400,
                                    fieldLabel: 'Nombre Contacto',
                                    itemId: 'nombre_contactoId',
                                    name : 'nombre_contacto'
                                },{xtype: 'splitter'},
                                {
                                    xtype: 'button',
                                    iconCls: 'icon-search',
                                    labelWidth: 85,
                                    width: 25,
                                    allowBlank: true,
                                    action: 'wcontacto'
                                },{xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    labelWidth: 70,
                                    width: 300,
                                    name : 'fono_contacto',
                                    itemId: 'fono_contactoId',
                                    fieldLabel: 'Telefono Contacto'
                                },{xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    labelWidth: 55,
                                    width: 250,
                                    name : 'e_mail_contacto',
                                    itemId: 'mail_contactoId',
                                    fieldLabel: 'Mail Contacto'
                                }



                                ]
                            }
                            ]
                    }]
                },
                {
                    xtype: 'fieldset',
                    title: 'Cotizacion',
                    fieldDefaults: {
                        labelWidth: 60
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
                            //disabled : true,
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
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'textareafield',
                                width: 110,
                                fieldLabel: 'Observaciones',
                                name: 'observaciones',
                                itemId: 'observacionesId',
                                style: 'font-weight: bold;',
                                hidden: true

                            }]
                        }

                        ]
                    }]

                },
                {
                    xtype: 'grid',
                    itemId: 'itemsgridId',
                    title: 'Items',
                    store: 'cotizacion.Items',
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
                        { text: 'Id',  dataIndex: 'id', width: 250, hidden: true },
                        { text: 'Id_producto',  dataIndex: 'id_producto', width: 250, hidden: true },
                        { text: 'Id_descuento',  dataIndex: 'id_descuento', width: 250, hidden: true },
                        { text: 'CODIGO',  dataIndex: 'codigo', width: 250, hidden: true },
                        { text: 'PRODUCTO',  dataIndex: 'nombre', width: 250 },
                        { text: 'PRECIO UNITARIO',  dataIndex: 'precio_base', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")} },
                        { text: 'CANTIDAD',  dataIndex: 'cantidad', align: 'right',width: 80 },
                        { text: 'VALOR DESCUENTO',  dataIndex: 'dcto', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")} },
                        { text: 'NETO',  dataIndex: 'neto', align: 'right',flex:1, decimalPrecision:2},
                        { text: 'IVA',  dataIndex: 'iva', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}, hidden: true},
                        { text: 'TOTAL',  dataIndex: 'total', align: 'right',flex:1,renderer: function(valor){return Ext.util.Format.number(parseInt(valor),"0,00")}}
                    ]
                },{
                    xtype: 'fieldset',
                    title: 'RESUMEN COTIZACION',
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
        }];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->',{
                    xtype: 'button',
                    text: 'Observaciones',
                    iconCls: '',
                    width: 130,
                    allowBlank: true,
                    action: 'agregarobservaciones'
                },'-',{
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
