Ext.define('Infosys_web.view.ordencompra.Recepcionforzada', {
    extend: 'Ext.window.Window',
    alias : 'widget.ordencomprarecepcionforzada',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Recepcionar Orden de Compra Forzada',
    layout: 'fit',
    autoShow: true,
    width: 1150,
    height: 550,
    modal: true,
    iconCls: 'icon-sheet',
    y: 10,
    initComponent: function() {
        //limpiamos store productos
        var st = Ext.getStore('Productos');
        st.proxy.extraParams = {};
        st.load();
        //limpiamos store items
        var stItms = Ext.getStore('Orden_compradetalle');
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
                                xtype: 'numberfield',
                                width: 140,
                                fieldLabel: 'Id',
                                itemId: 'Id',
                                name: 'id',
                                style: 'font-weight: bold;',
                                hidden: true
                            },{
                                xtype: 'numberfield',
                                width: 140,
                                fieldLabel: 'Numero',
                                itemId: 'numeroId',
                                name: 'num_orden',
                                style: 'font-weight: bold;',
                                readOnly : true
                            }]
                        }

                        ]
                    }]

                },{
                    xtype: 'fieldset',
                    title: 'Datos Orden de Compra',
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
                                    fieldLabel: 'Rut Empresa'
                                },{
                                    xtype: 'displayfield',
                                    width: 390                                          
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
                                    msgTarget: 'side',
                                    fieldLabel: 'Nombre Empresa',
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
                                    fieldLabel: 'Direccion Empresa',
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
                                    fieldLabel: 'Giro Empresa',
                                    readOnly : true
                                },
                                    {xtype: 'splitter'},
                                {
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
                                   width: 450,
                                   fieldLabel: 'Nombre Contacto',
                                    itemId: 'nombre_contactoId',
                                    name : 'nombre_contacto'
                                }, {xtype: 'splitter'},{
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
                                }


                                ]
                            }
                            ]
                    }]
                },               
                {
                    xtype: 'grid',
                    itemId: 'itemsgridId',
                    title: 'Items',
                    store: 'Orden_compradetalle',
                    height: 175,
                    selModel: {
                        selType: 'cellmodel'
                    },
                    plugins: [
                        Ext.create('Ext.grid.plugin.CellEditing', {
                            clicksToEdit: 1,
                            listeners: {
                                beforeedit: function(e, editor){
                                    var record = editor.record

                                    if(record.get('existe')==true /*|| editor.field=="stock"*/){
                                        return true;
                                    }else{
                                        return false;
                                    }
                                }
                            }
                        })
                    ],
                    columns: [
                        { text: 'Id',  dataIndex: 'id', width: 250, hidden: true },
                        { text: 'Nombre',  dataIndex: 'nombre', width: 250 },
                        { text: 'Total',  dataIndex: 'total', flex:1 },
                        { text: 'Cantidad',  dataIndex: 'cantidad', width: 80 },
                        { xtype: 'checkcolumn', text: 'Recepcion', dataIndex: 'existe', 
                        listeners : {
                            checkchange : function(column, recordIndex, checked) {
                                var store = this.up('ordencomprarecepcion').down('#itemsgridId').getStore()
                                var record = store.getAt(recordIndex);

                                
                                if(checked){
                                    record.set({stock: record.get('cantidad')})
                                    if((record.get('total'))>0 && (record.get('cantidad'))>0){
                                        var valor_calc = Math.round((record.get('total')) / (record.get('cantidad')) );
                                        record.set({
                                            valor: valor_calc
                                        });             
                                    }

                                }else{
                                    record.set({stock: "", valor: ""})
                                }
                            }
                        }     


                    },
                        { text: 'Recibido', dataIndex: 'stock', width: 100, 
                        renderer: function(valor,r , e){
                           return valor
                        }, editor: {xtype: 'numberfield', allowBlank: false,minValue: 0,maxValue: 10000000000}},
                        { text: 'Valor', dataIndex: 'valor', width: 100, 
                        renderer: function(valor){
                            return valor
                        }, editor: {xtype: 'numberfield', allowBlank: false,minValue: 0,maxValue: 10000000000}}
                        
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
                text: 'Forzar Recepcion',
                action: 'grabarrecepcionforzada'
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
