Ext.define('Infosys_web.view.notacredito.Notacredito', {
    extend: 'Ext.window.Window',
    alias : 'widget.notacreditoingresar',

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
    title: 'Notas de Credito',

    initComponent: function() {
        var me = this;
         var tipoNotaCredito = Ext.create('Ext.data.Store', {
            fields: ['value', 'nombre'],
            data : [
                {"value":1, "nombre":"ANULACIÓN"},
                {"value":3, "nombre":"CORRECCIÓN"}
            ]
        });                  
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
                                    items: [   {                                    
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
                                            store: 'Tipo_documento.Selectornc',
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
                                            xtype: 'displayfield',
                                            width: 40                                          
                                        },{
                                            xtype: 'textfield',
                                            name: 'id_factura',
                                            itemId: 'facturaId',
                                            hidden: true
                                          
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
                                            action: 'validarut',
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
                                            action: 'buscarsucursalnotacredito'
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
                                            //hidden: true
                                            //disabled : true, 
                                        }
                                    ]
                                    },,{
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
                                            xtype: 'textfield',
                                            fieldCls: 'required',
                                            itemId: 'totfactId',
                                            name : 'tot_fact',
                                            maxHeight: 25,
                                            labelWidth: 50,
                                            width: 210,
                                            //readOnly: true,
                                            labelAlign: 'rigth',
                                            //disabled : true,                                            
                                            fieldLabel: '<b>TOTAL</b>',
                                            renderer: function(valor){return Ext.util.Format.number(parseInt(total),"0,00")}
                                        },{xtype: 'splitter'},{
                                            xtype: 'button',
                                            text: 'Facturas',
                                            //itemId: 'facturaId',
                                            maxHeight: 25,
                                            width: 70,
                                            allowBlank: true,
                                            action: 'buscarfactura'
                                            //,disabled : true  
                                        },{xtype: 'splitter'},{
                                            xtype: 'combobox',
                                            width: 400,
                                            store : tipoNotaCredito,
                                            fieldLabel: 'TIPO NOTA DE CR&Eacute;DITO',
                                            labelStyle: ' font-weight:bold',
                                            labelWidth: 200,
                                            emptyText : 'Seleccionar',
                                            editable: false,
                                            itemId : 'tipoNotaCredito' ,
                                            name : 'tipoNotaCredito' ,
                                            displayField : 'nombre',
                                            valueField : 'value',
                                            disabled : true,
                                            listeners: {
                                                change : function(elem,newValue,oldValue,eOpts){
                                                        var stItms = Ext.getStore('productos.Items');
                                                        stItms.removeAll(); //limpia grilla antes de cargar

                                                        if(newValue == 1){ // ANULACION
                                                            me.down('#codigoId').setValue('');
                                                            me.down('#precioId').setValue('');
                                                            me.down('#cantidadOriginalId').setValue('');
                                                            me.down('#cantidadId').setValue('');

                                                            me.down('#codigoId').setDisabled(true);
                                                            me.down('#buscarproc').setDisabled(true);
                                                            me.down('#precioId').setDisabled(true);
                                                            me.down('#cantidadOriginalId').setDisabled(true);
                                                            me.down('#cantidadId').setDisabled(true);
                                                            me.down('#agregarItem').setDisabled(true);
                                                            me.down('#eliminaritem').setDisabled(true);

                                                            var nombre = me.down('#facturaId').getValue()
                                                            console.log(preurl + 'facturas/getAllnotap?nombre='+nombre);
                                                            response = Ext.Ajax.request({
                                                            async: false,
                                                            url: preurl + 'facturas/getAllnotap?nombre='+nombre}); 
                                                            var obj = Ext.decode(response.responseText);
                                                            var cantidad = obj.total
                                                            var detalle_factura = obj.data;
                                                            var total = 0;
                                                            var neto = 0;
                                                            for(i=0;i<cantidad;i++){
                                                                stItms.add(new Infosys_web.model.Productos.Item({
                                                                    id: detalle_factura[i].id_producto,
                                                                    id_producto: detalle_factura[i].id_producto,
                                                                    nombre: detalle_factura[i].nombre,
                                                                    precio: detalle_factura[i].precio,
                                                                    cantidad: detalle_factura[i].cantidad,
                                                                    //neto: (parseInt(detalle_factura[i].neto/ 1.19)),
                                                                    neto: (parseInt(detalle_factura[i].totalproducto/ 1.19)),
                                                                    dcto: detalle_factura[i].descuento,
                                                                    totaliva: detalle_factura[i].totalproducto,
                                                                    iva: detalle_factura[i].iva          
                                                                }));

                                                                //total += parseInt(detalle_factura[i].neto);
                                                                total += parseInt(detalle_factura[i].totalproducto);
                                                                neto += parseInt(detalle_factura[i].totalproducto/ 1.19);


                                                            }

                                                            //var neto = parseInt(total/1.19);
                                                            var iva = total - neto;
                                                            me.down('#finaltotalId').setValue(total);
                                                            me.down('#finaltotalnetoId').setValue(neto);
                                                            me.down('#finalafectoId').setValue(neto);
                                                            me.down('#finaltotalivaId').setValue(iva);
                                                            me.down('#finaltotalpostId').setValue(total);
                                                            
                                                        }else if(newValue == 3){ //CORRECCION
                                                            me.down('#codigoId').setDisabled(false);
                                                            me.down('#buscarproc').setDisabled(false);
                                                            me.down('#precioId').setDisabled(false);
                                                            me.down('#cantidadOriginalId').setDisabled(false);
                                                            me.down('#cantidadId').setDisabled(false);
                                                            me.down('#agregarItem').setDisabled(false);
                                                            me.down('#eliminaritem').setDisabled(false);

                                                            
                                                            me.down('#finaltotalId').setValue(0);
                                                            me.down('#finaltotalnetoId').setValue(0);
                                                            me.down('#finalafectoId').setValue(0);
                                                            me.down('#finaltotalivaId').setValue(0);
                                                            me.down('#finaltotalpostId').setValue(0);


                                                        }


                                                    }
                                                }                                            
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
                                width: 100,
                                fieldLabel: 'Fact',
                                itemId: 'factactId',
                                style: 'font-weight: bold;',
                                hidden: true
                            },{
                                xtype: 'textfield',
                                width: 140,
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
                                fieldLabel: 'Precio',
                                itemId: 'precioId',
                                style: 'font-weight: bold;'
                            },{xtype: 'splitter'},
                            {
                                xtype: 'textfield',
                                width: 180,
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
                                itemId: 'cantidadId'
                            },
                            {xtype: 'splitter'},
                            {
                                xtype: 'button',
                                text: 'Agregar',
                                iconCls: 'icon-plus',
                                itemId: 'agregarItem',
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
                            store: 'productos.Items',
                            tbar: [{
                                iconCls: 'icon-delete',
                                itemId: 'eliminaritem',
                                text: 'Eliminar',
                                action: 'eliminaritem'
                            }
                            ],
                            height: 210,
                            columns: [
                                    { text: 'Producto',  dataIndex: 'nombre', width: 250 },
                                    { text: 'IdProducto',  dataIndex: 'id_producto', width: 350,hidden: true },
                                    { text: 'Cantidad',  dataIndex: 'cantidad', flex:1 },
                                    { text: 'Precio Unitario',  dataIndex: 'precio', flex:1, align: 'right', decimalPrecision:2},
                                    { text: 'Neto',  dataIndex: 'neto', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")}, hidden: true },
                                    { text: 'Iva',  dataIndex: 'iva', flex:1, renderer: function(valor){return Ext.util.Format.number((valor),"0,000")}, hidden: true },
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
                            //readOnly: true,
                            fieldLabel: '<b>VALOR NETO</b>',
                            labelAlign: 'top'
                        },
                        {xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            fieldCls: 'required',
                            width: 200,
                            name : 'afecto',
                            itemId: 'finalafectoId',
                            //readOnly: true,
                            fieldLabel: '<b>AFECTO</b>',
                            labelAlign: 'top'
                        },{xtype: 'splitter'},
                        {
                            xtype: 'numberfield',
                            width: 200,
                            fieldCls: 'required',
                            name : 'iva',
                            itemId: 'finaltotalivaId',
                            //readOnly: true,
                            fieldLabel: '<b>IVA</b>',
                            labelAlign: 'top'
                            //renderer: function(valor){return Ext.util.Format.number(parseInt(iva),"0.000")} 
                        },{xtype: 'splitter'},{
                            xtype: 'textfield',
                            fieldCls: 'required',
                            width: 300,
                            name : 'total',
                            itemId: 'finaltotalId',
                            //readOnly: true,
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
                            action: 'grabarnotacredito',
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
