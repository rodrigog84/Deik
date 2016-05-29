Ext.define('Infosys_web.view.inventario_inicial.Desplegar', {
    extend: 'Ext.window.Window',
    alias : 'widget.desplegarinventarioinicial',

    requires: ['Ext.form.Panel','Ext.form.field.Text'],

    title : 'Inventario',
    layout: 'fit',
    autoShow: true,
    width: 880,
    modal: true,
    iconCls: 'icon-sheet',

    initComponent: function() {

        var stItms = Ext.getStore('InventarioInicial');
        stItms.removeAll();
        this.items = [
            {
                xtype: 'form',
                padding: '5 5 0 5',
                //labelWidth: 150,

                border: false,
                style: 'background-color: #fff;',
                
                fieldDefaults: {
                    anchor: '100%',
                    labelAlign: 'left',
                    allowBlank: false,
                    combineErrors: true,
                    labelWidth: 150,
                    msgTarget: 'side'
                },

                items: [
                    {
                        xtype: 'textfield',
                        name : 'id',
                        anchor: '35%',
                        itemId: 'numero_id',
                        labelWidth: 100,
                        fieldLabel: 'Numero Inventario'

                    },{
                        xtype: 'numberfield',
                        name : 'num_inventario',
                        anchor: '25%',
                        itemId: 'num_inventarioId',
                        labelWidth: 150,
                        fieldLabel: 'Numero Inventario',
                        readOnly: true//hidden: true

                    },{
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        items: [{
                        xtype: 'textfield',
                        name : 'bodega_id',
                        width : 450,
                        itemId: 'bodegaId',
                        labelWidth: 80,
                        fieldLabel: 'Id Bodega',
                        readOnly: true,
                        hidden: true

                    },{
                        xtype: 'textfield',
                        name : 'nom_bodega',
                        width : 450,
                        itemId: 'nombodegaId',
                        labelWidth: 80,
                        fieldLabel: 'Bodega',
                        readOnly: true//hidden: true

                    },{
                        xtype: 'displayfield',
                        width: 80
                                           
                                        },{
                            xtype: 'datefield',
                            fieldLabel: 'Fecha',
                            //anchor: '25%',
                            labelWidth: 45,
                            name:'fecha',
                            format: 'd/m/Y',
                            submitFormat: 'd/m/Y',
                            itemId: 'fechaid',
                            readOnly: true
                        }]
                        },{
                          xtype: 'fieldset',
                          title: 'Inventario',
                          height:330,
                          items: [{
                                  xtype: 'grid',
                                  tbar: [

                                    {
                                        xtype: 'button',
                                        text: 'Eliminar',
                                        iconCls: 'icon-delete',
                                        allowBlank: true,
                                        action: 'eliminardespliegaInventarioInicial'
                                    },{
                                        xtype: 'button',
                                        text: 'Modificar',
                                        iconCls: 'icon-delete',
                                        allowBlank: true,
                                        action: 'modificarInventarioInicial'
                                    }
                                    ],
                                  itemId: 'desplegarinicialId',
                                  title: 'Inventario Inicial',
                                  store: 'DesplegarInicial',
                                  height: 300,
                                  columns: [
                                      { text: 'Id',  dataIndex: 'id', width: 150, hidden:true },
                                      { text: 'Bodega',  dataIndex: 'id_bodega', width: 350, hidden:true },
                                      { text: 'Inventario',  dataIndex: 'num_inventario', width: 350, hidden:true },
                                      { text: 'Bodega',  dataIndex: 'bodega', width: 350, hidden:true},
                                      { text: 'Producto', dataIndex: 'nom_producto', width: 450},
                                      { text: 'Producto', dataIndex: 'id_producto', width: 150, hidden:true},
                                      { text: 'Fecha', dataIndex: 'fecha_inventario', format: 'd/m/Y', renderer:Ext.util.Format.dateRenderer('d/m/Y'), width: 150},
                                      { text: 'Cantidad', dataIndex: 'stock', width: 80}
                                  ]
                              }],
                    }
                ]
            }
        ];
        
        this.dockedItems = [{
            xtype: 'toolbar',
            dock: 'bottom',
            id:'buttons',
            ui: 'footer',
            items: ['->', {
                iconCls: 'icon-save',
                text: 'Imprimir',
                action: 'imprimeinventario'
            },'-',{
                iconCls: 'icon-save',
                text: 'Grabar',
                action: 'editarinventariograbar'
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
