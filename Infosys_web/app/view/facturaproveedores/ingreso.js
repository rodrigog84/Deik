Ext.define('Infosys_web.view.facturaproveedores.ingreso', {
    extend: 'Ext.window.Window',
    alias : 'widget.ingresofacturaproveedores',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : '<b>Ingreso Factura Proveedores</b>',
    layout: 'fit',
    autoShow: true,
    width: 950,
    height: 380,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        //limpiamos store productos
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
                    title: 'Factura proveedores',
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
                                xtype: 'numberfield',
                                width: 20,
                                fieldLabel: 'Id',
                                itemId: 'Id',
                                name: 'id',
                                style: 'font-weight: bold;',
                                hidden: true
                            },{
                                xtype: 'numberfield',
                                width: 240,
                                fieldLabel: '<b>NUMERO</b>',
                                itemId: 'numrfacturaId',
                                name: 'num_factura',
                                style: 'font-weight: bold;'
                            },{
                                    xtype: 'displayfield',
                                    width: 215                                          
                                },{
                                    xtype: 'datefield',
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    width: 210,
                                    labelWidth: 60,
                                    fieldLabel: '<b>FECHA</b>',
                                    itemId: 'fechaId',
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
                                    fieldLabel: '<b>VENCIMIENTO</b>',
                                    itemId: 'fechavencId',
                                    name: 'fecha_vcto',
                                    value: "0000-00-00"
                                }                          
                           ]
                        }

                        ]
                    }]

                },{
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
                                name : 'id_proveedor',
                                itemId: 'idproveedor',
                                hidden: true
                            },{
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    width: 240,
                                    name : 'rut',
                                    itemId: 'rutId',
                                    fieldLabel: '<b>RUT</b>'
                                },{
                                    xtype: 'displayfield',
                                    width: 30                                          
                                },{
                                    xtype: 'button',
                                    iconCls: 'icon-search',
                                    text: 'Buscar Proveedor',
                                    width: 250,
                                    allowBlank: true,
                                    action: 'wbuscarproveedorfactura'
                                }

                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    msgTarget: 'side',
                                    fieldLabel: '<b>RAZON SOCIAL</b>',
                                    xtype: 'textfield',
                                    width: 895,
                                    name : 'empresa',
                                    itemId: 'empresaId',
                                    readOnly : true
                                   
                                }
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                    width: 895,
                                    name : 'direccion',
                                    itemId: 'direccionId',
                                    fieldLabel: '<b>DIRECCION</b>',
                                    readOnly : true
                                }]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [
                                {
                                    xtype: 'textfield',
                                    width: 450,
                                    name : 'giro',
                                    itemId: 'nomgiroId',
                                    fieldLabel: '<b>GIRO</b>',
                                    readOnly : true
                                },
                                {
                                    xtype: 'textfield',
                                    width: 450,
                                    name : 'giro',
                                    itemId: 'giroId',
                                    fieldLabel: 'id_giro',
                                    hidden: true
                                },
                                    {xtype: 'splitter'},
                                {
                                    xtype: 'textfield',
                                    labelWidth: 80,
                                    width: 240,
                                    name : 'fono',
                                    itemId: 'fonoId',
                                    fieldLabel: '<b>TELEFONO</b>',
                                    readOnly : true
                                },{xtype: 'splitter'},{
                                    xtype: 'combo',
                                    itemId: 'tipoVendedorId',
                                    width: 195,
                                    labelWidth: 80,
                                    fieldCls: 'required',
                                    maxHeight: 25,
                                    fieldLabel: '<b>VENDEDOR</b>',
                                    forceSelection : true,
                                    name : 'id_vendedor',
                                    valueField : 'id',
                                    displayField : 'nombre',
                                    emptyText : "",
                                    store : 'Vendedores',
                                    readOnly : true
                                   }
                                
                               
                                ]
                            },
                            {
                                xtype: 'fieldcontainer',
                                layout: 'hbox',
                                items: [{
                                    xtype: 'textfield',
                                   width: 450,
                                   fieldLabel: '<b>CONTACTO</B>',
                                    itemId: 'nombre_contactoId',
                                    name : 'nombre_contacto'
                                }, {xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    labelWidth: 80,
                                    width: 190,
                                    name : 'fono_contacto',
                                    itemId: 'fono_contactoId',
                                    fieldLabel: '<b>TELEFONO</b>'
                                },{xtype: 'splitter'},{
                                    xtype: 'textfield',
                                    labelWidth: 50,
                                    width: 245,
                                    name : 'e_mail_contacto',
                                    itemId: 'mail_contactoId',
                                    fieldLabel: '<b>MAIL</b>'
                                }


                                ]
                            }
                            ]
                    }]
                },{
                    xtype: 'fieldset',
                    title: 'Valores Factura',
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
                                xtype: 'numberfield',
                                width: 210,
                                fieldLabel: '<b>EXCENTO</b>',
                                itemId: 'exentoId',
                                name: 'exento',
                                style: 'font-weight: bold;'
                                },{
                                    xtype: 'displayfield',
                                    width: 20                                          
                                },{
                                xtype: 'numberfield',
                                width: 210,
                                fieldLabel: '<b>NETO</b>',
                                itemId: 'netoId',
                                name: 'neto',
                                style: 'font-weight: bold;'
                                },{
                                    xtype: 'displayfield',
                                    width: 20                                          
                                },{
                                xtype: 'numberfield',
                                width: 210,
                                fieldLabel: '<b>IVA</b>',
                                itemId: 'ivaId',
                                name: 'iva',
                                style: 'font-weight: bold;'
                                },{
                                xtype: 'displayfield',
                                width: 20                                          
                                },{
                                xtype: 'numberfield',
                                width: 210,
                                fieldLabel: '<b>TOTAL</b>',
                                itemId: 'totalId',
                                name: 'total',
                                style: 'font-weight: bold;'
                            },                         
                           ]
                        }

                        ]
                    }]

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
                action: 'grabarfacturaproveedores'
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
